// feed.js

const mockFeed = [
  {
    id: 1,
    creator: "spawniz.eth",
    img: "https://zora.co/content/media/preview/bafkreia4kz6zdm42yyzpkl36chj7ab6cpxx4z23d6fgjwfap6fg6t3hvse",
    title: "WarpBase Drop 01",
    gas: "0.004",
    favorited: false,
  },
  {
    id: 2,
    creator: "anon.lens",
    img: "https://zora.co/content/media/preview/bafkreidov22u4kfqobnzd3f3qbvevbp3mnnqffasdwvydpahkyicv4jrcq",
    title: "Zora Moments",
    gas: "0.006",
    favorited: false,
  }
];

// Ritar ut kort
export function renderFeed(containerId = "feed") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = ""; // rensa

  mockFeed.forEach(item => {
    const card = document.createElement("div");
    card.className = "feed-card";

    card.innerHTML = `
      <img src="${item.img}" class="feed-img" />
      <div class="feed-info">
        <h3>${item.title}</h3>
        <p>👤 ${item.creator}</p>
        <p>⛽ ${item.gas} ETH</p>
        <button class="fav-btn" data-id="${item.id}">
          ${item.favorited ? "💖 Favorited" : "🤍 Favorite"}
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll(".fav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.textContent = btn.textContent.includes("💖") ? "🤍 Favorite" : "💖 Favorited";
    });
  });
}
