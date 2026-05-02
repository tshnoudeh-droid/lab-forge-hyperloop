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

const BRONZE = "#7a5520";
const BRONZE_DARK = "#4a3010";
const BRONZE_LIGHT = "#9a7040";
const CREAM = "#f0e8d0";

const { POD_Y, POD_SCALE_Y, UNDERBODY_H, SCALED_R_Y } = SHELL_GEOMETRY;
const BODY_BOTTOM_Y = POD_Y - SCALED_R_Y; // -1.145m

// Blunt hemispherical nose — max radius reached by z = -5m (fast flare)
function makePodProfile(): THREE.Vector2[] {
  return (
    [
      [0.0, -8.0], [0.4, -7.5], [0.82, -7.0],
      [1.1, -6.5], [1.24, -6.0], [1.29, -5.5], [1.3, -5.0],
      [1.3,  5.0],
      [1.28, 5.5], [1.2, 6.0], [1.05, 6.5],
      [0.82, 7.0], [0.62, 7.4], [0.45, 8.0],
    ] as [number, number][]
  ).map(([r, h]) => new THREE.Vector2(r, h));
}

function makeNoseProfile(): THREE.Vector2[] {
  return (
    [
      [0.0, -8.0], [0.4, -7.5], [0.82, -7.0],
      [1.1, -6.5], [1.24, -6.0], [1.29, -5.5],
    ] as [number, number][]
  ).map(([r, h]) => new THREE.Vector2(r, h));
}

const RING_Z = [-3.5, -1.75, 0, 1.75, 3.5] as const;
const TAIL_RING_RADII = [0.4, 0.32, 0.26, 0.2, 0.14, 0.08] as const;
const GRILLE_SLATS = 8;

export default function PodShell({ show, activeHotspot, variant = "cargo" }: PodShellProps) {
  if (!show) return null;

  const noseHighlighted = activeHotspot === "S01";
  const highlighted = noseHighlighted || activeHotspot === "S02";
  const isCargo = variant === "cargo";

  const podProfile = useMemo(() => makePodProfile(), []);
  const noseProfile = useMemo(() => makeNoseProfile(), []);

  const emissive = highlighted ? "#7a5020" : "#000000";
  const ei = highlighted ? 0.28 : 0;

  const clipPlanes = useMemo(
    () =>
      variant === "passenger"
        ? [new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.1)]
        : [],
    [variant]
  );

  return (
    <>
      {/* SCALED GROUP — body geometry squished Y × 0.55 for wide/flat DX-1 proportions */}
      <group position={[0, POD_Y, 0]} scale={[1, POD_SCALE_Y, 1]}>

        {/* Main hull */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <latheGeometry args={[podProfile, 64]} />
          <meshStandardMaterial
            color={BRONZE}
            emissive={emissive}
            emissiveIntensity={ei}
            roughness={0.38}
            metalness={0.72}
            transparent={isCargo}
            opacity={isCargo ? 0.25 : 1.0}
            clippingPlanes={clipPlanes}
            clipShadows
          />
        </mesh>

        {/* Nose highlight overlay */}
        {noseHighlighted && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <latheGeometry args={[noseProfile, 32]} />
            <meshStandardMaterial
              color={BRONZE_LIGHT}
              emissive="#9a7040"
              emissiveIntensity={0.7}
              roughness={0.25}
              metalness={0.8}
            />
          </mesh>
        )}

        {/* Interior barrel (passenger cutaway) */}
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

        {/* Panel seam rings — circumferential at body-section Z positions */}
        {RING_Z.map((z) => (
          <mesh key={z} position={[0, 0, z]}>
            <torusGeometry args={[POD.outerRadius + 0.006, 0.007, 6, 64]} />
            <meshStandardMaterial
              color={BRONZE_DARK}
              roughness={0.5}
              metalness={0.6}
              transparent={isCargo}
              opacity={isCargo ? 0.5 : 1.0}
            />
          </mesh>
        ))}

        {/* Tail concentric rings — largest outer to innermost red */}
        {TAIL_RING_RADII.map((r, i) => (
          <mesh key={r} position={[0, 0, 8.0]}>
            <torusGeometry args={[r, 0.009, 8, 48]} />
            <meshStandardMaterial
              color={i === TAIL_RING_RADII.length - 1 ? "#cc2200" : BRONZE_DARK}
              roughness={0.35}
              metalness={0.8}
            />
          </mesh>
        ))}

        {/* Tail backing disk */}
        <mesh position={[0, 0, 8.0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.43, 0.43, 0.012, 48]} />
          <meshStandardMaterial color="#1e1006" roughness={0.55} metalness={0.6} />
        </mesh>

        {/* Red center port */}
        <mesh position={[0, 0, 8.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.016, 32]} />
          <meshStandardMaterial color="#cc2200" emissive="#881100" emissiveIntensity={0.5} roughness={0.3} metalness={0.5} />
        </mesh>

        {/* Top grille panels — two recessed vents */}
        {([-2.6, 2.6] as number[]).map((z) => (
          <group key={z} position={[0, POD.outerRadius - 0.004, z]}>
            <mesh>
              <boxGeometry args={[0.62, 0.016, 0.86]} />
              <meshStandardMaterial color="#1e1006" roughness={0.7} metalness={0.3} />
            </mesh>
            {Array.from({ length: GRILLE_SLATS }).map((_, si) => {
              const sz = -0.35 + si * (0.7 / (GRILLE_SLATS - 1));
              return (
                <mesh key={si} position={[0, 0.012, sz]}>
                  <boxGeometry args={[0.52, 0.008, 0.06]} />
                  <meshStandardMaterial color={BRONZE_DARK} roughness={0.4} metalness={0.7} />
                </mesh>
              );
            })}
          </group>
        ))}

        {/* Top spine — longitudinal centerline ridge */}
        <mesh position={[0, POD.outerRadius + 0.004, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.013, 0.013, 9.8, 8]} />
          <meshStandardMaterial
            color={BRONZE_LIGHT}
            metalness={0.72}
            roughness={0.32}
            transparent={isCargo}
            opacity={isCargo ? 0.5 : 1.0}
          />
        </mesh>

      </group>

      {/* OUTSIDE SCALED GROUP — flat panels and text (no Y squish) */}

      {/* Underbody flat panel */}
      <mesh position={[0, BODY_BOTTOM_Y - UNDERBODY_H / 2, 0]}>
        <boxGeometry args={[1.78, UNDERBODY_H, 13.4]} />
        <meshStandardMaterial
          color={BRONZE_DARK}
          roughness={0.55}
          metalness={0.5}
          transparent={isCargo}
          opacity={isCargo ? 0.28 : 1.0}
        />
      </mesh>

      {/* Chine lines at body-to-underbody junction */}
      {([-0.86, 0.86] as number[]).map((x) => (
        <mesh key={x} position={[x, BODY_BOTTOM_Y + 0.002, 0]}>
          <boxGeometry args={[0.015, 0.006, 14.0]} />
          <meshStandardMaterial color={BRONZE_LIGHT} roughness={0.28} metalness={0.8} />
        </mesh>
      ))}

      {/* Nose sensor ports */}
      {([-0.26, 0.26] as number[]).map((x) => (
        <mesh key={x} position={[x, POD_Y, -8.12]}>
          <cylinderGeometry args={[0.034, 0.034, 0.018, 10]} />
          <meshStandardMaterial color={BRONZE_LIGHT} roughness={0.22} metalness={0.88} />
        </mesh>
      ))}

      {/* "FORGE" large side branding */}
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

      {/* "HYPERLOOP DX - 1" subtitle */}
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

      {/* "F" logo on top surface */}
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

      {/* "DX-1" on top surface */}
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
