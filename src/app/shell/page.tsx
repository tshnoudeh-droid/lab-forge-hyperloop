import Link from "next/link";
import ShellViewerClient from "@/components/shell/ShellViewerClient";
import { POD, PRESSURE_VESSEL, AERODYNAMICS, LEVITATION_SKID } from "@/components/shell/data/shell-specs";

const font = "Helvetica Neue, Helvetica, Arial, sans-serif";

export const metadata = {
  title: "FH-DX-III Shell — Forge Hyperloop Lab",
  description: "Physics-backed 3D model of the Forge Hyperloop pod exterior, pressure vessel, and levitation interface.",
};

export default function Shell() {
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
            FH-DX-III
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
            SHELL
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "var(--muted)",
              lineHeight: 1.75,
              maxWidth: "600px",
              marginBottom: "40px",
              fontFamily: font,
              letterSpacing: "0.01em",
            }}
          >
            Pod exterior and pressure vessel. A {POD.material} aeroshell designed
            for the {AERODYNAMICS.dragAtCruise_N} N drag environment of the Conduit.
            The vessel maintains {(PRESSURE_VESSEL.internalPressurePa / 1000).toFixed(0)} kPa internally
            against {PRESSURE_VESSEL.externalPressurePa} Pa tube vacuum, with safety factor {PRESSURE_VESSEL.safetyFactor}.
            {" "}A passive Halbach levitation skid on the underside interfaces directly with the Flux track.
          </p>

          {/* KEY SPECS ROW */}
          <div
            style={{
              borderTop: "2px solid var(--color-accent)",
              paddingTop: "28px",
              display: "flex",
              gap: "48px",
              flexWrap: "wrap",
              marginBottom: "0",
            }}
          >
            {[
              { label: "Outer Diameter", value: `${(POD.outerRadius * 2).toFixed(1)} m` },
              { label: "Pod Length", value: `${POD.length} m` },
              { label: "Pressure Diff.", value: `${PRESSURE_VESSEL.differentialKPa} kPa` },
              { label: "Drag at Cruise", value: `${AERODYNAMICS.dragAtCruise_N} N` },
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
        <div style={{ borderTop: "1px solid var(--border)", margin: "36px 0 0" }} />

        {/* 3D VIEWER */}
        <ShellViewerClient />

        {/* SHELL SPEC SHEET */}
        <div
          style={{
            padding: "80px 32px",
            maxWidth: "900px",
            margin: "0 auto",
            fontFamily: font,
          }}
        >
          <div style={{ borderTop: "2px solid var(--color-accent)", marginBottom: "56px" }} />
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: "56px",
              fontFamily: font,
            }}
          >
            FH-DX-III Shell — Full Specification
          </p>

          {/* Pod Structure */}
          <div style={{ marginBottom: "56px" }}>
            <p style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-accent)", fontFamily: font, fontWeight: 600, marginBottom: "20px" }}>
              Pod Structure
            </p>
            {[
              { label: "Material", value: POD.material },
              { label: "Outer diameter", value: `${(POD.outerRadius * 2).toFixed(1)}`, unit: "m" },
              { label: "Pod length", value: `${POD.length}`, unit: "m" },
              { label: "Nose length", value: `${POD.noseLength}`, unit: "m" },
              { label: "Fuselage length", value: `${POD.fuselageLength}`, unit: "m" },
              { label: "Wall thickness", value: `${POD.wallThickness * 1000}`, unit: "mm" },
              { label: "Bore clearance (each side)", value: `${(POD.boreGapM * 100).toFixed(0)}`, unit: "cm" },
            ].map((row) => (
              <div
                key={row.label}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid var(--border)", gap: "16px", fontFamily: font }}
              >
                <span style={{ fontSize: "14px", color: "var(--muted)" }}>{row.label}</span>
                <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--foreground)", flexShrink: 0 }}>
                  {row.value}
                  {"unit" in row && row.unit && (
                    <span style={{ fontSize: "12px", color: "var(--muted)", marginLeft: "5px" }}>{row.unit}</span>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Pressure Vessel */}
          <div style={{ marginBottom: "56px" }}>
            <p style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-accent)", fontFamily: font, fontWeight: 600, marginBottom: "20px" }}>
              Pressure Vessel
            </p>
            {[
              { label: "Internal pressure", value: `${PRESSURE_VESSEL.internalPressurePa.toLocaleString()}`, unit: "Pa" },
              { label: "External pressure (tube)", value: `${PRESSURE_VESSEL.externalPressurePa}`, unit: "Pa" },
              { label: "Pressure differential", value: `${PRESSURE_VESSEL.differentialKPa}`, unit: "kPa" },
              { label: "Safety factor", value: `${PRESSURE_VESSEL.safetyFactor}` },
              { label: "Wall material", value: PRESSURE_VESSEL.wallMaterial },
              { label: "Wall thickness", value: `${PRESSURE_VESSEL.wallThicknessMm}`, unit: "mm" },
              { label: "Standard", value: "DO-2607B", source: PRESSURE_VESSEL.source },
            ].map((row) => (
              <div
                key={row.label}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid var(--border)", gap: "16px", fontFamily: font }}
              >
                <span style={{ fontSize: "14px", color: "var(--muted)" }}>{row.label}</span>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--foreground)" }}>
                    {row.value}
                    {"unit" in row && row.unit && (
                      <span style={{ fontSize: "12px", color: "var(--muted)", marginLeft: "5px" }}>{row.unit}</span>
                    )}
                  </span>
                  {"source" in row && row.source && (
                    <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "3px" }}>{row.source}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Aerodynamics */}
          <div style={{ marginBottom: "56px" }}>
            <p style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-accent)", fontFamily: font, fontWeight: 600, marginBottom: "20px" }}>
              Aerodynamics
            </p>
            {[
              { label: "Nose profile", value: AERODYNAMICS.noseProfile },
              { label: "Boattail angle", value: `${AERODYNAMICS.boattailAngleDeg}`, unit: "deg" },
              { label: "Drag at 1,000 km/h (vacuum)", value: `${AERODYNAMICS.dragAtCruise_N}`, unit: "N" },
              { label: "Drag power at cruise", value: `${AERODYNAMICS.dragPowerKW}`, unit: "kW" },
            ].map((row) => (
              <div
                key={row.label}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid var(--border)", gap: "16px", fontFamily: font }}
              >
                <span style={{ fontSize: "14px", color: "var(--muted)" }}>{row.label}</span>
                <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--foreground)", flexShrink: 0 }}>
                  {row.value}
                  {"unit" in row && row.unit && (
                    <span style={{ fontSize: "12px", color: "var(--muted)", marginLeft: "5px" }}>{row.unit}</span>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Levitation Interface */}
          <div style={{ marginBottom: "56px" }}>
            <p style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-accent)", fontFamily: font, fontWeight: 600, marginBottom: "20px" }}>
              Levitation Interface
            </p>
            {[
              { label: "Skid material", value: LEVITATION_SKID.material },
              { label: "Track interface", value: LEVITATION_SKID.interactionMode },
              { label: "Nominal gap", value: `${LEVITATION_SKID.nominalGapMm}`, unit: "mm" },
              { label: "Skid width", value: `${LEVITATION_SKID.widthM * 1000}`, unit: "mm" },
              { label: "Power at cruise", value: "0", unit: "W" },
            ].map((row) => (
              <div
                key={row.label}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid var(--border)", gap: "16px", fontFamily: font }}
              >
                <span style={{ fontSize: "14px", color: "var(--muted)" }}>{row.label}</span>
                <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--foreground)", flexShrink: 0 }}>
                  {row.value}
                  {"unit" in row && row.unit && (
                    <span style={{ fontSize: "12px", color: "var(--muted)", marginLeft: "5px" }}>{row.unit}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
