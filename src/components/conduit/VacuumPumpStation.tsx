"use client";

import * as THREE from "three";
import { TUBE } from "./data/conduit-specs";
import type { ViewMode } from "./types";

const CLIP_PLANE = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
const CLIPPING_PLANES = [CLIP_PLANE];
const NO_CLIPPING: THREE.Plane[] = [];

interface VacuumPumpStationProps {
  show: boolean;
  viewMode: ViewMode;
}

function PumpStation({ position, clippingPlanes }: { position: [number, number, number]; clippingPlanes: THREE.Plane[] }) {
  const HOUSING_Y = TUBE.outerRadius + 0.4;
  return (
    <group position={position}>
      {/* Housing box */}
      <mesh position={[0, HOUSING_Y, 0]}>
        <boxGeometry args={[0.8, 0.6, 1.2]} />
        <meshStandardMaterial color="#333333" metalness={0.6} roughness={0.5} clippingPlanes={clippingPlanes} />
      </mesh>
      {/* Pipe stub */}
      <mesh position={[0, TUBE.outerRadius + 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.06, 0.06, 0.25, 16]} />
        <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.3} clippingPlanes={clippingPlanes} />
      </mesh>
    </group>
  );
}

const STATION_POSITIONS: [number, number, number][] = [
  [0, 0, -7],
  [0, 0, 8],
];

export default function VacuumPumpStation({ show, viewMode }: VacuumPumpStationProps) {
  if (!show) return null;
  const clippingPlanes = viewMode === "cutaway" ? CLIPPING_PLANES : NO_CLIPPING;
  return (
    <group>
      {STATION_POSITIONS.map((pos) => (
        <PumpStation key={pos[2]} position={pos} clippingPlanes={clippingPlanes} />
      ))}
    </group>
  );
}
