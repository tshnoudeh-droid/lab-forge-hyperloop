"use client";

import * as THREE from "three";
import { TUBE } from "@/components/conduit/data/conduit-specs";

export default function ShellTubeContext() {
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
          opacity={0.06}
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
          opacity={0.045}
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
            opacity={0.10}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Floor reference line — shows Halbach track level */}
      <mesh position={[0, -(TUBE.innerRadius - 0.02), 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.44, 0.44, TUBE.length, 8, 1, true]} />
        <meshStandardMaterial
          color="#C4A882"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
