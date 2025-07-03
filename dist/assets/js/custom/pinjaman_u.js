/******/ (() => { // webpackBootstrap
/*!********************************************!*\
  !*** ./src/assets/js/custom/pinjaman_u.js ***!
  \********************************************/
let userPinjaman = [];
let currentPage = 1;
const itemsPerPage = 5;

document.addEventListener("DOMContentLoaded", async () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  if (!userData) return;

  const res = await fetch("../assets/js/data/users.json?v=" + Date.now());
    if (!res.ok) {
      throw new Error("user.json not found");
    }
  const users = await res.json();

  const currentUser = users.find(u => u.username === userData.username);
  if (!currentUser || !currentUser.pinjaman) return;

  userPinjaman = currentUser.pinjaman;
  renderTable();
  renderPagination();
});

function renderTable() {
  const tableBody = document.getElementById("pinjamanTableBody");
  if (!tableBody) return;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = userPinjaman.slice(startIndex, startIndex + itemsPerPage);

  currentItems.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${startIndex + index + 1}</td>
      <td>${item.keterangan}</td>
      <td>${item.tanggal}</td>
      <td>Rp ${item.nominal.toLocaleString("id-ID")}</td>
      <td><span class="badge aktif">${item.status}</span></td>
      <td class="aksi">
        <button title="Lihat" onclick="openModal(${startIndex + index})">
          <img src="../assets/media/svg/eye-svgrepo-com.svg" alt="print">
        </button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function renderPagination() {
  const totalPages = Math.ceil(userPinjaman.length / itemsPerPage);
  const container = document.getElementById("paginationContainer");
    if (!container) return;

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

window.openModal = function (index) {
  const data = userPinjaman[index];
  document.getElementById("view").style.display = "flex";

  document.getElementById("totalPinjamanModal").textContent =
    `Rp ${data.detail.total.toLocaleString("id-ID")}`;

  const tbody = document.getElementById("cicilanBody");
  const tfoot = document.getElementById("cicilanFooter");
  tbody.innerHTML = "";
  tfoot.innerHTML = "";

  let totalDibayar = 0;
  let totalBelum = 0;

  data.detail.cicilan.forEach((c) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.bulan}</td>
      <td>${c.keterangan}</td>
      <td>${c.tanggal}</td>
      <td>Rp ${c.dibayar.toLocaleString("id-ID")}</td>
      <td><span class="badge ${c.status === "Dibayar" ? "lunas" : "belum"}">${c.status}</span></td>
    `;
    tbody.appendChild(row);

    if (c.status === "Dibayar") totalDibayar += c.dibayar;
    else totalBelum += c.dibayar;
  });

  tfoot.innerHTML = `
    <tr>
      <td colspan="3"><strong>TOTAL DIBAYAR :</strong></td>
      <td colspan="2"><strong>Rp ${totalDibayar.toLocaleString("id-ID")}</strong></td>
    </tr>
    <tr>
      <td colspan="3"><strong>PERLU DIBAYAR :</strong></td>
      <td colspan="2"><strong>Rp ${totalBelum.toLocaleString("id-ID")}</strong></td>
    </tr>
  `;
};

window.closeModal = function () {
  document.getElementById("view").style.display = "none";
};

/******/ })()
;
//# sourceMappingURL=pinjaman_u.js.map