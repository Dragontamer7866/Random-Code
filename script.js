document.addEventListener('DOMContentLoaded', () => {
    const chatbox = document.getElementById('chatbox');
    const messageForm = document.getElementById('message-form');
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message-input');

    // Check for a stored username on page load
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        usernameInput.value = storedUsername;
        usernameInput.readOnly = true; // Make the field read-only
        messageInput.focus(); // Move focus to the message input
    }

    // Function to fetch and display messages (no change needed here)
    const fetchMessages = () => {
        fetch('/api')
            .then(response => response.json())
            .then(messages => {
                chatbox.innerHTML = '';
                messages.forEach(msg => {
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('message');
                    messageElement.innerHTML = `<span class="username">${msg.username}:</span> ${msg.message}`;
                    chatbox.appendChild(messageElement);
                });
                chatbox.scrollTop = chatbox.scrollHeight;
            });
    };

    // Function to handle form submission
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = usernameInput.value;
        const message = messageInput.value;

        if (username && message) {
            // Save username to localStorage if it's the first time
            if (!storedUsername) {
                localStorage.setItem('username', username);
            }

            fetch('/api', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, message })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    messageInput.value = '';
                    fetchMessages();
                }
            });
        }
    });

    setInterval(fetchMessages, 3000);
    fetchMessages();
});
