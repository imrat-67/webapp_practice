<?php
$host = "sql306.infinityfree.com";
$user = "if0_38563085";
$password = "sqLQPeNBAcZO";
$database = "if0_38563085_web_app_practice";

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create table if not exists
$sql = "CREATE TABLE IF NOT EXISTS chatmessages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT NOT NULL,
    device_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
$conn->query($sql);
?>
