const font = "Helvetica Neue, Helvetica, Arial, sans-serif";

const specs = [
  { label: "Bore Clearance", value: "3.30 m" },
  { label: "Target Cruise", value: "1,000 km/h" },
  { label: "Drag at Cruise", value: "37 N" },
  { label: "Pressure Env.", value: "100 Pa" },
];

export default function Shell() {
  return (
    <main
      style={{
        backgroundColor: "var(--background)",
        minHeight: "100vh",
        fontFamily: font,
      }}
    >
      <div style={{ paddingTop: "72px" }}>

        {/* DESCRIPTION BLOCK */}
        <div style={{ padding: "48px 32px 0" }}>
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "12px",
            }}
          >
            FH-DX-III
          </p>
          <h1
            style={{
              fontSize: "42px",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "var(--foreground)",
              marginBottom: "16px",
              lineHeight: 1,
            }}
          >
            SHELL
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "var(--muted)",
              lineHeight: 1.75,
              maxWidth: "560px",
              marginBottom: "40px",
              fontFamily: "var(--font-libre-baskerville), Georgia, serif",
            }}
          >
            The pod pressure vessel and aeroshell. A composite nose cone and lightweight
            fuselage designed for the 100 Pa operating environment of the Conduit. Geometry
            optimized to minimize aerodynamic drag at 1,000 km/h cruise within the 3.30m bore.
          </p>

          {/* KEY SPECS ROW */}
          <div
            style={{
              borderTop: "1px solid var(--border)",
              paddingTop: "24px",
              display: "flex",
              gap: "48px",
              flexWrap: "wrap",
              marginBottom: "40px",
            }}
          >
            {specs.map(({ label, value }) => (
              <div key={label}>
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--muted-more)",
                    marginBottom: "6px",
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "var(--foreground)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* IN DEVELOPMENT */}
          <div
            style={{
              borderTop: "1px solid var(--border)",
              paddingTop: "40px",
              paddingBottom: "96px",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--muted-more)",
                marginBottom: "16px",
              }}
            >
              Status
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "var(--muted)",
                lineHeight: 1.7,
                maxWidth: "400px",
              }}
            >
              The Shell 3D model is under active development. Pod geometry, nose cone
              profile, and pressure vessel visualization are in progress.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
