// api/frame-validator.js

import { NeynarAPIClient } from "@neynar/nodejs-sdk";

const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

export async function validateFrameAction(req) {
  try {
    const body = await req.json();
    const result = await client.validateFrameAction(body);
    return result.valid ? result.action.fid : null;
  } catch (err) {
    console.error("Frame validation failed:", err);
    return null;
  }
}