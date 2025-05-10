const translations = {
  sv: {
    overviewTitle: "Översikt",
    walletTitle: "Plånbok",
    leaderboardTitle: "Topplista",
    settingsTitle: "Inställningar",
    connectWallet: "Anslut Plånbok",
    darkMode: "Mörkt läge"
  },
  en: {
    overviewTitle: "Overview",
    walletTitle: "Wallet",
    leaderboardTitle: "Leaderboard",
    settingsTitle: "Settings",
    connectWallet: "Connect Wallet",
    darkMode: "Dark Mode"
  }
};

function applyLanguage(lang) {
  document.querySelectorAll("[data-key]").forEach(el => {
    const key = el.getAttribute("data-key");
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("languageSelect");
  applyLanguage(langSelect.value);
  langSelect.addEventListener("change", e => applyLanguage(e.target.value));
});