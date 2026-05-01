"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";

export default function Nav() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 32px",
        backgroundColor: "var(--nav-bg)",
        backdropFilter: "blur(12px)",
      }}
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
        <Button
          variant="ghost"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="rounded-none"
          style={{
            fontSize: "9px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            color: "var(--muted)",
            padding: "5px 10px",
            height: "auto",
            border: "1px solid var(--border)",
          }}
        >
          {theme === "dark" ? "LIGHT" : "DARK"}
        </Button>
      </div>
    </nav>
  );
}
