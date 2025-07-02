/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/*!****************************************!*\
  !*** ./src/assets/js/custom/helper.js ***!
  \****************************************/
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

  return fetch("../assets/data/users.json")
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

/******/ })()
;
//# sourceMappingURL=helper.js.map