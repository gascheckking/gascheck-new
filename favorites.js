const FAVORITES_KEY = "warp_favorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function toggleFavorite(contractAddress) {
  const favorites = getFavorites();
  const index = favorites.indexOf(contractAddress);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(contractAddress);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  renderFavorites();
}

export function renderFavorites() {
  const container = document.querySelector('.favorites-list');
  container.innerHTML = getFavorites().map(address => `
    <div class="favorite-item">
      <span>${address}</span>
      <button onclick="toggleFavorite('${address}')">🗑️</button>
    </div>
  `).join('');
}
