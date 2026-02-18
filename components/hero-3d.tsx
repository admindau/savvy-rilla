"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

type Hero3DProps = {
  src?: string;
  svgUrl?: string;
  className?: string;
  scale?: number;
  depth?: number;
  animate?: boolean;
  dpr?: number | [number, number];
  fallbackSrc?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}

function ParticleField({
  count = 650,
  radius = 10,
  depth = 10,
  opacity = 0.04,
}: {
  count?: number;
  radius?: number;
  depth?: number;
  opacity?: number;
}) {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.random() * radius;
      const t = Math.random() * Math.PI * 2;

      positions[i3 + 0] = Math.cos(t) * r;
      positions[i3 + 1] = (Math.random() - 0.5) * radius * 0.7;
      positions[i3 + 2] = (Math.random() - 0.5) * depth;

      speeds[i] = 0.12 + Math.random() * 0.3;
    }

    return { positions, speeds };
  }, [count, radius, depth]);

  useFrame((_, dt) => {
    const pts = ref.current;
    if (!pts) return;

    const attr = pts.geometry.getAttribute("position") as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let z = attr.array[i3 + 2] as number;
      z += dt * speeds[i];
      if (z > depth / 2) z = -depth / 2;
      attr.array[i3 + 2] = z;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} frustumCulled={false} renderOrder={0}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        transparent
        opacity={opacity}
        depthWrite={false}
        color={new THREE.Color("#7fffd4")}
        sizeAttenuation
      />
    </points>
  );
}

function useSvgMeshes(src: string, extrusionDepth: number) {
  const [group, setGroup] = useState<THREE.Group | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        setError(null);

        const res = await fetch(src, { cache: "force-cache" });
        if (!res.ok) throw new Error(`SVG fetch failed: ${res.status} ${res.statusText} (${src})`);

        const txt = await res.text();
        const loader = new SVGLoader();
        const data = loader.parse(txt);

        if (!alive) return;

        const g = new THREE.Group();
        const paths = data.paths || [];

        const baseMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#0b1417"),
          metalness: 0.14,
          roughness: 0.78,
          emissive: new THREE.Color("#0c2a2e"),
          emissiveIntensity: 0.06,
          transparent: true,
          opacity: 0.9,
        });

        const rimMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#0a0f12"),
          metalness: 0.26,
          roughness: 0.35,
          emissive: new THREE.Color("#00c7a0"),
          emissiveIntensity: 0.13,
          transparent: true,
          opacity: 0.34,
        });

        const edgeMat = new THREE.LineBasicMaterial({
          color: new THREE.Color("#3bffd9"),
          transparent: true,
          opacity: 0.24,
        });

        let builtAny = false;

        for (const p of paths) {
          const shapes = SVGLoader.createShapes(p);

          if (shapes && shapes.length) {
            for (const s of shapes) {
              const geom = new THREE.ExtrudeGeometry(s, {
                depth: extrusionDepth,
                bevelEnabled: true,
                bevelThickness: extrusionDepth * 0.18,
                bevelSize: extrusionDepth * 0.12,
                bevelSegments: 2,
                curveSegments: 8,
              });

              g.add(new THREE.Mesh(geom, baseMat));

              const shell = new THREE.Mesh(geom, rimMat);
              shell.scale.setScalar(1.006);
              shell.position.z += extrusionDepth * 0.02;
              g.add(shell);

              const edges = new THREE.EdgesGeometry(geom, 20);
              g.add(new THREE.LineSegments(edges, edgeMat));

              builtAny = true;
            }
            continue;
          }

          const pts = (p as any).getPoints ? (p as any).getPoints(240) : [];
          if (!Array.isArray(pts) || pts.length < 2) continue;

          const curve = new THREE.CatmullRomCurve3(
            pts.map((v: any) => new THREE.Vector3(v.x, v.y, 0))
          );

          const tube = new THREE.TubeGeometry(curve, 160, extrusionDepth * 0.12, 10, false);
          const strokeMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#0b1417"),
            metalness: 0.2,
            roughness: 0.6,
            emissive: new THREE.Color("#00c7a0"),
            emissiveIntensity: 0.18,
            transparent: true,
            opacity: 0.72,
          });

          g.add(new THREE.Mesh(tube, strokeMat));
          builtAny = true;
        }

        if (!builtAny) throw new Error(`SVG parsed but produced no geometry (${src}).`);

        // Center group
        const box = new THREE.Box3().setFromObject(g);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        g.position.x -= center.x;
        g.position.y -= center.y;
        g.position.z -= center.z;

        // ✅ Smaller normalization target (this is the “too big” fix)
        const w = Math.max(size.x, 1e-6);
        const target = 2.35; // was larger; now more “hero object” than “background slab”
        const s = target / w;
        g.scale.setScalar(s);

        // Flip Y (SVG is Y-down)
        g.scale.y *= -1;

        // Initial pose
        g.rotation.x = -0.16;
        g.rotation.y = 0.18;

        if (!alive) return;
        setGroup(g);
      } catch (e: any) {
        if (!alive) return;
        setGroup(null);
        setError(e?.message ?? "3D logo failed to load");
        console.warn("[Hero3D] failed:", e);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [src, extrusionDepth]);

  return { group, error };
}

/**
 * Window pointer tracker so motion works even when canvas has pointer-events:none
 */
function useWindowPointer() {
  const pointer = useRef({ x: 0, y: 0 }); // normalized -1..1
  const has = useRef(false);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ny = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
      pointer.current.x = clamp(nx, -1, 1);
      pointer.current.y = clamp(ny, -1, 1);
      has.current = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return { pointer, has };
}

function LogoRig({
  src,
  scale,
  depth,
  animate,
}: {
  src: string;
  scale: number;
  depth: number;
  animate: boolean;
}) {
  const { group } = useSvgMeshes(src, depth);
  const rigRef = useRef<THREE.Group>(null);

  const { pointer } = useWindowPointer();

  useFrame((state, dt) => {
    const rig = rigRef.current;
    if (!rig) return;

    const t = state.clock.getElapsedTime();

    // ✅ Slightly more visible idle motion
    const idleY = Math.sin(t * 0.18) * 0.06;
    const idleX = Math.cos(t * 0.14) * 0.05;

    const mx = clamp(pointer.current.x, -0.7, 0.7);
    const my = clamp(pointer.current.y, -0.6, 0.6);

    // ✅ Responsive parallax even without canvas pointer events
    const targetRy = 0.22 + (animate ? mx * 0.28 : 0);
    const targetRx = -0.14 + (animate ? -my * 0.18 : 0);

    rig.rotation.y = damp(rig.rotation.y, targetRy, 6.2, dt);
    rig.rotation.x = damp(rig.rotation.x, targetRx, 6.2, dt);

    rig.rotation.y = clamp(rig.rotation.y, -0.25, 0.62);
    rig.rotation.x = clamp(rig.rotation.x, -0.45, 0.16);

    rig.position.y = damp(rig.position.y, idleY, 3.4, dt);
    rig.position.x = damp(rig.position.x, idleX, 3.4, dt);
  });

  if (!group) return null;

  return (
    <group ref={rigRef} scale={scale} renderOrder={0}>
      <primitive object={group} />
    </group>
  );
}

function Scene({
  src,
  scale,
  depth,
  animate,
}: {
  src: string;
  scale: number;
  depth: number;
  animate: boolean;
}) {
  return (
    <>
      <fog attach="fog" args={["#020507", 10.0, 21.0]} />

      <ambientLight intensity={0.45} />
      <directionalLight position={[3.2, 2.1, 5.2]} intensity={0.62} />
      <directionalLight position={[-3.6, 1.4, 4.0]} intensity={0.38} color={new THREE.Color("#76ffe2")} />
      <directionalLight position={[-2.6, 2.6, -3.8]} intensity={0.55} color={new THREE.Color("#00f5a0")} />

      <ParticleField count={650} radius={10} depth={10} opacity={0.045} />
      <LogoRig src={src} scale={scale} depth={depth} animate={animate} />
    </>
  );
}

export default function Hero3D({
  src,
  svgUrl,
  className,
  scale = 1,
  depth = 0.22,
  animate = true,
  dpr = [1, 2],
  fallbackSrc,
}: Hero3DProps) {
  const resolvedSrc = svgUrl ?? src ?? "/srt-logo.svg";
  const { error } = useSvgMeshes(resolvedSrc, depth);

  if (error && (fallbackSrc || resolvedSrc)) {
    return (
      <div className={`hero-visual__fallback ${className ?? ""}`.trim()} aria-hidden="true">
        <img className="hero3d-fallback-mark" src={fallbackSrc ?? resolvedSrc} alt="" draggable={false} />
      </div>
    );
  }

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8.9], fov: 40, near: 0.1, far: 50 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.06;
          // @ts-ignore
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Scene src={resolvedSrc} scale={scale} depth={depth} animate={animate} />
      </Canvas>
    </div>
  );
}
