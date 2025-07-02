/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/js/custom/helper.js":
/*!****************************************!*\
  !*** ./src/assets/js/custom/helper.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getUsers: () => (/* binding */ getUsers)
/* harmony export */ });
function getUsers() {
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

  return fetch("./assets/data/users.json")
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/assets/js/custom/auth.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper.js */ "./src/assets/js/custom/helper.js");


let currentUser = null;

document
  .getElementById("loginForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nikInput = document.getElementById("nikInput").value.trim();
    const users = await (0,_helper_js__WEBPACK_IMPORTED_MODULE_0__.getUsers)();

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



})();

/******/ })()
;
//# sourceMappingURL=auth.js.map