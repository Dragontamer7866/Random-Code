<?php
header('Content-Type: application/json');

$db_host = 'localhost';
$db_user = 'root'; // Replace with your database username
$db_pass = '';     // Replace with your database password
$db_name = 'chat_app';

// Create database connection
$conn = new mysqli($db_host, $db_host, $db_pass, $db_name);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Check if data was sent
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $message = $_POST['message'];
    $timestamp = date('Y-m-d H:i:s');

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO messages (username, message, timestamp) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $message, $timestamp);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['error' => 'Execute failed: ' . $stmt->error]);
    }
    
    $stmt->close();
}

$conn->close();
?>
