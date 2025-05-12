const feed = [
  { type: "mint", user: "vitalik.eth", platform: "Zora", value: "0.1 ETH", timestamp: Date.now() - 3600000 },
  { type: "bridge", user: "spawniz.eth", platform: "Base", value: "0.25 ETH", timestamp: Date.now() - 7200000 },
  { type: "buy", user: "you", platform: "WarpPoints", value: "300 WP", timestamp: Date.now() - 1200000 }
];

function getIcon(type) {
  switch (type) {
    case "mint": return "🧪";
    case "bridge": return "🌉";
    case "buy": return "🪙";
    default: return "🔔";
  }
}

function timeAgo(timestamp) {
  const diff = Math.floor((Date.now() - timestamp) / 60000);
  return `${diff} min ago`;
}

function renderFeedItem(item) {
  return `
    <div class="feed-item ${item.type}">
      <span class="feed-icon">${getIcon(item.type)}</span>
      <div class="feed-content">
        <strong>${item.user}</strong> ${item.type}ed on <em>${item.platform}</em> — ${item.value}
        <small>${timeAgo(item.timestamp)}</small>
      </div>
    </div>
  `;
}

export function renderFeed() {
  const container = document.getElementById("feed-container");
  if (!container) return;
  container.innerHTML = feed.map(renderFeedItem).join("");
}

document.addEventListener("DOMContentLoaded", renderFeed);