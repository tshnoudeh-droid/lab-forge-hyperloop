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
      <div style={{ paddingTop: "72px" }}>

        {/* DESCRIPTION BLOCK */}
        <div style={{ padding: "48px 32px 0" }}>
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "12px",
            }}
          >
            FH-DX-I
          </p>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "var(--foreground)",
              marginBottom: "16px",
              lineHeight: 1,
            }}
          >
            CONDUIT
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "var(--muted)",
              lineHeight: 1.75,
              maxWidth: "560px",
              marginBottom: "40px",
              fontFamily: "var(--font-libre-baskerville), Georgia, serif",
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
              borderTop: "1px solid var(--border)",
              paddingTop: "24px",
              display: "flex",
              gap: "48px",
              flexWrap: "wrap",
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
                    fontSize: "9px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--muted-more)",
                    marginBottom: "6px",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "var(--foreground)",
                    letterSpacing: "0.02em",
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
            margin: "32px 0 0",
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
