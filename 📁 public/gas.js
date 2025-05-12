export async function getGas() {
  try {
    document.getElementById("gas-status").textContent = "⌛ Updating...";

    const res = await fetch("https://api.owlracle.info/v4/base/gas?apikey=demo");
    const data = await res.json();
    const gwei = data.speeds[1].estimatedFee.toFixed(1);

    document.getElementById("gas-status").textContent = `${gwei} Gwei`;
    document.getElementById("gasFill").style.width = `${Math.min(gwei, 100)}%`;
  } catch (err) {
    console.error("Failed to fetch gas:", err);
    document.getElementById("gas-status").textContent = "Error loading gas";
  }
}