function switchTab(id) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function connectWallet() {
  const address = "0x3951...dD4c";
  document.getElementById("walletAddress").innerText = address;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("darkModeToggle").addEventListener("change", (e) => {
    document.body.classList.toggle("dark", e.target.checked);
  });
});