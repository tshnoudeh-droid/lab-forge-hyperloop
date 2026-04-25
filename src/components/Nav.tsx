import Link from "next/link";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6">
      <Link
        href="/"
        style={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#FFFFFF",
          fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
          textDecoration: "none",
        }}
      >
        Forge Hyperloop Lab
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
        {[
          { href: "/conduit", label: "CONDUIT" },
          { href: "/flux", label: "FLUX" },
          { href: "/shell", label: "SHELL" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
