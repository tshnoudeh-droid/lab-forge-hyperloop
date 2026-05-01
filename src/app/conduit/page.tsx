import Link from "next/link";
import ConduitViewerClient from "@/components/conduit/ConduitViewerClient";
import ConduitSpecSheet from "@/components/conduit/ConduitSpecSheet";
import { TUBE, VACUUM, PYLONS } from "@/components/conduit/data/conduit-specs";

export const metadata = {
  title: "FH-DX-I Conduit — Forge Hyperloop Lab",
  description: "Physics-backed 3D model of the Forge Hyperloop tube system.",
};

const font = "Helvetica Neue, Helvetica, Arial, sans-serif";

export default function ConduitPage() {
  return (
    <main
      style={{
        backgroundColor: "var(--background)",
        minHeight: "100vh",
        fontFamily: font,
      }}
    >
      <div style={{ paddingTop: "88px" }}>

        {/* BACK BUTTON */}
        <div style={{ padding: "0 32px 24px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
              fontFamily: font,
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            <span style={{ fontSize: "16px", lineHeight: 1 }}>&#8592;</span>
            Back
          </Link>
        </div>

        {/* DESCRIPTION BLOCK */}
        <div style={{ padding: "0 32px 0" }}>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "14px",
              fontFamily: font,
              fontWeight: 500,
            }}
          >
            FH-DX-I
          </p>
          <h1
            style={{
              fontSize: "46px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "var(--foreground)",
              marginBottom: "20px",
              lineHeight: 1,
              fontFamily: font,
            }}
          >
            CONDUIT
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "var(--muted)",
              lineHeight: 1.75,
              maxWidth: "580px",
              marginBottom: "40px",
              fontFamily: font,
              letterSpacing: "0.01em",
            }}
          >
            The tube system that defines the hyperloop environment. A {TUBE.outerDiameter}m
            outer diameter PosLoop355 steel shell maintains near-vacuum conditions at{" "}
            {VACUUM.operatingPressure} Pa. Supported by seismic-isolated pylons at{" "}
            {PYLONS.spacingM}m intervals, with metal bellows expansion joints and distributed
            fiber optic leak detection along the full corridor.
          </p>

          {/* KEY SPECS ROW */}
          <div
            style={{
              borderTop: "2px solid var(--color-accent)",
              paddingTop: "28px",
              display: "flex",
              gap: "56px",
              flexWrap: "wrap",
              marginBottom: "0",
            }}
          >
            {[
              { label: "Outer Diameter", value: `${TUBE.outerDiameter} m` },
              { label: "Operating Pressure", value: `${VACUUM.operatingPressure} Pa` },
              { label: "Pylon Spacing", value: `${PYLONS.spacingM} m` },
              { label: "Drag Reduction", value: `${VACUUM.dragReductionFactor.toLocaleString()}×` },
            ].map(({ label, value }) => (
              <div key={label}>
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                    marginBottom: "8px",
                    fontFamily: font,
                    fontWeight: 500,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "var(--foreground)",
                    letterSpacing: "0.02em",
                    fontFamily: font,
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SEPARATOR */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            margin: "36px 0 0",
          }}
        />

        {/* 3D VIEWER */}
        <ConduitViewerClient />

        {/* FULL SPEC SHEET */}
        <ConduitSpecSheet />
      </div>
    </main>
  );
}
