export async function POST(req) {
  return new Response(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta property="fc:frame" content="vNext">
        <meta property="fc:frame:image" content="https://your-deploy-url.com/og-warp.png">
        <meta property="fc:frame:button:1" content="Claim XP">
        <meta property="fc:frame:post_url" content="https://your-deploy-url.com/api/frame-action">
      </head>
      <body></body>
    </html>
  `, {
    headers: { "Content-Type": "text/html" }
  });
}