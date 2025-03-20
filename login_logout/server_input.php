<?php
require "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $text = $_POST["text"] ?? "";

    if (!empty($text)) {
        $stmt = $conn->prepare("INSERT INTO saved_text (text_data) VALUES (?)");
        $stmt->bind_param("s", $text);

        if ($stmt->execute()) {
            echo "Data saved successfully!";
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
