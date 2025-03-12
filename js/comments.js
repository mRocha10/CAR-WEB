document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');

    // Function to generate a unique ID
    function generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Load initial comments
    loadComments();

    async function loadComments() {
        try {
            const response = await fetch('/data/comments.json');
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

    async function saveComment(commentData) {
        try {
            // Load existing comments
            let comments = [];
            try {
                const response = await fetch('/data/comments.json');
                if (response.ok) {
                    comments = await response.json();
                }
            } catch (error) {
                // If file doesn't exist or is empty, start with empty array
                comments = [];
            }

            // Add new comment
            comments.push(commentData);

            // Save updated comments to localStorage as temporary storage
            localStorage.setItem('comments', JSON.stringify(comments));

            // Update the display
            displayComments(comments);
        } catch (error) {
            console.error('Error saving comment:', error);
            alert('Failed to save your comment. Please try again.');
        }
    }

    // Handle form submission
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
        
        // Clear form
        nameInput.value = '';
        commentInput.value = '';
    });
});