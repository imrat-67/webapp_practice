<?php
session_start();
$user = $_POST["username"] ?? "";
$pass = $_POST["password"] ?? "";

if ($user === "admin" && $pass === "7862") {
  $_SESSION["loggedin"] = true;
  header("Location: dashboard.php?table=fathers_family");
} else {
  echo "<script>alert('Invalid credentials!');window.location='index.html';</script>";
}
?>
