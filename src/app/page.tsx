"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { TiltCard } from "@/components/ui/tilt-card";

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

const font = "Helvetica Neue, Helvetica, Arial, sans-serif";

export default function Home() {
  return (
    <main
      style={{
        backgroundColor: "var(--background)",
        fontFamily: font,
        minHeight: "100vh",
      }}
    >
      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 32px",
          position: "relative",
        }}
      >
        {/* Subtle accent line */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "32px",
          right: "32px",
          height: "1px",
          backgroundColor: "var(--color-accent)",
          opacity: 0.15,
          pointerEvents: "none",
        }} />

        <motion.a
          href="https://forgehyperloop.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] }}
          style={{
            fontSize: "13px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: "20px",
            fontFamily: font,
            fontWeight: 500,
            textDecoration: "none",
            cursor: "default",
          }}
        >
          Forge Hyperloop
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0, 0, 1] }}
          style={{
            fontSize: "clamp(140px, 22vw, 240px)",
            fontWeight: 700,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            color: "var(--foreground)",
            marginBottom: "28px",
            fontFamily: font,
          }}
        >
          LAB
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.25, 0, 0, 1] }}
          style={{
            fontSize: "13px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--muted)",
            lineHeight: 1.8,
            fontFamily: font,
          }}
        >
          The physical design blueprint
          <br />
          for a complete hyperloop system
        </motion.p>

        {/* Bottom accent bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0, 0, 1] }}
          style={{
            position: "absolute",
            bottom: "48px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "48px",
            height: "2px",
            backgroundColor: "var(--color-accent)",
          }}
        />
      </section>

      {/* MISSION */}
      <section
        style={{
          padding: "0 32px 96px",
          maxWidth: "760px",
          margin: "0 auto",
        }}
      >
        <FadeIn>
          <div
            style={{
              borderTop: "2px solid var(--color-accent)",
              paddingTop: "56px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                marginBottom: "40px",
                textAlign: "center",
                fontFamily: font,
                fontWeight: 500,
              }}
            >
              01 // Mission
            </p>
            <p
              style={{
                fontSize: "20px",
                fontWeight: 400,
                lineHeight: 1.7,
                color: "var(--foreground)",
                textAlign: "center",
                fontFamily: font,
                letterSpacing: "0.01em",
              }}
            >
              Forge Hyperloop Lab is the master engineering blueprint.
              A full-system, physics-first design facility for hyperloop technology.
              Every subsystem at 1:1 scale. Every number verified.
              Design cycles run inside the Lab — DX-I is the first.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* DX PROJECT */}
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
                02 // Design Cycle
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
              <h2
                style={{
                  fontSize: "26px",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                  color: "var(--foreground)",
                  marginBottom: "14px",
                  fontFamily: font,
                }}
              >
                Design Cycle One.
              </h2>
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
                model of a full hyperloop corridor run inside the Lab.
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
          {subsystems.map((s, i) => {
            const isActive = s.status === "ACTIVE";
            const card = (
              <FadeIn delay={i * 0.08}>
                <TiltCard tiltLimit={8} scale={1.02} spotlight={true} style={{ height: "100%" }}>
                <div
                  style={{
                    padding: "32px",
                    backgroundColor: "var(--card-bg)",
                    borderLeft: isActive
                      ? "3px solid var(--color-accent)"
                      : "3px solid transparent",
                    height: "100%",
                  }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: isActive ? "var(--color-accent)" : "var(--muted)",
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
                      color: isActive ? "var(--foreground)" : "var(--muted)",
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
                      color: isActive ? "var(--color-accent)" : "var(--muted)",
                      fontFamily: font,
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {s.status}
                  </span>
                </div>
                </TiltCard>
              </FadeIn>
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
      </section>

    </main>
  );
}
