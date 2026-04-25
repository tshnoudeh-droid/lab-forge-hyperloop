"use client";

import dynamic from "next/dynamic";

const ConduitViewer = dynamic(
  () => import("@/components/conduit/ConduitViewer"),
  { ssr: false }
);

export default function ConduitViewerClient() {
  return <ConduitViewer />;
}
