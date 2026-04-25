# CLAUDE.md — forge-hyperloop-lab

## What This Repo Is
lab.forgehyperloop.com — Forge Hyperloop engineering lab.
Houses the DX-I program: deeply detailed, physics-backed 3D software design models.
Each subsystem (Conduit, Flux, Shell) is self-contained in its own component folder.

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS v4 (@theme in globals.css, no tailwind.config.ts)
- React Three Fiber + @react-three/drei (3D)
- Framer Motion (transitions only)
- No auth, no database, no CMS

## Design Rules (NON-NEGOTIABLE)
- Font: "Helvetica Neue", Helvetica, Arial, sans-serif — every text element
- Colors: #0A0A0A (black), #FFFFFF (white), #C4A882 (sand accent)
- NO gradients, NO glassmorphism, NO rounded cards, NO box shadows on content
- No em dashes in copy — ever
- Generous negative space
- Specs in data rows, not cards

## Folder Discipline
- All Conduit code: src/components/conduit/
- All Flux code: src/components/flux/
- All Shell code: src/components/shell/
- Shared UI only: src/components/ui/

## Physics Discipline
- All numbers come from src/components/conduit/data/conduit-specs.ts
- Never hardcode a physics number in a component — import from the data file
- Every number in conduit-specs.ts has a source comment

## Chunk Discipline
- Read this file before every chunk
- One chunk at a time — commit and push after each
- Never overwrite working code without explicit instruction
- npm run build must pass before every push

## Commands
- Dev: npm run dev
- Build: npm run build
- Type check: npx tsc --noEmit

## Deployment
- Vercel, subdomain: lab.forgehyperloop.com
- No environment variables required
