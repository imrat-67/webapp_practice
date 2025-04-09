<?php
require "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the deviceID from the request
    $deviceID = $_POST["deviceID"];

    // Find the ID of the last message by this user
    $result = $conn->query("SELECT id FROM chatmessages WHERE device_id = '$deviceID' ORDER BY id DESC LIMIT 1");

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $lastMessageId = $row["id"];

        // Delete the last message
        $conn->query("DELETE FROM chatmessages WHERE id = $lastMessageId");
        echo "Last message deleted successfully!";
    } else {
        echo "No messages found for this user!";
    }
}

$conn->close();
?>