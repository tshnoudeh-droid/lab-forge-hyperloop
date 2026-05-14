"use client";

import * as THREE from "three";
import { useMemo } from "react";
import { Text } from "@react-three/drei";
import { POD, SHELL_GEOMETRY } from "./data/shell-specs";

interface PodShellProps {
  show: boolean;
  activeHotspot?: string | null;
  variant?: "cargo" | "passenger";
}

// Warm bronze matching reference render — high gloss
const BRONZE = "#7A5418";
const BRONZE_DARK = "#3a1e06";
const CREAM = "#f0e8d0";

const { POD_Y, POD_SCALE_Y, UNDERBODY_H, SCALED_R_Y } = SHELL_GEOMETRY;
const BODY_BOTTOM_Y = POD_Y - SCALED_R_Y;

// Smooth, symmetric rounded-capsule profile matching reference image
// Both ends taper identically (bidirectional design)
function makePodProfile(): THREE.Vector2[] {
  return (
    [
      [0.0,  -8.0],
      [0.28, -7.75],
      [0.58, -7.3],
      [0.88, -6.7],
      [1.1,  -6.0],
      [1.22, -5.1],
      [1.28, -4.0],
      [1.3,  -2.6],
      [1.3,   2.6],
      [1.28,  4.0],
      [1.22,  5.1],
      [1.1,   6.0],
      [0.88,  6.7],
      [0.58,  7.3],
      [0.28,  7.75],
      [0.0,   8.0],
    ] as [number, number][]
  ).map(([r, h]) => new THREE.Vector2(r, h));
}

export default function PodShell({ show, activeHotspot, variant = "cargo" }: PodShellProps) {
  if (!show) return null;

  const noseHighlighted = activeHotspot === "S01";
  const highlighted = noseHighlighted || activeHotspot === "S02";
  const isCargo = variant === "cargo";

  const podProfile = useMemo(() => makePodProfile(), []);

  const emissive = highlighted ? "#6a4010" : "#000000";
  const ei = highlighted ? 0.18 : 0;

  const clipPlanes = useMemo(
    () =>
      variant === "passenger"
        ? [new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.1)]
        : [],
    [variant]
  );

  return (
    <>
      {/* SCALED GROUP — Y squish for wide/flat cross-section */}
      <group position={[0, POD_Y, 0]} scale={[1, POD_SCALE_Y, 1]}>

        {/* Main hull — high-gloss bronze capsule */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <latheGeometry args={[podProfile, 128]} />
          <meshStandardMaterial
            color={BRONZE}
            emissive={emissive}
            emissiveIntensity={ei}
            roughness={0.08}
            metalness={0.88}
            transparent={isCargo}
            opacity={isCargo ? 0.3 : 1.0}
            clippingPlanes={clipPlanes}
            clipShadows
          />
        </mesh>

        {/* Interior barrel visible in passenger cutaway */}
        {variant === "passenger" && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[POD.innerRadius, POD.innerRadius, 14.0, 64, 1, true]} />
            <meshStandardMaterial
              color="#e8e2d6"
              side={THREE.BackSide}
              roughness={0.75}
              metalness={0}
              clippingPlanes={clipPlanes}
            />
          </mesh>
        )}

      </group>

      {/* OUTSIDE SCALED GROUP — underbody + labels (no Y squish) */}

      {/* Flat underbody platform */}
      <mesh position={[0, BODY_BOTTOM_Y - UNDERBODY_H / 2, 0]}>
        <boxGeometry args={[1.78, UNDERBODY_H, 13.4]} />
        <meshStandardMaterial
          color={BRONZE_DARK}
          roughness={0.45}
          metalness={0.55}
          transparent={isCargo}
          opacity={isCargo ? 0.28 : 1.0}
        />
      </mesh>

      {/* FORGE side branding */}
      <Text
        position={[POD.outerRadius + 0.05, POD_Y + 0.2, 1.6]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.4}
        color={CREAM}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
        maxWidth={5}
      >
        FORGE
      </Text>

      {/* HYPERLOOP DX-1 subtitle */}
      <Text
        position={[POD.outerRadius + 0.05, POD_Y - 0.14, 1.6]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.125}
        color={CREAM}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
        maxWidth={5}
      >
        HYPERLOOP  DX - 1
      </Text>

      {/* F logo on top surface */}
      <Text
        position={[0, POD_Y + SCALED_R_Y + 0.015, 1.3]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.52}
        color={CREAM}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0}
        maxWidth={2}
      >
        F
      </Text>

      {/* DX-1 on top surface */}
      <Text
        position={[0, POD_Y + SCALED_R_Y + 0.015, -0.7]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.2}
        color={CREAM}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.14}
        maxWidth={2}
      >
        DX-1
      </Text>
    </>
  );
}
