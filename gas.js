// gas.js – Live Gas Tracker för Base
const API_URL = "https://api.owlracle.info/v4/base/gas?apikey=demo";

async function updateGas() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    const gwei = data.speeds[1].estimatedFee.toFixed(1);
    
    // Uppdatera UI
    document.getElementById("gas-price").textContent = `${gwei} Gwei`;
    document.getElementById("gas-fill").style.width = `${Math.min(gwei, 100)}%`;
    
    // Emoji-baserat på pris
    const emoji = gwei < 30 ? "😎" : gwei < 70 ? "🔥" : "💀";
    document.getElementById("gas-mood").textContent = emoji;
  } catch (error) {
    console.error("Kunde inte hämta gaspris:", error);
  }
}

// Uppdatera var 30:e sekund
updateGas();
setInterval(updateGas, 30000);
