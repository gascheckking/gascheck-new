// app.js
import { ethers } from "ethers";

// Flikhantering
document.querySelectorAll(".nav-item").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.add("hidden"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.remove("hidden");
  });
});

// Wallet
document.getElementById("connect-wallet").addEventListener("click", async () => {
  if (!window.ethereum) return alert("Installera MetaMask!");
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  document.getElementById("wallet-info").textContent = accounts[0];
});

// Gas
async function fetchGas() {
  try {
    const res = await fetch("https://api.owlracle.info/v4/base/gas?apikey=demo");
    const json = await res.json();
    const gwei = json.speeds[1].estimatedFee.toFixed(1);
    document.getElementById("gas-status").textContent = `${gwei} Gwei`;
    document.getElementById("gasFill").style.width = `${Math.min(gwei, 100)}%`;
  } catch (e) {
    document.getElementById("gas-status").textContent = "N/A";
  }
}
fetchGas();
setInterval(fetchGas, 30000);
