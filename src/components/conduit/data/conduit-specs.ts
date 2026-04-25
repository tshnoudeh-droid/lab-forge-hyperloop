// Tube geometry — sourced from Forge Hyperloop engineering specifications
export const TUBE = {
  innerRadius: 1.65,    // meters
  outerRadius: 1.77,    // meters — 120mm wall thickness
  wallThickness: 0.12,  // meters
  innerDiameter: 3.3,   // meters
  outerDiameter: 3.54,  // meters
  length: 30,           // meters — scene length (shows ~3 expansion joint spans)
  segments: 64,         // geometry segments
  crossSectionalArea: 8.55,  // m²
  volumePerKm: 8550,         // m³/km
  material: "PosLoop355",    // POSCO high-strength steel
  steelMassPerKm: 12100,     // tonnes/km
};
