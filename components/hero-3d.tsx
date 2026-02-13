'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three-stdlib';

type Hero3DProps = {
  className?: string;
  /** Public path to the SVG (default: /srt-logo.svg) */
  svgUrl?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function Stars({ count = 900 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    // A gentle "tunnel" distribution so stars feel denser behind the logo.
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      const theta = Math.random() * Math.PI * 2;
      const z = -3 - Math.pow(Math.random(), 1.4) * 10;
      const spread = 8;
      const x = Math.cos(theta) * spread * r;
      const y = (Math.random() * 2 - 1) * spread * r;

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      sizes[i] = 0.5 + Math.random() * 1.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return geo;
  }, [count]);

  const mat = useMemo(() => {
    // Slightly warm white to match the cinematic grade.
    return new THREE.PointsMaterial({
      color: new THREE.Color('#dbe7ff'),
      size: 0.012,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
  }, []);

  const ref = useRef<THREE.Points | null>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!ref.current) return;
    // Tiny drift so background feels alive.
    ref.current.position.x = Math.sin(t * 0.05) * 0.08;
    ref.current.position.y = Math.cos(t * 0.04) * 0.06;
  });

  return <points ref={ref} geometry={points} material={mat} />;
}

type SvgMesh = {
  meshes: { geometry: THREE.ExtrudeGeometry; material: THREE.MeshStandardMaterial }[];
  bounds: { size: THREE.Vector3; center: THREE.Vector3 };
};

function useExtrudedSvg(svgUrl: string): SvgMesh | null {
  const [svgText, setSvgText] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetch(svgUrl, { cache: 'force-cache' });
        if (!res.ok) throw new Error(`Failed to fetch ${svgUrl}: ${res.status}`);
        const text = await res.text();
        if (!alive) return;
        setSvgText(text);
      } catch (e) {
        // Fail silently (we still want the page to render).
        if (!alive) return;
        setSvgText(null);
        console.error(e);
      }
    })();

    return () => {
      alive = false;
    };
  }, [svgUrl]);

  return useMemo(() => {
    if (!svgText) return null;

    const loader = new SVGLoader();
    const data = loader.parse(svgText);

    const meshes: SvgMesh['meshes'] = [];
    const tmpBox = new THREE.Box3();
    const totalBox = new THREE.Box3();
    const hasBox = false;
    void hasBox;

    // Material: emissive sci‑fi glassy metal, double-sided so the back renders.
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e9fff8'),
      metalness: 0.35,
      roughness: 0.35,
      emissive: new THREE.Color('#10b981'),
      emissiveIntensity: 0.22,
      transparent: true,
      opacity: 0.98,
      side: THREE.DoubleSide,
    });

    // Convert SVG paths -> shapes -> extrude.
    for (const p of data.paths) {
      const shapes = SVGLoader.createShapes(p);
      for (const shape of shapes) {
        const geo = new THREE.ExtrudeGeometry(shape, {
          depth: 8,
          bevelEnabled: true,
          bevelThickness: 1.2,
          bevelSize: 0.9,
          bevelOffset: 0,
          bevelSegments: 2,
          curveSegments: 8,
          steps: 1,
        });

        // SVG Y axis is inverted in most exports; flip the geometry once.
        geo.scale(0.01, -0.01, 0.01);
        geo.computeVertexNormals();

        tmpBox.setFromBufferAttribute(geo.getAttribute('position') as THREE.BufferAttribute);
        totalBox.union(tmpBox);

        meshes.push({
          geometry: geo,
          material: baseMaterial.clone(),
        });
      }
    }

    if (meshes.length === 0) return null;

    // Compute stable bounds.
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    totalBox.getSize(size);
    totalBox.getCenter(center);

    // Normalize viewBox parsing (fix for XMLDocument typing) – but we do it safely.
    // If the SVG has a viewBox we use its aspect to slightly stabilize scale.
    try {
      const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml');
      const vb = doc.documentElement.getAttribute('viewBox');
      if (vb) {
        const parts = vb.split(/\s+/).map((n) => Number(n));
        if (parts.length === 4 && parts.every((n) => Number.isFinite(n))) {
          // Subtle nudge: keep Z depth proportional to XY.
          // (No direct scaling change needed; bounds already computed.)
        }
      }
    } catch {
      // ignore
    }

    return {
      meshes,
      bounds: { size, center },
    };
  }, [svgText]);
}

function Logo3D({ svgUrl }: { svgUrl: string }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const svg = useExtrudedSvg(svgUrl);

  // Camera-relative slight tilt and continuous rotation.
  useFrame(({ clock, pointer }) => {
    const g = groupRef.current;
    if (!g) return;

    const t = clock.getElapsedTime();
    const px = clamp(pointer.x, -1, 1);
    const py = clamp(pointer.y, -1, 1);

    // Idle spin + small pointer tilt.
    g.rotation.y = t * 0.35 + px * 0.25;
    g.rotation.x = -0.08 + py * 0.12;

    // Gentle bobbing.
    g.position.y = Math.sin(t * 0.8) * 0.03;
  });

  // If SVG not loaded yet, render nothing (stars still show).
  if (!svg) return null;

  const { size, center } = svg.bounds;
  const maxXY = Math.max(size.x, size.y);
  const scale = maxXY > 0 ? 2.2 / maxXY : 1;

  return (
    <group ref={groupRef}>
      {/* A faint halo ring behind the logo */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.12]}>
        <ringGeometry args={[0.9, 1.12, 128]} />
        <meshBasicMaterial
          color={new THREE.Color('#10b981')}
          transparent
          opacity={0.18}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <group
        // Center the SVG around origin and normalize scale.
        scale={[scale, scale, scale]}
        position={[-center.x * scale, -center.y * scale, 0]}
      >
        {svg.meshes.map((m, i) => (
          <mesh
            key={i}
            geometry={m.geometry}
            material={m.material}
            // Ensure back side shows even if normals get flipped.
            frustumCulled
          />
        ))}
      </group>
    </group>
  );
}

export default function Hero3D({ className, svgUrl = '/srt-logo.svg' }: Hero3DProps) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0.15, 3.1], fov: 42, near: 0.1, far: 50 }}
      >
        {/* Lighting: keep enough ambient so the back face is visible. */}
        {/* Lighting: key + fill + soft hemisphere so the back side never goes blank */}
        <ambientLight intensity={0.7} />
        <hemisphereLight intensity={0.35} args={['#b9fff0', '#00120d', 0.35]} />
        <directionalLight position={[3, 2, 3]} intensity={1.1} />
        <directionalLight position={[-3, 1, -3]} intensity={0.9} />
        <pointLight position={[0, 0, 2]} intensity={0.4} color={new THREE.Color('#10b981')} />

        <Stars />
        <Logo3D svgUrl={svgUrl} />
      </Canvas>
    </div>
  );
}
