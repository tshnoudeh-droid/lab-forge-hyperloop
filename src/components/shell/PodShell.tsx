"use client";

import { TUBE } from "@/components/conduit/data/conduit-specs";
import { POD } from "./data/shell-specs";

interface PodShellProps {
  show: boolean;
  activeHotspot?: string | null;
}

const HIGHLIGHT = "#C4A882";
const HOTSPOT_IDS = ["S01", "S02"];

// Pod Y center: Halbach track at -(innerRadius - 0.02), + 10cm levitation gap + pod outer radius
const FLOOR_Y = -(TUBE.innerRadius - 0.02);
const POD_Y = FLOOR_Y + 0.10 + POD.outerRadius;

const HALF_FUSE = POD.fuselageLength / 2;

export default function PodShell({ show, activeHotspot }: PodShellProps) {
  if (!show) return null;
  const highlighted = activeHotspot !== null && HOTSPOT_IDS.includes(activeHotspot ?? "");
  const noseHighlighted = activeHotspot === "S01";

  const col = highlighted ? HIGHLIGHT : "#1c1c1c";
  const emissive = highlighted ? "#8a7060" : "#000000";
  const ei = highlighted ? 0.45 : 0;

  return (
    <group position={[0, POD_Y, 0]}>
      {/* Fuselage cylinder */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[POD.outerRadius, POD.outerRadius, POD.fuselageLength, 48]} />
        <meshStandardMaterial
          color={col}
          emissive={emissive}
          emissiveIntensity={ei}
          metalness={0.15}
          roughness={0.55}
        />
      </mesh>

      {/* Nose cone — tip at -Z */}
      <mesh position={[0, 0, -(HALF_FUSE + POD.noseLength / 2)]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[POD.outerRadius, POD.noseLength, 48]} />
        <meshStandardMaterial
          color={noseHighlighted ? HIGHLIGHT : (highlighted ? HIGHLIGHT : "#242424")}
          emissive={noseHighlighted ? "#8a7060" : emissive}
          emissiveIntensity={noseHighlighted ? 0.55 : ei}
          metalness={0.12}
          roughness={0.5}
        />
      </mesh>

      {/* Tail fairing — tip at +Z */}
      <mesh position={[0, 0, HALF_FUSE + POD.tailLength / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[POD.outerRadius, POD.tailLength, 48]} />
        <meshStandardMaterial
          color={col}
          emissive={emissive}
          emissiveIntensity={ei}
          metalness={0.12}
          roughness={0.5}
        />
      </mesh>

      {/* Panel lines — 5 circumferential rings on fuselage */}
      {[-3.5, -1.75, 0, 1.75, 3.5].map((z) => (
        <mesh key={z} position={[0, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[POD.outerRadius + 0.004, 0.011, 4, 48]} />
          <meshStandardMaterial
            color={highlighted ? "#d4b880" : "#383838"}
            emissive={emissive}
            emissiveIntensity={ei * 0.4}
            metalness={0.6}
            roughness={0.35}
          />
        </mesh>
      ))}

      {/* Longitudinal spine strip — top centerline */}
      <mesh position={[0, POD.outerRadius - 0.005, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.018, 0.018, POD.fuselageLength * 0.85, 8]} />
        <meshStandardMaterial
          color={highlighted ? HIGHLIGHT : "#555555"}
          emissive={emissive}
          emissiveIntensity={ei * 0.5}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Emergency access hatch — top */}
      <mesh position={[0, POD.outerRadius + 0.006, 0.4]}>
        <boxGeometry args={[0.72, 0.012, 1.05]} />
        <meshStandardMaterial
          color={highlighted ? "#d4b880" : "#2a2a2a"}
          emissive={emissive}
          emissiveIntensity={ei * 0.6}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>

      {/* Hatch seam lines */}
      {([-0.525, 0.525] as number[]).map((z) => (
        <mesh key={z} position={[0, POD.outerRadius + 0.007, z]}>
          <boxGeometry args={[0.72, 0.008, 0.008]} />
          <meshStandardMaterial color={highlighted ? HIGHLIGHT : "#C4A882"} emissiveIntensity={0} />
        </mesh>
      ))}

      {/* Sensor ports — small circular bumps on nose side */}
      {([-0.3, 0.3] as number[]).map((x) => (
        <mesh key={x} position={[x, POD.outerRadius * 0.6, -(HALF_FUSE + 0.4)]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
          <meshStandardMaterial
            color={highlighted ? HIGHLIGHT : "#444444"}
            emissive={emissive}
            emissiveIntensity={ei}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}
