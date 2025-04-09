<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "wedding_guests";

$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$conn->query("CREATE DATABASE IF NOT EXISTS $dbname");
$conn->select_db($dbname);

$tables = ["fathers_family", "mothers_family", "present_address", "friends_colleagues", "teachers_vips"];

foreach ($tables as $table) {
  $conn->query("CREATE TABLE IF NOT EXISTS `$table` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    family_members INT NOT NULL,
    mobile VARCHAR(20),
    invited BOOLEAN DEFAULT FALSE
  )");
}
?>
