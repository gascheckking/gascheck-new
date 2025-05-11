// app.js
import { ethers } from "ethers";
import { renderFeed } from "./feed.js";

// === FLIKHANTERING ===
document.querySelectorAll(".nav-item").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.add("hidden"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.remove("hidden");
  });
});

// === GASPRIS ===
async function fetchGas() {
  try {
    const res = await fetch("https://api.owlracle.info/v4/base/gas?apikey=demo");
    const json = await res.json();
    const gwei = json.speeds[1].estimatedFee.toFixed(1);
    document.getElementById("gas-status").textContent = `${gwei} Gwei`;
    document.getElementById("gasFill").style.width = `${Math.min(gwei, 100)}%`;
  } catch (e) {
    document.getElementById("gas-status").textContent = "Failed to load";
  }
}

// === WALLET ===
async function connectWallet() {
  if (!window.ethereum) return alert("Installera MetaMask eller Rabby");
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  document.getElementById("wallet-info").textContent = `🔗 ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`;
}

// === INIT ===
fetchGas();
setInterval(fetchGas, 30000);
document.getElementById("connect-wallet").addEventListener("click", connectWallet);
renderFeed();
