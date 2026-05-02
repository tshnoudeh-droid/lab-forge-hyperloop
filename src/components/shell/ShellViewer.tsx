"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { Suspense, useState, useRef } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import ShellTubeContext from "./ShellTubeContext";
import PodShell from "./PodShell";
import PressureVessel from "./PressureVessel";
import LevitationSkid from "./LevitationSkid";
import CargoModule from "./CargoModule";
import PassengerModule from "./PassengerModule";
import ShellHotspotLayer from "./ShellHotspotLayer";
import ShellSpecPanel from "./ShellSpecPanel";

const DEFAULT_CAMERA: [number, number, number] = [12, 6, 20];
const font = "Helvetica Neue, Helvetica, Arial, sans-serif";

type Variant = "cargo" | "passenger";

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

const LAYER_TOGGLES = [
  { key: "shell", label: "POD SHELL" },
  { key: "vessel", label: "PRESSURE VESSEL" },
  { key: "skid", label: "LEVITATION SKID" },
  { key: "tube", label: "TUBE CONTEXT" },
] as const;

type LayerKey = (typeof LAYER_TOGGLES)[number]["key"];

export default function ShellViewer() {
  const [variant, setVariant] = useState<Variant>("cargo");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [cameraTarget, setCameraTarget] = useState<[number, number, number] | null>(null);
  const [specPanelOpen, setSpecPanelOpen] = useState(false);
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({
    shell: true,
    vessel: false,
    skid: true,
    tube: false,
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
      {/* VIEWER */}
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
        {/* VARIANT SELECTOR — top left */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            display: "flex",
            gap: "4px",
            zIndex: 10,
          }}
        >
          {(["cargo", "passenger"] as Variant[]).map((v) => (
            <button
              key={v}
              onClick={() => {
                setVariant(v);
                setActiveHotspot(null);
                setSpecPanelOpen(false);
              }}
              style={{
                padding: "6px 14px",
                fontSize: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: font,
                background: variant === v ? "var(--color-accent)" : "var(--background)",
                color: variant === v ? "var(--background)" : "var(--muted)",
                border: `1px solid ${variant === v ? "var(--color-accent)" : "var(--border)"}`,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {v}
            </button>
          ))}
        </div>

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
            <ambientLight intensity={1.3} />
            <directionalLight position={[10, 20, 10]} intensity={2.0} />
            <directionalLight position={[-10, -5, -10]} intensity={0.4} color="#C4A882" />
            <directionalLight position={[-5, 8, -20]} intensity={1.4} />
            <directionalLight position={[0, -10, 5]} intensity={0.6} color="#fff8f0" />
            <OrbitControls
              enabled={cameraTarget === null}
              enablePan={false}
              minDistance={5}
              maxDistance={80}
              autoRotate
              autoRotateSpeed={0.4}
            />

            {layers.tube && <ShellTubeContext />}
            <PodShell show={layers.shell} activeHotspot={activeHotspot} variant={variant} />
            <PressureVessel show={layers.vessel} activeHotspot={activeHotspot} />
            <LevitationSkid show={layers.skid} activeHotspot={activeHotspot} />
            <CargoModule show={variant === "cargo"} />
            <PassengerModule show={variant === "passenger"} />
            <CameraController target={cameraTarget} onReached={handleCameraReached} />
            <ShellHotspotLayer activeId={activeHotspot} onHotspotClick={handleHotspotClick} />
          </Suspense>
        </Canvas>

        <ShellSpecPanel
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

      {/* LAYER TOGGLES */}
      <div
        style={{
          padding: "16px 32px",
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          borderBottom: "1px solid var(--border)",
          backgroundColor: "var(--background-secondary)",
          alignItems: "center",
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
