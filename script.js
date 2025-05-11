// 🔄 Ny version: script.js – Gas Tracker + Wallet connect

const GAS_API_URL = "https://api.blocknative.com/gasprices/blockprices";
const API_KEY = "YOUR_BLOCKNATIVE_KEY_HERE"; // 🔑 Lägg in din riktiga nyckel

// ===================== GAS ===================== //
async function fetchGasPrice() {
  try {
    const res = await fetch(GAS_API_URL, {
      headers: { Authorization: API_KEY }
    });
    const data = await res.json();
    const price = Math.floor(data.blockPrices[0].estimatedPrices[0].price);
    document.getElementById("gas-status").innerText = `${price} Gwei`;
    document.getElementById("fast-trade").disabled = false;
  } catch (e) {
    document.getElementById("gas-status").innerText = "Failed to load";
    document.getElementById("fast-trade").disabled = true;
    console.error("Gas API error:", e);
  }
}

// ===================== WALLET ===================== //
async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await ethereum.request({ method: "eth_accounts" });
      document.getElementById("wallet-status").innerText = `Connected: ${accounts[0]}`;
    } catch (e) {
      console.error("Wallet connection failed", e);
    }
  } else {
    alert("MetaMask or compatible wallet not found.");
  }
}

// ===================== INIT ===================== //
window.onload = () => {
  fetchGasPrice();
  setInterval(fetchGasPrice, 15000); // 🔄 auto-refresh
};
