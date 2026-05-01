const font = "Helvetica Neue, Helvetica, Arial, sans-serif";

const links = [
  { label: "forgehyperloop.com", href: "https://forgehyperloop.com" },
  { label: "tawficshnoudeh.com", href: "https://tawficshnoudeh.com" },
  { label: "linkedin.com/in/tawficshnoudeh", href: "https://linkedin.com/in/tawficshnoudeh" },
];

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "48px 32px 32px",
        backgroundColor: "var(--background)",
        fontFamily: font,
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* TOP ROW */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "32px",
        }}
      >
        {/* LEFT: wordmark + label */}
        <div>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 500,
              fontStyle: "italic",
              letterSpacing: "0.2em",
              color: "var(--foreground)",
              marginBottom: "4px",
            }}
          >
            FORGE HYPERLOOP
          </p>
          <p
            style={{
              fontSize: "10px",
              fontStyle: "italic",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted-more)",
            }}
          >
            Engineering Lab
          </p>
        </div>

        {/* RIGHT: links column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", textAlign: "right" }}>
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "11px",
                fontStyle: "italic",
                color: "var(--muted-more)",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "color 0.2s",
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ borderTop: "1px solid var(--border)", margin: "28px 0" }} />

      {/* BOTTOM ROW */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            fontStyle: "italic",
            color: "var(--muted-more)",
            letterSpacing: "0.02em",
          }}
        >
          Built by Tawfic Alexander Shnoudeh
        </p>
        <p
          style={{
            fontSize: "10px",
            fontStyle: "italic",
            color: "var(--muted-more)",
            letterSpacing: "0.02em",
          }}
        >
          © 2025 Forge Hyperloop
        </p>
      </div>
    </footer>
  );
}
