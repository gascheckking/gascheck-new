// Genererar bild för Farcaster Frame
module.exports = (req, res) => {
  const gasPrice = 32; // Ersätt med riktig API-förfrågan senare
  const mood = gasPrice < 30 ? '😎' : gasPrice < 70 ? '🔥' : '💀';
  
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    imageUrl: `https://placeholder-image.com/gas?price=${gasPrice}&mood=${mood}`,
    altText: `Aktuellt gaspris: ${gasPrice} Gwei ${mood}`
  }));
};
