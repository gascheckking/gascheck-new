// api/frame-action.js

import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

export async function POST(req) {
  const body = await req.json();

  const { trustedData } = body;
  if (!trustedData || !trustedData.messageBytes) {
    return new Response("Missing trustedData", { status: 400 });
  }

  try {
    const { isValid, fid } = await client.validateFrameAction(body);
    if (!isValid) throw new Error("Invalid frame request");

    // Optional: Interact with WarpXP contract here (if deployed)
    console.log("Validated FID:", fid);

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
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (e) {
    return new Response(`Error: ${e.message}`, { status: 401 });
  }
}