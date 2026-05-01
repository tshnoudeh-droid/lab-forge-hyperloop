"use client";

import { TUBE } from "./data/conduit-specs";
import type { ViewMode } from "./types";

interface SolarFilmProps {
  show: boolean;
  viewMode: ViewMode;
  activeHotspot?: string | null;
}

export default function SolarFilm({ show, viewMode, activeHotspot }: SolarFilmProps) {
  if (!show || viewMode === "section") return null;
  const highlighted = activeHotspot === "09";
  return (
    <mesh position={[0, TUBE.outerRadius + 0.006, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1.0, TUBE.length]} />
      <meshStandardMaterial
        color={highlighted ? "#d4b892" : "#C4A882"}
        emissive={highlighted ? "#C4A882" : "#C4A882"}
        emissiveIntensity={highlighted ? 0.6 : 0.08}
        transparent
        opacity={highlighted ? 0.95 : 0.75}
        side={2}
      />
    </mesh>
  );
}
