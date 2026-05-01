// All physics numbers sourced from forge_hyperloop_research_master.md
// DO NOT hardcode these numbers in components — import from here

// Tube geometry — POSCO PosLoop355 steel specifications
export const TUBE = {
  innerRadius: 1.65,         // meters
  outerRadius: 1.77,         // meters — 120mm wall thickness
  wallThickness: 0.12,       // meters — minimum at SF 3.0
  innerDiameter: 3.3,        // meters — designed for pod clearance
  outerDiameter: 3.54,       // meters — includes 120mm wall
  length: 30,                // meters — scene length (shows ~3 expansion joint spans)
  segments: 64,              // geometry segments
  crossSectionalArea: 8.55,  // m² — pi * r²
  volumePerKm: 8550,         // m³/km
  material: "PosLoop355",    // POSCO high-strength steel
  steelMassPerKm: 12100,     // tonnes/km — with PosLoop355 weight advantage
};

// Vacuum system — European Hyperloop Centre data
export const VACUUM = {
  operatingPressure: 100,         // Pa (1 millibar, 99.9% vacuum)
  atmosphericPressure: 101325,    // Pa
  pressureDifferential: 101225,   // Pa — drives hoop stress
  dragAt1000kph: 37,              // N per pod at 1,000 km/h in vacuum
  dragOpenAir: 37800,             // N — baseline comparison
  dragReductionFactor: 1021,      // x reduction vs open air
  dragPowerVacuum: 10.3,          // kW per pod at 1,000 km/h
  dragPowerOpenAir: 10500,        // kW per pod (10.5 MW)
  source: "European Hyperloop Centre technical briefing",
};

// Structural — POSCO PosLoop355 datasheet
export const STRUCTURE = {
  hoopStressFormula: "σ = P × r / t",
  hoopStressMPa: 1.39,              // MPa — at 101,225 Pa diff, r=1.65m, t=0.12m
  yieldStrengthMPa: 355,            // MPa — PosLoop355 yield
  safetyFactor: 3.0,
  weightReduction: 0.27,            // 27% lighter than conventional steel
  vibrationDampingMultiplier: 1.7,  // 1.7x vs conventional
  source: "POSCO PosLoop355 datasheet",
};

// Thermal expansion — standard steel coefficient
export const THERMAL = {
  expansionRateMmPer100mPer10C: 12,  // mm per 100m per 10°C delta
  seasonalTempSwingC: 30,            // °C — design envelope
  expansionJointSpacingM: 100,       // meters
  totalExpansionOn9000km: 3240,      // meters
  jointCount9000km: 90000,
  jointType: "Metal bellows",
  source: "Standard steel thermal expansion coefficient (12 × 10⁻⁶ /°C)",
};

// Vacuum pump stations — European Hyperloop Centre data
export const VACUUM_PUMPS = {
  stationSpacingKm: 1.6,       // km
  countOn9000km: 5625,
  costPerStationUSD: 195000,
  type: "Rotary vane (roughing) + turbomolecular (high vacuum) in series",
  continuousPowerKw: 15,       // kW per station
  totalCorridorPowerMw: 84.4,  // MW for 9,000 km
  source: "European Hyperloop Centre data",
};

// Leak detection — Brillouin OTDR fiber sensing
export const LEAK_DETECTION = {
  technology: "Distributed fiber optic sensing (Brillouin scattering)",
  spatialResolutionM: 1,       // meter
  detectionTimeSec: 1,         // less than 1 second
  comparableDeploy: "US natural gas pipeline monitoring (2.5M miles)",
  source: "Brillouin optical time-domain reflectometry literature",
};

// Pylon structures
export const PYLONS = {
  spacingM: 30,
  perKm: 33,
  crossSection: "I-beam with X-diagonal bracing",
  base: "Seismic isolation, driven pile foundation",
};

// Maglev propulsion
export const MAGLEV = {
  trackType: "Halbach array",
  levitationMode: "Passive — no power at cruise",
  levitationGapM: 0.1,         // 10cm nominal gap
  propulsionType: "Linear Induction Motor (LIM)",
  motorMode: "Active segment only — not full-corridor energized",
  brakingMode: "Regenerative",
};

// Solar film
export const SOLAR = {
  tubeTopCoverage: "Continuous strip on tube exterior",
  operationalPowerContribution: "20-40%",
};

// Hotspot definitions — 9 labels in the 3D scene
export type HotspotData = {
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

export const HOTSPOTS: HotspotData[] = [
  {
    id: "01",
    label: "TUBE SHELL",
    position: [1.9, 0.5, 5],
    keyStat: "101,225 Pa differential. 120mm PosLoop355 wall. SF 3.0",
    explanation:
      "The tube wall must resist the full atmospheric pressure differential between outside air and the near-vacuum interior. At 101,225 Pa differential with a 1.65m inner radius and 0.12m wall thickness, hoop stress is 1.39 MPa — well within PosLoop355 yield strength of 355 MPa at safety factor 3.0.",
    data: [
      { label: "Inner diameter", value: "3.3", unit: "m" },
      { label: "Wall thickness", value: "120", unit: "mm" },
      { label: "Pressure differential", value: "101,225", unit: "Pa" },
      { label: "Hoop stress", value: "1.39", unit: "MPa" },
      { label: "Yield strength (PosLoop355)", value: "355", unit: "MPa" },
      { label: "Safety factor", value: "3.0", unit: "" },
    ],
    whyItMatters:
      "The wall physics prove the vacuum is achievable with existing steel — no exotic materials required.",
    source: "POSCO PosLoop355 datasheet; σ = P × r / t",
    cameraPreset: [8, 3, 8],
  },
  {
    id: "02",
    label: "VACUUM SYSTEM",
    position: [0, 2.3, 8],
    keyStat: "100 Pa operating pressure. 1,021x drag reduction vs. open air",
    explanation:
      "Operating at 100 Pa (1 millibar) reduces aerodynamic drag from 37,800 N in open air to just 37 N in vacuum — a 1,021x reduction. This cuts drag power from 10.5 MW per pod to 10.3 kW. Pump stations every 1.6 km maintain this pressure continuously.",
    data: [
      { label: "Operating pressure", value: "100", unit: "Pa" },
      { label: "Drag at 1,000 km/h (vacuum)", value: "37", unit: "N" },
      { label: "Drag at 1,000 km/h (open air)", value: "37,800", unit: "N" },
      { label: "Drag power (vacuum)", value: "10.3", unit: "kW" },
      { label: "Drag power (open air)", value: "10,500", unit: "kW" },
      { label: "Pump station spacing", value: "1.6", unit: "km" },
      { label: "Cost per station", value: "$195,000", unit: "" },
    ],
    whyItMatters:
      "Vacuum is the entire energy efficiency argument — 1,021x drag reduction transforms the energy economics.",
    source: "European Hyperloop Centre technical briefing",
    cameraPreset: [0, 5, 8],
  },
  {
    id: "03",
    label: "EXPANSION JOINT",
    position: [2.1, 0, 0],
    keyStat: "90,000 joints on 9,000 km. 12mm travel per 10°C per 100m",
    explanation:
      "Steel expands 12mm per 100m per 10°C temperature change. Over a 30°C seasonal swing, each 100m span moves 36mm. Metal bellows joints — identical to those used in cryogenic piping systems — absorb this movement without breaking the vacuum seal.",
    data: [
      { label: "Expansion rate", value: "12", unit: "mm / 100m / 10°C" },
      { label: "Seasonal swing", value: "30", unit: "°C" },
      { label: "Joint spacing", value: "100", unit: "m" },
      { label: "Joint type", value: "Metal bellows", unit: "" },
      { label: "Total expansion (9,000 km)", value: "3,240", unit: "m" },
      { label: "Joint count (9,000 km)", value: "90,000", unit: "" },
    ],
    whyItMatters:
      "Thermal expansion is the most-cited structural objection to long-distance hyperloop — metal bellows is the proven answer.",
    source: "Steel thermal expansion coefficient (12 × 10⁻⁶ /°C); cryogenic piping standards",
    cameraPreset: [5, 2, 0],
  },
  {
    id: "04",
    label: "LEAK DETECTION",
    position: [0, 2.1, -5],
    keyStat: "Brillouin scattering. 1m spatial resolution. <1s detection",
    explanation:
      "Distributed fiber optic sensing using Brillouin scattering detects pressure anomalies to 1-meter spatial resolution in under one second. The same technology monitors 2.5 million miles of US natural gas pipelines. A continuous fiber bonded to the tube exterior covers the entire corridor without gaps.",
    data: [
      { label: "Technology", value: "Brillouin OTDR", unit: "" },
      { label: "Spatial resolution", value: "1", unit: "m" },
      { label: "Detection time", value: "<1", unit: "s" },
      { label: "Comparable deployment", value: "2.5M miles", unit: "US gas pipelines" },
    ],
    whyItMatters:
      "A 1-second full-corridor leak scan eliminates the undetectable breach objection entirely.",
    source: "Brillouin OTDR literature; US natural gas pipeline monitoring reports",
    cameraPreset: [0, 4, -5],
  },
  {
    id: "05",
    label: "PYLON STRUCTURE",
    position: [0, -5, 0],
    keyStat: "30m spacing. Seismic isolated base. I-beam with X-bracing",
    explanation:
      "Pylons are spaced every 30m — approximately 33 per kilometer. I-beam cross-section with X-diagonal bracing provides lateral stiffness. Seismic isolation at the base decouples the tube from ground motion. Foundation uses driven piles for consistent bearing capacity across soil types.",
    data: [
      { label: "Pylon spacing", value: "30", unit: "m" },
      { label: "Pylons per km", value: "~33", unit: "" },
      { label: "Cross-section", value: "I-beam + X-bracing", unit: "" },
      { label: "Base", value: "Seismic isolated", unit: "" },
      { label: "Foundation", value: "Driven pile", unit: "" },
    ],
    whyItMatters:
      "The support structure is standard civil engineering — no novel construction methods required.",
    source: "Standard structural engineering; seismic isolation industry standards",
    cameraPreset: [8, -4, 3],
  },
  {
    id: "06",
    label: "HALBACH TRACK",
    position: [0, -1.6, -8],
    keyStat: "Passive levitation. No power at cruise. 10cm gap",
    explanation:
      "The Halbach array on the tube floor creates a passive magnetic field that levitates the pod without powered electromagnets. At cruise speed, levitation consumes zero propulsion energy — the pod floats on permanent magnet flux. The 10cm nominal gap provides clearance for dynamic loading.",
    data: [
      { label: "Track type", value: "Halbach array", unit: "" },
      { label: "Levitation mode", value: "Passive", unit: "" },
      { label: "Power at cruise", value: "0", unit: "W" },
      { label: "Nominal gap", value: "10", unit: "cm" },
    ],
    whyItMatters:
      "Passive Halbach levitation eliminates the power-hungry electromagnets that make other maglev systems expensive to operate.",
    source: "Halbach array permanent magnet levitation literature",
    cameraPreset: [0, -2, -8],
  },
  {
    id: "07",
    label: "LIM STATOR",
    position: [1.8, 0, -3],
    keyStat: "Linear induction. Active segment only. Regenerative braking",
    explanation:
      "Linear Induction Motor stators are mounted on the tube wall in segments. Only the segment immediately surrounding the pod is energized — the rest of the corridor draws no propulsion power. Deceleration feeds energy back to the grid via regenerative braking.",
    data: [
      { label: "Motor type", value: "LIM", unit: "" },
      { label: "Energized zone", value: "Active segment only", unit: "" },
      { label: "Braking", value: "Regenerative", unit: "" },
    ],
    whyItMatters:
      "Segment-active propulsion means the per-km operating power is proportional to pods in transit, not corridor length.",
    source: "Linear induction motor engineering literature",
    cameraPreset: [5, 1, -3],
  },
  {
    id: "08",
    label: "THERMAL SYSTEM",
    position: [2.0, 0.3, 10],
    keyStat: "3,240m total expansion on 9,000 km corridor. Metal bellows seal",
    explanation:
      "The entire 9,000 km corridor expands and contracts by up to 3,240 meters with seasonal temperature changes. Metal bellows joints every 100m each absorb up to 36mm of linear travel. This is the same joint technology used in steam distribution and cryogenic systems with proven decades of service life.",
    data: [
      { label: "Total corridor expansion", value: "3,240", unit: "m" },
      { label: "Joint travel per 100m span", value: "36", unit: "mm" },
      { label: "Joint type", value: "Metal bellows", unit: "" },
      { label: "Joint count", value: "90,000", unit: "" },
    ],
    whyItMatters:
      "Metal bellows have been sealing thermal expansion in pressurized systems for 80+ years — no experimental technology needed.",
    source: "Thermal expansion calculation; bellows industry standards (EJMA)",
    cameraPreset: [6, 2, 10],
  },
  {
    id: "09",
    label: "SOLAR FILM",
    position: [0, 2.1, 3],
    keyStat: "20-40% operational power from tube-top solar",
    explanation:
      "Thin-film photovoltaic panels bonded to the tube top convert solar energy to electricity. The tube presents a continuous surface across the corridor. Conservative estimates put solar contribution at 20-40% of operational power including vacuum maintenance and station systems.",
    data: [
      { label: "Placement", value: "Tube exterior top", unit: "" },
      { label: "Operational power contribution", value: "20-40", unit: "%" },
    ],
    whyItMatters:
      "The tube itself becomes a distributed power plant — offsetting a significant fraction of operating costs.",
    source: "Thin-film PV energy yield estimates based on corridor latitude and surface area",
    cameraPreset: [0, 5, 3],
  },
];
