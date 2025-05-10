export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.owlracle.info/v3/eth/gas?apikey=b9bee1f4421d4eebb170067dc3e2e579');
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Något gick fel med proxyn' });
  }
}
