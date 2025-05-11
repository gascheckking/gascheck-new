// Anslut plånbok
document.getElementById('connect-wallet').addEventListener('click', async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    alert(`Ansluten: ${accounts[0].slice(0, 6)}...`);
  } else {
    alert("Installera MetaMask/Rabby först!");
  }
});

// Hämta gaspriser
async function fetchGas() {
  try {
    const res = await fetch('https://api.owlracle.info/v4/base/gas?apikey=demo');
    const data = await res.json();
    const gwei = data.speeds[1].estimatedFee.toFixed(1);
    document.getElementById('gas-status').textContent = `${gwei} Gwei ${gwei < 30 ? '😎' : '🔥'}`;
    document.getElementById('gas-fill').style.width = `${Math.min(gwei, 100)}%`;
  } catch (error) {
    console.error("Kunde inte hämta gaspris:", error);
  }
}
fetchGas();
setInterval(fetchGas, 30000);
