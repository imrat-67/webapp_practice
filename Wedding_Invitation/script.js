document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("#guestTable tbody");
  const scrollBtn = document.getElementById("scrollTopBtn");
  const searchInput = document.getElementById("searchInput");

  document.querySelector(".add-btn").addEventListener("click", () => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>New</td>
      <td contenteditable="true"></td>
      <td contenteditable="true">1</td>
      <td contenteditable="true"></td>
      <td class="text-center"><input type="checkbox"></td>
      <td>
        <button class="btn btn-success btn-sm save-btn">Save</button>
        <a href="#" class="btn btn-danger btn-sm" onclick="this.closest('tr').remove();return false;">Delete</a>
      </td>
    `;
    table.prepend(newRow);
  });

  table.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("save-btn")) return;

    const row = e.target.closest("tr");
    const id = row.dataset.id || "";

    const name = row.cells[1].textContent.trim();
    const family_members = row.cells[2].textContent.trim();
    const mobile = row.cells[3].textContent.trim();
    const invited = row.cells[4].querySelector("input").checked ? 1 : 0;

    if (name === "" || family_members === "" || isNaN(family_members)) {
      alert("Please provide a valid name and number of family members.");
      return;
    }

    const res = await fetch("save_guest.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ id, name, family_members, mobile, invited, table: currentTable })
    });

    const result = await res.text();

    if (!id && !isNaN(result)) {
      row.dataset.id = result;
      row.cells[0].innerText = "New";
    }

    location.reload();
  });

  // Scroll to top button
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });
  scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Live Search
  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    table.querySelectorAll("tr").forEach(row => {
      const name = row.cells[1].textContent.toLowerCase();
      row.style.display = name.includes(term) ? "" : "none";
    });
  });
});
