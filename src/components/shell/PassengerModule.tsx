"use client";

import { TUBE } from "@/components/conduit/data/conduit-specs";
import { POD } from "./data/shell-specs";

const FLOOR_Y = -(TUBE.innerRadius - 0.02);
const POD_Y = FLOOR_Y + 0.10 + POD.outerRadius;

// Interior floor sits above pod bottom
const CABIN_FLOOR_Y = POD_Y - POD.innerRadius + 0.28;

const SEAT_COLOR = "#C4A882";
const SEAT_FRAME = "#2a2018";
const FLOOR_COLOR = "#2a2018";

const ROWS = 6;
const ROW_PITCH = 1.0;
const ROW_Z_START = -((ROWS - 1) * ROW_PITCH) / 2;

// 2+1 layout: two seats left, one right
const SEAT_POSITIONS_X: number[] = [-0.68, -0.20, 0.70];

function Seat({ position }: { position: [number, number, number] }) {
  const [x, y, z] = position;
  return (
    <group position={[x, y, z]}>
      {/* Seat base */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.46, 0.08, 0.44]} />
        <meshStandardMaterial color={SEAT_COLOR} roughness={0.65} metalness={0.08} />
      </mesh>
      {/* Seat cushion — slightly raised */}
      <mesh position={[0, 0.175, 0.02]}>
        <boxGeometry args={[0.40, 0.032, 0.36]} />
        <meshStandardMaterial color={SEAT_COLOR} roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Seat back */}
      <mesh position={[0, 0.46, -0.18]} rotation={[-0.14, 0, 0]}>
        <boxGeometry args={[0.44, 0.52, 0.06]} />
        <meshStandardMaterial color={SEAT_COLOR} roughness={0.65} metalness={0.08} />
      </mesh>
      {/* Headrest */}
      <mesh position={[0, 0.76, -0.19]} rotation={[-0.14, 0, 0]}>
        <boxGeometry args={[0.36, 0.16, 0.07]} />
        <meshStandardMaterial color={SEAT_COLOR} roughness={0.6} metalness={0.08} />
      </mesh>
      {/* Armrest left */}
      <mesh position={[-0.24, 0.22, 0.04]}>
        <boxGeometry args={[0.04, 0.04, 0.38]} />
        <meshStandardMaterial color={SEAT_FRAME} roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Armrest right */}
      <mesh position={[0.24, 0.22, 0.04]}>
        <boxGeometry args={[0.04, 0.04, 0.38]} />
        <meshStandardMaterial color={SEAT_FRAME} roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Seat leg */}
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[0.08, 0.16, 0.14]} />
        <meshStandardMaterial color={SEAT_FRAME} roughness={0.4} metalness={0.55} />
      </mesh>
    </group>
  );
}

export default function PassengerModule({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <group>
      {/* Cabin floor panel */}
      <mesh position={[0, CABIN_FLOOR_Y - 0.015, 0]}>
        <boxGeometry args={[POD.innerRadius * 1.3, 0.028, POD.fuselageLength + 3.5]} />
        <meshStandardMaterial
          color={FLOOR_COLOR}
          roughness={0.7}
          metalness={0.35}
        />
      </mesh>

      {/* Floor accent strips */}
      {([-0.46, 0, 0.46] as number[]).map((x) => (
        <mesh key={x} position={[x, CABIN_FLOOR_Y + 0.002, 0]}>
          <boxGeometry args={[0.018, 0.004, POD.fuselageLength + 3.0]} />
          <meshStandardMaterial color="#C4A882" roughness={0.4} metalness={0.5} />
        </mesh>
      ))}

      {/* Seat rows */}
      {Array.from({ length: ROWS }).map((_, row) => {
        const z = ROW_Z_START + row * ROW_PITCH;
        return SEAT_POSITIONS_X.map((sx) => (
          <Seat
            key={`${row}-${sx}`}
            position={[sx, CABIN_FLOOR_Y, z]}
          />
        ));
      })}

      {/* Overhead luggage bins — left side */}
      <mesh position={[-POD.innerRadius * 0.62, CABIN_FLOOR_Y + 1.1, 0]}>
        <boxGeometry args={[0.32, 0.22, POD.fuselageLength + 2.8]} />
        <meshStandardMaterial color="#2a2018" roughness={0.55} metalness={0.3} />
      </mesh>

      {/* Bin face panels */}
      {Array.from({ length: 5 }).map((_, i) => {
        const z = -2.0 + i * 1.1;
        return (
          <mesh key={i} position={[-POD.innerRadius * 0.62, CABIN_FLOOR_Y + 1.1, z]}>
            <boxGeometry args={[0.33, 0.19, 0.96]} />
            <meshStandardMaterial color="#3a3020" roughness={0.6} metalness={0.25} />
          </mesh>
        );
      })}

      {/* Interior accent lighting strip — ceiling */}
      <mesh position={[0, CABIN_FLOOR_Y + 1.3, 0]}>
        <boxGeometry args={[0.06, 0.012, POD.fuselageLength + 3.0]} />
        <meshStandardMaterial
          color="#C4A882"
          emissive="#C4A882"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Aisle lighting strip — floor center */}
      <mesh position={[0.25, CABIN_FLOOR_Y + 0.006, 0]}>
        <boxGeometry args={[0.022, 0.005, POD.fuselageLength + 2.5]} />
        <meshStandardMaterial
          color="#C4A882"
          emissive="#C4A882"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}
