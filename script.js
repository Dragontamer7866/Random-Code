document.addEventListener('DOMContentLoaded', () => {
    const chatbox = document.getElementById('chatbox');
    const messageForm = document.getElementById('message-form');
    const usernameInput = document.getElementById('username');
    const messageInput = document.getElementById('message-input');

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        usernameInput.value = storedUsername;
        usernameInput.readOnly = true;
        messageInput.focus();
    }

    const fetchMessages = () => {
        // Fetch from the single Node.js API endpoint
        fetch('/api')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(messages => {
                chatbox.innerHTML = '';
                messages.forEach(msg => {
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('message');
                    messageElement.innerHTML = `<span class="username">${msg.username}:</span> ${msg.message}`;
                    chatbox.appendChild(messageElement);
                });
                chatbox.scrollTop = chatbox.scrollHeight;
            })
            .catch(error => console.error('Error fetching messages:', error));
    };

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = usernameInput.value;
        const message = messageInput.value;

        if (username && message) {
            if (!storedUsername) {
                localStorage.setItem('username', username);
            }

            fetch('/api', { // Post to the single Node.js API endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, message })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    messageInput.value = '';
                    fetchMessages();
                }
            })
            .catch(error => console.error('Error sending message:', error));
        }
    });

    setInterval(fetchMessages, 3000);
    fetchMessages();
});
