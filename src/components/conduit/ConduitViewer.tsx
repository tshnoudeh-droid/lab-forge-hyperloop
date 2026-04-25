"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

export default function ConduitViewer() {
  return (
    <div style={{ width: "100%", height: "600px", position: "relative" }}>
      <Canvas
        camera={{ position: [12, 6, 20], fov: 45, near: 0.1, far: 1000 }}
        style={{ background: "#0A0A0A" }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
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
          {/* Placeholder box — will be replaced by TubeGeometry in Task 3 */}
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#C4A882" wireframe />
          </mesh>
        </Suspense>
      </Canvas>
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
    </div>
  );
}
