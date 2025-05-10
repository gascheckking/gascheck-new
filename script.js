// === GASPRIS VIA PROXY ===
async function updateGas() {
  try {
    const res = await fetch('/api/gas');
    const data = await res.json();
    document.getElementById('gas').textContent =
      `Ethereum gas: ${data.speeds[0].gasPrice} Gwei`;
  } catch (e) {
    document.getElementById('gas').textContent = 'Fel vid hämtning av gaspris';
  }
}

updateGas();
setInterval(updateGas, 30000);

// === WALLET-ACTIVITY (placeholder) ===
function loadWalletActivity() {
  const activityDiv = document.getElementById('wallet-activity');
  activityDiv.innerHTML = `
    <p>Senaste transaktioner kommer visas här.</p>
    <ul>
      <li>✔️ Exempel: Du mintade 1 token på Zora</li>
      <li>✔️ Exempel: Du sålde 1 coin på Base</li>
    </ul>
  `;
}

loadWalletActivity();
