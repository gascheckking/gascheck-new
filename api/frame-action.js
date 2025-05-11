// api/frame-action.js

export async function POST(req) {
  const body = await req.json();
  const { trustedData } = body;

  const fid = trustedData?.fid;
  const action = body.untrustedData?.buttonIndex;

  if (!fid || action === undefined) {
    return new Response("Invalid input", { status: 400 });
  }

  // Exempel: logga frame-interaktion
  console.log(`User with FID ${fid} clicked button ${action}`);

  // Skicka tillbaka Farcaster Frame response
  return Response.json({
    type: "frame",
    frames: [
      {
        image: "https://source.unsplash.com/random/1200x630/?success",
        postUrl: "https://gascheck-new.vercel.app/api/frame-action",
        buttons: [{ label: "🔁 Back", action: "post" }],
      },
    ],
  });
}
