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
        backgroundColor: "var(--background)",
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
            color: "var(--foreground)",
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
            color: "var(--muted)",
            marginBottom: "8px",
          }}
        >
          Forge Hyperloop
        </p>
        <p
          style={{
            fontSize: "13px",
            color: "var(--muted)",
            marginBottom: "64px",
            maxWidth: "480px",
            lineHeight: 1.6,
          }}
        >
          Engineering specifications for the Forge Hyperloop DX-I program.
        </p>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            marginBottom: "32px",
          }}
        />

        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--muted-more)",
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
            backgroundColor: "var(--border)",
          }}
        >
          {subsystems.map((s) => {
            const isActive = s.status === "ACTIVE";
            const card = (
              <div
                style={{
                  padding: "32px",
                  backgroundColor: "var(--card-bg)",
                  borderLeft: isActive
                    ? "2px solid var(--color-accent)"
                    : "2px solid transparent",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--color-accent)" : "var(--muted-more)",
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
                    color: isActive ? "var(--foreground)" : "var(--muted)",
                    marginBottom: "12px",
                  }}
                >
                  {s.name}
                </h2>
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--muted)",
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
                    color: isActive ? "var(--color-accent)" : "var(--muted-more)",
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
