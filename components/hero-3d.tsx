'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three-stdlib';

type Hero3DProps = {
  className?: string;
};

/**
 * Phase D – 3D Integration (Logo Edition)
 * - Replaces Earth globe with an extruded 3D Savvy Rilla logo from SVG.
 * - Slow rotation + subtle float + rim lighting + sparse starfield.
 *
 * Required asset in /public:
 * - /srt-logo.svg  (recommended: rename your SVG to this exact filename)
 *
 * Notes:
 * - This runs client-side only (Canvas/WebGL).
 * - If you want more “metal/glass”, we can tune materials after you deploy.
 */
export default function Hero3D({ className }: Hero3DProps) {
  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 7.0], fov: 36, near: 0.1, far: 120 }}
    >
      {/* Canvas stays transparent; hero background is pure CSS stars. */}

      {/* Lighting: key + fill + rim */}
      <ambientLight intensity={0.62} />
      {/* Key */}
      <directionalLight position={[6, 4, 6]} intensity={1.45} color="#eaffff" />
      {/* Fill */}
      <directionalLight position={[-6, 1, 2]} intensity={0.45} color="#bfefff" />
      {/* Rim */}
      <pointLight position={[0, 2.8, 7]} intensity={0.95} color="#00f5a0" />
      <pointLight position={[-4.5, 1.2, 2.8]} intensity={0.55} color="#00f5a0" />

      <Stars />

      <Scene />
    </Canvas>
  );
}

function Scene() {
  // Keep the logo reliably *in view* across different aspect ratios.
  const { viewport } = useThree();

  // viewport.width is in “three units”. We bias the logo to the right but clamp so it never exits frame.
  const x = Math.max(0.7, Math.min(2.15, viewport.width / 2 - 0.25));

  return (
    <group position={[x, -0.1, -0.55]} rotation={[0.04, -0.32, 0.02]}>
      <Logo3D />
    </group>
  );
}

function Stars() {
  const points = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);
    const rMin = 10;
    const rMax = 34;

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const r = rMin + Math.random() * (rMax - rMin);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    return positions;
  }, []);

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(points, 3));
    return g;
  }, [points]);

  return (
    <points geometry={geom}>
      <pointsMaterial size={0.04} sizeAttenuation transparent opacity={0.45} color="#ffffff" />
    </points>
  );
}

function Logo3D() {
  const groupRef = useRef<THREE.Group>(null);

  // Use a URL-safe filename in /public
  const LOGO_SVG_URL = '/srt-logo.svg';

  const [shapes, setShapes] = useState<THREE.Shape[]>([]);
  const [viewBoxScale, setViewBoxScale] = useState(1);

  useEffect(() => {
    let alive = true;
    const loader = new SVGLoader();

    loader.load(
      LOGO_SVG_URL,
      (dataRaw) => {
        if (!alive) return;

        // Remove fragile typing differences across SVGLoader versions
        const data: any = dataRaw;

        const allShapes: THREE.Shape[] = [];
        for (const path of data.paths ?? []) {
          const s = SVGLoader.createShapes(path);
          allShapes.push(...s);
        }

        // Some SVGs can produce empty shape arrays if they are strokes-only.
        setShapes(allShapes);

        // Normalize by SVG viewBox for more stable scaling across different logo exports.
        // ✅ FIX: XMLDocument doesn't have getAttribute; documentElement does.
        const vb =
          data?.xml?.documentElement?.getAttribute?.('viewBox') ??
          data?.xml?.querySelector?.('svg')?.getAttribute?.('viewBox') ??
          null;

        if (vb) {
          const parts = String(vb)
            .trim()
            .split(/\s+/)
            .map((n) => Number(n));
          const w = parts[2] || 1;
          setViewBoxScale(w);
        } else {
          setViewBoxScale(1);
        }
      },
      undefined,
      () => {
        // If load fails, keep empty shapes. We’ll render a fallback.
        setShapes([]);
      }
    );

    return () => {
      alive = false;
    };
  }, []);

  // Extrusion setup (with auto-fit scale based on resulting bounds)
  const geomData = useMemo(() => {
    if (!shapes.length) return null;

    const g = new THREE.ExtrudeGeometry(shapes, {
      depth: 14,
      bevelEnabled: true,
      bevelThickness: 2,
      bevelSize: 1.4,
      bevelSegments: 3,
      curveSegments: 12,
      steps: 1,
    });

    // Center geometry + compute bounds for robust scaling
    g.computeBoundingBox();
    const box = g.boundingBox;
    if (box) {
      const center = new THREE.Vector3();
      box.getCenter(center);
      g.translate(-center.x, -center.y, -center.z);

      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x || 1, size.y || 1, size.z || 1);

      // Target size in world units (tuned to sit behind the right-side UI cards)
      const target = 2.4;
      const autoScale = target / maxDim;

      return { geom: g, scale: autoScale };
    }

    // If bbox missing for any reason, fall back to a sane scale
    return { geom: g, scale: 0.004 };
  }, [shapes]);

  // Material: slightly metallic charcoal + green emissive edge feel
  // NOTE: Avoid multi-material arrays here (can be fragile across R3F/Three versions).
  const mainMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      // Bright "ceramic-metal" so the mark reads clearly over a dark starfield.
      color: new THREE.Color('#dfe9ee'),
      roughness: 0.35,
      metalness: 0.65,
      emissive: new THREE.Color('#00f5a0'),
      emissiveIntensity: 0.42,
    });
  }, []);

  // Rim glow shell (cheap additive halo)
  const rimMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00f5a0'),
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide,
    });
  }, []);

  // Motion: slow rotation + subtle bob
  useFrame((state, dt) => {
    const g = groupRef.current;
    if (!g) return;

    const t = state.clock.getElapsedTime();

    // Slow “core spin”
    g.rotation.y += dt * 0.18;

    // Gentle hover float
    g.position.y = Math.sin(t * 0.9) * 0.06;

    // Micro tilt for “alive” feeling
    g.rotation.x = 0.06 + Math.sin(t * 0.6) * 0.015;
    g.rotation.z = -0.06 + Math.cos(t * 0.7) * 0.012;
  });

  // Final scale: prefer geometry-derived scale; fall back to viewBox-based scale.
  const scale = useMemo(() => {
    if (geomData?.scale) return geomData.scale;
    const base = viewBoxScale || 1;
    return 2.2 / Math.max(220, base / 2);
  }, [geomData, viewBoxScale]);

  if (!geomData?.geom) {
    // Fallback if SVG fails: a “core” disc so hero doesn’t look empty
    return (
      <group ref={groupRef}>
        <mesh>
          <cylinderGeometry args={[1.1, 1.1, 0.18, 64]} />
          <meshStandardMaterial
            color="#0f1418"
            roughness={0.55}
            metalness={0.25}
            emissive="#00f5a0"
            emissiveIntensity={0.16}
          />
        </mesh>
        <mesh scale={[1.08, 1.08, 1.08]}>
          <cylinderGeometry args={[1.14, 1.14, 0.22, 64]} />
          <primitive object={rimMat} attach="material" />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* Main extruded logo */}
      <mesh geometry={geomData.geom}>
        <primitive attach="material" object={mainMat} />
      </mesh>

      {/* Additive rim “halo” shell */}
      <mesh geometry={geomData.geom} scale={[1.025, 1.025, 1.025]}>
        <primitive attach="material" object={rimMat} />
      </mesh>
    </group>
  );
}
