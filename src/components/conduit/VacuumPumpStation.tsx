"use client";

import * as THREE from "three";
import { TUBE } from "./data/conduit-specs";
import type { ViewMode } from "./types";

const CLIP_PLANE = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
const CLIPPING_PLANES = [CLIP_PLANE];
const NO_CLIPPING: THREE.Plane[] = [];

const HIGHLIGHT = "#C4A882";

interface VacuumPumpStationProps {
  show: boolean;
  viewMode: ViewMode;
  activeHotspot?: string | null;
}

function PumpStation({
  position,
  clippingPlanes,
  highlighted,
}: {
  position: [number, number, number];
  clippingPlanes: THREE.Plane[];
  highlighted: boolean;
}) {
  const BASE = TUBE.outerRadius;
  const emissive = highlighted ? "#8a7060" : "#000000";
  const ei = highlighted ? 0.6 : 0;

  const mat = (color: string) => ({
    color: highlighted ? HIGHLIGHT : color,
    emissive: emissive,
    emissiveIntensity: ei,
    metalness: 0.85,
    roughness: 0.15,
    clippingPlanes,
  });

  const dimMat = (color: string) => ({
    ...mat(color),
    metalness: 0.5,
    roughness: 0.5,
  });

  return (
    <group position={position}>
      {/* Inlet port on tube wall — short stub */}
      <mesh position={[0, BASE + 0.12, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.24, 16]} />
        <meshStandardMaterial {...mat("#585858")} />
      </mesh>
      {/* Inlet flange */}
      <mesh position={[0, BASE + 0.26, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.04, 16]} />
        <meshStandardMaterial {...mat("#444444")} />
      </mesh>
      {/* Isolation valve body */}
      <mesh position={[0, BASE + 0.42, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.2, 16]} />
        <meshStandardMaterial {...mat("#3a3a3a")} />
      </mesh>
      {/* Valve actuator handle */}
      <mesh position={[0.16, BASE + 0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.28, 10]} />
        <meshStandardMaterial {...dimMat("#666666")} />
      </mesh>

      {/* Turbomolecular pump — main body (tall cylinder) */}
      <mesh position={[0, BASE + 0.88, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.72, 24]} />
        <meshStandardMaterial {...mat("#2e2e2e")} />
      </mesh>
      {/* Pump body ribbing — 3 bands */}
      {([0.2, 0, -0.2] as number[]).map((dy) => (
        <mesh key={dy} position={[0, BASE + 0.88 + dy, 0]}>
          <cylinderGeometry args={[0.235, 0.235, 0.04, 24]} />
          <meshStandardMaterial {...mat("#404040")} />
        </mesh>
      ))}
      {/* Pump top cap dome */}
      <mesh position={[0, BASE + 1.27, 0]}>
        <cylinderGeometry args={[0.22, 0.12, 0.12, 24]} />
        <meshStandardMaterial {...mat("#252525")} />
      </mesh>
      {/* Pump base flange connects to valve */}
      <mesh position={[0, BASE + 0.52, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 24]} />
        <meshStandardMaterial {...mat("#383838")} />
      </mesh>

      {/* Backing / roughing pump — smaller cylinder to side */}
      <mesh position={[0.38, BASE + 0.7, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.55, 16]} />
        <meshStandardMaterial {...mat("#484848")} />
      </mesh>
      {/* Roughing pump top cap */}
      <mesh position={[0.38, BASE + 0.995, 0]}>
        <cylinderGeometry args={[0.1, 0.07, 0.07, 16]} />
        <meshStandardMaterial {...mat("#383838")} />
      </mesh>
      {/* Roughing pump base flange */}
      <mesh position={[0.38, BASE + 0.42, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.04, 16]} />
        <meshStandardMaterial {...mat("#383838")} />
      </mesh>

      {/* Foreline pipe: turbopump to roughing pump */}
      <mesh position={[0.19, BASE + 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.38, 12]} />
        <meshStandardMaterial {...mat("#555555")} />
      </mesh>

      {/* Exhaust port (top of roughing pump) */}
      <mesh position={[0.38, BASE + 1.1, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.2, 10]} />
        <meshStandardMaterial {...dimMat("#555555")} />
      </mesh>

      {/* Instrumentation / control box */}
      <mesh position={[-0.32, BASE + 0.75, 0]}>
        <boxGeometry args={[0.22, 0.4, 0.16]} />
        <meshStandardMaterial {...dimMat("#282828")} />
      </mesh>
      {/* Control box indicator LED strip */}
      <mesh position={[-0.32, BASE + 0.88, 0.085]}>
        <boxGeometry args={[0.14, 0.05, 0.005]} />
        <meshStandardMaterial
          color={highlighted ? "#C4A882" : "#44ff88"}
          emissive={highlighted ? "#C4A882" : "#44ff88"}
          emissiveIntensity={highlighted ? 1.0 : 0.8}
          clippingPlanes={clippingPlanes}
        />
      </mesh>
    </group>
  );
}

const STATION_POSITIONS: [number, number, number][] = [
  [0, 0, -7],
  [0, 0, 8],
];

export default function VacuumPumpStation({ show, viewMode, activeHotspot }: VacuumPumpStationProps) {
  if (!show) return null;
  const clippingPlanes = viewMode === "cutaway" ? CLIPPING_PLANES : NO_CLIPPING;
  const highlighted = activeHotspot === "02";
  return (
    <group>
      {STATION_POSITIONS.map((pos) => (
        <PumpStation key={pos[2]} position={pos} clippingPlanes={clippingPlanes} highlighted={highlighted} />
      ))}
    </group>
  );
}
