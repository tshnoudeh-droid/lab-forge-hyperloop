"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Suspense, useState, useRef } from "react";
import * as THREE from "three";
import TubeGeometry from "./TubeGeometry";
import InternalSystems from "./InternalSystems";
import ViewControls from "./ViewControls";
import ExpansionJoints from "./ExpansionJoints";
import VacuumPumpStation from "./VacuumPumpStation";
import FiberOpticCable from "./FiberOpticCable";
import PylonStructure from "./PylonStructure";
import SolarFilm from "./SolarFilm";
import HotspotLayer from "./HotspotLayer";
import ZoomDetailManager from "./ZoomDetailManager";
import SpecPanel from "./SpecPanel";
import type { ViewMode } from "./types";

function CameraController({ target }: { target: [number, number, number] | null }) {
  const { camera } = useThree();
  const targetVec = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!target) return;
    targetVec.current.set(target[0], target[1], target[2]);
    camera.position.lerp(targetVec.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function ConduitViewer() {
  const [viewMode, setViewMode] = useState<ViewMode>("cutaway");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [cameraTarget, setCameraTarget] = useState<[number, number, number] | null>(null);
  const [specPanelOpen, setSpecPanelOpen] = useState(false);
  const [showHalbach, setShowHalbach] = useState(true);
  const [showLIM, setShowLIM] = useState(true);
  const [showExpansionJoints, setShowExpansionJoints] = useState(true);
  const [showPumpStations, setShowPumpStations] = useState(true);
  const [showFiberOptic, setShowFiberOptic] = useState(true);
  const [showPylons, setShowPylons] = useState(true);
  const [showSolar, setShowSolar] = useState(true);

  function handleHotspotClick(id: string, preset: [number, number, number]) {
    setActiveHotspot(id);
    setCameraTarget(preset);
    setSpecPanelOpen(true);
  }

  function handlePanelClose() {
    setSpecPanelOpen(false);
    setActiveHotspot(null);
    setCameraTarget(null);
  }

  return (
    <div style={{ width: "100%", height: "clamp(400px, 55vh, 600px)", position: "relative" }}>
      <ViewControls mode={viewMode} onChange={setViewMode} />
      <button
        onClick={() => {
          setCameraTarget([12, 6, 20]);
          setActiveHotspot(null);
          setSpecPanelOpen(false);
        }}
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          padding: "6px 12px",
          fontSize: "9px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          background: "rgba(255,255,255,0.05)",
          color: "rgba(255,255,255,0.5)",
          border: "none",
          cursor: "pointer",
          zIndex: 10,
          transition: "color 0.15s",
        }}
      >
        RESET
      </button>
      <Canvas
        camera={{ position: [12, 6, 20], fov: 45, near: 0.1, far: 1000 }}
        style={{ background: "#0A0A0A" }}
        gl={{ antialias: true, localClippingEnabled: true }}
      >
        <Suspense
          fallback={
            <Html center>
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                  whiteSpace: "nowrap",
                }}
              >
                Loading
              </span>
            </Html>
          }
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 20, 10]} intensity={1.2} />
          <directionalLight position={[-10, -5, -10]} intensity={0.3} color="#C4A882" />
          <OrbitControls
            enablePan={false}
            minDistance={5}
            maxDistance={80}
            autoRotate
            autoRotateSpeed={0.4}
          />
          <TubeGeometry viewMode={viewMode} />
          <InternalSystems showHalbach={showHalbach} showLIM={showLIM} viewMode={viewMode} />
          <ExpansionJoints show={showExpansionJoints} viewMode={viewMode} />
          <VacuumPumpStation show={showPumpStations} viewMode={viewMode} />
          <FiberOpticCable show={showFiberOptic} />
          <PylonStructure show={showPylons} />
          <SolarFilm show={showSolar} viewMode={viewMode} />
          <CameraController target={cameraTarget} />
          <HotspotLayer activeId={activeHotspot} onHotspotClick={handleHotspotClick} />
          <ZoomDetailManager />
        </Suspense>
      </Canvas>
      <SpecPanel
        hotspotId={specPanelOpen ? activeHotspot : null}
        onClose={handlePanelClose}
      />
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
          fontSize: "9px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.25)",
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          pointerEvents: "none",
        }}
      >
        Scale 1:1 — Real Geometry
      </div>
      {/* Layer toggles */}
      <div
        style={{
          position: "absolute",
          bottom: "48px",
          left: "16px",
          display: "flex",
          gap: "2px",
          flexWrap: "wrap",
          maxWidth: "calc(100% - 32px)",
        }}
      >
        {[
          { key: "halbach", label: "HALBACH TRACK", active: showHalbach, toggle: () => setShowHalbach((v) => !v) },
          { key: "lim", label: "LIM STATOR", active: showLIM, toggle: () => setShowLIM((v) => !v) },
          { key: "joints", label: "EXPANSION JOINTS", active: showExpansionJoints, toggle: () => setShowExpansionJoints((v) => !v) },
          { key: "pumps", label: "PUMP STATIONS", active: showPumpStations, toggle: () => setShowPumpStations((v) => !v) },
          { key: "fiber", label: "FIBER OPTIC", active: showFiberOptic, toggle: () => setShowFiberOptic((v) => !v) },
          { key: "pylons", label: "PYLONS", active: showPylons, toggle: () => setShowPylons((v) => !v) },
          { key: "solar", label: "SOLAR FILM", active: showSolar, toggle: () => setShowSolar((v) => !v) },
        ].map(({ key, label, active, toggle }) => (
          <button
            key={key}
            onClick={toggle}
            style={{
              padding: "5px 10px",
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              background: active ? "rgba(196,168,130,0.12)" : "rgba(255,255,255,0.04)",
              color: active ? "#C4A882" : "rgba(255,255,255,0.3)",
              border: `1px solid ${active ? "rgba(196,168,130,0.3)" : "rgba(255,255,255,0.08)"}`,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
