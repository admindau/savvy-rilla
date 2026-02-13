'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { SVGLoader } from 'three-stdlib';

type Hero3DProps = {
  className?: string;
  svgUrl?: string; // default: "/srt-logo.svg"
};

type SvgScene = {
  meshes: THREE.Mesh[];
  bounds: THREE.Box3;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

async function fetchText(url: string) {
  const res = await fetch(url, { cache: 'force-cache' });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

function buildSvgScene(svgText: string): SvgScene | null {
  const loader = new SVGLoader();
  const data = loader.parse(svgText);
  if (!data?.paths?.length) return null;

  const meshes: THREE.Mesh[] = [];
  const bounds = new THREE.Box3();

  // We render filled shapes as extruded geometry. If the SVG is stroke-only,
  // shapes may be empty; we still handle it by rendering stroke geometry.
  let hasAnyGeometry = false;

  for (const path of data.paths) {
    const style = path.userData?.style ?? {};
    const fill = (style.fill ?? '').toString();
    const stroke = (style.stroke ?? '').toString();

    // Filled shapes
    const shapes = SVGLoader.createShapes(path);
    if (shapes?.length) {
      hasAnyGeometry = true;
      const geo = new THREE.ExtrudeGeometry(shapes, {
        depth: 6,
        bevelEnabled: true,
        bevelThickness: 1.2,
        bevelSize: 0.8,
        bevelSegments: 2,
        curveSegments: 12,
      });

      geo.computeBoundingBox();

      const baseColor = new THREE.Color('#f3f6ff');
      // Respect SVG fill if it's a valid color (optional).
      try {
        if (fill && fill !== 'none') baseColor.set(fill);
      } catch {
        // ignore invalid
      }

      const mat = new THREE.MeshStandardMaterial({
        color: baseColor,
        metalness: 0.85,
        roughness: 0.18,
        emissive: new THREE.Color('#00f5a0'),
        emissiveIntensity: 0.12,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      meshes.push(mesh);

      const bb = geo.boundingBox;
      if (bb) bounds.union(bb);
    }

    // Stroke-only fallback (thin “engraved” look)
    // Only add if no filled geometry exists for this path.
    if ((!shapes || shapes.length === 0) && stroke && stroke !== 'none') {
      const strokeWidth = Number(style.strokeWidth ?? 1.5);
      const points: THREE.Vector2[] = [];
      for (const sp of path.subPaths) {
        const pts = sp.getPoints(200);
        for (const p of pts) points.push(new THREE.Vector2(p.x, p.y));
      }
      if (points.length >= 2) {
        const strokeGeo = SVGLoader.pointsToStroke(points, {
          strokeWidth,
          strokeLineCap: (style.strokeLineCap ?? 'round').toString(),
          strokeLineJoin: (style.strokeLineJoin ?? 'round').toString(),
          strokeMiterLimit: Number(style.strokeMiterLimit ?? 4),
        } as any);

        if (strokeGeo) {
          hasAnyGeometry = true;
          const strokeMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#e9f1ff'),
            metalness: 0.8,
            roughness: 0.25,
            emissive: new THREE.Color('#00f5a0'),
            emissiveIntensity: 0.08,
          });
          const strokeMesh = new THREE.Mesh(strokeGeo, strokeMat);
          meshes.push(strokeMesh);

          strokeGeo.computeBoundingBox();
          const bb = strokeGeo.boundingBox;
          if (bb) bounds.union(bb);
        }
      }
    }
  }

  if (!hasAnyGeometry) return null;

  // Normalize so +Y is up and Z depth faces camera.
  // SVGLoader outputs +Y down; flip it.
  for (const m of meshes) {
    m.scale.y *= -1;
  }

  return { meshes, bounds };
}

function LogoObject({ svgUrl = '/srt-logo.svg' }: { svgUrl?: string }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const [scene, setScene] = useState<SvgScene | null>(null);
  const [fallbackTexture, setFallbackTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const svgText = await fetchText(svgUrl);
        if (cancelled) return;

        const built = buildSvgScene(svgText);
        if (built) {
          setScene(built);
          return;
        }

        // If we couldn't build geometry (rare SVG export), try rendering the SVG as an image texture.
        const tex = new THREE.TextureLoader().load(svgUrl);
        tex.colorSpace = THREE.SRGBColorSpace;
        setFallbackTexture(tex);
      } catch {
        // Last-resort: no-op. The debug ring still shows the canvas is alive.
        setScene(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [svgUrl]);

  const scaleAndCenter = useMemo(() => {
    if (!scene) return null;

    const size = new THREE.Vector3();
    scene.bounds.getSize(size);

    // Target a readable on-screen size (world units). Keep it within 2.0–3.2 units wide.
    const targetWidth = 2.6;
    const s = size.x > 0 ? targetWidth / size.x : 1;

    const center = new THREE.Vector3();
    scene.bounds.getCenter(center);

    return { s, center };
  }, [scene]);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;

    const t = clock.getElapsedTime();
    // Slow “museum rotation” + micro bob
    g.rotation.y = t * 0.18;
    g.rotation.x = Math.sin(t * 0.25) * 0.06;
    g.position.y = -0.1 + Math.sin(t * 0.5) * 0.06;
  });

  // Place towards the right of the hero, but keep it visible on smaller viewports.
  const x = Math.min(Math.max(viewport.width * 0.25, 0.9), 2.15);

  return (
    <group ref={group} position={[x, -0.05, 0]}>
      {/* Debug ring: ensures you always see “something” even if SVG fails. */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0.2, -0.2, -0.4]}>
        <torusGeometry args={[1.45, 0.035, 16, 90]} />
        <meshStandardMaterial
          color="#00f5a0"
          emissive="#00f5a0"
          emissiveIntensity={0.18}
          metalness={0.6}
          roughness={0.35}
          transparent
          opacity={0.25}
        />
      </mesh>

      {scene && scaleAndCenter ? (
        <group
          scale={[scaleAndCenter.s, scaleAndCenter.s, scaleAndCenter.s]}
          position={[-scaleAndCenter.center.x * scaleAndCenter.s, -scaleAndCenter.center.y * scaleAndCenter.s, 0]}
        >
          {scene.meshes.map((m, i) => (
            <primitive object={m} key={i} />
          ))}

          {/* Backplate to help contrast against the starfield */}
          <mesh position={[0, 0, -3]} scale={[3.4, 3.4, 1]}>
            <circleGeometry args={[1, 64]} />
            <meshStandardMaterial
              color="#04120b"
              emissive="#00f5a0"
              emissiveIntensity={0.02}
              metalness={0.2}
              roughness={0.9}
              transparent
              opacity={0.18}
            />
          </mesh>
        </group>
      ) : fallbackTexture ? (
        <group>
          <mesh>
            <planeGeometry args={[2.2, 2.2]} />
            <meshBasicMaterial map={fallbackTexture} transparent opacity={0.95} />
          </mesh>
          <mesh position={[0, 0, -0.08]}>
            <planeGeometry args={[2.2, 2.2]} />
            <meshBasicMaterial map={fallbackTexture} transparent opacity={0.35} />
          </mesh>
        </group>
      ) : null}
    </group>
  );
}

function Scene({ svgUrl }: { svgUrl?: string }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight intensity={0.45} groundColor="#061018" />
      <directionalLight position={[6, 5, 6]} intensity={1.2} />
      <pointLight position={[-4, -2, 3]} intensity={0.55} color="#00f5a0" />

      <LogoObject svgUrl={svgUrl} />
    </>
  );
}

export default function Hero3D({ className, svgUrl = '/srt-logo.svg' }: Hero3DProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted || reducedMotion) return null;

  return (
    <div className={className ?? ''} aria-hidden>
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 6], fov: 42 }}
      >
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 6.5, 10]} />
        <Scene svgUrl={svgUrl} />
      </Canvas>
    </div>
  );
}
