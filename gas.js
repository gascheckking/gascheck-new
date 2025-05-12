// gas.js

export async function getGas() {
  try {
    const response = await fetch("https://api.owlracle.info/v4/base/gas?apikey=demo");
    const data = await response.json();
    const gwei = data.speeds[1].estimatedFee.toFixed(1);

    document.getElementById("gas-status").textContent = `${gwei} Gwei`;
    document.getElementById("gasFill").style.width = `${Math.min(gwei, 100)}%`;
  } catch (error) {
    document.getElementById("gas-status").textContent = "Failed to load";
    console.error("Gas fetch error:", error);
  }
}