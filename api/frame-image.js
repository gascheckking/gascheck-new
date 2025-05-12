// api/frame-image.js

export default function handler(req, res) {
  const imageUrl = "https://your-app-url.com/og-warp.png";

  res.setHeader("Content-Type", "image/png");
  res.redirect(imageUrl);
}