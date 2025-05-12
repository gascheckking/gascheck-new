// gas.js

export const getGasDetails = async () => {
  const res = await fetch("https://api.owlracle.info/v4/base/gas?apikey=demo");
  const json = await res.json();
  const gwei = json.speeds[1].estimatedFee.toFixed(1);

  document.getElementById("gas-status").textContent = `${gwei} Gwei`;
  document.getElementById("gasFill").style.width = `${Math.min(gwei, 100)}%`;
};

getGasDetails();
setInterval(getGasDetails, 30000);