<?php
header('Content-Type: application/json');

$db_host = 'localhost';
$db_user = 'root'; // Replace with your database username
$db_pass = '';     // Replace with your database password
$db_name = 'chat_app';

// Create database connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Fetch the last 50 messages
$sql = "SELECT username, message, timestamp FROM messages ORDER BY timestamp DESC LIMIT 50";
$result = $conn->query($sql);

$messages = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
}

// Reverse the array to display oldest message first
echo json_encode(array_reverse($messages));

$conn->close();
?>
