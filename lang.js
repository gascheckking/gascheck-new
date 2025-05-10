const translations = {
  en: {
    title: "WarpSocial",
    liveGas: "Live Gas",
    currentGas: "Loading...",
    topUsers: "Top Users",
    walletHeader: "Your Wallet",
    connectWallet: "Connect Wallet",
    settingsTitle: "Settings",
    darkLabel: "Dark Mode",
    languageLabel: "Language"
  },
  sv: {
    title: "WarpSocial",
    liveGas: "Live Gaspris",
    currentGas: "Laddar...",
    topUsers: "Toppanvändare",
    walletHeader: "Din Plånbok",
    connectWallet: "Anslut Plånbok",
    settingsTitle: "Inställningar",
    darkLabel: "Mörkt Läge",
    languageLabel: "Språk"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("languageSelect");
  const applyLang = lang => {
    const t = translations[lang];
    for (const key in t) {
      const el = document.getElementById(key);
      if (el) el.textContent = t[key];
    }
  };
  select.addEventListener("change", () => applyLang(select.value));
  applyLang(select.value);
});