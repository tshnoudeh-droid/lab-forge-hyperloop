import Link from "next/link";

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
      <div style={{ paddingTop: "88px" }}>

        {/* BACK BUTTON */}
        <div style={{ padding: "0 32px 24px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
              fontFamily: font,
              textDecoration: "none",
            }}
          >
            <span style={{ fontSize: "16px", lineHeight: 1 }}>&#8592;</span>
            Back
          </Link>
        </div>

        {/* DESCRIPTION BLOCK */}
        <div style={{ padding: "0 32px 0" }}>
          <p
            style={{
              fontSize: "12px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "14px",
              fontFamily: font,
              fontWeight: 500,
            }}
          >
            FH-DX-II
          </p>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "var(--foreground)",
              marginBottom: "20px",
              lineHeight: 1,
              fontFamily: font,
            }}
          >
            FLUX
          </h1>
          <p
            style={{
              fontSize: "17px",
              color: "var(--muted)",
              lineHeight: 1.75,
              maxWidth: "600px",
              marginBottom: "44px",
              fontFamily: font,
              letterSpacing: "0.01em",
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
              borderTop: "2px solid var(--color-accent)",
              paddingTop: "28px",
              display: "flex",
              gap: "56px",
              flexWrap: "wrap",
              marginBottom: "44px",
            }}
          >
            {specs.map(({ label, value }) => (
              <div key={label}>
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                    marginBottom: "8px",
                    fontFamily: font,
                    fontWeight: 500,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: 600,
                    color: "var(--foreground)",
                    letterSpacing: "0.02em",
                    fontFamily: font,
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
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                marginBottom: "20px",
                fontFamily: font,
                fontWeight: 500,
              }}
            >
              Status
            </p>
            <p
              style={{
                fontSize: "16px",
                color: "var(--muted)",
                lineHeight: 1.7,
                maxWidth: "480px",
                fontFamily: font,
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
