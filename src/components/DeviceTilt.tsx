"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    /** Smoothed phone tilt in the range -1..1 on each axis (0,0 when flat or unavailable). */
    __deviceTilt?: { x: number; y: number };
  }
}

type PermissionedOrientation = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

const MAX_DEG = 14;

/**
 * Reads the phone's gyroscope and publishes the tilt as CSS variables
 * (--dev-rx / --dev-ry on <html>) and on window.__deviceTilt for the 3D scene,
 * so content shifts with gravity as the phone moves. iOS asks for permission
 * on the first tap.
 */
export default function DeviceTilt() {
  useEffect(() => {
    if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let baseBeta: number | null = null;
    let raf = 0;

    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;
      // Calibrate "neutral" to however the person is holding the phone.
      if (baseBeta == null) baseBeta = e.beta;
      target.x = Math.max(-1, Math.min(1, e.gamma / 30));
      target.y = Math.max(-1, Math.min(1, (e.beta - baseBeta) / 30));
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      window.__deviceTilt = { x: current.x, y: current.y };
      root.style.setProperty("--dev-ry", `${(current.x * MAX_DEG).toFixed(2)}deg`);
      root.style.setProperty("--dev-rx", `${(-current.y * MAX_DEG).toFixed(2)}deg`);
      root.style.setProperty("--dev-x", current.x.toFixed(3));
      root.style.setProperty("--dev-y", current.y.toFixed(3));
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      window.addEventListener("deviceorientation", onOrient);
      raf = requestAnimationFrame(tick);
    };

    const DOE = window.DeviceOrientationEvent as PermissionedOrientation;
    let askOnTap: (() => void) | null = null;

    if (typeof DOE.requestPermission === "function") {
      askOnTap = () => {
        DOE.requestPermission?.()
          .then((state) => state === "granted" && start())
          .catch(() => {});
        window.removeEventListener("touchend", askOnTap!);
      };
      window.addEventListener("touchend", askOnTap, { once: true });
    } else {
      start();
    }

    return () => {
      window.removeEventListener("deviceorientation", onOrient);
      if (askOnTap) window.removeEventListener("touchend", askOnTap);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
