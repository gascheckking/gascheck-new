// api/frame-action.js (uppdaterad med Neynar validering)

import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { valid, fid } = await client.validateFrameAction(body);
    
    if (!valid) {
      return new Response(JSON.stringify({ error: "Invalid Frame Action" }), { status: 403 });
    }

    // Simulerad interaktion, t.ex. XP-claim
    return new Response(
      JSON.stringify({
        status: "success",
        frame: {
          image: "https://gascheck-new.vercel.app/og-warp.png",
          post_url: "https://gascheck-new.vercel.app/api/frame",
          buttons: [{ label: "Check My Onchain XP" }]
        }
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal Error" }), { status: 500 });
  }
}