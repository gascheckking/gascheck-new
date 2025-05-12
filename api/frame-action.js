import { validateFrameAction } from "./frame-validator.js";

export async function POST(req) {
  const fid = await validateFrameAction(req);

  if (!fid) {
    return new Response(JSON.stringify({ error: "Invalid Frame request" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      status: "success",
      frame: {
        image: "https://gascheck-new.vercel.app/api/og",
        post_url: "https://gascheck-new.vercel.app/api/frame",
        buttons: [
          { label: "Check My Onchain XP" },
          { label: "Share My Stats", action: "post_redirect" }
        ]
      }
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}