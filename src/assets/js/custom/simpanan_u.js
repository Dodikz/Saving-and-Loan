let userSimpanan = [];
let currentPage = 1;
const itemsPerPage = 5;

document.addEventListener("DOMContentLoaded", async () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  if (!userData) return;

  const res = await fetch("../assets/js/data/users.json?v=" + Date.now());
  if (!res.ok) {
    alert("Gagal memuat data simpanan.");
    return;
  }

  const users = await res.json();
  const currentUser = users.find(u => u.username === userData.username);
  if (!currentUser || !currentUser.simpanan) return;

  userSimpanan = currentUser.simpanan;
  renderTable();
  renderPagination();
});

function renderTable() {
  const tableBody = document.querySelector("tbody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = userSimpanan.slice(startIndex, startIndex + itemsPerPage);

  currentItems.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><div class="item"><div class="item-content">${startIndex + index + 1}</div></div></td>
      <td><div class="item"><div class="item-content">${item.keterangan}</div></div></td>
      <td><div class="item"><div class="item-content">${item.tanggal}</div></div></td>
      <td><div class="item"><div class="item-content">Rp. ${item.nominal.toLocaleString("id-ID")}</div></div></td>
      <td><div class="item"><div class="item-content">${item.pembayaran}</div></div></td>
      <td><div class="item"><span class="badge ${item.status === "Lunas" ? "Aktif" : "belum"}">${item.status}</span></div></td>
    `;
    tableBody.appendChild(row);
  });
}

function renderPagination() {
  const container = document.querySelector(".pagination");
  if (!container) return;

  const totalPages = Math.ceil(userSimpanan.length / itemsPerPage);
  container.innerHTML = "";

  const prev = document.createElement("button");
  prev.innerHTML = "&lt;";
  prev.disabled = currentPage === 1;
  prev.onclick = () => {
    currentPage--;
    renderTable();
    renderPagination();
  };
  container.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => {
      currentPage = i;
      renderTable();
      renderPagination();
    };
    container.appendChild(btn);
  }

  const next = document.createElement("button");
  next.innerHTML = "&gt;";
  next.disabled = currentPage === totalPages;
  next.onclick = () => {
    currentPage++;
    renderTable();
    renderPagination();
  };
  container.appendChild(next);
}
