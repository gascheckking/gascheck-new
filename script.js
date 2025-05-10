const tabs = document.querySelectorAll('.nav-item');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.add('hidden'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.remove('hidden');
  });
});

document.getElementById('connectBtn').addEventListener('click', () => {
  document.getElementById('walletStatus').textContent = 'Connected';
  document.getElementById('walletAddress').textContent = '0xSpawniz...';
});

document.getElementById('checkBtn').addEventListener('click', () => {
  alert('Checking address…');
});

function mockGasUpdate() {
  const gwei = Math.floor(Math.random() * 100);
  document.getElementById('gasValue').textContent = `${gwei} Gwei`;
  document.getElementById('gasFill').style.width = `${gwei}%`;
}
setInterval(mockGasUpdate, 2000);