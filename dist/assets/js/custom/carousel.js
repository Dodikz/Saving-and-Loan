/******/ (() => { // webpackBootstrap
/*!******************************************!*\
  !*** ./src/assets/js/custom/carousel.js ***!
  \******************************************/
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("carouselTrack");
  if (!track) return;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const scrollAmount = 320;

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  track.addEventListener("scroll", () => {
    if (track.scrollLeft > 10) {
      prevBtn.style.display = "block";
    } else {
      prevBtn.style.display = "none";
    }
  });
});


/******/ })()
;
//# sourceMappingURL=carousel.js.map