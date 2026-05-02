// All physics numbers derived from conduit-specs.ts geometry and vacuum specs
// Tube inner radius: 1.65m → pod outer radius 1.30m → 0.35m bore clearance each side

export const POD = {
  outerRadius: 1.3,          // m — 2.6m outer diameter; bore clearance = 1.65 - 1.30 = 0.35m
  innerRadius: 1.22,         // m — 80mm CFRP wall
  wallThickness: 0.08,       // m
  length: 16.0,              // m — total pod length
  noseLength: 3.0,           // m — ogive nose section
  tailLength: 3.0,           // m — tail fairing
  fuselageLength: 10.0,      // m
  material: "Carbon fiber composite with aluminum honeycomb core",
  boreGapM: 0.35,            // m — clearance from tube inner wall
};

export const PRESSURE_VESSEL = {
  internalPressurePa: 101325,    // Pa — 1 atm (passenger/cargo module)
  externalPressurePa: 100,       // Pa — tube operating vacuum
  differentialKPa: 101.2,        // kPa
  safetyFactor: 4.0,             // aircraft pressure vessel certification standard
  wallMaterial: "CFRP + aluminum honeycomb sandwich",
  wallThicknessMm: 80,           // mm
  source: "Aircraft pressure vessel certification (DO-2607B); same differential physics as tube wall",
};

export const AERODYNAMICS = {
  dragAtCruise_N: 37,            // N — in 100 Pa vacuum at 1,000 km/h (EHC data)
  dragPowerKW: 10.3,             // kW — P = F × v = 37N × 277.8 m/s
  noseProfile: "Ogive — von Karman profile",
  boattailAngleDeg: 12,          // degrees — drag-optimized for vacuum operation
  source: "European Hyperloop Centre technical briefing; aerodynamic optimization literature",
};

// Geometry scaling constants shared across all shell components
// POD_SCALE_Y flattens the LatheGeometry height to get width > height cross-section
// Tube: innerRadius 1.65m, FLOOR_Y = -1.63m
// POD_Y = FLOOR_Y + LEV_GAP + SKID_H + UNDERBODY_H + (outerRadius * POD_SCALE_Y)
//       = -1.63 + 0.10 + 0.065 + 0.32 + (1.30 * 0.55) = -0.43
export const SHELL_GEOMETRY = {
  POD_SCALE_Y: 0.55,    // LatheGeometry Y scale — makes width 1.6x height
  UNDERBODY_H: 0.32,    // m — underbody panel height below main body
  SKID_H: 0.065,        // m — levitation skid height
  POD_Y: -0.43,         // m — pod body center in world Y
  SCALED_R_Y: 0.715,    // m — effective vertical radius (outerRadius * POD_SCALE_Y)
};

export const LEVITATION_SKID = {
  material: "Aluminum alloy 6061-T6",
  position: "Bottom centerline",
  interactionMode: "Passive Halbach array",
  nominalGapMm: 100,             // mm — matches MAGLEV.levitationGapM in flux-specs.ts
  widthM: 0.44,                  // m — matches Halbach track tile width
  source: "Co-specified with FLUX Halbach track geometry",
};

export type ShellHotspotData = {
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

export const SHELL_HOTSPOTS: ShellHotspotData[] = [
  {
    id: "S01",
    label: "NOSE CONE",
    position: [1.1, 0.3, -7],
    keyStat: "Von Karman ogive. 37 N drag at 1,000 km/h in vacuum",
    explanation:
      "The von Karman ogive profile minimizes wave drag in the low-density operating environment. At 100 Pa tube pressure, aerodynamic drag is 37 N at 1,000 km/h — the same figure as the full-corridor vacuum calculation. The nose cone is a 3-meter CFRP fairing bonded to the fuselage pressure bulkhead. The symmetric tail section mirrors the nose for bidirectional operation.",
    data: [
      { label: "Profile", value: "Von Karman ogive", unit: "" },
      { label: "Length", value: "3.0", unit: "m" },
      { label: "Drag at 1,000 km/h", value: "37", unit: "N" },
      { label: "Drag power", value: "10.3", unit: "kW" },
      { label: "Material", value: "CFRP", unit: "" },
    ],
    whyItMatters:
      "In vacuum, aerodynamic drag is nearly eliminated — 37 N is 1,000x less than open-air operation, making pod shape optimization a secondary concern versus pressure vessel integrity.",
    source: "European Hyperloop Centre technical briefing; aerodynamic optimization literature",
    cameraPreset: [-4, 4, -12],
  },
  {
    id: "S02",
    label: "PRESSURE VESSEL",
    position: [1.35, 0.18, 0],
    keyStat: "101.2 kPa differential. SF 4.0. 80mm CFRP wall",
    explanation:
      "The pod maintains 1 standard atmosphere (101,325 Pa) internally while operating in 100 Pa tube vacuum — a 101.2 kPa inward pressure differential. The same physics as the tube wall hoop stress problem but applied in reverse: the pod shell must resist implosion. An 80mm carbon fiber composite wall with aluminum honeycomb core provides safety factor 4.0 against the differential loading. Wall geometry and material match aircraft pressure vessel certification standards.",
    data: [
      { label: "Internal pressure", value: "101,325", unit: "Pa" },
      { label: "External pressure", value: "100", unit: "Pa" },
      { label: "Pressure differential", value: "101.2", unit: "kPa" },
      { label: "Safety factor", value: "4.0", unit: "" },
      { label: "Wall thickness", value: "80", unit: "mm" },
      { label: "Wall material", value: "CFRP + honeycomb", unit: "" },
    ],
    whyItMatters:
      "The pod pressure vessel faces the same engineering challenge as the tube wall — both must resist 101 kPa differential with proven materials at certified safety factors.",
    source: "Aircraft pressure vessel certification (DO-2607B); CFRP composite structure standards",
    cameraPreset: [10, 4, 0],
  },
  {
    id: "S03",
    label: "LEVITATION SKID",
    position: [0.5, -1.55, 3],
    keyStat: "10cm nominal gap. Passive Halbach. No power at cruise",
    explanation:
      "The levitation skid is a precision-machined aluminum alloy rail mounted on the pod underside, co-specified with the Halbach track in the tube floor. The 10 cm nominal levitation gap is maintained passively by the Halbach array magnetic field — no active control or power required at cruise speed. The skid width (440mm) matches the Halbach track tile array to maximize flux coupling and levitation force.",
    data: [
      { label: "Material", value: "Aluminum 6061-T6", unit: "" },
      { label: "Nominal gap", value: "100", unit: "mm" },
      { label: "Track interface", value: "Passive Halbach", unit: "" },
      { label: "Skid width", value: "440", unit: "mm" },
      { label: "Power at cruise", value: "0", unit: "W" },
    ],
    whyItMatters:
      "The skid-to-track interface is the physical link between pod and propulsion system — zero-power passive levitation means the gap is self-stabilizing at cruise velocity.",
    source: "Co-specified with FLUX Halbach track; passive maglev system literature",
    cameraPreset: [0, -8, 5],
  },
];
