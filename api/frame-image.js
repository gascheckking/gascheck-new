// Generera dynamisk bild för Farcaster Frame
module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    imageUrl: 'https://gascheck-new.vercel.app/og-image.png',
    altText: 'Live gaspriser på Base'
  }));
};
