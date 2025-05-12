// app.js

import { getGas } from './gas.js';
import { renderFavorites } from './favorites.js';

// Wallet connect
const connectBtn = document.getElementById('connect-wallet');
connectBtn.addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      document.getElementById('wallet-address').textContent = `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
      document.getElementById('wallet-section').classList.remove('hidden');

      // Load localStorage XP
      let xp = localStorage.getItem('xp') || 0;
      let streak = localStorage.getItem('streak') || 0;
      document.getElementById('xp-counter').textContent = xp;
      document.getElementById('streak-counter').textContent = `${streak} 🔥`;

    } catch (err) {
      console.error('Wallet connection failed', err);
    }
  } else {
    alert('Please install Rabby or MetaMask.');
  }
});

// Tab switch
const tabs = document.querySelectorAll('.nav-item');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Claim XP logic
const claimBtn = document.getElementById('claim-xp');
if (claimBtn) {
  claimBtn.addEventListener('click', () => {
    const lastClaim = localStorage.getItem('lastClaim');
    const today = new Date().toDateString();

    if (lastClaim !== today) {
      let xp = parseInt(localStorage.getItem('xp') || 0);
      let streak = parseInt(localStorage.getItem('streak') || 0);

      xp += 100;
      streak = lastClaim ? streak + 1 : 1;

      localStorage.setItem('xp', xp);
      localStorage.setItem('streak', streak);
      localStorage.setItem('lastClaim', today);

      document.getElementById('xp-counter').textContent = xp;
      document.getElementById('streak-counter').textContent = `${streak} 🔥`;

      alert(`+100 XP! 🔥 Streak: ${streak} days`);
    } else {
      alert('Already claimed today!');
    }
  });
}

// Leaderboard mock
const leaderboardData = [
  { name: 'vitalik.eth', xp: 5800, activity: '1000+ TX' },
  { name: 'spawniz.warp', xp: 4200, activity: '500+ Mints' },
  { name: 'you', xp: parseInt(localStorage.getItem('xp') || 0), activity: 'Getting started' }
];

function renderLeaderboard() {
  const leaderboardHTML = leaderboardData.map(user => `
    <div class="leaderboard-item">
      <span class="rank">${user.xp} XP</span>
      <span class="username">${user.name}</span>
      <span class="activity">${user.activity}</span>
    </div>
  `).join('');
  document.getElementById('leaderboard').innerHTML = leaderboardHTML;
}

// Gas fetch
async function fetchGas() {
  try {
    const res = await fetch("https://api.owlracle.info/v4/base/gas?apikey=demo");
    const json = await res.json();
    const gwei = json.speeds[1].estimatedFee.toFixed(1);
    document.getElementById("gas-status").textContent = `${gwei} Gwei`;
    document.getElementById("gasFill").style.width = `${Math.min(gwei, 100)}%`;
  } catch {
    document.getElementById("gas-status").textContent = "Failed to load";
  }
}

// INIT
renderLeaderboard();
renderFavorites();
fetchGas();
setInterval(fetchGas, 30000);