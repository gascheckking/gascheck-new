const activities = [
  { type: 'mint', user: 'vitalik.eth', details: 'Mintade NFT #123' },
  { type: 'transfer', user: 'satoshi.eth', details: 'Överförde 1.5 ETH' }
];

export function renderFeed() {
  const container = document.getElementById('feed-container');
  container.innerHTML = activities.map(activity => `
    <div class="feed-item ${activity.type}">
      <div class="feed-icon">${activity.type === 'mint' ? '🖼️' : '💸'}</div>
      <div class="feed-content">
        <strong>${activity.user}</strong> ${activity.details}
      </div>
    </div>
  `).join('');
}
