function switchTab(id) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function connectWallet() {
  const address = "0x3951...dD4c";
  document.getElementById("walletAddress").innerText = address;
}

document.addEventListener("DOMContentLoaded", () => {
  const needle = document.getElementById("gasNeedle");
  function updateGas() {
    const gwei = Math.floor(Math.random() * 100);
    const percentage = Math.min((gwei / 100) * 100, 100);
    needle.style.bottom = percentage + "%";
    document.getElementById("currentGas").textContent = `${gwei} Gwei`;
    document.getElementById("gasTime").textContent = new Date().toLocaleTimeString();
  }
  setInterval(updateGas, 3000);
  updateGas();

  document.getElementById("darkModeToggle").addEventListener("change", e => {
    document.body.classList.toggle("dark", e.target.checked);
  });
});