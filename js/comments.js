document.addEventListener("DOMContentLoaded", () => {
    const commentsContainer = document.getElementById("comments-container");
    const commentForm = document.getElementById("comment-form");
    const statusElement = document.getElementById("comment-status");
    const commentsPath = "../data/comments.json";

    function setStatus(message) {
        if (statusElement) {
            statusElement.textContent = message;
        }
    }

    function escapeHtml(value) {
        const div = document.createElement("div");
        div.textContent = value;
        return div.innerHTML;
    }

    function renderComments(comments) {
        if (!commentsContainer) {
            return;
        }

        if (!Array.isArray(comments) || comments.length === 0) {
            commentsContainer.innerHTML = '<p class="no-comments">No editorially reviewed community notes are published yet.</p>';
            return;
        }

        commentsContainer.innerHTML = comments
            .slice()
            .reverse()
            .map((comment) => `
                <article class="comment">
                    <h3>${escapeHtml(comment.name || "Community member")}</h3>
                    <p>${escapeHtml(comment.comment || "")}</p>
                </article>
            `)
            .join("");
    }

    async function loadComments() {
        try {
            const response = await fetch(commentsPath);
            if (!response.ok) {
                throw new Error("Failed to load community notes.");
            }

            const comments = await response.json();
            renderComments(comments);
            setStatus("Community notes are reviewed before they are published.");
        } catch (error) {
            if (commentsContainer) {
                commentsContainer.innerHTML = '<p class="no-comments">Community notes are temporarily unavailable.</p>';
            }
            setStatus("We could not load community notes right now.");
            console.error(error);
        }
    }

    if (commentForm) {
        commentForm.addEventListener("submit", (event) => {
            event.preventDefault();
            setStatus("Direct public submissions are paused while moderation is being rebuilt. Please use the contact page for corrections or feedback.");
        });
    }

    loadComments();
});
