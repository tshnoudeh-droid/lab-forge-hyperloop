import Link from "next/link";
import FluxViewerClient from "@/components/flux/FluxViewerClient";
import { MAGLEV, BATTERY } from "@/components/flux/data/flux-specs";

const font = "Helvetica Neue, Helvetica, Arial, sans-serif";

export const metadata = {
  title: "FH-DX-II Flux — Forge Hyperloop Lab",
  description: "Physics-backed 3D model of the Forge Hyperloop propulsion and levitation system.",
};

export default function Flux() {
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
            FH-DX-II
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
            FLUX
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
            Propulsion and levitation. A passive {MAGLEV.trackType} maglev track paired
            with {MAGLEV.propulsionType} stators on the tube wall. {MAGLEV.levitationMode}.
            {" "}{MAGLEV.motorMode}. Regenerative braking energy feeds directly
            into trackside {BATTERY.chemistry} battery buffers — decoupling propulsion
            from real-time grid demand.
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
              { label: "Levitation", value: MAGLEV.levitationMode },
              { label: "Propulsion", value: MAGLEV.propulsionType },
              { label: "Levitation Gap", value: `${MAGLEV.levitationGapM * 100} cm` },
              { label: "Battery Capacity", value: `${BATTERY.capacityPerUnit_kWh} kWh` },
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
        <FluxViewerClient />

        {/* FLUX SPEC SHEET */}
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
            FH-DX-II Flux — Full Specification
          </p>

          {/* Propulsion */}
          <div style={{ marginBottom: "56px" }}>
            <p style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-accent)", fontFamily: font, fontWeight: 600, marginBottom: "20px" }}>
              Propulsion
            </p>
            {[
              { label: "Track type", value: MAGLEV.trackType },
              { label: "Levitation mode", value: MAGLEV.levitationMode },
              { label: "Nominal levitation gap", value: `${MAGLEV.levitationGapM * 100}`, unit: "cm" },
              { label: "Propulsion type", value: MAGLEV.propulsionType },
              { label: "Motor energized zone", value: MAGLEV.motorMode },
              { label: "Braking mode", value: MAGLEV.brakingMode },
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

          {/* Energy Storage */}
          <div style={{ marginBottom: "56px" }}>
            <p style={{ fontSize: "12px", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-accent)", fontFamily: font, fontWeight: 600, marginBottom: "20px" }}>
              Energy Storage
            </p>
            {[
              { label: "Battery chemistry", value: BATTERY.chemistry },
              { label: "Capacity per unit", value: `${BATTERY.capacityPerUnit_kWh}`, unit: "kWh" },
              { label: "Station spacing", value: `${BATTERY.stationSpacingKm}`, unit: "km" },
              { label: "Charge / discharge rate", value: `${BATTERY.chargeDischargeRateKW}`, unit: "kW" },
              { label: "Cycle life", value: `${BATTERY.cycleLife.toLocaleString()}+`, unit: "cycles" },
              { label: "Purpose", value: BATTERY.purpose, source: BATTERY.source },
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
        </div>

      </div>
    </main>
  );
}
