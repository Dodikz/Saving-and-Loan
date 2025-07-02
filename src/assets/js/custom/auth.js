import { getUsers } from "./helper.js";

let currentUser = null;

document
  .getElementById("loginForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nikInput = document.getElementById("nikInput").value.trim();
    const users = await getUsers();

    const foundUser = users.find((user) => user.username === nikInput);

    if (!foundUser) {
      alert("NIK/No Anggota tidak ditemukan!");
      return;
    }

    currentUser = foundUser;
    if (foundUser.role === "admin" || foundUser.role === "user") {
      document.getElementById("passwordModal").style.display = "flex";
    }
  });

document
  .getElementById("confirmPassword")?.addEventListener("click", function () {
    const inputPassword = document.getElementById("adminPassword").value.trim();

    if (!currentUser) return;

    if (inputPassword === currentUser.password) {
      if (currentUser.role === "admin") {
        localStorage.setItem("user", JSON.stringify(currentUser));
        window.location.href = "Super-user/anggota_s.html";
      }
      else if (currentUser.role === "user") {
        localStorage.setItem("user", JSON.stringify(currentUser));
        window.location.href = "User/simpanan_u.html";
      }
    } else {
      alert("Password salah!");
    }
  });

document.getElementById("closeModal")?.addEventListener("click", function () {
  document.getElementById("passwordModal").style.display = "none";
});


