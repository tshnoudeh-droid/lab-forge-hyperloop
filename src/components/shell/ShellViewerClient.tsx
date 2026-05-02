// Dynamic import with ssr:false required — Next.js 16 Turbopack rejects ssr:false in Server Components
"use client";

import dynamic from "next/dynamic";

const ShellViewer = dynamic(
  () => import("@/components/shell/ShellViewer"),
  { ssr: false }
);

export default function ShellViewerClient() {
  return <ShellViewer />;
}
