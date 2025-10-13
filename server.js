const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const WebSocket = require('ws');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
const https = require('https');
const selfsigned = require('selfsigned');

// Generar certificado self-signed
const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, { days: 365 });
const httpsOptions = {
  key: pems.private,
  cert: pems.cert
};

app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use(helmet());

// WebSocket server for real-time updates
// const server = app.listen(3001, () => {
//     console.log('Server running on port 3000');
// });
const server = https.createServer(httpsOptions, app).listen(3001, () => {
    console.log('HTTPS Server running on port 3000');
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

// Endpoint to save comments con validación
app.post('/save-comment', [
  body('name').trim().notEmpty().escape(),
  body('comment').trim().notEmpty().escape()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
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