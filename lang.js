const languages = {
  en: {
    overview: "Overview",
    leaderboard: "Leaderboard",
    favorites: "Favorites",
    rewards: "Rewards",
    history: "History",
    premium: "Premium",
    feed: "Feed"
  },
  sv: {
    overview: "Översikt",
    leaderboard: "Topplista",
    favorites: "Favoriter",
    rewards: "Belöningar",
    history: "Historik",
    premium: "Premium",
    feed: "Flöde"
  }
};

document.querySelectorAll(".lang-switch").forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    const labels = languages[lang];
    for (const key in labels) {
      document.querySelector(`[data-tab="${key}"]`).textContent = labels[key];
    }
  });
});