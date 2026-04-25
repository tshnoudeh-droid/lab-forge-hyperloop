"use client";

import * as THREE from "three";

interface TubeGeometryProps {
  viewMode: "cutaway" | "exterior" | "section";
}

export default function TubeGeometry({ viewMode }: TubeGeometryProps) {
  const INNER_R = 1.65;
  const OUTER_R = 1.77;
  const LENGTH = 30;
  const SEGMENTS = 64;

  const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0);
  const clippingPlanes = viewMode === "cutaway" ? [clipPlane] : [];

  if (viewMode === "section") {
    return (
      <group>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[INNER_R, OUTER_R, 64]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      {/* Outer shell */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[OUTER_R, OUTER_R, LENGTH, SEGMENTS, 1, true]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.85}
          roughness={0.3}
          side={THREE.DoubleSide}
          clippingPlanes={clippingPlanes}
          clipShadows={true}
        />
      </mesh>
      {/* Inner surface */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[INNER_R, INNER_R, LENGTH, SEGMENTS, 1, true]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.6}
          roughness={0.5}
          side={THREE.DoubleSide}
          clippingPlanes={clippingPlanes}
          clipShadows={true}
        />
      </mesh>
      {/* End caps */}
      {([-LENGTH / 2, LENGTH / 2] as const).map((z, i) => (
        <mesh key={i} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[INNER_R, OUTER_R, SEGMENTS]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.85}
            roughness={0.3}
            side={THREE.DoubleSide}
            clippingPlanes={clippingPlanes}
          />
        </mesh>
      ))}
    </group>
  );
}
