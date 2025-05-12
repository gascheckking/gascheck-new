// feed.js

const FEED_ITEMS = [
  { user: 'vitalik.eth', action: 'minted', token: '#420', platform: 'Zora' },
  { user: 'spawniz.warp', action: 'bridged', token: 'ETH', platform: 'Base' },
  { user: 'you', action: 'claimed', token: 'XP', platform: 'Warp.ai' }
];

function renderFeed() {
  const container = document.getElementById("feed-container");
  const html = FEED_ITEMS.map(item => `
    <div class="feed-item">
      <strong>${item.user}</strong> ${item.action} <span>${item.token}</span> on ${item.platform}
    </div>
  `).join('');
  container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", renderFeed);