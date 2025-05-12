export async function getGas() {
  try {
    const response = await fetch('https://api.owlracle.info/v4/base/gas?apikey=demo');
    const data = await response.json();
    const baseFee = data.speeds[1].estimatedFee.toFixed(1);
    
    document.getElementById('base-fee').textContent = baseFee;
    document.getElementById('gasFill').style.width = `${Math.min(baseFee, 100)}%`;
  } catch (error) {
    console.error("GAS-FEL:", error);
    document.getElementById('base-fee').textContent = "ERROR";
    document.getElementById('gasFill').style.width = "0%";
  }
}
