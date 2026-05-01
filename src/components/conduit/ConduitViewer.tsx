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
import { Button } from "@/components/ui/button";

const DEFAULT_CAMERA: [number, number, number] = [12, 6, 20];

function CameraController({
  target,
  onReached,
}: {
  target: [number, number, number] | null;
  onReached: () => void;
}) {
  const { camera } = useThree();
  const targetVec = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!target) return;
    targetVec.current.set(target[0], target[1], target[2]);
    camera.position.lerp(targetVec.current, 0.06);
    camera.lookAt(0, 0, 0);
    if (camera.position.distanceTo(targetVec.current) < 0.25) {
      onReached();
    }
  });

  return null;
}

const font = "Helvetica Neue, Helvetica, Arial, sans-serif";

const LAYER_TOGGLES = [
  { key: "halbach", label: "HALBACH TRACK" },
  { key: "lim", label: "LIM STATOR" },
  { key: "joints", label: "EXPANSION JOINTS" },
  { key: "pumps", label: "PUMP STATIONS" },
  { key: "fiber", label: "FIBER OPTIC" },
  { key: "pylons", label: "PYLONS" },
  { key: "solar", label: "SOLAR FILM" },
] as const;

type LayerKey = (typeof LAYER_TOGGLES)[number]["key"];

export default function ConduitViewer() {
  const [viewMode, setViewMode] = useState<ViewMode>("cutaway");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [cameraTarget, setCameraTarget] = useState<[number, number, number] | null>(null);
  const [specPanelOpen, setSpecPanelOpen] = useState(false);
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({
    halbach: true,
    lim: true,
    joints: true,
    pumps: true,
    fiber: true,
    pylons: true,
    solar: true,
  });

  function toggleLayer(key: LayerKey) {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleHotspotClick(id: string, preset: [number, number, number]) {
    setActiveHotspot(id);
    setCameraTarget(preset);
    setSpecPanelOpen(true);
  }

  function handlePanelClose() {
    setSpecPanelOpen(false);
    setActiveHotspot(null);
    setCameraTarget(DEFAULT_CAMERA);
  }

  function handleCameraReached() {
    setCameraTarget(null);
  }

  return (
    <div>
      {/* VIEWER — brown dot grid background */}
      <div
        style={{
          width: "100%",
          height: "clamp(500px, 60vh, 680px)",
          position: "relative",
          backgroundImage: `radial-gradient(circle, var(--color-accent) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
          backgroundColor: "var(--background)",
        }}
      >
        <ViewControls mode={viewMode} onChange={setViewMode} />
        <Button
          variant="ghost"
          className="rounded-none absolute"
          onClick={() => {
            setCameraTarget(DEFAULT_CAMERA);
            setActiveHotspot(null);
            setSpecPanelOpen(false);
          }}
          style={{
            top: "16px",
            right: "16px",
            padding: "8px 16px",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: font,
            background: "var(--background)",
            color: "var(--muted)",
            height: "auto",
            zIndex: 10,
            transition: "color 0.15s",
            border: "1px solid var(--border)",
          }}
        >
          RESET
        </Button>
        <Canvas
          camera={{ position: DEFAULT_CAMERA, fov: 45, near: 0.1, far: 1000 }}
          style={{ background: "transparent" }}
          gl={{ antialias: true, localClippingEnabled: true }}
        >
          <Suspense
            fallback={
              <Html center>
                <span
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    fontFamily: font,
                    whiteSpace: "nowrap",
                  }}
                >
                  Loading
                </span>
              </Html>
            }
          >
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 20, 10]} intensity={2.0} />
            <directionalLight position={[-10, -5, -10]} intensity={0.4} color="#C4A882" />
            <directionalLight position={[-5, 8, -20]} intensity={1.4} />
            <OrbitControls
              enabled={cameraTarget === null}
              enablePan={false}
              minDistance={5}
              maxDistance={80}
              autoRotate
              autoRotateSpeed={0.4}
            />
            <TubeGeometry viewMode={viewMode} />
            <InternalSystems
              showHalbach={layers.halbach}
              showLIM={layers.lim}
              viewMode={viewMode}
            />
            <ExpansionJoints show={layers.joints} viewMode={viewMode} />
            <VacuumPumpStation show={layers.pumps} viewMode={viewMode} />
            <FiberOpticCable show={layers.fiber} />
            <PylonStructure show={layers.pylons} />
            <SolarFilm show={layers.solar} viewMode={viewMode} />
            <CameraController target={cameraTarget} onReached={handleCameraReached} />
            <HotspotLayer
              activeId={activeHotspot}
              onHotspotClick={handleHotspotClick}
            />
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
            right: "16px",
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--muted)",
            fontFamily: font,
            pointerEvents: "none",
          }}
        >
          Scale 1:1 — Real Geometry
        </div>
      </div>

      {/* LAYER TOGGLES — below viewer, not overlapping */}
      <div
        style={{
          padding: "16px 32px",
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--background-secondary)",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--muted)",
            fontFamily: font,
            marginRight: "12px",
            alignSelf: "center",
            whiteSpace: "nowrap",
          }}
        >
          Layers
        </p>
        {LAYER_TOGGLES.map(({ key, label }) => (
          <Button
            key={key}
            variant="ghost"
            onClick={() => toggleLayer(key)}
            className="rounded-none"
            style={{
              padding: "6px 14px",
              fontSize: "10px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: font,
              background: layers[key] ? "var(--color-accent)" : "transparent",
              color: layers[key] ? "var(--background)" : "var(--muted)",
              border: `1px solid ${layers[key] ? "var(--color-accent)" : "var(--border)"}`,
              height: "auto",
              transition: "all 0.15s",
            }}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
