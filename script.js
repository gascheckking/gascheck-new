async function updateGas() {
  try {
    const res = await fetch('https://api.owlracle.info/v3/eth/gas');
    const data = await res.json();
    document.getElementById('gas').textContent = 
      `Eth gas: ${data.speeds[0].gasPrice} Gwei`;
  } catch (e) {
    document.getElementById('gas').textContent = 'Fel vid hämtning';
  }
}
updateGas();
setInterval(updateGas, 30000);
