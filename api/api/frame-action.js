// Hanterar knapptryckningar från Farcaster Frames
module.exports = (req, res) => {
  const { untrustedData } = req.body;
  
  // Knapp 1: Visa gaspris
  if (untrustedData.buttonIndex === 1) {
    return res.json({
      type: 'redirect',
      url: 'https://gascheck-new.vercel.app/'
    });
  }

  // Knapp 2: Claim WARP
  if (untrustedData.buttonIndex === 2) {
    return res.json({
      type: 'tx',
      chainId: 'eip155:8453', // Base Network
      method: 'eth_sendTransaction',
      params: {
        abi: [], // Ersätt med ABI från WarpPoints.sol
        to: '0x...', // Ersätt med din kontraktsadress
        functionName: 'claimDaily'
      }
    });
  }
};
