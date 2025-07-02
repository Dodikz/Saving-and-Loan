export function getUsers() {
  const saved = localStorage.getItem("users");
  if (saved) return Promise.resolve(JSON.parse(saved));

  return fetch("assets/js/custom/users.json")
    .then((res) => {
      if (!res.ok) throw new Error("user.json not found");
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("users", JSON.stringify(data));
      return data;
    })
    .catch((err) => {
      console.error("Gagal load users:", err);
      alert("Gagal mengambil data user.");
      return [];
    });
}
