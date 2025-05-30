import { NeynarAPIClient } from "@neynar/nodejs-sdk";
const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY);

export async function validateFrameAction(req) {
  try {
    const body = await req.json();
    const { trustedData } = body;
    const result = await client.validateFrameAction(trustedData.messageBytes);
    return result.valid ? result.action.fid : null;
  } catch (error) {
    console.error("Valideringsfel:", error);
    return null;
  }
}
