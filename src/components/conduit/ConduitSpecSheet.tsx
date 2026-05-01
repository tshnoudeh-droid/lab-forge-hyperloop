import { TUBE, VACUUM, STRUCTURE, THERMAL, VACUUM_PUMPS, LEAK_DETECTION, SOLAR } from "./data/conduit-specs";

const font = "Helvetica Neue, Helvetica, Arial, sans-serif";

function Section({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: string; unit?: string; source?: string }[];
}) {
  return (
    <div style={{ marginBottom: "56px" }}>
      <p
        style={{
          fontSize: "12px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--color-accent)",
          fontFamily: font,
          fontWeight: 600,
          marginBottom: "20px",
        }}
      >
        {title}
      </p>
      <div>
        {rows.map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "14px 0",
              borderBottom: "1px solid var(--border)",
              fontFamily: font,
              gap: "16px",
            }}
          >
            <span style={{ fontSize: "14px", color: "var(--muted)", letterSpacing: "0.02em" }}>
              {row.label}
            </span>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--foreground)" }}>
                {row.value}
              </span>
              {row.unit && (
                <span
                  style={{
                    fontSize: "12px",
                    color: "var(--muted)",
                    marginLeft: "5px",
                  }}
                >
                  {row.unit}
                </span>
              )}
              {row.source && (
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--muted)",
                    marginTop: "3px",
                  }}
                >
                  {row.source}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ConduitSpecSheet() {
  return (
    <div
      style={{
        padding: "80px 32px",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: font,
      }}
    >
      <div
        style={{
          borderTop: "2px solid var(--color-accent)",
          marginBottom: "56px",
        }}
      />
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
        FH-DX-I Conduit — Full Specification
      </p>

      <Section
        title="Structure"
        rows={[
          { label: "Inner diameter", value: `${TUBE.innerDiameter}`, unit: "m" },
          { label: "Outer diameter", value: `${TUBE.outerDiameter}`, unit: "m" },
          { label: "Wall thickness", value: `${TUBE.wallThickness * 1000}`, unit: "mm" },
          { label: "Cross-sectional area", value: `${TUBE.crossSectionalArea}`, unit: "m²" },
          { label: "Material", value: TUBE.material, source: "POSCO PosLoop355 datasheet" },
          { label: "Hoop stress", value: `${STRUCTURE.hoopStressMPa}`, unit: "MPa" },
          { label: "Yield strength (PosLoop355)", value: `${STRUCTURE.yieldStrengthMPa}`, unit: "MPa" },
          { label: "Safety factor", value: `${STRUCTURE.safetyFactor}` },
          { label: "Weight vs. conventional steel", value: `-${STRUCTURE.weightReduction * 100}%` },
          { label: "Steel mass per km", value: `${TUBE.steelMassPerKm.toLocaleString()}`, unit: "tonnes" },
        ]}
      />

      <Section
        title="Vacuum"
        rows={[
          { label: "Operating pressure", value: `${VACUUM.operatingPressure}`, unit: "Pa" },
          { label: "Pressure differential", value: `${VACUUM.pressureDifferential.toLocaleString()}`, unit: "Pa" },
          { label: "Drag at 1,000 km/h (vacuum)", value: `${VACUUM.dragAt1000kph}`, unit: "N" },
          { label: "Drag at 1,000 km/h (open air)", value: `${VACUUM.dragOpenAir.toLocaleString()}`, unit: "N" },
          { label: "Drag reduction", value: `${VACUUM.dragReductionFactor.toLocaleString()}x` },
          { label: "Drag power (vacuum)", value: `${VACUUM.dragPowerVacuum}`, unit: "kW" },
          {
            label: "Drag power (open air)",
            value: `${VACUUM.dragPowerOpenAir.toLocaleString()}`,
            unit: "kW",
            source: VACUUM.source,
          },
        ]}
      />

      <Section
        title="Thermal"
        rows={[
          { label: "Expansion rate", value: `${THERMAL.expansionRateMmPer100mPer10C}`, unit: "mm / 100m / 10°C" },
          { label: "Seasonal temperature swing", value: `${THERMAL.seasonalTempSwingC}`, unit: "°C" },
          { label: "Joint spacing", value: `${THERMAL.expansionJointSpacingM}`, unit: "m" },
          { label: "Joint type", value: THERMAL.jointType },
          { label: "Total expansion (9,000 km)", value: `${THERMAL.totalExpansionOn9000km.toLocaleString()}`, unit: "m" },
          {
            label: "Joint count (9,000 km)",
            value: `${THERMAL.jointCount9000km.toLocaleString()}`,
            source: THERMAL.source,
          },
        ]}
      />

      <Section
        title="Monitoring"
        rows={[
          { label: "Technology", value: LEAK_DETECTION.technology },
          { label: "Spatial resolution", value: `${LEAK_DETECTION.spatialResolutionM}`, unit: "m" },
          { label: "Detection time", value: `<${LEAK_DETECTION.detectionTimeSec}`, unit: "s" },
          {
            label: "Comparable deployment",
            value: LEAK_DETECTION.comparableDeploy,
            source: LEAK_DETECTION.source,
          },
        ]}
      />

      <Section
        title="Power"
        rows={[
          { label: "Pump station spacing", value: `${VACUUM_PUMPS.stationSpacingKm}`, unit: "km" },
          { label: "Stations on 9,000 km", value: `${VACUUM_PUMPS.countOn9000km.toLocaleString()}` },
          {
            label: "Cost per station",
            value: `$${VACUUM_PUMPS.costPerStationUSD.toLocaleString()}`,
            source: VACUUM_PUMPS.source,
          },
          { label: "Continuous power per station", value: `${VACUUM_PUMPS.continuousPowerKw}`, unit: "kW" },
          { label: "Total corridor pump power", value: `${VACUUM_PUMPS.totalCorridorPowerMw}`, unit: "MW" },
          { label: "Solar contribution (est.)", value: SOLAR.operationalPowerContribution },
        ]}
      />
    </div>
  );
}
