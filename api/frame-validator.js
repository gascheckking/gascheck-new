// api/frame-validator.js

import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY); // Lägg till denna env i Netlify/Vercel

export async function validateFrameAction(req) {
  try {
    const body = await req.json();
    const { trustedData } = body;

    const result = await client.validateFrameAction(trustedData.messageBytes);
    return result.valid && result.action?.fid;
  } catch (err) {
    console.error("Validator error:", err);
    return null;
  }
}