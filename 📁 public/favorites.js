const FAVORITE_KEY = "warpai_favorites";

export function getFavorites() {
  const stored = localStorage.getItem(FAVORITE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function toggleFavorite(name) {
  const current = getFavorites();
  const updated = current.includes(name)
    ? current.filter(fav => fav !== name)
    : [...current, name];

  localStorage.setItem(FAVORITE_KEY, JSON.stringify(updated));
  renderFavorites();
}

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

document.addEventListener("DOMContentLoaded", renderFavorites);