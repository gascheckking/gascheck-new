function switchTab(id) {
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function connectWallet() {
  const address = "0x3951...dD4c";
  document.getElementById("walletAddress").innerText = address;
}

document.addEventListener("DOMContentLoaded", () => {
  const needle = document.getElementById("gasNeedle");
  function updateGas() {
    const gwei = Math.floor(Math.random() * 120);
    const max = 120;
    const percent = (gwei / max) * 100;
    needle.style.bottom = `${percent}%`;
    document.getElementById("currentGas").textContent = `${gwei} Gwei`;
    document.getElementById("gasTime").textContent = new Date().toLocaleTimeString();
  }
  updateGas();
  setInterval(updateGas, 4000);

  document.getElementById("darkModeToggle").addEventListener("change", e => {
    document.body.classList.toggle("dark", e.target.checked);
  });
});