import { ethers } from "ethers";

const tabs = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    sections.forEach(s => s.classList.add("hidden"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.remove("hidden");
  });
});

async function connectWallet() {
  if (!window.ethereum) {
    alert("Installera MetaMask eller Rabby!");
    return;
  }
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  document.getElementById("wallet-info").textContent = `🔗 ${accounts[0]}`;
}

document.getElementById("connect-wallet").addEventListener("click", connectWallet);