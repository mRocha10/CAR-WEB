const API_URL = 'https://api.jsonbin.io/v3/b/67d2aaa98960c979a570ade7';
const API_KEY = '$2a$10$3jXtFCWAVo8McpPR7Ib1ZuTtkYiKoj3H3H0VmRY8SKmd2jI7myboS';

// Load prohibited words from JSON file
let prohibitedWords = null;

async function loadProhibitedWords() {
    try {
        const response = await fetch('../data/prohibited-words.json');
        if (!response.ok) throw new Error('Failed to load prohibited words');
        prohibitedWords = await response.json();
    } catch (error) {
        console.error('Error loading prohibited words:', error);
        // Fallback to empty arrays if loading fails
        prohibitedWords = {
            profanity: [],
            hateAndDiscrimination: [],
            spam: [],
            spamPatterns: []
        };
    }
}

// Función para sanitizar el input y prevenir XSS
function sanitizeInput(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Función para verificar contenido ofensivo
function containsOffensiveContent(text) {
    if (!prohibitedWords) return false;
    
    const lowercaseText = text.toLowerCase();
    
    // Check for profanity
    if (prohibitedWords.profanity.some(word => lowercaseText.includes(word))) {
        return true;
    }
    
    // Check for hate speech and discrimination
    if (prohibitedWords.hateAndDiscrimination.some(word => lowercaseText.includes(word))) {
        return true;
    }
    
    // Check for spam words
    if (prohibitedWords.spam.some(word => lowercaseText.includes(word))) {
        return true;
    }
    
    // Check for spam patterns
    return prohibitedWords.spamPatterns.some(pattern => {
        const regex = new RegExp(pattern);
        return regex.test(lowercaseText);
    });
}

// Función para validar el input
function validateInput(text, type) {
    if (!text || text.trim() === '') {
        throw new Error(`${type} cannot be empty`);
    }
    
    if (type === 'name' && text.length > 50) {
        throw new Error('Name is too long (maximum 50 characters)');
    }
    
    if (type === 'comment' && text.length > 500) {
        throw new Error('Comment is too long (maximum 500 characters)');
    }
    
    if (containsOffensiveContent(text)) {
        throw new Error(`Your ${type} contains inappropriate content`);
    }
    
    return sanitizeInput(text);
}

document.addEventListener('DOMContentLoaded', async function () {
    // Load prohibited words when the page loads
    await loadProhibitedWords();
    
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');

    async function loadComments() {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: { 'X-Master-Key': API_KEY }
            });
            if (!response.ok) throw new Error('No comments found');
            const data = await response.json();
            displayComments(data.record);
        } catch (error) {
            console.log('No comments yet');
            commentsContainer.innerHTML = '<p class="no-comments">Be the first to leave a comment!</p>';
        }
    }

    function displayComments(comments) {
        commentsContainer.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `<h4>${comment.name}</h4><p>${comment.comment}</p>`;
            commentsContainer.appendChild(commentElement);
        });
    }

    async function saveComment(commentData) {
        try {
            // Validar y sanitizar los inputs
            const sanitizedName = validateInput(commentData.name, 'name');
            const sanitizedComment = validateInput(commentData.comment, 'comment');

            const sanitizedData = {
                name: sanitizedName,
                comment: sanitizedComment
            };

            // Obtener los comentarios actuales
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: { 'X-Master-Key': API_KEY }
            });
            const data = await response.json();
            let comments = data.record || [];

            // Agregar nuevo comentario
            comments.push(sanitizedData);

            // Guardar comentarios actualizados
            await fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': API_KEY
                },
                body: JSON.stringify(comments)
            });

            // Mostrar los comentarios actualizados
            displayComments(comments);
        } catch (error) {
            console.error('Error:', error.message);
            alert(error.message);
        }
    }

    commentForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const nameInput = document.getElementById('name');
        const commentInput = document.getElementById('comment');

        const commentData = {
            name: nameInput.value,
            comment: commentInput.value
        };

        await saveComment(commentData);

        nameInput.value = '';
        commentInput.value = '';
    });

    loadComments();
});
