"use client";

import * as THREE from "three";
import { TUBE } from "./data/conduit-specs";
import type { ViewMode } from "./types";

const CLIP_PLANE = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
const CLIPPING_PLANES = [CLIP_PLANE];
const NO_CLIPPING: THREE.Plane[] = [];

const HIGHLIGHT = "#C4A882";
const HALBACH_HOTSPOT = "06";
const LIM_HOTSPOT = "07";

interface InternalSystemsProps {
  showHalbach: boolean;
  showLIM: boolean;
  viewMode: ViewMode;
  activeHotspot?: string | null;
}

export default function InternalSystems({ showHalbach, showLIM, viewMode, activeHotspot }: InternalSystemsProps) {
  const clippingPlanes = viewMode === "cutaway" ? CLIPPING_PLANES : NO_CLIPPING;
  const halbachHighlighted = activeHotspot === HALBACH_HOTSPOT;
  const limHighlighted = activeHotspot === LIM_HOTSPOT;

  const FLOOR_Y = -(TUBE.innerRadius - 0.02);
  const RAIL_HEIGHT = 0.055;
  const RAIL_HALF = TUBE.length / 2;

  // Halbach magnet tile dimensions
  const TILE_W = 0.44;
  const TILE_D = 0.28;
  const TILE_H = 0.045;
  const tileCount = Math.floor(TUBE.length / TILE_D);

  // LIM stator dimensions
  const SEG_SPACING = 1.8;
  const segCount = Math.floor(TUBE.length / SEG_SPACING);
  const SEG_H = 0.12;
  const SEG_W = 0.38;
  const SEG_D = 1.5;
  const TOOTH_COUNT = 5;

  return (
    <group>
      {/* === HALBACH ARRAY === */}
      {showHalbach && (
        <group>
          {/* Rail housing — aluminum extrusion running full length */}
          <mesh position={[0, FLOOR_Y - RAIL_HEIGHT / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[TILE_W + 0.08, TUBE.length, RAIL_HEIGHT]} />
            <meshStandardMaterial
              color={halbachHighlighted ? HIGHLIGHT : "#4a4a4a"}
              emissive={halbachHighlighted ? "#8a7060" : "#000000"}
              emissiveIntensity={halbachHighlighted ? 0.4 : 0}
              metalness={0.8}
              roughness={0.25}
              clippingPlanes={clippingPlanes}
            />
          </mesh>

          {/* Reaction rail — thin stainless strip on top of magnets */}
          <mesh position={[0, FLOOR_Y + 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[TILE_W * 0.5, TUBE.length, 0.008]} />
            <meshStandardMaterial
              color={halbachHighlighted ? HIGHLIGHT : "#aaaaaa"}
              emissive={halbachHighlighted ? "#8a7060" : "#000000"}
              emissiveIntensity={halbachHighlighted ? 0.5 : 0}
              metalness={0.95}
              roughness={0.1}
              clippingPlanes={clippingPlanes}
            />
          </mesh>

          {/* Magnet tiles — alternating polarity in Halbach pattern */}
          {Array.from({ length: tileCount }).map((_, i) => {
            // Halbach: 0=N↑ 1=H→ 2=S↓ 3=H�� cycling pattern
            const phase = i % 4;
            const isVerticalNorth = phase === 0;
            const isVerticalSouth = phase === 2;
            const isHorizontal = phase === 1 || phase === 3;
            const color = isVerticalNorth
              ? (halbachHighlighted ? "#8080c0" : "#2a3a6a")
              : isVerticalSouth
              ? (halbachHighlighted ? "#c08080" : "#5a2a2a")
              : (halbachHighlighted ? HIGHLIGHT : "#707070");
            const emissiveColor = isVerticalNorth
              ? "#0a0a30"
              : isVerticalSouth
              ? "#200808"
              : "#000000";

            return (
              <mesh
                key={`hb-${i}`}
                position={[0, FLOOR_Y - RAIL_HEIGHT / 2 + TILE_H / 2, -RAIL_HALF + i * TILE_D + TILE_D / 2]}
              >
                <boxGeometry args={[TILE_W, TILE_H, TILE_D - 0.01]} />
                <meshStandardMaterial
                  color={color}
                  emissive={emissiveColor}
                  emissiveIntensity={halbachHighlighted ? 0.6 : (isHorizontal ? 0 : 0.2)}
                  metalness={0.3}
                  roughness={0.4}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
            );
          })}
        </group>
      )}

      {/* === LIM STATOR SEGMENTS === */}
      {showLIM && Array.from({ length: segCount }).map((_, i) => {
        const z = -TUBE.length / 2 + i * SEG_SPACING + SEG_SPACING / 2;
        const baseColor = limHighlighted ? HIGHLIGHT : "#2a2a38";
        const emissive = limHighlighted ? "#8a7060" : "#3a3a7a";
        const ei = limHighlighted ? 0.5 : 0.1;

        return (
          <group key={`lim-${i}`}>
            {/* Left stator (9 o'clock) */}
            <group position={[-(TUBE.innerRadius - SEG_H / 2 - 0.01), 0, z]}>
              {/* Core body */}
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[SEG_H, SEG_W, SEG_D]} />
                <meshStandardMaterial
                  color={baseColor}
                  emissive={emissive}
                  emissiveIntensity={ei}
                  metalness={0.6}
                  roughness={0.5}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
              {/* Copper end windings — top and bottom caps */}
              {([-SEG_D / 2 - 0.01, SEG_D / 2 + 0.01] as number[]).map((dz) => (
                <mesh key={dz} position={[0, 0, dz]} rotation={[0, 0, Math.PI / 2]}>
                  <boxGeometry args={[SEG_H * 0.6, SEG_W * 0.7, 0.04]} />
                  <meshStandardMaterial
                    color={limHighlighted ? HIGHLIGHT : "#a0620a"}
                    emissive={limHighlighted ? "#8a7060" : "#6b3a00"}
                    emissiveIntensity={limHighlighted ? 0.5 : 0.25}
                    metalness={0.8}
                    roughness={0.3}
                    clippingPlanes={clippingPlanes}
                  />
                </mesh>
              ))}
              {/* Stator teeth — visible lamination slots */}
              {Array.from({ length: TOOTH_COUNT }).map((_, t) => (
                <mesh
                  key={t}
                  position={[SEG_H / 2 + 0.015, -SEG_W / 2 + (t + 0.5) * (SEG_W / TOOTH_COUNT), 0]}
                  rotation={[0, 0, Math.PI / 2]}
                >
                  <boxGeometry args={[0.03, 0.025, SEG_D * 0.85]} />
                  <meshStandardMaterial
                    color={limHighlighted ? "#e0c090" : "#1a1a28"}
                    emissive={limHighlighted ? "#8a7060" : "#000000"}
                    emissiveIntensity={limHighlighted ? 0.3 : 0}
                    metalness={0.7}
                    roughness={0.4}
                    clippingPlanes={clippingPlanes}
                  />
                </mesh>
              ))}
            </group>

            {/* Right stator (3 o'clock) */}
            <group position={[(TUBE.innerRadius - SEG_H / 2 - 0.01), 0, z]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[SEG_H, SEG_W, SEG_D]} />
                <meshStandardMaterial
                  color={baseColor}
                  emissive={emissive}
                  emissiveIntensity={ei}
                  metalness={0.6}
                  roughness={0.5}
                  clippingPlanes={clippingPlanes}
                />
              </mesh>
              {([-SEG_D / 2 - 0.01, SEG_D / 2 + 0.01] as number[]).map((dz) => (
                <mesh key={dz} position={[0, 0, dz]} rotation={[0, 0, Math.PI / 2]}>
                  <boxGeometry args={[SEG_H * 0.6, SEG_W * 0.7, 0.04]} />
                  <meshStandardMaterial
                    color={limHighlighted ? HIGHLIGHT : "#a0620a"}
                    emissive={limHighlighted ? "#8a7060" : "#6b3a00"}
                    emissiveIntensity={limHighlighted ? 0.5 : 0.25}
                    metalness={0.8}
                    roughness={0.3}
                    clippingPlanes={clippingPlanes}
                  />
                </mesh>
              ))}
              {Array.from({ length: TOOTH_COUNT }).map((_, t) => (
                <mesh
                  key={t}
                  position={[-(SEG_H / 2 + 0.015), -SEG_W / 2 + (t + 0.5) * (SEG_W / TOOTH_COUNT), 0]}
                  rotation={[0, 0, Math.PI / 2]}
                >
                  <boxGeometry args={[0.03, 0.025, SEG_D * 0.85]} />
                  <meshStandardMaterial
                    color={limHighlighted ? "#e0c090" : "#1a1a28"}
                    emissive={limHighlighted ? "#8a7060" : "#000000"}
                    emissiveIntensity={limHighlighted ? 0.3 : 0}
                    metalness={0.7}
                    roughness={0.4}
                    clippingPlanes={clippingPlanes}
                  />
                </mesh>
              ))}
            </group>
          </group>
        );
      })}
    </group>
  );
}
