import ConduitViewerClient from "@/components/conduit/ConduitViewerClient";
import ConduitSpecSheet from "@/components/conduit/ConduitSpecSheet";

export const metadata = {
  title: "FH-DX-I Conduit — Forge Hyperloop Lab",
  description: "Physics-backed 3D model of the Forge Hyperloop tube system.",
};

export default function ConduitPage() {
  return (
    <main
      style={{
        backgroundColor: "var(--background)",
        minHeight: "100vh",
        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ paddingTop: "72px" }}>
        <div style={{ padding: "40px 32px 24px" }}>
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
              marginBottom: "12px",
              lineHeight: 1,
            }}
          >
            CONDUIT
          </h1>
          <p
            style={{
              fontSize: "12px",
              color: "var(--muted)",
              lineHeight: 1.6,
              maxWidth: "480px",
            }}
          >
            Tube shell, vacuum system, seals, pylons, sensors. Scale 1:1 — real geometry.
          </p>
        </div>
        <ConduitViewerClient />
        <ConduitSpecSheet />
      </div>
    </main>
  );
}
