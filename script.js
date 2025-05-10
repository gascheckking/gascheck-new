// === GASPRIS MED NYCKEL DIREKT ===
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

// === WALLET-ACTIVITY (BASE) ===
async function loadWalletActivity() {
  const address = '0x541F9BE2e71DA6349dfA665Bb022C5DBA77A58d0';
  const apiKey = 'CXTB4IUT31N836G93ZI3YQBEWBQEGGH5QS'; // gratis offentligt key
  const url = `https://api.basescan.org/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=5&sort=desc&apikey=${apiKey}`;

  const activityDiv = document.getElementById('wallet-activity');

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.status === "1") {
      const txs = data.result.map(tx => {
        const valueEth = (Number(tx.value) / 1e18).toFixed(4);
        const shortTo = tx.to.slice(0, 6) + '...' + tx.to.slice(-4);
        const time = new Date(tx.timeStamp * 1000).toLocaleString();
        return `<li>↳ ${valueEth} ETH → ${shortTo} (${time})</li>`;
      }).join("");

      activityDiv.innerHTML = `
        <p>Senaste Base-transaktioner:</p>
        <ul>${txs}</ul>
      `;
    } else {
      activityDiv.innerHTML = `<p>Inga transaktioner hittades.</p>`;
    }
  } catch (e) {
    activityDiv.innerHTML = `<p>Kunde inte ladda wallet-data.</p>`;
  }
}

updateGas();
setInterval(updateGas, 30000);
loadWalletActivity();
