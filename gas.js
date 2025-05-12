export async function getGas() {
  const statusEl = document.getElementById("gas-status");
  const fillEl = document.getElementById("gasFill");
  const baseFeeEl = document.getElementById("base-fee"); // Ny variabel för ETH Base Fee

  if (!statusEl || !fillEl || !baseFeeEl) return;

  try {
    statusEl.textContent = "⌛ Updating...";

    const response = await fetch("https://api.owlracle.info/v4/base/gas?apikey=demo");
    const data = await response.json();
    const gwei = data.speeds[1].estimatedFee.toFixed(1);

    // Uppdatera BÅDE progress-bar och ETH Base Fee-text
    baseFeeEl.textContent = gwei; // 👈 Ny rad
    fillEl.style.width = `${Math.min(gwei, 100)}%`;
    statusEl.textContent = `${gwei} Gwei`;
  } catch (error) {
    console.error("Gas fetch error:", error);
    statusEl.textContent = "Failed to load";
    fillEl.style.width = "0%";
    baseFeeEl.textContent = "0"; // 👈 Återställ vid fel
  }
}
