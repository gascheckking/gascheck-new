// favorites.js
document.addEventListener("DOMContentLoaded", () => {
  const favItems = document.querySelectorAll(".favorite-item");
  favItems.forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("selected");
    });
  });
});