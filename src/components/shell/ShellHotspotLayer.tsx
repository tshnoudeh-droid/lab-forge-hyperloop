"use client";

import { Html } from "@react-three/drei";
import { SHELL_HOTSPOTS } from "./data/shell-specs";

interface ShellHotspotLayerProps {
  activeId: string | null;
  onHotspotClick: (id: string, cameraPreset: [number, number, number]) => void;
}

export default function ShellHotspotLayer({ activeId, onHotspotClick }: ShellHotspotLayerProps) {
  return (
    <>
      {SHELL_HOTSPOTS.map((h) => (
        <group key={h.id} position={h.position}>
          <mesh>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color={activeId === h.id ? "#C4A882" : "#0a0a0a"} />
          </mesh>
          <Html center distanceFactor={12} style={{ pointerEvents: "auto" }}>
            <button
              onClick={() =>
                onHotspotClick(h.id, [...h.cameraPreset] as [number, number, number])
              }
              style={{
                background: activeId === h.id ? "#C4A882" : "rgba(255,255,255,0.92)",
                color: "#0a0a0a",
                border: `1px solid ${activeId === h.id ? "#C4A882" : "rgba(195,169,132,0.5)"}`,
                padding: "4px 9px",
                fontSize: "9px",
                letterSpacing: "0.2em",
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s",
                userSelect: "none",
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
