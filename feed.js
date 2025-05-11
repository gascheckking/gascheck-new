// feed.js
export function loadZoraFeed() {
  const feedContainer = document.getElementById("feed-container");
  const mockFeed = [
    {
      user: "spawniz",
      image: "https://source.unsplash.com/400x200/?crypto",
      caption: "Just minted new zora 🌐"
    },
    {
      user: "0xabc123",
      image: "https://source.unsplash.com/400x200/?nft",
      caption: "Claimed gas +250WP 🔥"
    }
  ];

  feedContainer.innerHTML = mockFeed.map(post => `
    <div class="feed-card">
      <img src="${post.image}" alt="${post.caption}" />
      <div class="feed-meta">
        <strong>@${post.user}</strong>
        <p>${post.caption}</p>
      </div>
    </div>
  `).join('');
}

document.addEventListener("DOMContentLoaded", loadZoraFeed);
