// ========== KONFIGURATION ========== //
const CONFIG = {
  baseScanAPI: "https://api.basescan.org/api",
  apiKey: "YOUR_BASESCAN_API_KEY", // Ersätt med din riktiga API-nyckel
  warpAICoinContract: "0x8ab57bdfc4e900b62f309bfaa6e1802755330ca6"
};

// ========== APP STATE ========== //
let currentAddress = null;
let isConnected = false;
let userData = {
  coins: 0,
  transactions: [],
  gasEfficiency: 0
};

// ========== DOM ELEMENT ========== //
const elements = {
  // Header
  walletStatus: document.getElementById('wallet-status'),
  
  // Connect
  connectBtn: document.getElementById('connect-wallet'),
  
  // Input
  walletInput: document.getElementById('wallet-input'),
  checkBtn: document.getElementById('check-btn'),
  
  // Overview
  gasMeter: document.getElementById('gas-meter'),
  gasLabel: document.getElementById('gas-label'),
  coinDisplay: document.getElementById('coin-display'),
  claimCoinsBtn: document.getElementById('claim-coins-btn'),
  activityList: document.getElementById('activity-list'),
  
  // Navigation
  navBtns: document.querySelectorAll('.nav-btn'),
  tabContents: document.querySelectorAll('.tab-content'),
  
  // Settings
  settingsBtn: document.getElementById('settings-btn'),
  settingsModal: document.getElementById('settings-modal'),
  closeSettings: document.getElementById('close-settings'),
  themeSelect: document.getElementById('theme-select')
};

// ========== WALLET CONNECTION ========== //

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      currentAddress = accounts[0];
      isConnected = true;
      updateWalletStatus();
      fetchWalletData(currentAddress);
    } catch (error) {
      console.error("Wallet connection error:", error);
      alert("Wallet connection failed");
    }
  } else {
    alert("Please install MetaMask or another Web3 wallet!");
  }
}

function updateWalletStatus() {
  if (isConnected && currentAddress) {
    const shortAddress = `${currentAddress.substring(0, 6)}...${currentAddress.substring(38)}`;
    elements.walletStatus.innerHTML = `
      <i class="fas fa-wallet"></i>
      <span>${shortAddress}</span>
    `;
    elements.walletStatus.classList.add('wallet-connected');
    elements.walletStatus.classList.remove('wallet-disconnected');
  } else {
    elements.walletStatus.innerHTML = `
      <i class="fas fa-wallet"></i>
      <span>Not connected</span>
    `;
    elements.walletStatus.classList.remove('wallet-connected');
    elements.walletStatus.classList.add('wallet-disconnected');
  }
}

// ========== DATA FETCHING ========== //

async function fetchWalletData(address) {
  try {
    // Simulera laddning
    elements.activityList.innerHTML = '<div class="loading">Loading data...</div>';
    
    // Hämta transaktioner från BaseScan
    const txResponse = await fetch(
      `${CONFIG.baseScanAPI}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${CONFIG.apiKey}`
    );
    
    const txData = await txResponse.json();
    
    if (txData.status === "1") {
      userData.transactions = txData.result.slice(0, 5).map(tx => ({
        hash: tx.hash,
        type: getTxType(tx),
        amount: tx.value / 1e18,
        timestamp: new Date(tx.timeStamp * 1000).toLocaleDateString(),
        gasUsed: tx.gasUsed
      }));
      
      // Beräkna gas efficiency
      const totalGas = userData.transactions.reduce((sum, tx) => sum + parseInt(tx.gasUsed), 0);
      userData.gasEfficiency = Math.max(0, 100 - Math.min(100, totalGas / 100000));
      
      // Uppdatera UI
      updateUI();
    } else {
      throw new Error("No transactions found");
    }
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    elements.activityList.innerHTML = '<div class="error">Could not load transactions</div>';
  }
}

function getTxType(tx) {
  if (tx.input.startsWith("0x")) {
    return "Contract Call";
  } else if (tx.value > 0) {
    return "Transfer";
  } else {
    return "Other";
  }
}

// ========== UI UPDATES ========== //

function updateUI() {
  // Uppdatera gas meter
  elements.gasMeter.style.height = `${userData.gasEfficiency}%`;
  elements.gasLabel.textContent = `Efficiency: ${userData.gasEfficiency.toFixed(0)}%`;
  
  // Uppdatera coins
  elements.coinDisplay.textContent = userData.coins;
  
  // Uppdatera transaktioner
  renderTransactions();
}

function renderTransactions() {
  elements.activityList.innerHTML = userData.transactions.map(tx => `
    <div class="activity-item">
      <div class="activity-type">${tx.type}</div>
      <div class="activity-amount ${tx.amount > 0 ? 'positive' : 'negative'}">
        ${tx.amount > 0 ? '+' : ''}${tx.amount.toFixed(4)} ETH
      </div>
    </div>
  `).join('');
}

// ========== EVENT LISTENERS ========== //

// Wallet Connection
elements.connectBtn.addEventListener('click', connectWallet);

// Check Address
elements.checkBtn.addEventListener('click', () => {
  const address = elements.walletInput.value.trim();
  if (!isValidAddress(address)) {
    alert("Please enter a valid 0x wallet address");
    return;
  }
  
  currentAddress = address;
  isConnected = false;
  updateWalletStatus();
  fetchWalletData(address);
});

// Claim Coins
elements.claimCoinsBtn.addEventListener('click', () => {
  if (!currentAddress) {
    alert("Please connect or enter a wallet first");
    return;
  }
  
  userData.coins += 10;
  updateUI();
  alert(`🎉 10 WarpAI Coins claimed! Total: ${userData.coins}`);
});

// Settings
elements.settingsBtn.addEventListener('click', () => {
  elements.settingsModal.classList.remove('hidden');
});

elements.closeSettings.addEventListener('click', () => {
  elements.settingsModal.classList.add('hidden');
});

elements.themeSelect.addEventListener('change', (e) => {
  document.body.classList.toggle('light-theme', e.target.value === 'light');
  localStorage.setItem('theme', e.target.value);
});

// Tab Navigation
elements.navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    
    // Uppdatera aktiva flikar
    elements.tabContents.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    
    // Uppdatera navigationsknappar
    elements.navBtns.forEach(navBtn => navBtn.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ========== HJÄLPFUNKTIONER ========== //

function isValidAddress(address) {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// ========== INIT ========== //

function init() {
  // Ladda tema från localStorage
  const savedTheme = localStorage.getItem('theme') || 'dark';
  elements.themeSelect.value = savedTheme;
  document.body.classList.toggle('light-theme', savedTheme === 'light');
  
  // Uppdatera wallet status
  updateWalletStatus();
  
  // Kolla om det finns en sparad adress
  const savedAddress = localStorage.getItem('lastAddress');
  if (savedAddress && isValidAddress(savedAddress)) {
    currentAddress = savedAddress;
    elements.walletInput.value = savedAddress;
    fetchWalletData(savedAddress);
  }
}

// Kör när sidan laddas
document.addEventListener('DOMContentLoaded', init);
