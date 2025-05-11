// ===== FLIKHANTERING =====
document.querySelectorAll('.nav-item').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// ===== GAS TRACKER (LIVE DATA) =====
async function fetchGas() {
  try {
    const res = await fetch("https://api.owlracle.info/v4/base/gas?apikey=demo");
    const data = await res.json();
    const gwei = data.speeds[1].estimatedFee.toFixed(1);
    
    document.getElementById("gas-status").textContent = `${gwei} Gwei ${getGasEmoji(gwei)}`;
    document.getElementById("gas-fill").style.width = `${Math.min(gwei, 100)}%`;
  } catch (error) {
    console.error("Failed to fetch gas:", error);
    document.getElementById("gas-status").textContent = "Error loading data";
  }
}

function getGasEmoji(gwei) {
  if (gwei < 30) return '😎';
  if (gwei < 70) return '🔥';
  return '💀';
}

// ===== WALLET CONNECT (MOCK) =====
document.getElementById("connect-wallet").addEventListener("click", () => {
  document.getElementById("wallet-status").textContent = "Connected 🟢";
  alert("WalletConnect integration kommer här!");
});

// ===== CLAIM FUNCTION (MOCK) =====
document.getElementById("claim-rewards").addEventListener("click", () => {
  alert("Claim-funktion kopplad till WarpPoints.sol kommer här!");
});

// ===== INIT =====
fetchGas();
setInterval(fetchGas, 30000);
document.getElementById("refresh-gas").addEventListener("click", fetchGas);
