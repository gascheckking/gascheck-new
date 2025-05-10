const translations = {
  sv: {
    overviewTitle: "Översikt",
    recentActivity: "Senaste transaktioner:",
    noActivity: "Ingen aktivitet ännu",
    walletTitle: "Plånbok",
    connectWallet: "Anslut Plånbok",
    connected: "Ansluten:",
    leaderboardTitle: "Top 10 Användare",
    gasTitle: "Gas Effektivitet",
    loadingGas: "Laddar gaspris...",
    settingsTitle: "Inställningar",
    darkMode: "Mörkt läge"
  },
  en: {
    overviewTitle: "Overview",
    recentActivity: "Recent transactions:",
    noActivity: "No activity yet",
    walletTitle: "Wallet",
    connectWallet: "Connect Wallet",
    connected: "Connected:",
    leaderboardTitle: "Top 10 Users",
    gasTitle: "Gas Efficiency",
    loadingGas: "Loading gas price...",
    settingsTitle: "Settings",
    darkMode: "Dark Mode"
  }
};

function applyLanguage(lang) {
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("languageSelect");
  applyLanguage(langSelect.value);
  langSelect.addEventListener("change", (e) => {
    applyLanguage(e.target.value);
  });
});