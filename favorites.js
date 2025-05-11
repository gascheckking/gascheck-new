// favorites.js

const FAVORITE_KEY = "warpai_favorites";

// Hämta sparade favoriter
export function getFavorites() {
  const stored = localStorage.getItem(FAVORITE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Lägg till eller ta bort favorit
export function toggleFavorite(name) {
  const current = getFavorites();
  let updated;

  if (current.includes(name)) {
    updated = current.filter(fav => fav !== name);
  } else {
    updated = [...current, name];
  }

  localStorage.setItem(FAVORITE_KEY, JSON.stringify(updated));
  renderFavorites();
}

// Visa favoriter i UI
export function renderFavorites() {
  const container = document.querySelector(".favorites-list");
  const favorites = getFavorites();

  container.innerHTML = "";
  if (favorites.length === 0) {
    container.innerHTML = "<p>Inga favoriter ännu</p>";
    return;
  }

  favorites.forEach(item => {
    const div = document.createElement("div");
    div.className = "favorite-item";
    div.textContent = item;
    div.onclick = () => toggleFavorite(item);
    container.appendChild(div);
  });
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  renderFavorites();
});
