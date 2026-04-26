"use client";

import * as THREE from "three";
import { TUBE } from "./data/conduit-specs";
import type { ViewMode } from "./types";

const CLIP_PLANE = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
const CLIPPING_PLANES = [CLIP_PLANE];
const NO_CLIPPING: THREE.Plane[] = [];

interface ExpansionJointsProps {
  show: boolean;
  viewMode: ViewMode;
}

function BellowsJoint({ position, clippingPlanes }: { position: [number, number, number]; clippingPlanes: THREE.Plane[] }) {
  const CORRUGATIONS = 8;
  const CORRUGATION_STEP = 0.025;
  const totalHeight = CORRUGATIONS * CORRUGATION_STEP;

  return (
    <group position={position}>
      {/* Corrugation rings */}
      {Array.from({ length: CORRUGATIONS }).map((_, i) => (
        <mesh
          key={i}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, -totalHeight / 2 + i * CORRUGATION_STEP]}
        >
          <torusGeometry args={[TUBE.outerRadius + 0.015, 0.008, 8, 64]} />
          <meshStandardMaterial
            color="#888888"
            metalness={0.9}
            roughness={0.2}
            clippingPlanes={clippingPlanes}
          />
        </mesh>
      ))}
      {/* Sleeve cylinder */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[TUBE.outerRadius + 0.01, TUBE.outerRadius + 0.01, totalHeight, 32, 1, true]} />
        <meshStandardMaterial
          color="#666666"
          metalness={0.8}
          roughness={0.35}
          side={THREE.DoubleSide}
          clippingPlanes={clippingPlanes}
        />
      </mesh>
    </group>
  );
}

const JOINT_POSITIONS: [number, number, number][] = [
  [0, 0, -10],
  [0, 0, 0],
  [0, 0, 10],
];

export default function ExpansionJoints({ show, viewMode }: ExpansionJointsProps) {
  if (!show) return null;
  const clippingPlanes = viewMode === "cutaway" ? CLIPPING_PLANES : NO_CLIPPING;
  return (
    <group>
      {JOINT_POSITIONS.map((pos) => (
        <BellowsJoint key={pos[2]} position={pos} clippingPlanes={clippingPlanes} />
      ))}
    </group>
  );
}
