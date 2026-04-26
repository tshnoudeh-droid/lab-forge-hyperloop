"use client";

import { Html } from "@react-three/drei";
import { HOTSPOTS } from "./data/conduit-specs";

interface HotspotLayerProps {
  activeId: string | null;
  onHotspotClick: (id: string, cameraPreset: [number, number, number]) => void;
}

export default function HotspotLayer({ activeId, onHotspotClick }: HotspotLayerProps) {
  return (
    <>
      {HOTSPOTS.map((h) => (
        <group key={h.id} position={h.position}>
          {/* Small sphere marker */}
          <mesh>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial
              color={activeId === h.id ? "#C4A882" : "var(--foreground)"}
            />
          </mesh>
          {/* Billboarded HTML label */}
          <Html center distanceFactor={12} style={{ pointerEvents: "auto" }}>
            <button
              onClick={() =>
                onHotspotClick(h.id, [
                  ...h.cameraPreset,
                ] as [number, number, number])
              }
              style={{
                background:
                  activeId === h.id ? "#C4A882" : "var(--card-bg)",
                color: activeId === h.id ? "var(--background)" : "var(--foreground)",
                border: `1px solid ${activeId === h.id ? "#C4A882" : "var(--border)"}`,
                padding: "4px 8px",
                fontSize: "9px",
                letterSpacing: "0.2em",
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s",
                userSelect: "none",
                opacity: 0.9,
              }}
            >
              {h.id} {h.label}
            </button>
          </Html>
        </group>
      ))}
    </>
  );
}
