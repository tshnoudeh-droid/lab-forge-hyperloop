export default function Flux() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "128px 32px 96px",
        backgroundColor: "var(--background)",
        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "16px",
          }}
        >
          FH-DX-II
        </p>
        <h1
          style={{
            fontSize: "64px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            color: "var(--foreground)",
            marginBottom: "24px",
          }}
        >
          FLUX
        </h1>
        <p style={{ fontSize: "13px", color: "var(--muted)" }}>
          IN DEVELOPMENT
        </p>
      </div>
    </main>
  );
}
