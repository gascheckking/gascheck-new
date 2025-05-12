import { validateFrameAction } from './frame-validator.js';

export async function POST(req) {
  const fid = await validateFrameAction(req);
  
  if (!fid) {
    return new Response(JSON.stringify({ error: "Ogiltig Frame-förfrågan" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({
      status: "success",
      frame: {
        image: "https://gascheck-new.vercel.app/api/og",
        buttons: [
          { label: "Visa min XP", action: "post" },
          { label: "Dela statistik", action: "post_redirect" }
        ],
        post_url: "https://gascheck-new.vercel.app/api/frame"
      }
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
