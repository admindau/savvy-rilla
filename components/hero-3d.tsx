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
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.damp(current, target, lambda, dt);
}

function ParticleField({
  count = 900,
  radius = 10,
  depth = 8,
  opacity = 0.18,
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
      speeds[i] = 0.15 + Math.random() * 0.35;
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
        color={new THREE.Color("#7fffd4")}
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

      const data = await new Promise<ReturnType<SVGLoader["parse"]>>((resolve, reject) => {
        fetch(src)
          .then((r) => r.text())
          .then((txt) => resolve(loader.parse(txt)))
          .catch(reject);
      });

      if (!alive) return;

      const g = new THREE.Group();
      const paths = data.paths || [];

      // Material choices are tuned so the logo is readable but still “in atmosphere”.
      const baseMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0b1417"),
        metalness: 0.12,
        roughness: 0.78,
        emissive: new THREE.Color("#0c2a2e"),
        emissiveIntensity: 0.08,
        transparent: true,
        opacity: 0.92,
      });

      const rimMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0a0f12"),
        metalness: 0.25,
        roughness: 0.28,
        emissive: new THREE.Color("#00c7a0"),
        emissiveIntensity: 0.22,
        transparent: true,
        opacity: 0.48,
      });

      const edgeMat = new THREE.LineBasicMaterial({
        color: new THREE.Color("#3bffd9"),
        transparent: true,
        opacity: 0.36,
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
              curveSegments: 8,
            });

            const m = new THREE.Mesh(geom, baseMat);
            g.add(m);

            const m2 = new THREE.Mesh(geom, rimMat);
            m2.scale.setScalar(1.006);
            m2.position.z += extrusionDepth * 0.02;
            g.add(m2);

            const edges = new THREE.EdgesGeometry(geom, 20);
            const ls = new THREE.LineSegments(edges, edgeMat);
            ls.renderOrder = 1;
            g.add(ls);
          }
          continue;
        }

        // Stroke-only fallback: tube along points (prevents “outline-only invisibility”)
        const pts = (p as any).getPoints ? (p as any).getPoints(240) : [];
        if (!Array.isArray(pts) || pts.length < 2) continue;

        const curve = new THREE.CatmullRomCurve3(pts.map((v: any) => new THREE.Vector3(v.x, v.y, 0)));

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

      // Normalize roughly by width
      const w = Math.max(size.x, 1e-6);
      const target = 3.2;
      const s = target / w;
      g.scale.setScalar(s);

      // Flip Y (SVG is Y-down)
      g.scale.y *= -1;

      // Start slightly tilted to avoid face-on “giant mask”
      g.rotation.x = -0.18;
      g.rotation.y = 0.22;

      setGroup(g);
    }

    run();

    return () => {
      alive = false;
    };
  }, [src, extrusionDepth]);

  return group;
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
    const idleY = Math.sin(t * 0.12) * 0.05;
    const idleX = Math.cos(t * 0.1) * 0.04;

    const mx = clamp(mouse.x, -0.65, 0.65);
    const my = clamp(mouse.y, -0.55, 0.55);

    const targetRy = 0.28 + (animate ? mx * 0.28 : 0);
    const targetRx = -0.16 + (animate ? -my * 0.18 : 0);

    rig.rotation.y = damp(rig.rotation.y, targetRy, 6.5, dt);
    rig.rotation.x = damp(rig.rotation.x, targetRx, 6.5, dt);

    // Clamp rotation to kill the “giant silhouette” moment
    rig.rotation.y = clamp(rig.rotation.y, -0.25, 0.65);
    rig.rotation.x = clamp(rig.rotation.x, -0.45, 0.15);

    rig.position.y = damp(rig.position.y, idleY, 3.5, dt);
    rig.position.x = damp(rig.position.x, idleX, 3.5, dt);
  });

  if (!g) return null;

  return (
    <group ref={ref} scale={scale} renderOrder={0}>
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
    <>      <fog attach="fog" args={["#000000", 10.0, 21.0]} />

      <ambientLight intensity={0.45} />
      <directionalLight position={[3.2, 2.1, 5.2]} intensity={0.6} />
      <pointLight position={[-2.5, 1.5, 2.5]} intensity={0.35} />

      {/* Barely visible particle drift behind everything */}
      <ParticleField count={700} radius={10} depth={10} opacity={0.04} />

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
}: Hero3DProps) {
  const resolvedSrc = svgUrl ?? src ?? "/srt-logo.svg";

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 8.4], fov: 40, near: 0.1, far: 50 }}
      >
        <Scene src={resolvedSrc} scale={scale} depth={depth} animate={animate} />
      </Canvas>
    </div>
  );
}
