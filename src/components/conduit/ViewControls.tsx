"use client";

import type { ViewMode } from "./types";

interface ViewControlsProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

const MODES: ViewMode[] = ["cutaway", "exterior", "section"];

export default function ViewControls({ mode, onChange }: ViewControlsProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: "16px",
        left: "16px",
        display: "flex",
        gap: "2px",
        zIndex: 10,
      }}
    >
      {MODES.map((m) => (
        <button
          key={m}
          onClick={() => onChange(m)}
          style={{
            padding: "6px 12px",
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            background: mode === m ? "var(--color-accent)" : "var(--border)",
            color: mode === m ? "var(--background)" : "var(--muted)",
            border: "none",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
