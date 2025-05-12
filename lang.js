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

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-switch").forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      const labels = languages[lang];
      for (const key in labels) {
        const el = document.querySelector(`[data-tab="${key}"]`);
        if (el) el.textContent = labels[key];
      }
    });
  });
});