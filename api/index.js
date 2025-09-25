document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...

    const fetchMessages = () => {
        // Change the fetch URL to point to the new PHP API location
        fetch('/api/php/fetch_messages.php')
            .then(response => response.json())
            .then(messages => {
                // ...
            });
    };

    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // ...
        
        fetch('/api/php/send_message.php', {
            // ...
        })
        .then(response => response.json())
        .then(data => {
            // ...
        });
    });

    // ... existing code ...
});
