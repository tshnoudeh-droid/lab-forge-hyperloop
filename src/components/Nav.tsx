"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export default function Nav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
      style={{ backgroundColor: "var(--nav-bg)", backdropFilter: "blur(12px)" }}
    >
      <Link
        href="/"
        style={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--foreground)",
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
              color: "var(--muted)",
              fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            {label}
          </Link>
        ))}
        <button
          onClick={toggleTheme}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            color: "var(--foreground)",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
