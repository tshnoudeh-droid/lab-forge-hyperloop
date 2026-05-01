"use client";

import { TUBE } from "@/components/conduit/data/conduit-specs";

interface HalbachTrackProps {
  show: boolean;
  activeHotspot?: string | null;
}

const HIGHLIGHT = "#C4A882";
const HOTSPOT_ID = "F01";

export default function HalbachTrack({ show, activeHotspot }: HalbachTrackProps) {
  if (!show) return null;
  const highlighted = activeHotspot === HOTSPOT_ID;

  const FLOOR_Y = -(TUBE.innerRadius - 0.02);
  const RAIL_HEIGHT = 0.055;
  const RAIL_HALF = TUBE.length / 2;
  const TILE_W = 0.44;
  const TILE_D = 0.28;
  const TILE_H = 0.045;
  const tileCount = Math.floor(TUBE.length / TILE_D);

  return (
    <group>
      {/* Aluminum extrusion rail housing */}
      <mesh position={[0, FLOOR_Y - RAIL_HEIGHT / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[TILE_W + 0.08, TUBE.length, RAIL_HEIGHT]} />
        <meshStandardMaterial
          color={highlighted ? HIGHLIGHT : "#4a4a4a"}
          emissive={highlighted ? "#8a7060" : "#000000"}
          emissiveIntensity={highlighted ? 0.4 : 0}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Stainless reaction rail */}
      <mesh position={[0, FLOOR_Y + 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[TILE_W * 0.5, TUBE.length, 0.008]} />
        <meshStandardMaterial
          color={highlighted ? HIGHLIGHT : "#aaaaaa"}
          emissive={highlighted ? "#8a7060" : "#000000"}
          emissiveIntensity={highlighted ? 0.5 : 0}
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      {/* Magnet tiles — 4-phase Halbach pattern */}
      {Array.from({ length: tileCount }).map((_, i) => {
        const phase = i % 4;
        const isVerticalNorth = phase === 0;
        const isVerticalSouth = phase === 2;
        const isHorizontal = phase === 1 || phase === 3;
        const color = isVerticalNorth
          ? (highlighted ? "#8080c0" : "#2a3a6a")
          : isVerticalSouth
          ? (highlighted ? "#c08080" : "#5a2a2a")
          : (highlighted ? HIGHLIGHT : "#707070");
        const emissiveColor = isVerticalNorth
          ? "#0a0a30"
          : isVerticalSouth
          ? "#200808"
          : "#000000";
        return (
          <mesh
            key={i}
            position={[
              0,
              FLOOR_Y - RAIL_HEIGHT / 2 + TILE_H / 2,
              -RAIL_HALF + i * TILE_D + TILE_D / 2,
            ]}
          >
            <boxGeometry args={[TILE_W, TILE_H, TILE_D - 0.01]} />
            <meshStandardMaterial
              color={color}
              emissive={emissiveColor}
              emissiveIntensity={highlighted ? 0.6 : (isHorizontal ? 0 : 0.2)}
              metalness={0.3}
              roughness={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}
