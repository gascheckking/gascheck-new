// app.js
import { ethers } from "ethers";
import { getGasDetails } from "./gas.js";

// FLIKHANTERING
document.querySelectorAll(".nav-item").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.add("hidden"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.remove("hidden");
  });
});

// KONTRAKTINSTÄLLNINGAR
const contractAddress = "0xDIN_ADRESS_HÄR"; // Ersätt
const contractABI = [ /* DIN ABI HÄR */ ];  // Ersätt

async function loadContract() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
}

// WALLET-ANSLUTNING
async function connectWallet() {
  if (!window.ethereum) return alert("Installera MetaMask!");
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  document.getElementById("wallet-info").textContent = accounts[0];
}

// HÄMTA BALANS
async function getBalance() {
  const contract = await loadContract();
  const balance = await contract.getBalance(); // om getBalance finns
  console.log("Balance:", balance.toString());
}

// GASPRIS + EMOJI
async function fetchGas() {
  try {
    const res = await fetch("https://api.owlracle.info/v4/base/gas?apikey=demo");
    const json = await res.json();
    const gwei = json.speeds[1].estimatedFee.toFixed(1);
    const meter = document.getElementById("gasValue");
    const emoji = document.getElementById("gasEmoji");

    meter.textContent = `${gwei} Gwei`;
    if (gwei < 30) emoji.textContent = "😎";
    else if (gwei < 100) emoji.textContent = "🔥";
    else emoji.textContent = "💀";
  } catch {
    document.getElementById("gasValue").textContent = "Failed";
  }
}

// INIT
fetchGas();
setInterval(fetchGas, 30000);
document.getElementById("connectBtn").addEventListener("click", connectWallet);
document.getElementById("balanceBtn").addEventListener("click", getBalance);
