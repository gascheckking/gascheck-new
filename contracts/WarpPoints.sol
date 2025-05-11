// app.js
import { ethers } from "ethers";

// 1. Anslut till MetaMask
async function connectWallet() {
    if (!window.ethereum) {
        alert("Installera MetaMask först!");
        return;
    }
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("Ansluten:", accounts[0]);
}

// 2. Ladda WarpPoints-kontraktet
const contractAddress = "0x_DITT_KONTRAKTSADRESS_HÄR"; // Ersätt detta
const contractABI = [ /* Klistra in ABI från WarpPoints.sol här */ ];

async function loadContract() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const warpPoints = new ethers.Contract(contractAddress, contractABI, signer);
    return warpPoints;
}

// 3. Exempel: Anropa en funktion i kontraktet
async function getBalance() {
    const contract = await loadContract();
    const balance = await contract.getBalance(); // Anta att getBalance finns i WarpPoints
    console.log("Balance:", balance.toString());
}

// Kör funktioner när knappar klickas
document.getElementById("connectBtn").addEventListener("click", connectWallet);
document.getElementById("balanceBtn").addEventListener("click", getBalance);
