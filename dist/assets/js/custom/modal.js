/******/ (() => { // webpackBootstrap
/*!***************************************!*\
  !*** ./src/assets/js/custom/modal.js ***!
  \***************************************/
function openModal(modalID) {
  const modal = document.getElementById(modalID);

  modal.style.display = "flex";
}

function closeModal(modalID) {
  const modal = document.getElementById(modalID);
  modal.style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};


window.openModal = openModal;
window.closeModal = closeModal;
/******/ })()
;
//# sourceMappingURL=modal.js.map