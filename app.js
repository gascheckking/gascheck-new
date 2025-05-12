import Web3 from 'web3';
import { getGas } from './gas.js';
import { renderFavorites } from './favorites.js';
import { renderFeed } from './feed.js';

const web3 = new Web3(window.ethereum);
document.getElementById('connect-wallet').addEventListener('click', async () => {
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const address = accounts[0];
    document.getElementById('wallet-address').textContent = `${address.slice(0,6)}...${address.slice(-4)}`;
    document.getElementById('wallet-section').classList.remove('hidden');
  } catch (error) {
    alert("Plånboksfel: " + error.message);
  }
});

// Flikhantering
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item, .tab-content').forEach(el => el.classList.remove('active'));
    item.classList.add('active');
    document.getElementById(item.dataset.tab).classList.add('active');
  });
});

// Initiera
getGas();
setInterval(getGas, 30000);
renderFavorites();
renderFeed();
