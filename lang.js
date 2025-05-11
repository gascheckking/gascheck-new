// lang.js

const translations = {
  en: {
    title: "WarpAI App",
    connect: "Connect Wallet",
    balance: "Get Balance",
    gas: "Check Gas",
    welcome: "Welcome to WarpAI",
  },
  sv: {
    title: "WarpAI App",
    connect: "Anslut Plånbok",
    balance: "Hämta Saldo",
    gas: "Kolla Gas",
    welcome: "Välkommen till WarpAI",
  }
};

let currentLang = "en";

export function setLanguage(lang) {
  currentLang = lang;
  updateTexts();
}

function updateTexts() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.innerText = translations[currentLang][key] || key;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("lang-en").addEventListener("click", () => setLanguage("en"));
  document.getElementById("lang-sv").addEventListener("click", () => setLanguage("sv"));
  updateTexts();
});
