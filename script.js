// === GASPRIS MED NYCKEL DIREKT (FIXAD) ===
async function updateGas() {
  try {
    const res = await fetch('https://api.owlracle.info/v3/eth/gas?apikey=b9bee1f4421d4eebb170067dc3e2e579');
    const data = await res.json();
    const gas = data.blocks?.[0]?.gasPrices?.standard;
    document.getElementById('gas').textContent =
      gas ? `Ethereum gas: ${gas} Gwei` : 'Kunde inte läsa gaspris';
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
