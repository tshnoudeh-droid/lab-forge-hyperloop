// Dynamic import with ssr:false required — Next.js 16 Turbopack rejects ssr:false in Server Components
"use client";

import dynamic from "next/dynamic";

const ConduitViewer = dynamic(
  () => import("@/components/conduit/ConduitViewer"),
  { ssr: false }
);

export default function ConduitViewerClient() {
  return <ConduitViewer />;
}
