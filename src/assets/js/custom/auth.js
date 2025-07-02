import { getUsers } from "./helper.js";

let currentUser = null;

document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const nikInput = document.getElementById("nikInput").value.trim();
    const users = await getUsers();

    const foundUser = users.find((user) => user.username === nikInput);

    if (!foundUser) {
      alert("NIK/No Anggota tidak ditemukan!");
      return;
    }

    currentUser = foundUser;

    if (foundUser.role === "admin") {
      document.getElementById("passwordModal").style.display = "flex";
    } else {
      localStorage.setItem("user", JSON.stringify(foundUser));
      window.location.href = "./User/pinjaman_u.html";
    }
  });

document
  .getElementById("confirmPassword")
  .addEventListener("click", function () {
    const inputPassword = document.getElementById("adminPassword").value.trim();

    if (!currentUser) return;

    if (inputPassword === currentUser.password) {
      localStorage.setItem("user", JSON.stringify(currentUser));
      alert(`Selamat datang, ${currentUser.username}`);
      window.location.href = "./Super-user/pinjaman_s.html";
    } else {
      alert("Password salah!");
    }
  });

document.getElementById("closeModal").addEventListener("click", function () {
  document.getElementById("passwordModal").style.display = "none";
});

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/src/partials/layout/login_pages.html";
});

