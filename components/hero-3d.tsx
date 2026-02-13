'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6.2], fov: 38, near: 0.1, far: 100 }}
    >
      <color attach="background" args={['#000000']} />

      {/* Lighting: key + fill + rim */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 3, 5]} intensity={1.25} />
      <directionalLight position={[-6, -2, -4]} intensity={0.25} />
      <pointLight position={[0, 2.5, 6]} intensity={0.75} />
      <pointLight position={[-4, 0.8, 2.5]} intensity={0.65} />

      <Stars />

      {/* Position the logo in the same “hero right side” zone */}
      <group position={[3.0, -0.15, -0.6]} rotation={[0.02, -0.25, 0]}>
        <Logo3D />
      </group>
    </Canvas>
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
      <pointsMaterial size={0.055} sizeAttenuation transparent opacity={0.6} color="#ffffff" />
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

  // Extrusion setup
  const geom = useMemo(() => {
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

    // Center geometry
    g.computeBoundingBox();
    const box = g.boundingBox;
    if (box) {
      const center = new THREE.Vector3();
      box.getCenter(center);
      g.translate(-center.x, -center.y, -center.z);
    }

    return g;
  }, [shapes]);

  // Materials: slightly metallic charcoal + green emissive edge feel
  const frontMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0f1418'),
      roughness: 0.55,
      metalness: 0.25,
      emissive: new THREE.Color('#00f5a0'),
      emissiveIntensity: 0.22,
    });
  }, []);

  const sideMat = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0a0d10'),
      roughness: 0.75,
      metalness: 0.15,
      emissive: new THREE.Color('#00f5a0'),
      emissiveIntensity: 0.14,
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

  // Scale: normalize to consistent on-screen size
  const scale = useMemo(() => {
    // viewBoxScale is typically ~1000–3000 depending on export.
    // We normalize it into a stable range.
    const base = viewBoxScale || 1;
    return 2.05 / Math.max(180, base / 2);
  }, [viewBoxScale]);

  if (!geom) {
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
      <mesh geometry={geom}>
        {/* Use multi-material: front/back + sides */}
        <primitive attach="material" object={[frontMat, sideMat]} />
      </mesh>

      {/* Additive rim “halo” shell */}
      <mesh geometry={geom} scale={[1.025, 1.025, 1.025]}>
        <primitive attach="material" object={rimMat} />
      </mesh>
    </group>
  );
}
