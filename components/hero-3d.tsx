"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

type Hero3DProps = {
  /** URL to an SVG (public/) */
  src?: string;
  /** Alias used by the loader */
  svgUrl?: string;
  className?: string;

  /** overall scale of the logo group */
  scale?: number;

  /** extrusion depth */
  depth?: number;

  /** enable motion */
  animate?: boolean;

  /** optional: cap DPR for performance */
  dpr?: number | [number, number];
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}

function ParticleField({
  count = 800,
  radius = 10,
  depth = 10,
  opacity = 0.06,
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
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        transparent
        opacity={opacity}
        depthWrite={false}
        color={new THREE.Color("#bfffee")}
        sizeAttenuation
      />
    </points>
  );
}

function useSvgMeshes(src: string, extrusionDepth: number) {
  const [group, setGroup] = useState<THREE.Group | null>(null);

  useEffect(() => {
    let alive = true;

    async function run() {
      const loader = new SVGLoader();
      const svgText = await fetch(src).then((r) => r.text());
      if (!alive) return;

      const data = loader.parse(svgText);
      if (!alive) return;

      const g = new THREE.Group();
      const paths = data.paths || [];

      // Core material: dark body with subtle green emissive so it reads on black.
      const coreMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#071014"),
        metalness: 0.18,
        roughness: 0.7,
        emissive: new THREE.Color("#043a33"),
        emissiveIntensity: 0.12,
        transparent: true,
        opacity: 0.92,
      });

      // Rim shell: slightly larger, more emissive edge for premium “powered” look.
      const rimMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#05090b"),
        metalness: 0.35,
        roughness: 0.35,
        emissive: new THREE.Color("#00f5a0"),
        emissiveIntensity: 0.22,
        transparent: true,
        opacity: 0.38,
      });

      // Edges: low opacity outline to help silhouette without turning into a wireframe.
      const edgeMat = new THREE.LineBasicMaterial({
        color: new THREE.Color("#7dffe0"),
        transparent: true,
        opacity: 0.2,
      });

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
              curveSegments: 10,
            });

            const m = new THREE.Mesh(geom, coreMat);
            g.add(m);

            const shell = new THREE.Mesh(geom, rimMat);
            shell.scale.setScalar(1.006);
            shell.position.z += extrusionDepth * 0.02;
            g.add(shell);

            const edges = new THREE.EdgesGeometry(geom, 18);
            const ls = new THREE.LineSegments(edges, edgeMat);
            ls.renderOrder = 1;
            g.add(ls);
          }
          continue;
        }

        // Stroke-only fallback: tube along points (prevents outline-only invisibility)
        const pts = (p as any).getPoints ? (p as any).getPoints(260) : [];
        if (!Array.isArray(pts) || pts.length < 2) continue;

        const curve = new THREE.CatmullRomCurve3(pts.map((v: any) => new THREE.Vector3(v.x, v.y, 0)));
        const tube = new THREE.TubeGeometry(curve, 180, extrusionDepth * 0.12, 10, false);

        const strokeMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#071014"),
          metalness: 0.25,
          roughness: 0.6,
          emissive: new THREE.Color("#00f5a0"),
          emissiveIntensity: 0.22,
          transparent: true,
          opacity: 0.74,
        });

        g.add(new THREE.Mesh(tube, strokeMat));
      }

      // Center group
      const box = new THREE.Box3().setFromObject(g);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);

      g.position.x -= center.x;
      g.position.y -= center.y;
      g.position.z -= center.z;

      // Normalize by width: keep it “hero object”, not a background takeover.
      const w = Math.max(size.x, 1e-6);
      const target = 2.55; // smaller than before to prevent the giant gorilla bleed
      const s = target / w;
      g.scale.setScalar(s);

      // Flip Y (SVG is Y-down)
      g.scale.y *= -1;

      // Slight initial hero pose
      g.rotation.x = -0.18;
      g.rotation.y = 0.28;

      setGroup(g);
    }

    run();
    return () => {
      alive = false;
    };
  }, [src, extrusionDepth]);

  return group;
}

function BackGlow() {
  // Soft green halo “behind” the logo to keep it readable on very dark scenes
  return (
    <mesh position={[0, 0, -1.2]} renderOrder={-1}>
      <planeGeometry args={[8, 5]} />
      <meshBasicMaterial
        transparent
        opacity={0.22}
        color={new THREE.Color("#00f5a0")}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
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
  const g = useSvgMeshes(src, depth);
  const ref = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state, dt) => {
    const rig = ref.current;
    if (!rig) return;

    const t = state.clock.getElapsedTime();

    // premium idle: slow, minimal drift
    const idleY = Math.sin(t * 0.12) * 0.04;
    const idleX = Math.cos(t * 0.10) * 0.03;

    const mx = clamp(mouse.x, -0.7, 0.7);
    const my = clamp(mouse.y, -0.6, 0.6);

    const targetRy = 0.28 + (animate ? mx * 0.26 : 0);
    const targetRx = -0.16 + (animate ? -my * 0.18 : 0);

    rig.rotation.y = damp(rig.rotation.y, targetRy, 6.8, dt);
    rig.rotation.x = damp(rig.rotation.x, targetRx, 6.8, dt);

    // hard clamp to avoid “giant silhouette mask”
    rig.rotation.y = clamp(rig.rotation.y, -0.18, 0.62);
    rig.rotation.x = clamp(rig.rotation.x, -0.42, 0.14);

    rig.position.y = damp(rig.position.y, idleY, 3.8, dt);
    rig.position.x = damp(rig.position.x, idleX, 3.8, dt);
  });

  if (!g) return null;

  return (
    <group ref={ref} scale={scale} renderOrder={0}>
      {/* glow behind */}
      <BackGlow />
      <primitive object={g} />
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
      {/* IMPORTANT: keep transparent background (no <color attach="background" ... />) */}
      {/* Subtle fog feel without “painting” the background */}
      <fog attach="fog" args={["#020507", 8.5, 20.5]} />

      {/* Lighting: key + fill + rim */}
      <ambientLight intensity={0.32} />

      <directionalLight
        position={[3.4, 2.4, 4.8]}
        intensity={1.05}
        color={new THREE.Color("#cffff3")}
      />

      <directionalLight
        position={[-4.2, 1.0, 3.2]}
        intensity={0.55}
        color={new THREE.Color("#76ffe2")}
      />

      {/* Rim / back light */}
      <directionalLight
        position={[-2.5, 2.8, -3.8]}
        intensity={0.85}
        color={new THREE.Color("#00f5a0")}
      />

      <pointLight position={[0, -1.2, 3.2]} intensity={0.28} color={new THREE.Color("#7dffe0")} />

      {/* Particle drift behind everything */}
      <ParticleField count={760} radius={10} depth={10} opacity={0.05} />

      <LogoRig src={src} scale={scale} depth={depth} animate={animate} />
    </>
  );
}

export default function Hero3D({
  src,
  svgUrl,
  className,
  scale = 1,
  depth = 0.24,
  animate = true,
  dpr = [1, 2],
}: Hero3DProps) {
  const resolvedSrc = svgUrl ?? src ?? "/srt-logo.svg";

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8.6], fov: 40, near: 0.1, far: 60 }}
        onCreated={({ gl }) => {
          // Transparent clear
          gl.setClearColor(0x000000, 0);

          // Premium tone mapping
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.08;

          // Color space
          // @ts-ignore (three versions differ)
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Scene src={resolvedSrc} scale={scale} depth={depth} animate={animate} />
      </Canvas>
    </div>
  );
}
