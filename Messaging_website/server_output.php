<?php
require "db.php";

$result = $conn->query("SELECT message, device_id, created_at FROM chatmessages ORDER BY id ASC");

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<div class='chat-message'> 
                <strong class='device-id'>" . htmlspecialchars($row["device_id"]) . "</strong>: 
                <strong>" . htmlspecialchars($row["message"]) . "</strong>
                <sub class='text-muted'>" . $row["created_at"] . "</sub>
              </div>";
    }
} else {
    echo "No messages yet";
}

$conn->close();
?>