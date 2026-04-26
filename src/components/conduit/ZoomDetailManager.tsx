"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";
import { TUBE } from "./data/conduit-specs";

const ZOOM_THRESHOLD = 8; // meters from world origin — shows detail below this distance

function DetailedBellows({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {Array.from({ length: 16 }).map((_, i) => {
        const r = TUBE.outerRadius + 0.012 + (i % 2) * 0.006;
        return (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.1 + i * 0.013]}>
            <torusGeometry args={[r, 0.004, 8, 64]} />
            <meshStandardMaterial color="#aaaaaa" metalness={0.95} roughness={0.1} />
          </mesh>
        );
      })}
    </group>
  );
}

function DetailedPumpFittings({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Flange ring */}
      <mesh position={[0, TUBE.outerRadius + 0.12, 0]}>
        <torusGeometry args={[0.12, 0.025, 8, 16]} />
        <meshStandardMaterial color="#666666" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Flange bolts */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.18,
              TUBE.outerRadius + 0.12,
              Math.sin(angle) * 0.18,
            ]}
          >
            <cylinderGeometry args={[0.01, 0.01, 0.04, 6]} />
            <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
          </mesh>
        );
      })}
    </group>
  );
}

const BELLOWS_POSITIONS: [number, number, number][] = [
  [0, 0, -10],
  [0, 0, 0],
  [0, 0, 10],
];

const PUMP_POSITIONS: [number, number, number][] = [
  [0, 0, -7],
  [0, 0, 8],
];

export default function ZoomDetailManager() {
  const { camera } = useThree();
  const [isZoomed, setIsZoomed] = useState(false);

  useFrame(() => {
    const dist = camera.position.length();
    const shouldBeZoomed = dist < ZOOM_THRESHOLD;
    if (shouldBeZoomed !== isZoomed) {
      setIsZoomed(shouldBeZoomed);
    }
  });

  if (!isZoomed) return null;

  return (
    <>
      {BELLOWS_POSITIONS.map((pos) => (
        <DetailedBellows key={pos[2]} position={pos} />
      ))}
      {PUMP_POSITIONS.map((pos) => (
        <DetailedPumpFittings key={pos[2]} position={pos} />
      ))}
    </>
  );
}
