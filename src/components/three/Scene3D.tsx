"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#34d399";
const ACCENT_2 = "#8b5cf6";
const WARM = "#c4b5fd";

/** Total distance the camera travels along -Z over the full page scroll. */
const TRAVEL = 60;

function scrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

/** Seeded PRNG so the layout is stable between renders. */
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function CameraRig() {
  const target = useRef(new THREE.Vector3());

  useFrame(({ camera, pointer }, delta) => {
    const p = scrollProgress();
    const t = Math.min(1, delta * 3);
    const dev = window.__deviceTilt ?? { x: 0, y: 0 };
    const px = pointer.x + dev.x * 1.6;
    const py = pointer.y - dev.y * 1.2;
    target.current.set(px * 1.2, py * 0.8 - p * 2, 8 - p * TRAVEL);
    camera.position.lerp(target.current, t);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, Math.sin(p * Math.PI * 2) * 0.12, t);
  });

  return null;
}

/** The glossy, morphing core that travels with the camera through every section. */
function Core() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const narrow = viewport.aspect < 1;

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = scrollProgress();
    const camZ = state.camera.position.z;
    // Swing left/right between sections so it sits beside the content.
    // On phones, tuck it small into the top-right corner so it never sits behind text.
    const side = narrow ? 1.9 + Math.sin(p * Math.PI * 4) * 0.3 : Math.cos(p * Math.PI * 5) * 3.6;
    const y = narrow ? 3.6 + p * 2 : Math.sin(p * Math.PI * 3) * 0.8;
    g.position.lerp(new THREE.Vector3(side, y - p * 2, camZ - 9), Math.min(1, delta * 2.5));
    g.rotation.x += delta * 0.15;
    g.rotation.y = p * Math.PI * 4 + state.clock.elapsedTime * 0.2;
    const s = narrow ? 0.45 : 1 - Math.sin(p * Math.PI) * 0.25;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, s, Math.min(1, delta * 3)));
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.4;
      shell.current.rotation.z += delta * 0.2;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.5, 32]} />
        <MeshDistortMaterial
          color={ACCENT}
          emissive={ACCENT_2}
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.7}
          distort={0.4}
          speed={1.6}
        />
      </mesh>
      <mesh ref={shell} scale={1.45}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color={WARM} wireframe transparent opacity={0.18} />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.9, 0.012, 8, 160]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

type ShapeKind = "torus" | "octa" | "box" | "tetra" | "knot" | "ico";
const KINDS: ShapeKind[] = ["torus", "octa", "box", "tetra", "knot", "ico"];

function Geometry({ kind }: { kind: ShapeKind }) {
  switch (kind) {
    case "torus":
      return <torusGeometry args={[0.6, 0.22, 24, 64]} />;
    case "octa":
      return <octahedronGeometry args={[0.7]} />;
    case "box":
      return <boxGeometry args={[0.9, 0.9, 0.9]} />;
    case "tetra":
      return <tetrahedronGeometry args={[0.8]} />;
    case "knot":
      return <torusKnotGeometry args={[0.5, 0.16, 96, 16]} />;
    default:
      return <icosahedronGeometry args={[0.7, 0]} />;
  }
}

/** Floating shapes scattered along the camera's flight path. */
function Shapes({ count }: { count: number }) {
  const shapes = useMemo(() => {
    const r = rng(42);
    return Array.from({ length: count }, (_, i) => {
      const side = i % 2 === 0 ? 1 : -1;
      return {
        kind: KINDS[Math.floor(r() * KINDS.length)],
        position: [
          side * (3.5 + r() * 5),
          (r() - 0.5) * 8,
          4 - (i / count) * (TRAVEL + 10) - r() * 3,
        ] as [number, number, number],
        rotation: [r() * Math.PI, r() * Math.PI, 0] as [number, number, number],
        scale: 0.5 + r() * 0.9,
        color: [ACCENT, ACCENT_2, WARM, "#1b2027"][Math.floor(r() * 4)],
        wire: r() > 0.6,
        speed: 0.6 + r() * 1.4,
      };
    });
  }, [count]);

  return (
    <>
      {shapes.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={1.4} floatIntensity={1.6}>
          <mesh position={s.position} rotation={s.rotation} scale={s.scale}>
            <Geometry kind={s.kind} />
            {s.wire ? (
              <meshBasicMaterial color={s.color} wireframe transparent opacity={0.45} />
            ) : (
              <meshStandardMaterial color={s.color} roughness={0.3} metalness={0.6} flatShading />
            )}
          </mesh>
        </Float>
      ))}
    </>
  );
}

/** A tunnel of drifting star particles. */
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const r = rng(7);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2 + r() * 14;
      const angle = r() * Math.PI * 2;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = Math.sin(angle) * radius * 0.7;
      arr[i * 3 + 2] = 10 - r() * (TRAVEL + 25);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={WARM}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Slides everything inside it "downhill" as the phone tilts, like gravity. */
function Gravity({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const g = ref.current;
    const dev = window.__deviceTilt;
    if (!g || !dev) return;
    const t = Math.min(1, delta * 2);
    g.position.x = THREE.MathUtils.lerp(g.position.x, dev.x * 2.5, t);
    g.position.y = THREE.MathUtils.lerp(g.position.y, -dev.y * 2, t);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -dev.x * 0.15, t);
  });
  return <group ref={ref}>{children}</group>;
}

/** Rings the camera passes through, marking each section of the page. */
function Gates() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const gates = [0.2, 0.4, 0.6, 0.8].map((f) => 8 - f * TRAVEL - 4);

  useFrame((state, delta) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.z += delta * (i % 2 ? 0.15 : -0.15);
      const mat = m.material as THREE.MeshBasicMaterial;
      const dist = Math.abs(state.camera.position.z - m.position.z);
      mat.opacity = THREE.MathUtils.clamp(dist / 12, 0, 1) * 0.35;
    });
  });

  return (
    <>
      {gates.map((z, i) => (
        <mesh key={z} ref={(m) => { refs.current[i] = m; }} position={[0, 0, z]}>
          <torusGeometry args={[7, 0.03, 6, 6 + i * 2]} />
          <meshBasicMaterial color={i % 2 ? ACCENT : WARM} transparent opacity={0.3} />
        </mesh>
      ))}
    </>
  );
}

export default function Scene3D() {
  const small = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        dpr={[1, small ? 1.25 : 1.75]}
        camera={{ position: [0, 0, 8], fov: 55, near: 0.1, far: 120 }}
        gl={{ antialias: !small, alpha: true, powerPreference: "high-performance" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
      >
        <fog attach="fog" args={["#05070a", 6, 32]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 6, 4]} intensity={1.4} color="#ffffff" />
        <pointLight position={[-6, -3, 2]} intensity={40} color={ACCENT} />
        <pointLight position={[6, 3, -20]} intensity={40} color={WARM} />
        <CameraRig />
        <Core />
        <Gravity>
          <Shapes count={small ? 14 : 26} />
          <Particles count={small ? 900 : 2200} />
        </Gravity>
        <Gates />
      </Canvas>
      {/* Soft vignette so foreground text stays readable over the scene. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,7,10,0.75)_100%)]" />
    </div>
  );
}
