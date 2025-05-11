// api/frame-image.js
export async function GET(req) {
  const imageUrl = "https://source.unsplash.com/random/1200x630/?ai,gas";
  
  return new Response(null, {
    status: 302,
    headers: {
      Location: imageUrl,
    },
  });
}
