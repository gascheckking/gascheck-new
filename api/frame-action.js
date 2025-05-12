export async function POST(req) {
  const body = await req.json();

  const frameResponse = {
    type: "frame",
    version: "vNext",
    content: {
      message: "🧠 WarpAi Frame Engaged!",
      account: "0xa42b8c353b938e5efd41501e3472bc65e520bb52",
      zoraLinked: "0xa8b817f09702c8d77fdb6d7d677a30cba5c9d7b9",
      reward: "+50 WP",
      timestamp: new Date().toISOString()
    }
  };

  return new Response(JSON.stringify(frameResponse), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}