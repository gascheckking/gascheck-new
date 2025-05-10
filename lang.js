const translations = {
  sv: {
    overviewTitle: "Översikt",
    recentActivity: "Senaste transaktioner:",
    noActivity: "Ingen aktivitet än",
    walletTitle: "Plånbok",
    leaderboardTitle: "Top 10 Användare",
    gasTitle: "Gas Effektivitet",
    settingsTitle: "Appinställningar"
  },
  en: {
    overviewTitle: "Overview",
    recentActivity: "Recent transactions:",
    noActivity: "No activity yet",
    walletTitle: "Wallet",
    leaderboardTitle: "Top 10 Users",
    gasTitle: "Gas Efficiency",
    settingsTitle: "App Settings"
  }
};

document.getElementById("languageSelect").addEventListener("change", (e) => {
  const lang = e.target.value;
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    el.textContent = translations[lang][key];
  });
});