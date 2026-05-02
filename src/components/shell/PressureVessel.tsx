"use client";

import * as THREE from "three";
import { POD, SHELL_GEOMETRY } from "./data/shell-specs";

interface PressureVesselProps {
  show: boolean;
  activeHotspot?: string | null;
}

const HIGHLIGHT = "#C4A882";
const HOTSPOT_ID = "S02";
const POD_Y = SHELL_GEOMETRY.POD_Y;
const HALF_FUSE = POD.fuselageLength / 2;
// Pressure vessel extends slightly inside nose/tail fairings
const VESSEL_LENGTH = POD.fuselageLength + 2.0;

export default function PressureVessel({ show, activeHotspot }: PressureVesselProps) {
  if (!show) return null;
  const highlighted = activeHotspot === HOTSPOT_ID;

  return (
    <group position={[0, POD_Y, 0]}>
      {/* Inner pressure vessel wall */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry
          args={[POD.innerRadius, POD.innerRadius, VESSEL_LENGTH, 48, 1, true]}
        />
        <meshStandardMaterial
          color={highlighted ? HIGHLIGHT : "#e8e0d4"}
          emissive={highlighted ? "#8a7060" : "#000000"}
          emissiveIntensity={highlighted ? 0.3 : 0}
          transparent
          opacity={highlighted ? 0.55 : 0.22}
          side={THREE.DoubleSide}
          depthWrite={false}
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>

      {/* Forward pressure bulkhead */}
      <mesh position={[0, 0, -(HALF_FUSE + 0.9)]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[POD.innerRadius, 48]} />
        <meshStandardMaterial
          color={highlighted ? HIGHLIGHT : "#d0c8bc"}
          emissive={highlighted ? "#8a7060" : "#000000"}
          emissiveIntensity={highlighted ? 0.4 : 0}
          transparent
          opacity={highlighted ? 0.65 : 0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>

      {/* Aft pressure bulkhead */}
      <mesh position={[0, 0, HALF_FUSE + 0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[POD.innerRadius, 48]} />
        <meshStandardMaterial
          color={highlighted ? HIGHLIGHT : "#d0c8bc"}
          emissive={highlighted ? "#8a7060" : "#000000"}
          emissiveIntensity={highlighted ? 0.4 : 0}
          transparent
          opacity={highlighted ? 0.65 : 0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
          metalness={0.2}
          roughness={0.6}
        />
      </mesh>

      {/* Wall thickness indicator rings — show the 80mm wall */}
      {([-4, -2, 0, 2, 4] as number[]).map((z) => (
        <mesh key={z} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[POD.innerRadius, POD.outerRadius, 48]} />
          <meshStandardMaterial
            color={highlighted ? HIGHLIGHT : "#b0a898"}
            emissive={highlighted ? "#8a7060" : "#000000"}
            emissiveIntensity={highlighted ? 0.5 : 0}
            transparent
            opacity={highlighted ? 0.7 : 0.18}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
