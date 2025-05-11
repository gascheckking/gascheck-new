// Hantera knapptryckningar i Frame
module.exports = (req, res) => {
  const { buttonIndex } = req.body.untrustedData;
  
  if (buttonIndex === 1) {
    res.json({ 
      type: 'redirect', 
      url: 'https://gascheck-new.vercel.app' 
    });
  } else if (buttonIndex === 2) {
    res.json({ 
      type: 'tx',
      txUrl: 'https://gascheck-new.vercel.app/api/claim-tx' 
    });
  }
};
