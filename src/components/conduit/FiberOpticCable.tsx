"use client";

import { Line } from "@react-three/drei";
import { TUBE } from "./data/conduit-specs";

interface FiberOpticCableProps {
  show: boolean;
  activeHotspot?: string | null;
}

export default function FiberOpticCable({ show, activeHotspot }: FiberOpticCableProps) {
  if (!show) return null;
  const highlighted = activeHotspot === "04";
  const Y = TUBE.outerRadius + 0.02;
  const HALF = TUBE.length / 2;
  return (
    <Line
      points={[
        [0, Y, -HALF],
        [0, Y, HALF],
      ]}
      color={highlighted ? "#ffffff" : "#ffaa44"}
      lineWidth={highlighted ? 3.5 : 1.5}
    />
  );
}
