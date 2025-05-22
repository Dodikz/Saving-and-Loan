document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const scrollAmount = 320; // sedikit lebih besar dari lebar kartu

  function updateButtons() {
    const scrollLeft = track.scrollLeft;
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    prevBtn.style.display = scrollLeft > 0 ? "block" : "none";
    nextBtn.style.display = scrollLeft < maxScrollLeft ? "block" : "none";
  }

  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  track.addEventListener("scroll", updateButtons);

  // Initial update
  updateButtons();
});
