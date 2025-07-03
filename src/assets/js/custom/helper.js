export function getUsers() {
  const saved = localStorage.getItem("users");

  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        console.log("User dari localStorage:", parsed);
        return Promise.resolve(parsed);
      }
    } catch (err) {
      console.warn("Gagal parse localStorage, fetch ulang.");
    }
  }

  return fetch("../assets/js/data/users.json?v=" + Date.now())
    .then((res) => {
      if (!res.ok) throw new Error("user.json not found");
      return res.json();
    })
    .then((data) => {
      console.log("User dari file JSON:", data);

      if (!Array.isArray(data)) {
        throw new Error("Format users.json harus array");
      }

      localStorage.setItem("users", JSON.stringify(data));
      return data;
    })
    .catch((err) => {
      console.error("Gagal load users:", err);
      alert("Gagal mengambil data user.");
      return [];
    });
}
