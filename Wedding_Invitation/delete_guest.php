<?php
session_start();
if (!isset($_SESSION["loggedin"])) {
  header("Location: index.html");
  exit;
}
include 'db.php';

$id = $_GET["id"];
$table = $_GET["table"];
if (in_array($table, ["fathers_family", "mothers_family", "present_address", "friends_colleagues", "teachers_vips"])) {
  $stmt = $conn->prepare("DELETE FROM `$table` WHERE id = ?");
  $stmt->bind_param("i", $id);
  $stmt->execute();
}
header("Location: dashboard.php?table=$table");
?>
