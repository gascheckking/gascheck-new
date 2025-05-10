function shortenAddress(addr) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

function showAddress(addr) {
  document.getElementById("shortAddress").textContent = shortenAddress(addr);
}

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];
      localStorage.setItem("warpai_address", address);
      showAddress(address);
      loadFakeActivity(address);
    } catch (e) {
      alert("Wallet connect failed");
    }
  } else {
    alert("Install MetaMask or Coinbase Wallet");
  }
}

function checkAddress() {
  const input = document.getElementById("walletInput").value;
  if (!input || input.length !== 42) {
    alert("Invalid address");
    return;
  }
  localStorage.setItem("warpai_address", input);
  showAddress(input);
  loadFakeActivity(input);
}

function claimAddress() {
  const address = localStorage.getItem("warpai_address") || "None";
  alert("Claiming 20 WarpAI Coins for " + address);
  // Add claim tx logic here later
}

function loadFakeActivity(addr) {
  const list = document.getElementById("activityList");
  list.innerHTML = "";
  const dummy = [
    `Minted on Zora (Base)`,
    `Sent 0.015 ETH to 0xabc...def1`,
    `Claimed 20 WAI`,
    `Bought “Based Coin” for 0.004 ETH`,
  ];
  dummy.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
  document.getElementById("efficiency").textContent = "Efficiency: 88%";
}
