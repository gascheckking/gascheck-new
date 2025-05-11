// feed.js

export function renderFeed() {
  const container = document.getElementById("feed-container");
  container.innerHTML = ""; // Rensa gammalt

  const dummyFeed = [
    {
      username: "spawniz",
      action: "minted",
      platform: "Zora",
      token: "GASCHECK",
      image: "https://source.unsplash.com/random/400x300?blockchain",
      timestamp: "2 min ago"
    },
    {
      username: "elyxr",
      action: "followed",
      platform: "Warpcast",
      token: "base.gas",
      image: "https://source.unsplash.com/random/400x300?network",
      timestamp: "7 min ago"
    },
    {
      username: "warpaiapp",
      action: "airdropped",
      platform: "WarpPoints",
      token: "250 POINTS",
      image: "https://source.unsplash.com/random/400x300?web3",
      timestamp: "15 min ago"
    }
  ];

  for (const post of dummyFeed) {
    const card = document.createElement("div");
    card.className = "feed-card";
    card.innerHTML = `
      <img src="${post.image}" alt="Post image" class="feed-img">
      <div class="feed-info">
        <div><b>${post.username}</b> ${post.action} <span class="token">${post.token}</span></div>
        <div class="feed-meta">${post.platform} · ${post.timestamp}</div>
      </div>
    `;
    container.appendChild(card);
  }
}
