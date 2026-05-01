"use client";

import * as THREE from "three";
import { TUBE } from "./data/conduit-specs";

const CLIP_PLANE = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
const CLIPPING_PLANES = [CLIP_PLANE];
const NO_CLIPPING: THREE.Plane[] = [];

interface TubeGeometryProps {
  viewMode: "cutaway" | "exterior" | "section";
}

export default function TubeGeometry({ viewMode }: TubeGeometryProps) {
  const clippingPlanes = viewMode === "cutaway" ? CLIPPING_PLANES : NO_CLIPPING;

  if (viewMode === "section") {
    return (
      <group>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[TUBE.innerRadius, TUBE.outerRadius, 64]} />
          <meshStandardMaterial color="#787878" metalness={0.9} roughness={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      {/* Outer shell */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[TUBE.outerRadius, TUBE.outerRadius, TUBE.length, TUBE.segments, 1, true]} />
        <meshStandardMaterial
          color="#787878"
          metalness={0.9}
          roughness={0.2}
          side={THREE.DoubleSide}
          clippingPlanes={clippingPlanes}
          clipShadows={true}
        />
      </mesh>
      {/* Inner surface */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[TUBE.innerRadius, TUBE.innerRadius, TUBE.length, TUBE.segments, 1, true]} />
        <meshStandardMaterial
          color="#454545"
          metalness={0.6}
          roughness={0.5}
          side={THREE.DoubleSide}
          clippingPlanes={clippingPlanes}
          clipShadows={true}
        />
      </mesh>
      {/* End caps */}
      {([-TUBE.length / 2, TUBE.length / 2] as const).map((z, i) => (
        <mesh key={i} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[TUBE.innerRadius, TUBE.outerRadius, TUBE.segments]} />
          <meshStandardMaterial
            color="#787878"
            metalness={0.9}
            roughness={0.2}
            side={THREE.DoubleSide}
            clippingPlanes={clippingPlanes}
          />
        </mesh>
      ))}
    </group>
  );
}
