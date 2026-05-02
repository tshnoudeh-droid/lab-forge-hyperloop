"use client";

import { TUBE } from "@/components/conduit/data/conduit-specs";
import { POD, LEVITATION_SKID } from "./data/shell-specs";

interface LevitationSkidProps {
  show: boolean;
  activeHotspot?: string | null;
}

const HIGHLIGHT = "#C4A882";
const HOTSPOT_ID = "S03";
const FLOOR_Y = -(TUBE.innerRadius - 0.02);
const LEV_GAP = 0.10;
const POD_Y = FLOOR_Y + LEV_GAP + POD.outerRadius;

const SKID_H = 0.065;
const SKID_W = LEVITATION_SKID.widthM;
const SKID_L = POD.fuselageLength + 1.4;
const SKID_Y = POD_Y - POD.outerRadius + SKID_H / 2;

// Halbach track reference line (for gap visualization)
const TRACK_Y = FLOOR_Y;

export default function LevitationSkid({ show, activeHotspot }: LevitationSkidProps) {
  if (!show) return null;
  const highlighted = activeHotspot === HOTSPOT_ID;

  const col = highlighted ? HIGHLIGHT : "#a0a0a0";
  const emissive = highlighted ? "#8a7060" : "#000000";
  const ei = highlighted ? 0.5 : 0;

  return (
    <group>
      {/* Main skid rail */}
      <mesh position={[0, SKID_Y, 0]}>
        <boxGeometry args={[SKID_W, SKID_H, SKID_L]} />
        <meshStandardMaterial
          color={col}
          emissive={emissive}
          emissiveIntensity={ei}
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>

      {/* Skid attachment brackets — at each panel line */}
      {[-3.5, -1.75, 0, 1.75, 3.5].map((z) => (
        <mesh key={z} position={[0, POD_Y - POD.outerRadius + 0.12, z]}>
          <boxGeometry args={[SKID_W * 0.7, 0.22, 0.06]} />
          <meshStandardMaterial
            color={highlighted ? HIGHLIGHT : "#888888"}
            emissive={emissive}
            emissiveIntensity={ei * 0.7}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Skid wear pads — bottom face strips */}
      {([-0.14, 0.14] as number[]).map((x) => (
        <mesh key={x} position={[x, SKID_Y - SKID_H / 2 - 0.008, 0]}>
          <boxGeometry args={[0.05, 0.015, SKID_L * 0.9]} />
          <meshStandardMaterial
            color={highlighted ? "#d4b880" : "#707070"}
            emissive={emissive}
            emissiveIntensity={ei * 0.4}
            metalness={0.4}
            roughness={0.6}
          />
        </mesh>
      ))}

      {/* Levitation gap indicator — thin volume between skid and track */}
      {highlighted && (
        <mesh position={[0, TRACK_Y + LEV_GAP / 2, 0]}>
          <boxGeometry args={[SKID_W * 0.6, LEV_GAP - SKID_H, SKID_L * 0.4]} />
          <meshStandardMaterial
            color="#C4A882"
            emissive="#C4A882"
            emissiveIntensity={0.25}
            transparent
            opacity={0.15}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}
