// ===== TEMAHANTERING =====
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  
  // Spara valt tema i localStorage
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Ladda sparat tema vid start
if (localStorage.getItem("theme") === "light") {
  document.body.classList.replace("dark", "light");
}

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
document.getElementById("connect-wallet").addEventListener("click", async () => {
  try {
    // Simulera WalletConnect
    document.getElementById("wallet-status").textContent = "Connecting...";
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    document.getElementById("wallet-status").textContent = "Connected 🟢";
    document.getElementById("wallet-info").classList.remove("hidden");
    document.getElementById("wallet-info").innerHTML = `
      <p>Address: 0x123...4567</p>
      <p>Balance: 0.5 ETH</p>
    `;
  } catch (error) {
    document.getElementById("wallet-status").textContent = "Failed to connect";
  }
});

// ===== CLAIM FUNCTION (MOCK) =====
document.getElementById("claim-rewards").addEventListener("click", async () => {
  const button = document.getElementById("claim-rewards");
  button.disabled = true;
