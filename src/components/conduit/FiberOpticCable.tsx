"use client";

import { Line } from "@react-three/drei";
import { TUBE } from "./data/conduit-specs";

interface FiberOpticCableProps {
  show: boolean;
}

export default function FiberOpticCable({ show }: FiberOpticCableProps) {
  if (!show) return null;
  const Y = TUBE.outerRadius + 0.015;
  const HALF = TUBE.length / 2;
  return (
    <Line
      points={[
        [0, Y, -HALF],
        [0, Y, HALF],
      ]}
      color="#ffaa44"
      lineWidth={1.5}
    />
  );
}
