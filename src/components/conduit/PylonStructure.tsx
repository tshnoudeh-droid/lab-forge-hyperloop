"use client";

import { TUBE } from "./data/conduit-specs";

interface PylonStructureProps {
  show: boolean;
}

const PYLON_GROUND_Y = -7.5;
const PYLON_HEIGHT = Math.abs(PYLON_GROUND_Y) - TUBE.outerRadius;

function Pylon({ position }: { position: [number, number, number] }) {
  const BASE_Y = PYLON_GROUND_Y;
  const TOP_Y = -TUBE.outerRadius;
  const HEIGHT = TOP_Y - BASE_Y;
  const MID_Y = BASE_Y + HEIGHT / 2;

  return (
    <group position={position}>
      {/* I-beam web (vertical center plate) */}
      <mesh position={[0, MID_Y, 0]}>
        <boxGeometry args={[0.08, HEIGHT, 0.5]} />
        <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* I-beam flanges (top and bottom horizontal plates) */}
      <mesh position={[0, TOP_Y, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, BASE_Y + 0.15, 0]}>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* X-diagonal bracing — two crossing rods */}
      <mesh position={[-0.15, MID_Y, 0]} rotation={[0, 0, Math.atan2(HEIGHT, 0.3)]}>
        <boxGeometry args={[0.04, Math.sqrt(HEIGHT * HEIGHT + 0.09), 0.04]} />
        <meshStandardMaterial color="#555555" metalness={0.6} roughness={0.5} />
      </mesh>
      <mesh position={[0.15, MID_Y, 0]} rotation={[0, 0, -Math.atan2(HEIGHT, 0.3)]}>
        <boxGeometry args={[0.04, Math.sqrt(HEIGHT * HEIGHT + 0.09), 0.04]} />
        <meshStandardMaterial color="#555555" metalness={0.6} roughness={0.5} />
      </mesh>
      {/* Seismic base plate */}
      <mesh position={[0, BASE_Y, 0]}>
        <boxGeometry args={[1.2, 0.15, 1.2]} />
        <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.6} />
      </mesh>
      {/* Cradle at top (contacts tube) */}
      <mesh position={[0, TOP_Y - 0.12, 0]}>
        <boxGeometry args={[0.6, 0.15, 0.6]} />
        <meshStandardMaterial color="#444444" metalness={0.7} roughness={0.4} />
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

export default function PylonStructure({ show }: PylonStructureProps) {
  if (!show) return null;
  return (
    <group>
      {PYLON_POSITIONS.map((pos) => (
        <Pylon key={pos[2]} position={pos} />
      ))}
    </group>
  );
}
