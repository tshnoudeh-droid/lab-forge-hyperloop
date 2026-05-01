"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FLUX_HOTSPOTS } from "./data/flux-specs";

interface FluxSpecPanelProps {
  hotspotId: string | null;
  onClose: () => void;
}

const font = "Helvetica Neue, Helvetica, Arial, sans-serif";

export default function FluxSpecPanel({ hotspotId, onClose }: FluxSpecPanelProps) {
  const hotspot = FLUX_HOTSPOTS.find((h) => h.id === hotspotId) ?? null;

  return (
    <AnimatePresence>
      {hotspot && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "340px",
            height: "100%",
            background: "var(--background)",
            borderLeft: "2px solid var(--color-accent)",
            padding: "28px 24px",
            overflowY: "auto",
            zIndex: 20,
            fontFamily: font,
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "none",
              border: "1px solid var(--border)",
              color: "var(--muted)",
              cursor: "pointer",
              fontSize: "20px",
              lineHeight: 1,
              padding: "4px 8px",
              fontFamily: font,
            }}
            aria-label="Close panel"
          >
            ×
          </button>

          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.3em",
              color: "var(--color-accent)",
              textTransform: "uppercase",
              marginBottom: "4px",
              paddingRight: "40px",
              fontFamily: font,
              fontWeight: 500,
            }}
          >
            FH-DX-II
          </p>
          <p
            style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: "var(--foreground)",
              marginBottom: "16px",
              paddingRight: "40px",
              fontFamily: font,
              textTransform: "uppercase",
            }}
          >
            {hotspot.label}
          </p>

          <div style={{ borderTop: "1px solid var(--border)", marginBottom: "18px" }} />

          <p
            style={{
              fontSize: "14px",
              color: "var(--muted)",
              lineHeight: 1.8,
              marginBottom: "22px",
              fontFamily: font,
            }}
          >
            {hotspot.explanation}
          </p>

          <div style={{ borderTop: "1px solid var(--border)", marginBottom: "14px" }} />

          {hotspot.data.map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                padding: "9px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--muted)", letterSpacing: "0.04em", fontFamily: font }}>
                {row.label}
              </span>
              <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--foreground)", letterSpacing: "0.02em", fontFamily: font }}>
                {row.value}
                {row.unit && (
                  <span style={{ color: "var(--muted)", fontSize: "11px", marginLeft: "5px", fontWeight: 400 }}>
                    {row.unit}
                  </span>
                )}
              </span>
            </div>
          ))}

          <div style={{ borderTop: "2px solid var(--color-accent)", marginTop: "20px", paddingTop: "16px" }}>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.25em",
                color: "var(--color-accent)",
                textTransform: "uppercase",
                marginBottom: "10px",
                fontFamily: font,
                fontWeight: 500,
              }}
            >
              Why it matters
            </p>
            <p style={{ fontSize: "14px", color: "var(--foreground)", lineHeight: 1.7, fontFamily: font }}>
              {hotspot.whyItMatters}
            </p>
          </div>

          <div style={{ marginTop: "20px" }}>
            <p style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: "0.06em", lineHeight: 1.5, fontFamily: font }}>
              Source: {hotspot.source}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
