import Link from "next/link";

const subsystems = [
  {
    designation: "FH-DX-I",
    name: "CONDUIT",
    description: "Tube shell, vacuum system, seals, pylons, sensors.",
    status: "ACTIVE",
    href: "/conduit",
  },
  {
    designation: "FH-DX-II",
    name: "FLUX",
    description: "Maglev track, Halbach array, LIM stator segments.",
    status: "IN DEVELOPMENT",
    href: "/flux",
  },
  {
    designation: "FH-DX-III",
    name: "SHELL",
    description: "Pod exterior, nose cone, pressure vessel.",
    status: "IN DEVELOPMENT",
    href: "/shell",
  },
];

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "128px 32px 96px",
        backgroundColor: "#0A0A0A",
        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "clamp(120px, 20vw, 220px)",
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            marginBottom: "8px",
          }}
        >
          LAB
        </h1>
        <p
          style={{
            fontSize: "13px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "8px",
          }}
        >
          Forge Hyperloop
        </p>
        <p
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "64px",
            maxWidth: "480px",
            lineHeight: 1.6,
          }}
        >
          Engineering specifications for the Forge Hyperloop DX-I program.
        </p>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            marginBottom: "32px",
          }}
        />

        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "32px",
          }}
        >
          Forge Hyperloop DX-I
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1px",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        >
          {subsystems.map((s) => {
            const isActive = s.status === "ACTIVE";
            const card = (
              <div
                style={{
                  padding: "32px",
                  backgroundColor: "#0A0A0A",
                  borderLeft: isActive
                    ? "2px solid #C4A882"
                    : "2px solid transparent",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: isActive ? "#C4A882" : "rgba(255,255,255,0.3)",
                    marginBottom: "12px",
                  }}
                >
                  {s.designation}
                </p>
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.35)",
                    marginBottom: "12px",
                  }}
                >
                  {s.name}
                </h2>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.4)",
                    marginBottom: "24px",
                    lineHeight: 1.6,
                  }}
                >
                  {s.description}
                </p>
                <span
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: isActive ? "#C4A882" : "rgba(255,255,255,0.2)",
                  }}
                >
                  {s.status}
                </span>
              </div>
            );
            return isActive ? (
              <Link
                key={s.name}
                href={s.href}
                style={{ display: "block", textDecoration: "none" }}
              >
                {card}
              </Link>
            ) : (
              <div key={s.name}>{card}</div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
