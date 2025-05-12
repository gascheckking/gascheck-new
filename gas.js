export async function getGas() {
  const statusEl = document.getElementById("gas-status");
  const fillEl = document.getElementById("gasFill");

  if (!statusEl || !fillEl) return;

  try {
    statusEl.textContent = "⌛ Updating...";

    const response = await fetch("https://api.owlracle.info/v4/base/gas?apikey=demo");
    const data = await response.json();
    const gwei = data.speeds[1].estimatedFee.toFixed(1);

    statusEl.textContent = `${gwei} Gwei`;
    fillEl.style.width = `${Math.min(gwei, 100)}%`;
  } catch (error) {
    console.error("Gas fetch error:", error);
    statusEl.textContent = "Failed to load";
    fillEl.style.width = "0%";
  }
}