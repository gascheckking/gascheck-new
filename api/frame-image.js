import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

export default function () {
  return new ImageResponse(
    (
      <div style={{
        background: "#0d0d0d",
        color: "#00ccff",
        fontSize: 64,
        width: "1200px",
        height: "630px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <h1>🛸 Warp.ai: Onchain Activity</h1>
      </div>
    )
  );
}