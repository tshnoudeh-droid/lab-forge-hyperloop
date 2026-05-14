"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { TiltCard } from "@/components/ui/tilt-card";

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

      {/* DESIGNS */}
      <section
        style={{
          padding: "0 32px 96px",
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
            }}
          >
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--muted)",
                marginBottom: "32px",
                fontFamily: font,
              }}
            >
              02 // Designs
            </p>
          </div>
        </FadeIn>

        {/* DX-I CARD */}
        <Link href="/designs/dx-i" style={{ display: "block", textDecoration: "none" }}>
          <FadeIn>
            <TiltCard tiltLimit={6} scale={1.01} spotlight={true}>
              <div
                style={{
                  padding: "40px 40px 40px 44px",
                  backgroundColor: "var(--card-bg)",
                  borderLeft: "3px solid var(--color-accent)",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "32px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                      marginBottom: "10px",
                      fontFamily: font,
                      fontWeight: 500,
                    }}
                  >
                    DX-I
                  </p>
                  <h2
                    style={{
                      fontSize: "26px",
                      fontWeight: 600,
                      letterSpacing: "0.03em",
                      color: "var(--foreground)",
                      marginBottom: "12px",
                      fontFamily: font,
                    }}
                  >
                    Design Cycle One
                  </h2>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--muted)",
                      lineHeight: 1.7,
                      maxWidth: "420px",
                      fontFamily: font,
                      letterSpacing: "0.01em",
                    }}
                  >
                    Conduit, Flux, Shell. A complete ground-up engineering
                    model of a full hyperloop corridor.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
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
                    ACTIVE
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      fontFamily: font,
                    }}
                  >
                    3 subsystems
                  </span>
                </div>
              </div>
            </TiltCard>
          </FadeIn>
        </Link>
      </section>

    </main>
  );
}
