export async function GET() {
  const image = await fetch("https://your-deploy-url.com/og-warp.png");
  const blob = await image.blob();
  return new Response(blob, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400"
    }
  });
}