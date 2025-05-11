// Temaväxlare
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
});

// Flikhantering
document.querySelectorAll('.nav-item').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Wallet-anslutning
document.getElementById("connect-wallet").addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      document.getElementById("wallet-info").innerHTML = `
        <p>Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}</p>
      `;
      document.getElementById("wallet-info").classList.remove("hidden");
    } catch (error) {
      alert("Anslutning avbröts: " + error.message);
    }
  } else {
    alert("Installera MetaMask eller Rabby!");
  }
});

// Gasprishämtare
async function fetchGas() {
  try {
    const res = await fetch("https://api.owlracle.info/v4/base/gas?apikey=demo");
    const data = await res.json();
    const gwei = data.speeds[1].estimatedFee.toFixed(1);
    document.getElementById("gas-status").textContent = `${gwei} Gwei ${gwei < 30 ? '😎' : gwei < 70 ? '🔥' : '💀'}`;
    document.getElementById("gas-fill").style.width = `${Math.min(gwei, 100)}%`;
  } catch
