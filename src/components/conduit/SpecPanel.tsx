"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HOTSPOTS } from "./data/conduit-specs";

interface SpecPanelProps {
  hotspotId: string | null;
  onClose: () => void;
}

export default function SpecPanel({ hotspotId, onClose }: SpecPanelProps) {
  const hotspot = HOTSPOTS.find((h) => h.id === hotspotId) ?? null;

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
            width: "300px",
            height: "100%",
            background: "rgba(10,10,10,0.96)",
            borderLeft: "1px solid rgba(255,255,255,0.1)",
            padding: "24px",
            overflowY: "auto",
            zIndex: 20,
            fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontSize: "18px",
              lineHeight: 1,
              padding: "4px",
            }}
            aria-label="Close panel"
          >
            ×
          </button>

          {/* Designation */}
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.3em",
              color: "#C4A882",
              textTransform: "uppercase",
              marginBottom: "12px",
              paddingRight: "24px",
            }}
          >
            FH-DX-I // {hotspot.id} {hotspot.label}
          </p>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginBottom: "16px" }} />

          {/* Explanation */}
          <p
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.75,
              marginBottom: "20px",
            }}
          >
            {hotspot.explanation}
          </p>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginBottom: "12px" }} />

          {/* Data table */}
          {hotspot.data.map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                padding: "7px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.04em" }}>
                {row.label}
              </span>
              <span style={{ fontSize: "11px", color: "#FFFFFF", letterSpacing: "0.04em" }}>
                {row.value}
                {row.unit && (
                  <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "9px", marginLeft: "4px" }}>
                    {row.unit}
                  </span>
                )}
              </span>
            </div>
          ))}

          {/* Why it matters */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "16px", paddingTop: "12px" }}>
            <p
              style={{
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: "#C4A882",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Why it matters
            </p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
              {hotspot.whyItMatters}
            </p>
          </div>

          {/* Source */}
          <div style={{ marginTop: "16px" }}>
            <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.08em", lineHeight: 1.5 }}>
              Source: {hotspot.source}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
