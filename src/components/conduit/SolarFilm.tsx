"use client";

import { TUBE } from "./data/conduit-specs";
import type { ViewMode } from "./types";

interface SolarFilmProps {
  show: boolean;
  viewMode: ViewMode;
}

export default function SolarFilm({ show, viewMode }: SolarFilmProps) {
  if (!show || viewMode === "section") return null;
  return (
    <mesh position={[0, TUBE.outerRadius + 0.005, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.8, TUBE.length]} />
      <meshStandardMaterial
        color="#C4A882"
        emissive="#C4A882"
        emissiveIntensity={0.08}
        transparent
        opacity={0.75}
        side={2}
      />
    </mesh>
  );
}
