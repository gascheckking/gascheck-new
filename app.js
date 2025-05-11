// ===== GAS TRACKER (MOCK DATA) =====
function updateGasPrice() {
  const gasPriceElement = document.getElementById('gas-price');
  const gasLevel = document.querySelector('.gas-level');
  
  // Simulerar live-data
  const randomGas = Math.floor(Math.random() * 100) + 10;
  gasPriceElement.textContent = `${randomGas} Gwei ${getGasEmoji(randomGas)}`;
  gasLevel.style.width = `${Math.min(100, randomGas)}%`;

  // Färg baserat på pris
  if (randomGas > 80) {
    gasLevel.style.background = '#ff6b6b'; // Röd
  } else if (randomGas > 50) {
    gasLevel.style.background = '#ffd166'; // Gul
  } else {
    gasLevel.style.background = '#6E6EDE'; // Lila
  }
}

function getGasEmoji(gwei) {
  if (gwei < 30) return '😎';
  if (gwei < 70) return '🔥';
  return '💀';
}

// Uppdatera var 15:e sekund
setInterval(updateGasPrice, 15000);
updateGasPrice();

// ===== WALLET CONNECT (MOCK) =====
document.getElementById('connect-wallet').addEventListener('click', () => {
  alert("WalletConnect kommer här! 🚀");
});

// ===== REFRESH KNAPP =====
document.getElementById('refresh-gas').addEventListener('click', updateGasPrice);
