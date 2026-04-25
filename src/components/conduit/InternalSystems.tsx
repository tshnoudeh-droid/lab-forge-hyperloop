"use client";

import * as THREE from "three";
import { TUBE } from "./data/conduit-specs";
import type { ViewMode } from "./types";

// Module-level constants to avoid per-render allocation
const CLIP_PLANE = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
const CLIPPING_PLANES = [CLIP_PLANE];
const NO_CLIPPING: THREE.Plane[] = [];

interface InternalSystemsProps {
  showHalbach: boolean;
  showLIM: boolean;
  viewMode: ViewMode;
}

export default function InternalSystems({ showHalbach, showLIM, viewMode }: InternalSystemsProps) {
  const clippingPlanes = viewMode === "cutaway" ? CLIPPING_PLANES : NO_CLIPPING;

  const POLE_WIDTH = 0.3;
  const poleCount = Math.floor(TUBE.length / POLE_WIDTH);

  const LIM_SPACING = 2;
  const segCount = Math.floor(TUBE.length / LIM_SPACING);

  return (
    <group>
      {/* Halbach array magnetic track on tube floor */}
      {showHalbach && Array.from({ length: poleCount }).map((_, i) => {
        const isNorth = i % 2 === 0;
        return (
          <mesh
            key={`halbach-${i}`}
            position={[0, -(TUBE.innerRadius - 0.03), -TUBE.length / 2 + i * POLE_WIDTH + POLE_WIDTH / 2]}
          >
            <boxGeometry args={[0.6, 0.04, POLE_WIDTH - 0.02]} />
            <meshStandardMaterial
              color={isNorth ? "#1a3a6e" : "#6e1a1a"}
              emissive={isNorth ? "#0a1a40" : "#401a0a"}
              emissiveIntensity={0.3}
              clippingPlanes={clippingPlanes}
            />
          </mesh>
        );
      })}

      {/* LIM stator segments on tube wall at 3 and 9 o'clock */}
      {showLIM && Array.from({ length: segCount }).map((_, i) => {
        const z = -TUBE.length / 2 + i * LIM_SPACING + LIM_SPACING / 2;
        return (
          <group key={`lim-${i}`}>
            {/* Left side (9 o'clock) */}
            <mesh
              position={[-(TUBE.innerRadius - 0.08), 0, z]}
              rotation={[0, 0, -Math.PI / 2]}
            >
              <boxGeometry args={[0.08, 0.4, 1.6]} />
              <meshStandardMaterial
                color="#2a2a3a"
                emissive="#3a3a6e"
                emissiveIntensity={0.15}
                clippingPlanes={clippingPlanes}
              />
            </mesh>
            {/* Right side (3 o'clock) */}
            <mesh
              position={[(TUBE.innerRadius - 0.08), 0, z]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <boxGeometry args={[0.08, 0.4, 1.6]} />
              <meshStandardMaterial
                color="#2a2a3a"
                emissive="#3a3a6e"
                emissiveIntensity={0.15}
                clippingPlanes={clippingPlanes}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
