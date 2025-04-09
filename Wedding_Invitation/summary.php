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
  $count = $conn->query("SELECT COUNT(*) AS total, SUM(invited) AS invited FROM $key")->fetch_assoc();
  $details[] = [
    "label" => $label,
    "total" => $count["total"],
    "invited" => $count["invited"] ?? 0
  ];
  $total_guests += $count["total"];
  $total_invited += $count["invited"] ?? 0;
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
    <a class="navbar-brand" href="#">Wedding Manager</a>
    <ul class="navbar-nav me-auto"></ul>
    <a href="dashboard.php?table=fathers_family" class="btn btn-outline-light">Dashboard</a>
  </nav>

  <div class="container my-5">
    <h3 class="mb-4 text-center">Guest Summary Overview</h3>
    <table class="table table-bordered">
      <thead class="table-dark">
        <tr>
          <th>Category</th>
          <th>Total Guests</th>
          <th>Invited</th>
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
