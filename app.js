import Web3 from 'web3';
import WarpXPABI from './WarpXP.abi.json';
import { renderFavorites } from './favorites.js';
import { renderFeed } from './feed.js';
import { getGas } from './gas.js';

let web3;
let contract;
let userAddress;

const CONTRACT_ADDRESS = "0xYOUR_WARPXP_ADDRESS_HERE"; // byt till riktig address

// Wallet connect
const connectBtn = document.getElementById('connect-wallet');
connectBtn.addEventListener('click', async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      userAddress = accounts[0];

      const chainId = await web3.eth.getChainId();
      if (chainId !== 8453) {
        alert("Switch to Base Network (chainId: 8453)");
        return;
      }

      contract = new web3.eth.Contract(WarpXPABI, CONTRACT_ADDRESS);

      document.getElementById('wallet-address').textContent =
        `${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
      document.getElementById('wallet-section').classList.remove('hidden');

      fetchXP();
    } catch (err) {
      console.error('Wallet connection failed', err);
    }
  } else {
    alert('Install MetaMask or Rabby');
  }
});

async function fetchXP() {
  try {
    const xp = await contract.methods.xp(userAddress).call();
    document.getElementById('xp-counter').textContent = xp;
    document.getElementById('streak-counter').textContent = '? 🔥';
  } catch (error) {
    console.error("Failed to load XP", error);
  }
}

const claimBtn = document.getElementById('claim-xp');
if (claimBtn) {
  claimBtn.addEventListener('click', async () => {
    try {
      await contract.methods.claimDaily(userAddress).send({ from: userAddress });
      alert('XP claimed onchain!');
      fetchXP();
    } catch (error) {
      console.error("Claim failed", error);
      alert("Failed to claim XP – maybe too soon?");
    }
  });
}

// Tabs
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item, .tab-content').forEach(el => el.classList.remove('active'));
    item.classList.add('active');
    document.getElementById(item.dataset.tab).classList.add('active');
  });
});

// Leaderboard mock
const leaderboardData = [
  { name: 'vitalik.eth', xp: 5800, activity: '1000+ TX' },
  { name: 'spawniz.warp', xp: 4200, activity: '500+ Mints' },
  { name: 'you', xp: 0, activity: 'Getting started' }
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

// INIT
renderLeaderboard();
renderFavorites();
renderFeed();
getGas();
setInterval(getGas, 30000);