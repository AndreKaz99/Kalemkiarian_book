import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "What I Want to Tell You Is... Messages From Your Child About Divorce — by Sharon L. Kalemkiarian";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF6EE",
          padding: "72px 84px",
          fontFamily: "Georgia, serif",
          color: "#1F1B18",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 22, letterSpacing: 6, color: "#7A2E35" }}>
          <div style={{ width: 60, height: 2, background: "#7A2E35" }} />
          A BOOK BY SHARON L. KALEMKIARIAN
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, lineHeight: 1, letterSpacing: -2 }}>What I Want to Tell You</div>
          <div style={{ fontSize: 108, lineHeight: 1.05, fontStyle: "italic", color: "#7A2E35" }}>Is...</div>
          <div style={{ marginTop: 28, fontSize: 40, fontStyle: "italic", color: "#5E554D" }}>
            Messages From Your Child About Divorce
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#5E554D" }}>
          <span>Sahag-Mesrob Press West</span>
          <span>Available on Amazon</span>
        </div>
      </div>
    ),
    size
  );
}
