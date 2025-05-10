document.querySelectorAll('.nav-item').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

document.getElementById('connectWallet').addEventListener('click', () => {
  const address = "0x1234...abcd";
  document.getElementById('walletAddress').textContent = address;
  document.getElementById('walletStatus').textContent = "✅ Connected";
});

setInterval(() => {
  const gas = Math.floor(Math.random() * 100) + 1;
  document.getElementById('currentGas').textContent = gas + " Gwei";
  document.getElementById('gasIndicator').style.left = gas + "%";
}, 2000);