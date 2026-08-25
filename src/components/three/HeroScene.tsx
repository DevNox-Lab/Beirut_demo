"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  MeshReflectorMaterial,
  ContactShadows,
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor,
  Preload,
} from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  Quality tiers — keeps the scene above ~50fps on modest hardware    */
/* ------------------------------------------------------------------ */
interface Quality {
  isMobile: boolean;
  particles: number;
  reflections: boolean;
  shadowMap: number;
  arches: number;
}

function detectQuality(): Quality {
  if (typeof window === "undefined") {
    return { isMobile: false, particles: 340, reflections: true, shadowMap: 2048, arches: 5 };
  }
  const w = window.innerWidth;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = w < 768;
  if (isMobile || reduced) {
    return { isMobile: true, particles: 120, reflections: false, shadowMap: 1024, arches: 4 };
  }
  if (w < 1280) {
    return { isMobile: false, particles: 240, reflections: true, shadowMap: 1024, arches: 5 };
  }
  return { isMobile: false, particles: 360, reflections: true, shadowMap: 2048, arches: 5 };
}

/* ------------------------------------------------------------------ */
/*  Moorish arch geometry (an arch-shaped frame, so you see through)   */
/* ------------------------------------------------------------------ */
function drawArch(ctx: THREE.Shape | THREE.Path, k: number) {
  const dw = 2.2 * k;
  const base = -4 * k;
  const shoulder = 1.2 * k;
  ctx.moveTo(-dw, base);
  ctx.lineTo(-dw, shoulder);
  ctx.quadraticCurveTo(-dw - 0.75 * k, shoulder + 1.2 * k, -dw, shoulder + 2 * k);
  ctx.quadraticCurveTo(-dw * 0.9, shoulder + 3.4 * k, 0, shoulder + 4.7 * k);
  ctx.quadraticCurveTo(dw * 0.9, shoulder + 3.4 * k, dw, shoulder + 2 * k);
  ctx.quadraticCurveTo(dw + 0.75 * k, shoulder + 1.2 * k, dw, shoulder);
  ctx.lineTo(dw, base);
  ctx.lineTo(-dw, base);
}

function useArchGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape();
    drawArch(shape, 1.32);
    const hole = new THREE.Path();
    drawArch(hole, 1);
    shape.holes.push(hole);
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: 0.7,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.12,
      bevelSegments: 2,
      curveSegments: 24,
    });
    g.center();
    return g;
  }, []);
}

function ArchFrame({
  geometry,
  z,
  emissive,
}: {
  geometry: THREE.BufferGeometry;
  z: number;
  emissive: number;
}) {
  return (
    <mesh geometry={geometry} position={[0, 0, z]} castShadow receiveShadow>
      <meshStandardMaterial
        color="#20160a"
        roughness={0.6}
        metalness={0.45}
        emissive="#7a3a10"
        emissiveIntensity={emissive}
      />
    </mesh>
  );
}

function Corridor({ count, geometry }: { count: number; geometry: THREE.BufferGeometry }) {
  const frames = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        z: 2 - i * 5.5,
        emissive: 0.12 + i * 0.06,
      })),
    [count]
  );
  return (
    <>
      {frames.map((f, i) => (
        <ArchFrame key={i} geometry={geometry} z={f.z} emissive={f.emissive} />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Warm interior glow at the far end of the corridor                  */
/* ------------------------------------------------------------------ */
function InteriorGlow() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const m = ref.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.72 + Math.sin(clock.elapsedTime * 1.4) * 0.06;
    }
  });
  return (
    <group position={[0, 0.5, -26]}>
      <mesh ref={ref}>
        <planeGeometry args={[10, 12]} />
        <meshBasicMaterial color="#e0781f" transparent opacity={0.72} />
      </mesh>
      <pointLight position={[0, 1, 1]} color="#ffae52" intensity={6} distance={40} decay={1.6} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Hanging lantern — warm flickering light                            */
/* ------------------------------------------------------------------ */
function Lantern({
  position,
  delay = 0,
}: {
  position: [number, number, number];
  delay?: number;
}) {
  const light = useRef<THREE.PointLight>(null);
  const body = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const ignite = Math.min(1, Math.max(0, (t - delay) / 1.4));
    const flicker =
      0.86 + Math.sin(t * 9 + delay * 5) * 0.07 + Math.sin(t * 3.1 + delay) * 0.05;
    if (light.current) light.current.intensity = 3.4 * ignite * flicker;
    if (body.current) body.current.emissiveIntensity = 1.4 * ignite * flicker + 0.2;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.12} floatIntensity={0.35}>
      <group position={position}>
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 2.8, 6]} />
          <meshStandardMaterial color="#6d4f1c" metalness={0.9} roughness={0.4} />
        </mesh>
        <mesh castShadow>
          <octahedronGeometry args={[0.34, 0]} />
          <meshStandardMaterial
            ref={body}
            color="#faeaae"
            emissive="#ff9d3c"
            emissiveIntensity={1.4}
            metalness={0.5}
            roughness={0.3}
          />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.46, 0]} />
          <meshStandardMaterial color="#c8a13d" metalness={1} roughness={0.25} wireframe />
        </mesh>
        <pointLight ref={light} color="#ffb15e" intensity={0} distance={10} decay={2} />
      </group>
    </Float>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating spice particles                                           */
/* ------------------------------------------------------------------ */
function SpiceParticles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, speeds, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#faeaae"),
      new THREE.Color("#e0781f"),
      new THREE.Color("#bc0b11"),
      new THREE.Color("#e0a53f"),
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = -Math.random() * 24 + 3;
      speeds[i] = 0.15 + Math.random() * 0.5;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, speeds, colors };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * 0.012;
      arr[i * 3] += Math.sin(t * 0.5 + i) * 0.0022;
      if (arr[i * 3 + 1] > 8) arr[i * 3 + 1] = -8;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Reflective marble floor                                            */
/* ------------------------------------------------------------------ */
function Floor({ reflections }: { reflections: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.2, -8]} receiveShadow>
      <planeGeometry args={[70, 70]} />
      {reflections ? (
        <MeshReflectorMaterial
          resolution={256}
          mixBlur={1}
          mixStrength={2}
          blur={[300, 80]}
          mirror={0.5}
          color="#0a0806"
          metalness={0.75}
          roughness={0.5}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.2}
        />
      ) : (
        <meshStandardMaterial color="#0a0806" roughness={0.4} metalness={0.6} />
      )}
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/*  Cinematic camera dolly through the corridor                        */
/* ------------------------------------------------------------------ */
function CameraRig() {
  const { camera, pointer } = useThree();
  const progress = useRef(0);

  useFrame((state, delta) => {
    progress.current = Math.min(1, progress.current + delta / 4.5);
    const p = easeInOut(progress.current);
    const z = THREE.MathUtils.lerp(15, -0.5, p);
    const t = state.clock.elapsedTime;

    // gentle handheld sway once we've arrived
    const sway = Math.sin(t * 0.35) * 0.18 * p;
    const bob = Math.sin(t * 0.5) * 0.08 * p;
    const px = pointer.x * 0.9 * p + sway;
    const py = pointer.y * 0.5 * p + bob;

    camera.position.x += (px - camera.position.x) * 0.04;
    camera.position.y += (0.6 + py - camera.position.y) * 0.04;
    camera.position.z += (z - camera.position.z) * 0.06;
    camera.lookAt(0, 0.4, -22);
  });

  return null;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/* ------------------------------------------------------------------ */
/*  Scene assembly                                                     */
/* ------------------------------------------------------------------ */
function Scene({ q }: { q: Quality }) {
  const arch = useArchGeometry();

  const lanterns: { position: [number, number, number]; delay: number }[] = [
    { position: [-3.4, 3.2, -1], delay: 0.5 },
    { position: [3.4, 3.4, -6], delay: 0.9 },
    { position: [-3.2, 3, -11], delay: 1.3 },
    { position: [3.2, 3.3, -16], delay: 1.7 },
    { position: [0, 3.6, -21], delay: 2 },
  ];

  return (
    <>
      <fog attach="fog" args={["#0a0503", 6, 30]} />
      <color attach="background" args={["#050302"]} />

      <ambientLight intensity={0.14} color="#ffd9a0" />
      <hemisphereLight intensity={0.18} color="#ffcf8f" groundColor="#160a02" />
      <spotLight
        position={[0, 9, 8]}
        angle={0.6}
        penumbra={1}
        intensity={2.4}
        color="#ffcf8f"
        castShadow
        shadow-mapSize={[q.shadowMap, q.shadowMap]}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[6, 8, 4]} intensity={0.2} color="#ffcf8f" />

      <CameraRig />

      <InteriorGlow />
      <Corridor count={q.arches} geometry={arch} />
      <Floor reflections={q.reflections} />
      <ContactShadows
        position={[0, -5.15, -6]}
        opacity={0.5}
        scale={40}
        blur={2.8}
        far={12}
        color="#000000"
      />

      {lanterns.slice(0, q.isMobile ? 3 : 5).map((l, i) => (
        <Lantern key={i} position={l.position} delay={l.delay} />
      ))}

      <SpiceParticles count={q.particles} />

      <Preload all />
    </>
  );
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  const [q] = useState<Quality>(detectQuality);
  const [dpr, setDpr] = useState<number>(q.isMobile ? 1.2 : 1.7);

  return (
    <Canvas
      dpr={dpr}
      shadows
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.8, 15], fov: 44 }}
      gl={{
        antialias: !q.isMobile,
        alpha: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr((d) => Math.max(1, d - 0.3))}
        onIncline={() => setDpr((d) => Math.min(q.isMobile ? 1.4 : 1.9, d + 0.1))}
      />
      <Suspense fallback={null}>
        <Scene q={q} />
      </Suspense>
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
    </Canvas>
  );
}
