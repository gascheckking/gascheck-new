// gas.js

export const getGas = async (contract, method, params) => {
  const gasLimit = await contract[method].estimateGas(...params);
  const gasPrice = await contract.provider.getGasPrice();
  return { gasLimit: gasLimit.toString(), gasPrice: gasPrice.toString() };
};