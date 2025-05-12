export async function GET() {
  const imageUrl = "https://warpcast.com/~/welcome.png";
  const response = await fetch(imageUrl);
  const imageBuffer = await response.arrayBuffer();

  return new Response(imageBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}