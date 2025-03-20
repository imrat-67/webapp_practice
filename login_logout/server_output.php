<?php
require "db.php";

$result = $conn->query("SELECT * FROM saved_text ORDER BY id DESC");

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<p>" . htmlspecialchars($row["text_data"]) . "</p>";
    }
} else {
    echo "No data found.";
}

$conn->close();
?>
