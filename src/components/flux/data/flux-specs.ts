// All physics numbers sourced from engineering literature
// Coordinates match the Conduit scene (same tube geometry)

export const MAGLEV = {
  trackType: "Halbach array",
  levitationMode: "Passive — no power at cruise",
  levitationGapM: 0.1,
  propulsionType: "Linear Induction Motor (LIM)",
  motorMode: "Active segment only — not full-corridor energized",
  brakingMode: "Regenerative",
};

export const BATTERY = {
  chemistry: "LFP (Lithium Iron Phosphate)",
  capacityPerUnit_kWh: 250,
  stationSpacingKm: 1.6,
  chargeDischargeRateKW: 300,
  cycleLife: 6000,
  purpose: "Regenerative braking buffer + LIM segment power supply",
  source: "Grid-scale LFP energy storage industry data; CATL/BYD specifications",
};

export type FluxHotspotData = {
  id: string;
  label: string;
  position: [number, number, number];
  keyStat: string;
  explanation: string;
  data: { label: string; value: string; unit: string }[];
  whyItMatters: string;
  source: string;
  cameraPreset: [number, number, number];
};

export const FLUX_HOTSPOTS: FluxHotspotData[] = [
  {
    id: "F01",
    label: "HALBACH TRACK",
    position: [0, -1.65, -8],
    keyStat: "Passive levitation. No power at cruise. 10cm gap",
    explanation:
      "The Halbach array on the tube floor generates a spatially varying magnetic field that passively levitates the pod. Unlike conventional electromagnets, zero power is consumed at cruise speed — the pod floats on permanent magnet flux. The 4-phase alternating polarity arrangement (N↑ / H→ / S↓ / H←) concentrates flux downward, maximizing levitation force while canceling the field above the track.",
    data: [
      { label: "Track type", value: "Halbach array", unit: "" },
      { label: "Levitation mode", value: "Passive", unit: "" },
      { label: "Power at cruise", value: "0", unit: "W" },
      { label: "Nominal gap", value: "10", unit: "cm" },
      { label: "Magnet tile phases", value: "4-phase", unit: "" },
    ],
    whyItMatters:
      "Passive Halbach levitation eliminates the power-hungry electromagnets that make other maglev systems expensive to operate — zero cruise levitation power is the core energy efficiency argument.",
    source: "Halbach array permanent magnet levitation literature; passive maglev system studies",
    cameraPreset: [3, -3, -6],
  },
  {
    id: "F02",
    label: "LIM STATOR",
    position: [1.85, 0, -3],
    keyStat: "Linear induction. Active segment only. Regenerative braking",
    explanation:
      "Linear Induction Motor stators sit on the tube wall at 3 and 9 o'clock positions in segments every 1.8m. Only the segment immediately surrounding the pod is energized — the rest of the corridor is unpowered. During deceleration, the LIM reverses to act as a linear generator, feeding energy back through the stator windings into the adjacent battery buffer.",
    data: [
      { label: "Motor type", value: "LIM", unit: "" },
      { label: "Segment spacing", value: "1.8", unit: "m" },
      { label: "Energized zone", value: "Active segment only", unit: "" },
      { label: "Stator teeth per segment", value: "5", unit: "" },
      { label: "Braking", value: "Regenerative", unit: "" },
    ],
    whyItMatters:
      "Segment-active propulsion means per-km operating power is proportional to pods in transit, not corridor length — the corridor consumes near-zero power when empty.",
    source: "Linear induction motor engineering literature; segment propulsion system studies",
    cameraPreset: [5, 1, -3],
  },
  {
    id: "F03",
    label: "BATTERY SYSTEM",
    position: [-2.6, 0.8, -7],
    keyStat: "LFP. 250 kWh per unit. Co-located with LIM segments",
    explanation:
      "Lithium Iron Phosphate battery cabinets are mounted trackside, co-located with vacuum pump stations every 1.6 km. During pod deceleration, regenerative braking feeds energy back through the LIM stator windings into the battery buffer. During acceleration, the battery delivers burst power to the active LIM segment. LFP chemistry is specified for 6,000+ cycle life, thermal stability, and cell-level safety — critical in an enclosed vacuum corridor.",
    data: [
      { label: "Chemistry", value: "LFP", unit: "" },
      { label: "Capacity per unit", value: "250", unit: "kWh" },
      { label: "Station spacing", value: "1.6", unit: "km" },
      { label: "Charge / discharge rate", value: "300", unit: "kW" },
      { label: "Cycle life", value: "6,000+", unit: "cycles" },
    ],
    whyItMatters:
      "On-site energy storage captures regenerative braking energy and smooths LIM burst demand — decoupling the propulsion system from real-time grid capacity.",
    source: "Grid-scale LFP energy storage industry data; CATL/BYD LFP cell specifications",
    cameraPreset: [-8, 2, -7],
  },
];
