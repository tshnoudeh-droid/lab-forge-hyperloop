"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { TiltCard } from "@/components/ui/tilt-card";

const subsystems = [
  {
    designation: "FH-DX-I-A",
    name: "CONDUIT",
    description: "Tube shell, vacuum system, seals, pylons, sensors.",
    status: "ACTIVE",
    href: "/designs/dx-i/conduit",
  },
  {
    designation: "FH-DX-I-B",
    name: "FLUX",
    description: "Maglev track, Halbach array, LIM stator segments.",
    status: "ACTIVE",
    href: "/designs/dx-i/flux",
  },
  {
    designation: "FH-DX-I-C",
    name: "SHELL",
    description: "Pod exterior, nose cone, pressure vessel.",
    status: "ACTIVE",
    href: "/designs/dx-i/shell",
  },
];

const font = "Helvetica Neue, Helvetica, Arial, sans-serif";

export default function DXIPage() {
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
              transition: "color 0.2s",
            }}
          >
            <span style={{ fontSize: "16px", lineHeight: 1 }}>&#8592;</span>
            Lab
          </Link>
        </div>

        {/* DX-I HEADER */}
        <section
          style={{
            padding: "0 32px 56px",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <FadeIn>
            <div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: "48px",
                marginBottom: "40px",
                display: "flex",
                alignItems: "flex-start",
                gap: "64px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ flex: "0 0 auto" }}>
                <p
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "8px",
                    fontFamily: font,
                  }}
                >
                  Design Cycle
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                    fontFamily: font,
                    fontWeight: 600,
                  }}
                >
                  DX-I
                </p>
              </div>
              <div style={{ flex: "1 1 300px" }}>
                <h1
                  style={{
                    fontSize: "36px",
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    color: "var(--foreground)",
                    marginBottom: "14px",
                    fontFamily: font,
                  }}
                >
                  Design Cycle One.
                </h1>
                <p
                  style={{
                    fontSize: "16px",
                    color: "var(--muted)",
                    lineHeight: 1.75,
                    maxWidth: "480px",
                    fontFamily: font,
                    letterSpacing: "0.01em",
                  }}
                >
                  Three interdependent subsystems. A complete ground-up engineering
                  model of a full hyperloop corridor.
                  Real physics. Real geometry. No simplifications.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* SUBSYSTEM GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1px",
              backgroundColor: "var(--color-accent)",
            }}
          >
            {subsystems.map((s, i) => (
              <Link
                key={s.name}
                href={s.href}
                style={{ display: "block", textDecoration: "none" }}
              >
                <FadeIn delay={i * 0.08}>
                  <TiltCard tiltLimit={8} scale={1.02} spotlight={true} style={{ height: "100%" }}>
                    <div
                      style={{
                        padding: "32px",
                        backgroundColor: "var(--card-bg)",
                        borderLeft: "3px solid var(--color-accent)",
                        height: "100%",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color: "var(--color-accent)",
                          marginBottom: "12px",
                          fontFamily: font,
                          fontWeight: 500,
                        }}
                      >
                        {s.designation}
                      </p>
                      <h2
                        style={{
                          fontSize: "24px",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          color: "var(--foreground)",
                          marginBottom: "12px",
                          fontFamily: font,
                        }}
                      >
                        {s.name}
                      </h2>
                      <p
                        style={{
                          fontSize: "14px",
                          color: "var(--muted)",
                          marginBottom: "24px",
                          lineHeight: 1.6,
                          fontFamily: font,
                        }}
                      >
                        {s.description}
                      </p>
                      <span
                        style={{
                          fontSize: "11px",
                          letterSpacing: "0.25em",
                          textTransform: "uppercase",
                          color: "var(--color-accent)",
                          fontFamily: font,
                          fontWeight: 500,
                        }}
                      >
                        {s.status}
                      </span>
                    </div>
                  </TiltCard>
                </FadeIn>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
