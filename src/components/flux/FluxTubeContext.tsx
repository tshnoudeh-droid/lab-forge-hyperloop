"use client";

import * as THREE from "three";
import { TUBE } from "@/components/conduit/data/conduit-specs";

// Floor Y = tube inner radius bottom surface (where Halbach track mounts)
const FLOOR_Y = -(TUBE.innerRadius - 0.02);

export default function FluxTubeContext({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <group>
      {/* Outer shell ghost */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry
          args={[TUBE.outerRadius, TUBE.outerRadius, TUBE.length, TUBE.segments, 1, true]}
        />
        <meshStandardMaterial
          color="#909090"
          transparent
          opacity={0.11}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Inner bore ghost */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry
          args={[TUBE.innerRadius, TUBE.innerRadius, TUBE.length, TUBE.segments, 1, true]}
        />
        <meshStandardMaterial
          color="#707070"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* End rings */}
      {([-TUBE.length / 2, TUBE.length / 2] as const).map((z, i) => (
        <mesh key={i} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[TUBE.innerRadius, TUBE.outerRadius, TUBE.segments]} />
          <meshStandardMaterial
            color="#888888"
            transparent
            opacity={0.18}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Mid cross-section ring — reveals spatial layout at Z=0 */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[TUBE.innerRadius, TUBE.outerRadius, TUBE.segments]} />
        <meshStandardMaterial
          color="#C4A882"
          transparent
          opacity={0.10}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Floor reference strip — Halbach track zone (0.44m wide, matches track width) */}
      <mesh position={[0, FLOOR_Y, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.44, 0.44, TUBE.length, 8, 1, true]} />
        <meshStandardMaterial
          color="#C4A882"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Wall seam lines — show tube segments at expansion joint spacing (every 10m in scene) */}
      {([-10, 0, 10] as const).map((z) => (
        <mesh key={z} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[TUBE.outerRadius - 0.005, TUBE.outerRadius + 0.005, TUBE.segments]} />
          <meshStandardMaterial
            color="#555555"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
