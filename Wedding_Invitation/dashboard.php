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

$current_table = $_GET["table"] ?? "fathers_family";
if (!array_key_exists($current_table, $tables)) $current_table = "fathers_family";

$data = $conn->query("SELECT * FROM $current_table");
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <a class="navbar-brand" href="#">Wedding Manager</a>
    <ul class="navbar-nav me-auto">
      <?php foreach ($tables as $key => $value): ?>
        <li class="nav-item">
          <a class="nav-link <?= $key === $current_table ? 'active fw-bold' : '' ?>" href="?table=<?= $key ?>"><?= $value ?></a>
        </li>
      <?php endforeach; ?>
    </ul>
    <a href="summary.php" class="navbar-brand text-light">Summary</a>
    <a href="logout.php" class="btn btn-outline-light">Logout</a>
  </nav>

  <div class="container my-4">
    <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
      <h3 class="text-center flex-grow-1 mb-0"><?= $tables[$current_table] ?> Guests</h3>
      <div>
        <input type="text" class="form-control" id="searchInput" placeholder="Search guest...">
      </div>
      <button class="btn btn-primary add-btn">Add Guest</button>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered table-striped mt-3" id="guestTable">
        <thead class="table-dark">
          <tr>
            <th>SL No</th>
            <th>Name</th>
            <th>Family Members</th>
            <th>Mobile</th>
            <th>Invited?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <?php $i = 1; while($row = $data->fetch_assoc()): ?>
          <tr data-id="<?= $row['id'] ?>">
            <td><?= $i++ ?></td>
            <td contenteditable="true"><?= htmlspecialchars($row["name"]) ?></td>
            <td contenteditable="true"><?= $row["family_members"] ?></td>
            <td contenteditable="true"><?= $row["mobile"] ?></td>
            <td class="text-center"><input type="checkbox" <?= $row["invited"] ? "checked" : "" ?>></td>
            <td>
              <button class="btn btn-success btn-sm save-btn">Save</button>
              <a href="delete_guest.php?id=<?= $row["id"] ?>&table=<?= $current_table ?>" class="btn btn-danger btn-sm">Delete</a>
            </td>
          </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
    </div>
  </div>

  <button id="scrollTopBtn" class="btn btn-secondary">↑ Top</button>

  <script>
    const currentTable = "<?= $current_table ?>";
  </script>
  <script src="script.js?v=<?= time() ?>"></script>

</body>
</html>
