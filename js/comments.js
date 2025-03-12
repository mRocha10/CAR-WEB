document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');

    // Genera un ID único para cada comentario
    function generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Cargar comentarios desde el JSON de GitHub
    async function loadComments() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/TU_USUARIO/TU_REPOSITORIO/main/data/comments.json');
            if (!response.ok) {
                throw new Error('No comments found');
            }
            const comments = await response.json();
            displayComments(comments);
        } catch (error) {
            console.log('No comments yet');
            commentsContainer.innerHTML = '<p class="no-comments">Be the first to leave a comment!</p>';
        }
    }

    // Muestra los comentarios en la página
    function displayComments(comments) {
        commentsContainer.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <h4>${comment.name}</h4>
                <p>${comment.comment}</p>
            `;
            commentsContainer.appendChild(commentElement);
        });
    }

    // Guardar el comentario enviando una solicitud a GitHub API
    async function saveComment(commentData) {
        try {
            // Obtiene los comentarios actuales del archivo en GitHub
            const response = await fetch('https://raw.githubusercontent.com/TU_USUARIO/TU_REPOSITORIO/main/data/comments.json');
            let comments = [];
            if (response.ok) {
                comments = await response.json();
            }

            // Agrega el nuevo comentario
            comments.push(commentData);

            // Envía los comentarios actualizados a GitHub mediante un issue
            await fetch('https://api.github.com/repos/TU_USUARIO/TU_REPOSITORIO/issues', {
                method: 'POST',
                headers: {
                    'Accept': 'application/vnd.github+json',
                    'Authorization': `Bearer SECRETO_EN_BACKEND`, // GitHub Actions usará el token
                    'X-GitHub-Api-Version': '2022-11-28'
                },
                body: JSON.stringify({
                    title: "New Comment",
                    body: "```json\n" + JSON.stringify(comments, null, 2) + "\n```",
                    labels: ["comment"]
                })
            });

            // Muestra los comentarios actualizados
            displayComments(comments);
        } catch (error) {
            console.error('Error saving comment:', error);
            alert('Failed to save your comment. Please try again.');
        }
    }

    // Maneja el envío del formulario
    commentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const commentInput = document.getElementById('comment');
        
        const commentData = {
            id: generateUniqueId(),
            name: nameInput.value,
            comment: commentInput.value
        };
        
        await saveComment(commentData);
        
        // Limpia el formulario
        nameInput.value = '';
        commentInput.value = '';
    });

    // Cargar comentarios al inicio
    loadComments();
});
