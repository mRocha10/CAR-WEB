const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const WebSocket = require('ws');

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// WebSocket server for real-time updates
const server = app.listen(3000, () => {
    console.log('Server running on port 3000');
});

const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    
    // Send initial comments to new client
    fs.readFile(path.join(__dirname, 'data', 'comments.json'), 'utf8', (err, data) => {
        if (!err) {
            try {
                const comments = JSON.parse(data);
                ws.send(JSON.stringify(comments));
            } catch (parseErr) {
                console.error('Error parsing comments:', parseErr);
            }
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
    });
});

// Broadcast updates to all connected clients
function broadcastUpdate(comments) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(comments));
        }
    });
}

// Endpoint to save comments
app.post('/save-comment', (req, res) => {
    const commentData = req.body;
    const commentsPath = path.join(__dirname, 'data', 'comments.json');

    fs.readFile(commentsPath, 'utf8', (err, data) => {
        let comments = [];
        if (!err) {
            try {
                comments = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing comments:', parseErr);
            }
        }

        comments.push(commentData);

        fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error saving comment:', writeErr);
                res.status(500).json({ error: 'Failed to save comment' });
                return;
            }

            // Broadcast update to all connected clients
            broadcastUpdate(comments);
            res.json({ success: true });
        });
    });
});