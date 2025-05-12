// feed.js

const feed = [
  { type: "Mint", source: "Zora", user: "0xAb...1234", token: "#213", time: "2m ago" },
  { type: "Bridge", source: "Base", user: "0xCd...5678", amount: "0.5 ETH", time: "5m ago" },
  { type: "Buy", source: "WarpPoints", user: "you", amount: "200 WP", time: "10m ago" }
];

function renderFeed() {
  const container = document.getElementById("feed-container");
  if (!container) return;

  container.innerHTML = feed.map(item => `
    <div class="feed-item">
      <strong>${item.user}</strong> ${item.type.toLowerCase()}ed on <em>${item.source}</em> ${item.token || item.amount || ""} — ${item.time}
    </div>
  `).join('');
}

document.addEventListener("DOMContentLoaded", renderFeed);