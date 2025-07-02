(function () {
  const encoded = localStorage.getItem('user');

  if (!encoded) {
    alert('Kamu belum login.');
    if (document.referrer) {
      window.location.href = document.referrer;
    } else {
      window.location.href = '/';
    }
    return;
  }

  let user;
  try {
    user = JSON.parse(encoded);
  } catch (err) {
    console.error('Data login rusak.');
    localStorage.removeItem('user');
    alert('Data login rusak. Silakan login ulang.');
    if (document.referrer) {
      window.location.href = document.referrer;
    } else {
      window.location.href = '/';
    }
    return;
  }

  const path = window.location.pathname;

  if (path.includes('/Super-user/') && user.role !== 'admin') {
    alert('Hanya admin yang boleh akses halaman ini.');
    window.location.href = document.referrer || '/';
    return;
  }

  if (path.includes('/User/') && user.role !== 'user') {
    alert('Hanya anggota biasa yang boleh akses halaman ini.');
    window.location.href = document.referrer || '/';
    return;
  }

  const display = document.getElementById('userDisplay');
  if (display) {
    display.textContent = `Halo, ${user.username}`;
  }
})();
