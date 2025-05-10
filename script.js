async function updateGasMeter() {
  try {
    const res = await fetch('https://api.owlracle.info/v3/eth/gas?apikey=b9bee1f4421d4eebb170067dc3e2e579');
    const data = await res.json();
    const gwei = data.blocks?.[0]?.gasPrices?.standard;
    const meter = document.getElementById('gas-bar');
    const label = document.getElementById('gas-value');
    const pct = Math.min(Math.max((gwei / 100) * 100, 0), 100);

    meter.style.width = pct + "%";
    meter.style.background = gwei < 15 ? "green" : gwei < 30 ? "yellow" : "red";
    label.textContent = `${gwei} Gwei`;
  } catch (e) {
    document.getElementById('gas-value').textContent = "Error";
  }
}

setInterval(updateGasMeter, 30000);
updateGasMeter();
