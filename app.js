// FLIKHANTERING
document.querySelectorAll(".nav-item").forEach(tab => {
  tab.addEventListener("click", () => {
    // Ta bort aktiv klass från alla flikar
    document.querySelectorAll(".nav-item").forEach(t => t.classList.remove("active"));
    
    // Dölj alla innehållssektioner
    document.querySelectorAll(".tab-content").forEach(c => c.classList.add("hidden"));
    
    // Markera vald flik
    tab.classList.add("active");
    
    // Visa valt innehåll
    document.getElementById(tab.dataset.tab).classList.remove("hidden");
  });
});

// GASPRISHÄMTNING
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

// WALLET-ANSLUTNING
function connectWallet() {
  document.getElementById("wallet-info").textContent = "🔗 Connected";
}

// INITIERING
fetchGas();
setInterval(fetchGas, 30000);
document.getElementById("connect-wallet").addEventListener("click", connectWallet);
