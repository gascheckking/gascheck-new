// api/frame-action.js

export async function POST(req) {
  return new Response(
    JSON.stringify({
      "status": "success",
      "frame": {
        "image": "https://gascheck-new.vercel.app/og-warp.png",
        "post_url": "https://gascheck-new.vercel.app/api/frame",
        "buttons": [
          { "label": "Check My Onchain XP" }
        ]
      }
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}