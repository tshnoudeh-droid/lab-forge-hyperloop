// Dynamic import with ssr:false required — Next.js 16 Turbopack rejects ssr:false in Server Components
"use client";

import dynamic from "next/dynamic";

const FluxViewer = dynamic(
  () => import("@/components/flux/FluxViewer"),
  { ssr: false }
);

export default function FluxViewerClient() {
  return <FluxViewer />;
}
