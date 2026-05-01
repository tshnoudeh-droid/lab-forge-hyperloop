"use client";

import * as THREE from "three";
import { TUBE } from "./data/conduit-specs";

interface PylonStructureProps {
  show: boolean;
  activeHotspot?: string | null;
}

const PYLON_GROUND_Y = -7.5;
const TOP_Y = -TUBE.outerRadius;
const HEIGHT = TOP_Y - PYLON_GROUND_Y;
const MID_Y = PYLON_GROUND_Y + HEIGHT / 2;
const COL_RADIUS = 0.09;
const COL_SPACING = 0.32;

const BRACE_DX = COL_SPACING * 2;
const BRACE_DY = HEIGHT * 0.6;
const BRACE_LEN = Math.sqrt(BRACE_DX * BRACE_DX + BRACE_DY * BRACE_DY);
const BRACE_ANGLE = Math.atan2(BRACE_DX, BRACE_DY);

const HIGHLIGHT_COLOR = "#C4A882";

function Pylon({
  position,
  highlighted,
}: {
  position: [number, number, number];
  highlighted: boolean;
}) {
  const col = highlighted ? HIGHLIGHT_COLOR : "#606060";
  const colEmissive = highlighted ? "#8a7060" : "#000000";
  const colEmissiveIntensity = highlighted ? 0.5 : 0;

  const matProps = {
    color: col,
    emissive: colEmissive,
    emissiveIntensity: colEmissiveIntensity,
    metalness: 0.75 as number,
    roughness: 0.35 as number,
  };

  return (
    <group position={position}>
      {/* Two main cylindrical columns */}
      {([-COL_SPACING, COL_SPACING] as number[]).map((x) => (
        <mesh key={x} position={[x, MID_Y, 0]}>
          <cylinderGeometry args={[COL_RADIUS, COL_RADIUS * 1.15, HEIGHT, 12]} />
          <meshStandardMaterial {...matProps} />
        </mesh>
      ))}

      {/* Horizontal cross-braces at 3 levels */}
      {([0.25, 0.5, 0.75] as number[]).map((t) => (
        <mesh key={t} position={[0, PYLON_GROUND_Y + HEIGHT * t, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, BRACE_DX, 8]} />
          <meshStandardMaterial color={highlighted ? HIGHLIGHT_COLOR : "#555555"} emissive={colEmissive} emissiveIntensity={colEmissiveIntensity} metalness={0.6} roughness={0.5} />
        </mesh>
      ))}

      {/* X diagonal brace — bottom-left to top-right */}
      <mesh position={[0, MID_Y, 0]} rotation={[0, 0, BRACE_ANGLE]}>
        <cylinderGeometry args={[0.018, 0.018, BRACE_LEN, 8]} />
        <meshStandardMaterial color={highlighted ? HIGHLIGHT_COLOR : "#686868"} emissive={colEmissive} emissiveIntensity={colEmissiveIntensity} metalness={0.6} roughness={0.5} />
      </mesh>
      {/* X diagonal brace — bottom-right to top-left */}
      <mesh position={[0, MID_Y, 0]} rotation={[0, 0, -BRACE_ANGLE]}>
        <cylinderGeometry args={[0.018, 0.018, BRACE_LEN, 8]} />
        <meshStandardMaterial color={highlighted ? HIGHLIGHT_COLOR : "#686868"} emissive={colEmissive} emissiveIntensity={colEmissiveIntensity} metalness={0.6} roughness={0.5} />
      </mesh>

      {/* Circular base plate */}
      <mesh position={[0, PYLON_GROUND_Y + 0.06, 0]}>
        <cylinderGeometry args={[0.55, 0.58, 0.12, 20]} />
        <meshStandardMaterial color={highlighted ? HIGHLIGHT_COLOR : "#4a4a4a"} emissive={colEmissive} emissiveIntensity={colEmissiveIntensity} metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Top cradle cap */}
      <mesh position={[0, TOP_Y - 0.05, 0]}>
        <cylinderGeometry args={[0.28, 0.3, 0.09, 20]} />
        <meshStandardMaterial {...matProps} />
      </mesh>
    </group>
  );
}

const PYLON_POSITIONS: [number, number, number][] = [
  [0, 0, -12],
  [0, 0, -6],
  [0, 0, 0],
  [0, 0, 6],
  [0, 0, 12],
];

export default function PylonStructure({ show, activeHotspot }: PylonStructureProps) {
  if (!show) return null;
  const highlighted = activeHotspot === "05";
  return (
    <group>
      {PYLON_POSITIONS.map((pos) => (
        <Pylon key={pos[2]} position={pos} highlighted={highlighted} />
      ))}
    </group>
  );
}
