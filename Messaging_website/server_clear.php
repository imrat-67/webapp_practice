<?php
require "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $conn->query("DELETE FROM chatmessages");
    echo "All messages cleared successfully!";
}

$conn->close();
?>
