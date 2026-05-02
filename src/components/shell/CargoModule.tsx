"use client";

import { TUBE } from "@/components/conduit/data/conduit-specs";
import { POD } from "./data/shell-specs";
import { Text } from "@react-three/drei";

const FLOOR_Y = -(TUBE.innerRadius - 0.02);
const POD_Y = FLOOR_Y + 0.10 + POD.outerRadius;

// Container dimensions — scaled to fit inside 1.22m inner radius pod
const CTR_L = 5.2;   // m length (along Z)
const CTR_W = 1.78;  // m width (along X)
const CTR_H = 1.36;  // m height (along Y)
const CTR_RIBS = 10; // corrugation ribs per long side

// Container sits on pod floor: bottom at y = POD_Y - (POD.innerRadius - 0.12)
const CTR_Y = POD_Y - POD.innerRadius + CTR_H / 2 + 0.06;

const CONTAINER_COLOR = "#1a3a52";
const CONTAINER_DARK = "#112a3f";
const RIB_COLOR = "#0f2535";

export default function CargoModule({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <group>
      {/* Container body */}
      <mesh position={[0, CTR_Y, 0]}>
        <boxGeometry args={[CTR_W, CTR_H, CTR_L]} />
        <meshStandardMaterial
          color={CONTAINER_COLOR}
          roughness={0.6}
          metalness={0.45}
        />
      </mesh>

      {/* Corrugation ribs on left face (-X) */}
      {Array.from({ length: CTR_RIBS }).map((_, i) => {
        const z = -CTR_L / 2 + ((i + 0.5) * CTR_L) / CTR_RIBS;
        return (
          <mesh key={`left-${i}`} position={[-CTR_W / 2 - 0.006, CTR_Y, z]}>
            <boxGeometry args={[0.012, CTR_H * 0.95, CTR_L / CTR_RIBS * 0.62]} />
            <meshStandardMaterial color={RIB_COLOR} roughness={0.5} metalness={0.5} />
          </mesh>
        );
      })}

      {/* Corrugation ribs on right face (+X) */}
      {Array.from({ length: CTR_RIBS }).map((_, i) => {
        const z = -CTR_L / 2 + ((i + 0.5) * CTR_L) / CTR_RIBS;
        return (
          <mesh key={`right-${i}`} position={[CTR_W / 2 + 0.006, CTR_Y, z]}>
            <boxGeometry args={[0.012, CTR_H * 0.95, CTR_L / CTR_RIBS * 0.62]} />
            <meshStandardMaterial color={RIB_COLOR} roughness={0.5} metalness={0.5} />
          </mesh>
        );
      })}

      {/* Corner posts — 8 vertical box edges */}
      {([[-1, -1], [-1, 1], [1, -1], [1, 1]] as [number, number][]).map(([sx, sz]) => (
        <mesh
          key={`post-${sx}-${sz}`}
          position={[sx * (CTR_W / 2 + 0.018), CTR_Y, sz * (CTR_L / 2 + 0.018)]}
        >
          <boxGeometry args={[0.036, CTR_H + 0.04, 0.036]} />
          <meshStandardMaterial color="#0a1f30" roughness={0.45} metalness={0.55} />
        </mesh>
      ))}

      {/* Top cap */}
      <mesh position={[0, CTR_Y + CTR_H / 2 + 0.008, 0]}>
        <boxGeometry args={[CTR_W + 0.04, 0.016, CTR_L + 0.04]} />
        <meshStandardMaterial color={CONTAINER_DARK} roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Floor runner */}
      <mesh position={[0, CTR_Y - CTR_H / 2 - 0.010, 0]}>
        <boxGeometry args={[CTR_W * 0.7, 0.018, CTR_L + 0.08]} />
        <meshStandardMaterial color="#0a1a28" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Front face detail panel */}
      <mesh position={[0, CTR_Y, CTR_L / 2 + 0.004]}>
        <boxGeometry args={[CTR_W - 0.05, CTR_H - 0.05, 0.008]} />
        <meshStandardMaterial color={CONTAINER_DARK} roughness={0.65} metalness={0.4} />
      </mesh>

      {/* Branding text on right (+X) face */}
      <Text
        position={[CTR_W / 2 + 0.055, CTR_Y + 0.12, 0.6]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.11}
        color="#C4A882"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
        maxWidth={3}
      >
        FORGE HYPERLOOP
      </Text>
      <Text
        position={[CTR_W / 2 + 0.055, CTR_Y - 0.10, 0.6]}
        rotation={[0, Math.PI / 2, 0]}
        fontSize={0.09}
        color="#8a7a6a"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.18}
        maxWidth={3}
      >
        CARGO / DX-1
      </Text>

      {/* ISO container corner fittings — flat cylinders */}
      {([[-1, -1], [-1, 1], [1, -1], [1, 1]] as [number, number][]).map(([sx, sz]) => (
        <mesh
          key={`fit-top-${sx}-${sz}`}
          position={[sx * (CTR_W / 2 + 0.008), CTR_Y + CTR_H / 2 + 0.016, sz * (CTR_L / 2 + 0.008)]}
        >
          <cylinderGeometry args={[0.044, 0.044, 0.024, 8]} />
          <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}
      {([[-1, -1], [-1, 1], [1, -1], [1, 1]] as [number, number][]).map(([sx, sz]) => (
        <mesh
          key={`fit-bot-${sx}-${sz}`}
          position={[sx * (CTR_W / 2 + 0.008), CTR_Y - CTR_H / 2 - 0.016, sz * (CTR_L / 2 + 0.008)]}
        >
          <cylinderGeometry args={[0.044, 0.044, 0.024, 8]} />
          <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
}
