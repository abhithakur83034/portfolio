"use client";

import dynamic from "next/dynamic";

// WebGL only exists in the browser, so the scene is never prerendered.
const Scene3D = dynamic(() => import("@/components/three/Scene3D"), { ssr: false });

export default function Background3D() {
  return <Scene3D />;
}
