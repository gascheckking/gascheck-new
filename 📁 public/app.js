import Web3 from "web3";
import WarpXP from "./contracts/WarpXP.json" assert { type: "json" };
import { CONTRACT_ADDRESS } from "./contracts/constants.js";

let web3;
let contract;
let userAddress = null;

const connectBtn = document.getElementById("connect-wallet");
const walletSection = document.getElementById("wallet-section");
const addressDisplay = document.getElementById("wallet-address");

connectBtn.addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      userAddress = accounts[0];

      const chainId = await web3.eth.getChainId();
      if (chainId !== 8453) {
        alert("Please switch to Base network");
        return;
      }

      contract = new web3.eth.Contract(WarpXP.abi, CONTRACT_ADDRESS);
      walletSection.classList.remove("hidden");
      addressDisplay.textContent = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;

      fetchXP();
    } catch (err) {
      console.error("Wallet connection error", err);
    }
  } else {
    alert("Install MetaMask to use this app");
  }
});

async function fetchXP() {
  try {
    const xp = await contract.methods.getXP(userAddress).call();
    document.getElementById("xp-counter").textContent = xp;
  } catch (err) {
    console.error("Error fetching XP", err);
  }
}

document.querySelectorAll(".nav-item").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".nav-item, .tab-content").forEach((el) =>
      el.classList.remove("active")
    );
    tab.classList.add("active");
    const target = document.getElementById(tab.dataset.tab);
    if (target) target.classList.add("active");
  });
});