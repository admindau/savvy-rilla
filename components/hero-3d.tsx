'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Hero3DProps = {
  className?: string;
};

/**
 * Phase D – 3D Integration
 * - Lightweight Earth sphere + atmospheric rim + sparse starfield.
 * - Uses /earth-texture.png if present (fallbacks to procedural oceans/land tint).
 * - Pointer events disabled by parent wrapper; mobile + reduced-motion handled in CSS.
 *
 * Optional (recommended) assets in /public for higher realism:
 * - /earth-day.jpg (or png)
 * - /earth-night.jpg (night lights)
 * - /earth-clouds.png (transparent)
 *
 * For now we try /earth-texture.png first to avoid extra assets.
 */
export default function Hero3D({ className }: Hero3DProps) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 4.2], fov: 40, near: 0.1, far: 100 }}
    >
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 2, 3]} intensity={1.15} />
      <directionalLight position={[-4, -1, -2]} intensity={0.25} />

      <Stars />

      <group position={[1.4, -0.15, 0]} rotation={[0.03, -0.35, 0]}>
        <Earth />
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
      // random direction
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
      <pointsMaterial
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.6}
        color="#ffffff"
      />
    </points>
  );
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const [tex, setTex] = useState<THREE.Texture | null>(null);
  const [isDayNight, setIsDayNight] = useState(false);

  useEffect(() => {
    let alive = true;
    const loader = new THREE.TextureLoader();

    // Prefer the combined day/night map if present. Otherwise fall back to a day map, then earth-texture.png.
    const candidates = ['/earth-day-night.jpg','/earth-day-night.png','/earth-day.jpg','/earth-day.png','/earth-texture.png'];

    const tryNext = (idx: number) => {
      if (!alive) return;
      if (idx >= candidates.length) return;

      loader.load(
        candidates[idx],
        (t) => {
          if (!alive) return;
          t.colorSpace = THREE.SRGBColorSpace;
          t.anisotropy = 4;
          setTex(t);
          setIsDayNight(candidates[idx].includes('earth-day-night'));
        },
        undefined,
        () => tryNext(idx + 1)
      );
    };

    tryNext(0);
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    // Show the "other side" by default (Western Hemisphere).
    // This is a simple longitude offset; adjust if you want a different hemisphere centered.
    if (earthRef.current) earthRef.current.rotation.y = Math.PI;
    if (cloudRef.current) cloudRef.current.rotation.y = Math.PI;
  }, []);

  const terminatorTex = useMemo(() => makeTerminatorTexture(), []);

  const oceanMat = useMemo(() => {
    // Procedural-ish fallback (not a true earth map, but looks “planetary”).
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0b1b2e'),
      roughness: 1,
      metalness: 0,
    });
  }, []);

  useFrame((_, dt) => {
    // slow rotation
    if (earthRef.current) earthRef.current.rotation.y += dt * 0.08;
    if (cloudRef.current) cloudRef.current.rotation.y += dt * 0.11;
  });

  return (
    <group>
      {/* Earth surface */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.25, 64, 64]} />
        {tex ? (
          <meshStandardMaterial
            map={tex}
            roughness={1}
            metalness={0}
            emissive={new THREE.Color('#000000')}
          />
        ) : (
          oceanMat && <primitive object={oceanMat} attach="material" />
        )}
      </mesh>

      {/* Atmospheric rim (additive glow) */}
      <mesh>
        <sphereGeometry args={[1.285, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color('#7bd7ff')}
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Cloud layer (very subtle, optional) */}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[1.265, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color('#ffffff')}
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Terminator / night shadow (only when not using the combined day/night texture) */}
      {!isDayNight && (
        <mesh>
          <sphereGeometry args={[1.255, 64, 64]} />
          <meshBasicMaterial transparent opacity={0.55} side={THREE.FrontSide}>
            <primitive attach="map" object={terminatorTex} />
          </meshBasicMaterial>
        </mesh>
      )}
    </group>
  );
}

/**
 * Creates a tiny gradient texture used as a soft "terminator" overlay.
 * This is cheap and helps the sphere read as 3D even without a real earth map.
 */
function makeTerminatorTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(size * 0.25, size * 0.35, size * 0.05, size * 0.55, size * 0.5, size * 0.55);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.55, 'rgba(0,0,0,0.18)');
  grad.addColorStop(1, 'rgba(0,0,0,0.92)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const t = new THREE.CanvasTexture(canvas);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.ClampToEdgeWrapping;
  t.wrapT = THREE.ClampToEdgeWrapping;
  t.needsUpdate = true;
  return t;
}
