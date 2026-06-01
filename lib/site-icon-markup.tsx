import type React from "react";

interface SiteIconMarkupProps {
  size: number;
}

export function SiteIconMarkup({ size }: SiteIconMarkupProps): React.ReactElement {
  const radius = Math.round(size * 0.24);
  const fontSize = Math.round(size * 0.4);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(145deg, #021612 0%, #063d30 22%, #084a3a 45%, #0a5c48 58%, #084a3a 78%, #021612 100%)",
        borderRadius: radius,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          background:
            "linear-gradient(125deg, transparent 25%, rgba(110,212,184,0.28) 42%, rgba(255,255,255,0.14) 50%, rgba(158,223,200,0.22) 58%, transparent 75%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          opacity: 0.2,
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: `${Math.round(size * 0.07)}px ${Math.round(size * 0.07)}px`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: radius,
          border: `${Math.max(1, Math.round(size * 0.012))}px solid rgba(110,212,184,0.35)`,
        }}
      />
      <span
        style={{
          position: "relative",
          color: "#ffffff",
          fontSize,
          fontWeight: 700,
          letterSpacing: "-0.05em",
          fontFamily: "system-ui, -apple-system, sans-serif",
          textShadow: "0 1px 12px rgba(110,212,184,0.35)",
        }}
      >
        SL
      </span>
    </div>
  );
}
