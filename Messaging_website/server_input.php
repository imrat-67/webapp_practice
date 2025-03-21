<?php
require "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $text = $_POST["text"] ?? "";
    $deviceID = $_POST["deviceID"] ?? "unknown";

    if (!empty($text)) {
        $stmt = $conn->prepare("INSERT INTO chatmessages (message, device_id) VALUES (?, ?)");
        $stmt->bind_param("ss", $text, $deviceID);

        if ($stmt->execute()) {
            echo "Message saved!";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Text cannot be empty!";
    }
}

$conn->close();
?>
