const API_URL = 'https://api.jsonbin.io/v3/b/67d2aaa98960c979a570ade7';  // Reemplaza con tu BIN ID
const API_KEY = '$2a$10$3jXtFCWAVo8McpPR7Ib1ZuTtkYiKoj3H3H0VmRY8SKmd2jI7myboS';  // No pongas esto en el frontend, mejor usar variables de entorno

document.addEventListener('DOMContentLoaded', function () {
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
            // Obtener los comentarios actuales
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: { 'X-Master-Key': API_KEY }
            });
            const data = await response.json();
            let comments = data.record || [];

            // Agregar nuevo comentario
            comments.push(commentData);

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
            console.error('Error saving comment:', error);
            alert('Failed to save your comment. Please try again.');
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
