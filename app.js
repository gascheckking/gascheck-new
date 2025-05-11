// ===== FARCASTER FRAME-HANTERING =====
async function handleFrameAction() {
  const res = await fetch('/api/frame-action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(window.frameData)
  });
  return await res.json();
}

// ===== WALLET CONNECT (ENKEL IMPLEMENTATION) =====
document.getElementById('connect-wallet').addEventListener('click', async () => {
  if (window.ethereum) {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    alert(`Ansluten: ${accounts[0]}`);
  } else {
    alert("Installera MetaMask/Rabby först!");
  }
});

// ===== GAS TRACKER (SOM TIDIGARE) =====
async function fetchGas() {
  const res = await fetch('https://api.owlracle.info/v4/base/gas?apikey=demo');
  const data = await res.json();
  document.getElementById('gas-status').textContent = `${data.speeds[1].estimatedFee.toFixed(1)} Gwei`;
  document.getElementById('gas-fill').style.width = `${Math.min(data.speeds[1].estimatedFee, 100)}%`;
}
fetchGas();
setInterval(fetchGas, 30000);
