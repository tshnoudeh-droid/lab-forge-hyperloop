const font = "Helvetica Neue, Helvetica, Arial, sans-serif";

const specs = [
  { label: "Track Type", value: "Halbach Array" },
  { label: "Levitation", value: "Passive" },
  { label: "Nominal Gap", value: "10 cm" },
  { label: "Propulsion", value: "LIM" },
];

export default function Flux() {
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
            FH-DX-II
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
            FLUX
          </h1>
          <p
            style={{
              fontSize: "13px",
              color: "var(--muted)",
              lineHeight: 1.7,
              maxWidth: "560px",
              marginBottom: "40px",
            }}
          >
            Propulsion and levitation. A passive Halbach array maglev track paired with
            Linear Induction Motor stators mounted on the tube wall. No contact. No
            friction at cruise. Segment-active propulsion means power draw scales with
            pods in transit, not corridor length.
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
              The Flux 3D model is under active development. Halbach array geometry,
              LIM stator segments, and levitation gap visualization are in progress.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
