<?php
session_start();
if (!isset($_SESSION["loggedin"])) {
  header("Location: index.html");
  exit;
}

include 'db.php';

$table = $_POST["table"];
$name = trim($_POST["name"]);
$family_members = $_POST["family_members"];
$mobile = trim($_POST["mobile"]);
$invited = $_POST["invited"] ?? 0;
$id = $_POST["id"] ?? null;

if (!in_array($table, ["fathers_family", "mothers_family", "present_address", "friends_colleagues", "teachers_vips"])) {
  exit("Invalid table");
}

if ($id) {
  $stmt = $conn->prepare("UPDATE `$table` SET name=?, family_members=?, mobile=?, invited=? WHERE id=?");
  $stmt->bind_param("sisii", $name, $family_members, $mobile, $invited, $id);
  $stmt->execute();
  echo "updated";
} else {
  if ($name === "" || $family_members === "") exit("empty");
  $stmt = $conn->prepare("INSERT INTO `$table` (name, family_members, mobile, invited) VALUES (?, ?, ?, ?)");
  $stmt->bind_param("sisi", $name, $family_members, $mobile, $invited);
  $stmt->execute();
  echo $conn->insert_id;
}
?>
