document.addEventListener("DOMContentLoaded", () => {
  const feed = document.getElementById("feed-container");
  feed.innerHTML = `
    <div class="feed-card">
      <img src="https://source.unsplash.com/400x200/?crypto" alt="Zora" />
      <div class="feed-meta">
        <strong>@spawniz</strong>
        <p>Just minted a new drop on Zora</p>
      </div>
    </div>
    <div class="feed-card">
      <img src="https://source.unsplash.com/400x200/?nft" alt="NFT" />
      <div class="feed-meta">
        <strong>@0xabc123</strong>
        <p>Claimed 250 WP from activity</p>
      </div>
    </div>
  `;
});