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
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] }}
          style={{
            fontSize: "11px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "20px",
          }}
        >
          Forge Hyperloop
        </motion.p>

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
          }}
        >
          LAB
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.25, 0, 0, 1] }}
          style={{
            fontSize: "11px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--muted)",
            lineHeight: 1.8,
          }}
        >
          Engineering specifications
          <br />
          for the DX-I program
        </motion.p>
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
              borderTop: "1px solid var(--border)",
              paddingTop: "56px",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--muted-more)",
                marginBottom: "40px",
                textAlign: "center",
              }}
            >
              01 // Mission
            </p>
            <p
              style={{
                fontSize: "19px",
                fontWeight: 400,
                lineHeight: 1.65,
                color: "var(--foreground)",
                textAlign: "center",
              }}
            >
              Forge Hyperloop Lab is the engineering core of the DX-I program.
              A physics-first, software-defined approach to hyperloop design.
              Every subsystem modeled at 1:1 scale with real geometry and verified physics.
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
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--muted-more)",
                  marginBottom: "8px",
                }}
              >
                02 // Program
              </p>
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                }}
              >
                FH-DX-I
              </p>
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  color: "var(--foreground)",
                  marginBottom: "14px",
                }}
              >
                The DX-I program.
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  color: "var(--muted)",
                  lineHeight: 1.7,
                  maxWidth: "480px",
                }}
              >
                Three interdependent subsystems. A complete ground-up engineering
                model of a functional hyperloop corridor. Real physics. Real geometry.
                No simplifications.
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
            backgroundColor: "var(--border)",
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
                      ? "2px solid var(--color-accent)"
                      : "2px solid transparent",
                    height: "100%",
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
