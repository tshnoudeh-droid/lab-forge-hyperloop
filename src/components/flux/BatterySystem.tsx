"use client";

import { TUBE } from "@/components/conduit/data/conduit-specs";

interface BatterySystemProps {
  show: boolean;
  activeHotspot?: string | null;
}

const HIGHLIGHT = "#C4A882";
const HOTSPOT_ID = "F03";
const BATTERY_X = -(TUBE.outerRadius + 0.65);

const CAB_W = 0.52;
const CAB_H = 1.1;
const CAB_D = 0.36;
const CELL_ROWS = 8;

function BatteryCabinet({
  position,
  highlighted,
}: {
  position: [number, number, number];
  highlighted: boolean;
}) {
  const col = highlighted ? HIGHLIGHT : "#242424";
  const emissive = highlighted ? "#8a7060" : "#000000";
  const ei = highlighted ? 0.5 : 0;
  const cellH = (CAB_H * 0.68) / CELL_ROWS;

  return (
    <group position={position}>
      {/* Cabinet body */}
      <mesh>
        <boxGeometry args={[CAB_W, CAB_H, CAB_D]} />
        <meshStandardMaterial
          color={col}
          emissive={emissive}
          emissiveIntensity={ei}
          metalness={0.65}
          roughness={0.45}
        />
      </mesh>

      {/* Front panel — slightly inset */}
      <mesh position={[0, 0, CAB_D / 2 + 0.003]}>
        <boxGeometry args={[CAB_W * 0.92, CAB_H * 0.92, 0.008]} />
        <meshStandardMaterial
          color={highlighted ? "#d4b880" : "#1a1a1a"}
          emissive={emissive}
          emissiveIntensity={ei * 0.5}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>

      {/* Cell row slots */}
      {Array.from({ length: CELL_ROWS }).map((_, r) => (
        <mesh
          key={r}
          position={[
            0,
            -CAB_H * 0.26 + r * cellH + cellH / 2,
            CAB_D / 2 + 0.012,
          ]}
        >
          <boxGeometry args={[CAB_W * 0.72, cellH * 0.65, 0.008]} />
          <meshStandardMaterial
            color={highlighted ? "#c0a060" : "#0a200a"}
            emissive={highlighted ? "#C4A882" : "#002800"}
            emissiveIntensity={highlighted ? 0.8 : 0.35}
            metalness={0.2}
            roughness={0.7}
          />
        </mesh>
      ))}

      {/* Status LED strip */}
      <mesh position={[0, CAB_H * 0.41, CAB_D / 2 + 0.014]}>
        <boxGeometry args={[CAB_W * 0.55, 0.032, 0.006]} />
        <meshStandardMaterial
          color={highlighted ? "#C4A882" : "#22cc66"}
          emissive={highlighted ? "#C4A882" : "#22cc66"}
          emissiveIntensity={highlighted ? 1.0 : 0.9}
        />
      </mesh>

      {/* Base pedestal */}
      <mesh position={[0, -CAB_H / 2 - 0.07, 0]}>
        <boxGeometry args={[CAB_W * 1.15, 0.12, CAB_D * 1.15]} />
        <meshStandardMaterial
          color={highlighted ? HIGHLIGHT : "#181818"}
          emissive={emissive}
          emissiveIntensity={ei}
          metalness={0.5}
          roughness={0.6}
        />
      </mesh>

      {/* Terminal posts (top) */}
      {([-CAB_W * 0.22, CAB_W * 0.22] as number[]).map((dx) => (
        <mesh key={dx} position={[dx, CAB_H / 2 + 0.06, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.1, 10]} />
          <meshStandardMaterial
            color={highlighted ? HIGHLIGHT : "#888888"}
            emissive={emissive}
            emissiveIntensity={ei}
            metalness={0.85}
            roughness={0.15}
          />
        </mesh>
      ))}

      {/* Cable conduit toward tube */}
      <mesh
        position={[CAB_W / 2 + 0.18, -0.1, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.028, 0.028, 0.36, 10]} />
        <meshStandardMaterial
          color={highlighted ? HIGHLIGHT : "#505050"}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* BMS enclosure (side) */}
      <mesh position={[0, -CAB_H * 0.28, -(CAB_D / 2 + 0.065)]}>
        <boxGeometry args={[CAB_W * 0.6, CAB_H * 0.28, 0.11]} />
        <meshStandardMaterial
          color={highlighted ? HIGHLIGHT : "#1e1e1e"}
          emissive={emissive}
          emissiveIntensity={ei * 0.6}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
    </group>
  );
}

const BATTERY_POSITIONS: [number, number, number][] = [
  [BATTERY_X, 0, -7],
  [BATTERY_X, 0, 8],
];

export default function BatterySystem({ show, activeHotspot }: BatterySystemProps) {
  if (!show) return null;
  const highlighted = activeHotspot === HOTSPOT_ID;
  return (
    <group>
      {BATTERY_POSITIONS.map((pos) => (
        <BatteryCabinet key={pos[2]} position={pos} highlighted={highlighted} />
      ))}
    </group>
  );
}
