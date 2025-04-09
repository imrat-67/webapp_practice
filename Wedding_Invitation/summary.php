<?php
session_start();
if (!isset($_SESSION["loggedin"])) {
  header("Location: index.html");
  exit;
}
include 'db.php';

$tables = [
  "fathers_family" => "Father's Family",
  "mothers_family" => "Mother's Family",
  "present_address" => "Present Address (Takerhat)",
  "friends_colleagues" => "Friends & Colleagues",
  "teachers_vips" => "Teachers & VIPs"
];

$total_guests = 0;
$total_invited = 0;
$details = [];

foreach ($tables as $key => $label) {
  $result = $conn->query("SELECT SUM(family_members) AS total_guests, SUM(CASE WHEN invited = 1 THEN family_members ELSE 0 END) AS invited FROM $key");
  $row = $result->fetch_assoc();
  
  $details[] = [
    "label" => $label,
    "total" => $row["total_guests"] ?? 0,
    "invited" => $row["invited"] ?? 0
  ];
  $total_guests += $row["total_guests"] ?? 0;
  $total_invited += $row["invited"] ?? 0;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Guest Summary</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
</head>
<body class="bg-light">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <a class="navbar-brand" href="dashboard.php?table=fathers_family">Wedding Manager</a>
    <a href="dashboard.php?table=fathers_family" class="btn btn-outline-light ms-auto">Dashboard</a>
    <a href="logout.php" class="btn btn-outline-light ms-2">Logout</a>
  </nav>

  <div class="container my-5">
    <h3 class="mb-4 text-center">Guest Summary Overview</h3>
    <table class="table table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Category</th>
          <th>Total Guests (Including Family)</th>
          <th>Total Invited</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($details as $row): ?>
        <tr>
          <td><?= $row["label"] ?></td>
          <td><?= $row["total"] ?></td>
          <td><?= $row["invited"] ?></td>
        </tr>
        <?php endforeach; ?>
        <tr class="table-primary fw-bold">
          <td>Total</td>
          <td><?= $total_guests ?></td>
          <td><?= $total_invited ?></td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>
