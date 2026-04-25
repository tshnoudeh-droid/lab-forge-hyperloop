import ConduitViewerClient from "@/components/conduit/ConduitViewerClient";

export const metadata = {
  title: "FH-DX-I Conduit — Forge Hyperloop Lab",
  description: "Physics-backed 3D model of the Forge Hyperloop tube system.",
};

export default function ConduitPage() {
  return (
    <main style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}>
      <div style={{ paddingTop: "72px" }}>
        <div style={{ padding: "32px 32px 16px" }}>
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C4A882",
              marginBottom: "8px",
            }}
          >
            FH-DX-I
          </p>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              color: "#FFFFFF",
              marginBottom: "4px",
            }}
          >
            CONDUIT
          </h1>
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            Tube shell, vacuum system, seals, pylons, sensors. Scale 1:1 — real geometry.
          </p>
        </div>
        <ConduitViewerClient />
      </div>
    </main>
  );
}
