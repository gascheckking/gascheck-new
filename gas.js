// gas.js
export const getGasDetails = async (contract, methodName, args = []) => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const gasPrice = await provider.getGasPrice();
  const gasLimit = await contract[methodName].estimateGas(...args);
  return {
    gasPrice: gasPrice.toString(),
    gasLimit: gasLimit.toString()
  };
};
