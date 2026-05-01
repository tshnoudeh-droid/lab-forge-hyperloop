"use client";

import { TUBE } from "@/components/conduit/data/conduit-specs";

interface LIMStatorsProps {
  show: boolean;
  activeHotspot?: string | null;
}

const HIGHLIGHT = "#C4A882";
const HOTSPOT_ID = "F02";

const SEG_SPACING = 1.8;
const SEG_H = 0.12;
const SEG_W = 0.38;
const SEG_D = 1.5;
const TOOTH_COUNT = 5;

export default function LIMStators({ show, activeHotspot }: LIMStatorsProps) {
  if (!show) return null;
  const highlighted = activeHotspot === HOTSPOT_ID;
  const segCount = Math.floor(TUBE.length / SEG_SPACING);

  const baseColor = highlighted ? HIGHLIGHT : "#2a2a38";
  const emissive = highlighted ? "#8a7060" : "#3a3a7a";
  const ei = highlighted ? 0.5 : 0.1;

  return (
    <group>
      {Array.from({ length: segCount }).map((_, i) => {
        const z = -TUBE.length / 2 + i * SEG_SPACING + SEG_SPACING / 2;
        return (
          <group key={i}>
            {([-1, 1] as number[]).map((side) => {
              const x = side * (TUBE.innerRadius - SEG_H / 2 - 0.01);
              const toothX = side * (SEG_H / 2 + 0.015);
              return (
                <group key={side} position={[x, 0, z]}>
                  {/* Laminated stator core */}
                  <mesh rotation={[0, 0, Math.PI / 2]}>
                    <boxGeometry args={[SEG_H, SEG_W, SEG_D]} />
                    <meshStandardMaterial
                      color={baseColor}
                      emissive={emissive}
                      emissiveIntensity={ei}
                      metalness={0.6}
                      roughness={0.5}
                    />
                  </mesh>
                  {/* Copper end windings */}
                  {([-SEG_D / 2 - 0.01, SEG_D / 2 + 0.01] as number[]).map((dz) => (
                    <mesh key={dz} position={[0, 0, dz]} rotation={[0, 0, Math.PI / 2]}>
                      <boxGeometry args={[SEG_H * 0.6, SEG_W * 0.7, 0.04]} />
                      <meshStandardMaterial
                        color={highlighted ? HIGHLIGHT : "#a0620a"}
                        emissive={highlighted ? "#8a7060" : "#6b3a00"}
                        emissiveIntensity={highlighted ? 0.5 : 0.25}
                        metalness={0.8}
                        roughness={0.3}
                      />
                    </mesh>
                  ))}
                  {/* Stator teeth (lamination slots) */}
                  {Array.from({ length: TOOTH_COUNT }).map((_, t) => (
                    <mesh
                      key={t}
                      position={[
                        toothX,
                        -SEG_W / 2 + (t + 0.5) * (SEG_W / TOOTH_COUNT),
                        0,
                      ]}
                      rotation={[0, 0, Math.PI / 2]}
                    >
                      <boxGeometry args={[0.03, 0.025, SEG_D * 0.85]} />
                      <meshStandardMaterial
                        color={highlighted ? "#e0c090" : "#1a1a28"}
                        emissive={highlighted ? "#8a7060" : "#000000"}
                        emissiveIntensity={highlighted ? 0.3 : 0}
                        metalness={0.7}
                        roughness={0.4}
                      />
                    </mesh>
                  ))}
                </group>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}
