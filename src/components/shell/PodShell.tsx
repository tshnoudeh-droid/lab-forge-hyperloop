"use client";

import * as THREE from "three";
import { useMemo } from "react";
import { Text } from "@react-three/drei";
import { TUBE } from "@/components/conduit/data/conduit-specs";
import { POD } from "./data/shell-specs";

interface PodShellProps {
  show: boolean;
  activeHotspot?: string | null;
  variant?: "cargo" | "passenger";
}

const BRAND = "#C4A882";
const BAND_COLOR = "#7a5c3a";
const TEXT_COLOR = "#0a0a0a";
const HOTSPOT_IDS = ["S01", "S02"];

const FLOOR_Y = -(TUBE.innerRadius - 0.02);
const POD_Y = FLOOR_Y + 0.10 + POD.outerRadius;

// XP-1 inspired torpedo profile — revolves around Y axis
// y spans -8 (nose tip) to +8 (tail tip), x = radius
function makePodProfile(): THREE.Vector2[] {
  const R = POD.outerRadius;
  const pts: THREE.Vector2[] = [];
  // Nose section: y = -8 to -4 (sinusoidal flare — blunt rounded nose like XP-1)
  const NOSE_SEGS = 8;
  for (let i = 0; i <= NOSE_SEGS; i++) {
    const t = i / NOSE_SEGS;
    pts.push(new THREE.Vector2(R * Math.sin((t * Math.PI) / 2), -8 + 4 * t));
  }
  // Constant body: y = -4 to +4
  pts.push(new THREE.Vector2(R, 4));
  // Tail section: y = +4 to +8 (mirror of nose)
  for (let i = 1; i <= NOSE_SEGS; i++) {
    const t = i / NOSE_SEGS;
    pts.push(new THREE.Vector2(R * Math.cos((t * Math.PI) / 2), 4 + 4 * t));
  }
  return pts;
}

// Raised branding band — slight proud ridge at mid-body
function makeBandProfile(): THREE.Vector2[] {
  const R = POD.outerRadius;
  return [
    new THREE.Vector2(R - 0.001, -2.9),
    new THREE.Vector2(R + 0.006, -2.7),
    new THREE.Vector2(R + 0.006, 2.7),
    new THREE.Vector2(R - 0.001, 2.9),
  ];
}

// Panel line ring profile
function makeRingProfile(z: number): THREE.Vector2[] {
  const R = POD.outerRadius;
  return [
    new THREE.Vector2(R - 0.001, z - 0.012),
    new THREE.Vector2(R + 0.008, z - 0.006),
    new THREE.Vector2(R + 0.008, z + 0.006),
    new THREE.Vector2(R - 0.001, z + 0.012),
  ];
}

export default function PodShell({ show, activeHotspot, variant = "cargo" }: PodShellProps) {
  if (!show) return null;

  const highlighted = HOTSPOT_IDS.includes(activeHotspot ?? "");
  const noseHighlighted = activeHotspot === "S01";

  const podProfile = useMemo(() => makePodProfile(), []);
  const bandProfile = useMemo(() => makeBandProfile(), []);

  // Passenger cutaway: clip the +X quadrant so camera at [12,6,20] sees interior
  const clipPlanes = useMemo(() => {
    if (variant === "passenger") {
      return [new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.1)];
    }
    return [];
  }, [variant]);

  const isCargo = variant === "cargo";
  const podOpacity = isCargo ? 0.22 : 1.0;

  const emissive = highlighted ? "#8a7060" : "#000000";
  const ei = highlighted ? 0.35 : 0;

  // Panel line ring Z positions on the body section
  const RING_Z = [-3.5, -1.75, 0, 1.75, 3.5];

  return (
    <group position={[0, POD_Y, 0]}>

      {/* Main pod exterior — LatheGeometry torpedo */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <latheGeometry args={[podProfile, 64]} />
        <meshStandardMaterial
          color={BRAND}
          emissive={emissive}
          emissiveIntensity={ei}
          roughness={0.42}
          metalness={0.14}
          transparent={isCargo}
          opacity={podOpacity}
          clippingPlanes={clipPlanes}
          clipShadows
        />
      </mesh>

      {/* Inner surface visible during passenger cutaway */}
      {variant === "passenger" && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[POD.innerRadius, POD.innerRadius, POD.fuselageLength + 7.8, 64, 1, true]} />
          <meshStandardMaterial
            color="#e8e2d6"
            side={THREE.BackSide}
            roughness={0.75}
            metalness={0.0}
            clippingPlanes={clipPlanes}
          />
        </mesh>
      )}

      {/* Forward nose-cone highlight ring */}
      {noseHighlighted && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <latheGeometry args={[
            [new THREE.Vector2(0, -8), new THREE.Vector2(0.22, -7.4), new THREE.Vector2(0.68, -6.3), new THREE.Vector2(1.12, -5.1), new THREE.Vector2(1.28 + 0.01, -3.9)],
            32
          ]} />
          <meshStandardMaterial
            color={BRAND}
            emissive="#9a8060"
            emissiveIntensity={0.6}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
      )}

      {/* Branding band — darker raised ridge along mid-body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <latheGeometry args={[bandProfile, 64]} />
        <meshStandardMaterial
          color={BAND_COLOR}
          emissive={emissive}
          emissiveIntensity={ei * 0.5}
          roughness={0.5}
          metalness={0.2}
          transparent={isCargo}
          opacity={isCargo ? 0.4 : 1.0}
        />
      </mesh>

      {/* Panel line rings — circumferential seams */}
      {RING_Z.map((z) => (
        <mesh key={z} rotation={[Math.PI / 2, 0, 0]}>
          <latheGeometry args={[makeRingProfile(z), 48]} />
          <meshStandardMaterial
            color={highlighted ? "#5a3a1a" : "#6a4a2a"}
            emissive={emissive}
            emissiveIntensity={ei * 0.3}
            roughness={0.55}
            metalness={0.3}
            transparent={isCargo}
            opacity={isCargo ? 0.5 : 1.0}
          />
        </mesh>
      ))}

      {/* Longitudinal spine — top centerline structural element */}
      <mesh position={[0, POD.outerRadius - 0.005, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.016, 0.016, POD.fuselageLength * 0.82, 8]} />
        <meshStandardMaterial
          color={highlighted ? BRAND : "#5a3a1a"}
          emissive={emissive}
          emissiveIntensity={ei * 0.4}
          metalness={0.6}
          roughness={0.4}
          transparent={isCargo}
          opacity={isCargo ? 0.6 : 1.0}
        />
      </mesh>

      {/* Emergency hatch outline — top center */}
      {[-0.54, 0.54].map((z) => (
        <mesh key={z} position={[0, POD.outerRadius + 0.005, z]}>
          <boxGeometry args={[0.68, 0.006, 0.006]} />
          <meshStandardMaterial
            color="#5a3a1a"
            transparent={isCargo}
            opacity={isCargo ? 0.6 : 0.8}
          />
        </mesh>
      ))}
      <mesh position={[0.34, POD.outerRadius + 0.005, 0]}>
        <boxGeometry args={[0.006, 0.006, 1.08]} />
        <meshStandardMaterial color="#5a3a1a" transparent={isCargo} opacity={isCargo ? 0.6 : 0.8} />
      </mesh>
      <mesh position={[-0.34, POD.outerRadius + 0.005, 0]}>
        <boxGeometry args={[0.006, 0.006, 1.08]} />
        <meshStandardMaterial color="#5a3a1a" transparent={isCargo} opacity={isCargo ? 0.6 : 0.8} />
      </mesh>

      {/* Nose sensor ports */}
      {([-0.28, 0.28] as number[]).map((x) => (
        <mesh key={x} position={[x, POD.outerRadius * 0.55, -(POD.fuselageLength / 2 + 0.38)]}>
          <cylinderGeometry args={[0.038, 0.038, 0.018, 10]} />
          <meshStandardMaterial
            color={highlighted ? BRAND : "#3a2a1a"}
            emissive={emissive}
            emissiveIntensity={ei}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Branding text — on +X side, mid-body */}
      <Text
        position={[POD.outerRadius + 0.04, 0.22, 1.2]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.13}
        color={TEXT_COLOR}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.14}
        maxWidth={4}
      >
        FORGE HYPERLOOP
      </Text>
      <Text
        position={[POD.outerRadius + 0.04, -0.14, 1.2]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.22}
        color={TEXT_COLOR}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
        maxWidth={2}
      >
        DX-1
      </Text>

    </group>
  );
}
