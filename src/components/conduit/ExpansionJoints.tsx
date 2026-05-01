"use client";

import * as THREE from "three";
import { TUBE } from "./data/conduit-specs";
import type { ViewMode } from "./types";

const CLIP_PLANE = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
const CLIPPING_PLANES = [CLIP_PLANE];
const NO_CLIPPING: THREE.Plane[] = [];

const HIGHLIGHT = "#C4A882";

interface ExpansionJointsProps {
  show: boolean;
  viewMode: ViewMode;
  activeHotspot?: string | null;
}

function BellowsJoint({
  position,
  clippingPlanes,
  highlighted,
}: {
  position: [number, number, number];
  clippingPlanes: THREE.Plane[];
  highlighted: boolean;
}) {
  const CORRUGATIONS = 10;
  const CORRUGATION_STEP = 0.022;
  const totalHeight = CORRUGATIONS * CORRUGATION_STEP;
  const ringColor = highlighted ? HIGHLIGHT : "#888888";
  const emissive = highlighted ? "#8a7060" : "#000000";
  const ei = highlighted ? 0.5 : 0;

  return (
    <group position={position}>
      {/* Corrugation rings */}
      {Array.from({ length: CORRUGATIONS }).map((_, i) => (
        <mesh
          key={i}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, -totalHeight / 2 + i * CORRUGATION_STEP]}
        >
          <torusGeometry args={[TUBE.outerRadius + 0.018, 0.007, 10, 64]} />
          <meshStandardMaterial
            color={ringColor}
            emissive={emissive}
            emissiveIntensity={ei}
            metalness={0.92}
            roughness={0.15}
            clippingPlanes={clippingPlanes}
          />
        </mesh>
      ))}
      {/* Inner sleeve */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry
          args={[TUBE.outerRadius + 0.01, TUBE.outerRadius + 0.01, totalHeight, 32, 1, true]}
        />
        <meshStandardMaterial
          color={highlighted ? "#b09870" : "#5a5a5a"}
          emissive={emissive}
          emissiveIntensity={ei * 0.6}
          metalness={0.82}
          roughness={0.3}
          side={THREE.DoubleSide}
          clippingPlanes={clippingPlanes}
        />
      </mesh>
      {/* End flanges */}
      {([-totalHeight / 2, totalHeight / 2] as number[]).map((z) => (
        <mesh key={z} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z]}>
          <torusGeometry args={[TUBE.outerRadius + 0.02, 0.015, 8, 32]} />
          <meshStandardMaterial
            color={highlighted ? HIGHLIGHT : "#707070"}
            emissive={emissive}
            emissiveIntensity={ei}
            metalness={0.88}
            roughness={0.2}
            clippingPlanes={clippingPlanes}
          />
        </mesh>
      ))}
    </group>
  );
}

const JOINT_POSITIONS: [number, number, number][] = [
  [0, 0, -10],
  [0, 0, 0],
  [0, 0, 10],
];

export default function ExpansionJoints({ show, viewMode, activeHotspot }: ExpansionJointsProps) {
  if (!show) return null;
  const clippingPlanes = viewMode === "cutaway" ? CLIPPING_PLANES : NO_CLIPPING;
  const highlighted = activeHotspot === "03" || activeHotspot === "08";
  return (
    <group>
      {JOINT_POSITIONS.map((pos) => (
        <BellowsJoint key={pos[2]} position={pos} clippingPlanes={clippingPlanes} highlighted={highlighted} />
      ))}
    </group>
  );
}
