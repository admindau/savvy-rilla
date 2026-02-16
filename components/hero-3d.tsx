'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { SVGLoader } from 'three-stdlib';

type Hero3DProps = {
  /** URL to an SVG in /public (e.g. "/srt-logo.svg") */
  src: string;
  className?: string;
  /** overall intensity knob */
  intensity?: number;
};

type ParsedSVG = {
  svgText: string;
  data: ReturnType<SVGLoader['parse']>;
  hasImageTag: boolean;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function useParsedSVG(src: string) {
  const [parsed, setParsed] = useState<ParsedSVG | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetch(src, { cache: 'force-cache' });
        const svgText = await res.text();

        const xml = new DOMParser().parseFromString(svgText, 'image/svg+xml');
        const hasImageTag = !!xml.querySelector('image');

        const loader = new SVGLoader();
        const data = loader.parse(svgText);

        if (!alive) return;
        setParsed({ svgText, data, hasImageTag });
      } catch {
        if (!alive) return;
        setParsed(null);
      }
    })();

    return () => {
      alive = false;
    };
  }, [src]);

  return parsed;
}

function buildTextureFromSVG(svgText: string, maxSize = 1400) {
  const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  img.decoding = 'async';

  const tex = new THREE.Texture();
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 8;

  const cleanup = () => URL.revokeObjectURL(url);

  const promise = new Promise<THREE.Texture>((resolve) => {
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const w = Math.max(2, Math.round(img.width * scale));
      const h = Math.max(2, Math.round(img.height * scale));

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        cleanup();
        resolve(tex);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      // Contrast-safe alpha extraction.
      // Works for: (a) dark logo on transparent, (b) white logo on transparent, (c) raster-embedded SVGs.
      const data = ctx.getImageData(0, 0, w, h);
      const d = data.data;

      let sumLum = 0;
      let count = 0;
      for (let i = 0; i < d.length; i += 4) {
        const a = d[i + 3];
        if (a > 16) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];
          const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
          sumLum += lum;
          count += 1;
        }
      }
      const meanLum = count ? sumLum / count : 0;
      const preferLum = meanLum > 160; // white-ish logos

      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];
        const a0 = d[i + 3];

        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const inv = 255 - lum;

        let a = preferLum ? lum : inv;
        a = Math.max(a0, a);

        // gentle curve + floor (prevents "outline only")
        const af = clamp((a / 255 - 0.06) / 0.94, 0, 1);
        const boosted = Math.pow(af, 0.75);

        d[i] = 255;
        d[i + 1] = 255;
        d[i + 2] = 255;
        d[i + 3] = Math.round(boosted * 255);
      }

      ctx.putImageData(data, 0, 0);

      tex.image = canvas;
      tex.needsUpdate = true;

      cleanup();
      resolve(tex);
    };

    img.onerror = () => {
      cleanup();
      resolve(tex);
    };

    img.src = url;
  });

  return { tex, promise };
}

function TextureLogo({
  svgText,
  intensity = 1,
}: {
  svgText: string;
  intensity?: number;
}) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [aspect, setAspect] = useState(1);

  useEffect(() => {
    let alive = true;
    const { tex, promise } = buildTextureFromSVG(svgText);
    promise.then((t) => {
      if (!alive) return;
      setTexture(t);
      // @ts-expect-error canvas is valid image source for texture at runtime
      if (img && img.width && img.height) setAspect(img.width / img.height);
    });
    setTexture(tex);
    return () => {
      alive = false;
    };
  }, [svgText]);

  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    // Clamp rotation so we never get the "face-on giant mask" moment.
    const baseY = Math.sin(t * 0.18) * 0.22;
    const baseX = Math.sin(t * 0.13) * 0.08;
    group.current.rotation.y = clamp(baseY, -0.28, 0.28);
    group.current.rotation.x = clamp(baseX, -0.12, 0.12);

    // subtle drift
    group.current.position.y = Math.sin(t * 0.22) * 0.05;
  });

  const w = 2.25;
  const h = w / Math.max(0.65, Math.min(1.6, aspect));
  const depth = 0.06;

  return (
    <group ref={group} scale={1.0}>
      {/* dark backplate for legibility */}
      <mesh position={[0, 0, -0.03]}>
        <boxGeometry args={[w * 1.02, h * 1.02, depth * 0.7]} />
        <meshStandardMaterial
          color="#05110f"
          transparent
          opacity={0.22}
          roughness={0.95}
          metalness={0.0}
          depthWrite={false}
        />
      </mesh>

      {/* main textured "extruded card" */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[w, h, depth]} />
        <meshStandardMaterial
          // slightly darker than fog but still visible
          color="#0b2a24"
          transparent
          opacity={0.62}
          roughness={0.55}
          metalness={0.12}
          emissive="#18cfa1"
          emissiveIntensity={0.22 * intensity}
          depthWrite={false}
        />
        {texture ? (
          <meshStandardMaterial
            attach="material-4"
            map={texture}
            alphaMap={texture}
            transparent
            opacity={0.9}
            color="#dffbf3"
            emissive="#21f0ba"
            emissiveIntensity={0.18 * intensity}
            roughness={0.75}
            metalness={0.05}
            depthWrite={false}
          />
        ) : null}
        {texture ? (
          <meshStandardMaterial
            attach="material-5"
            map={texture}
            alphaMap={texture}
            transparent
            opacity={0.9}
            color="#dffbf3"
            emissive="#21f0ba"
            emissiveIntensity={0.18 * intensity}
            roughness={0.75}
            metalness={0.05}
            depthWrite={false}
          />
        ) : null}
      </mesh>

      {/* rim highlight plane */}
      <mesh position={[0, 0, 0.045]}>
        <planeGeometry args={[w * 1.02, h * 1.02]} />
        <meshBasicMaterial
          color="#27ffd0"
          transparent
          opacity={0.06 * intensity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function ExtrudedLogo({
  data,
  intensity = 1,
}: {
  data: ReturnType<SVGLoader['parse']>;
  intensity?: number;
}) {
  const group = useRef<THREE.Group>(null);

  // create meshes once
  const meshes = useMemo(() => {
    const out: Array<{ geom: THREE.ExtrudeGeometry; mat: THREE.MeshStandardMaterial }> = [];
    const depth = 0.12;

    for (const p of data.paths || []) {
      const style = (p as any).userData?.style || {};
      const fill = String(style.fill || '').trim();

      // If SVG is stroke-only, still build shapes and apply a fallback fill.
      const isFillNone = !fill || fill === 'none' || fill === 'transparent';
      const hasStroke = !!style.stroke && String(style.stroke) !== 'none';

      if (isFillNone && !hasStroke) continue;

      const shapes = SVGLoader.createShapes(p);
      if (!shapes?.length) continue;

      const geom = new THREE.ExtrudeGeometry(shapes, {
        depth,
        bevelEnabled: true,
        bevelThickness: 0.02,
        bevelSize: 0.008,
        bevelSegments: 2,
        steps: 1,
      });
      geom.computeVertexNormals();

      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0b2a24'),
        roughness: 0.52,
        metalness: 0.18,
        emissive: new THREE.Color('#1ad9aa'),
        emissiveIntensity: 0.22 * intensity,
        transparent: true,
        opacity: 0.58,
        depthWrite: false,
      });

      out.push({ geom, mat });
    }

    // normalize to center
    const box = new THREE.Box3();
    for (const m of out) box.expandByObject(new THREE.Mesh(m.geom));

    const center = new THREE.Vector3();
    box.getCenter(center);

    for (const m of out) m.geom.translate(-center.x, -center.y, -center.z);

    // scale to fit ~2.2 units
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x || 1, size.y || 1);
    const s = 2.2 / maxDim;

    for (const m of out) m.geom.scale(s, s, s);

    return out;
  }, [data, intensity]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = clamp(Math.sin(t * 0.18) * 0.22, -0.28, 0.28);
    group.current.rotation.x = clamp(Math.sin(t * 0.13) * 0.08, -0.12, 0.12);
    group.current.position.y = Math.sin(t * 0.22) * 0.05;
  });

  return (
    <group ref={group}>
      {meshes.map((m, i) => (
        <mesh key={i} geometry={m.geom} material={m.mat} />
      ))}
    </group>
  );
}

function Scene({
  parsed,
  intensity = 1,
}: {
  parsed: ParsedSVG;
  intensity?: number;
}) {
  const fog = useMemo(() => new THREE.FogExp2('#040706', 0.065), []);
  const showTexture = parsed.hasImageTag || !(parsed.data.paths && parsed.data.paths.length);

  return (
    <>
      <primitive object={fog} attach="fog" />

      {/* lights */}
      <ambientLight intensity={0.22 * intensity} />
      <directionalLight position={[3.5, 2.8, 2.5]} intensity={0.45 * intensity} color="#e6fff7" />
      <directionalLight position={[-4.2, 1.4, -2.2]} intensity={0.35 * intensity} color="#19ffd0" />
      <pointLight position={[0, 0.6, 1.8]} intensity={0.28 * intensity} color="#14e9b2" distance={6} />

      {/* subtle atmosphere */}
      <Sparkles
        count={26}
        speed={0.22}
        opacity={0.12}
        scale={8}
        size={1.7}
        noise={0.7}
        color="#21f0ba"
      />

      <group position={[0, 0, -0.9]} scale={1.15}>
        {showTexture ? (
          <TextureLogo svgText={parsed.svgText} intensity={intensity} />
        ) : (
          <ExtrudedLogo data={parsed.data} intensity={intensity} />
        )}
      </group>
    </>
  );
}

export default function Hero3D({ src, className, intensity = 1 }: Hero3DProps) {
  const parsed = useParsedSVG(src);

  // Important: this component is ALWAYS behind content. The caller should give it a "hero-visual" class
  // that sets pointer-events: none and z-index: 0.
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 3.35], fov: 48, near: 0.1, far: 40 }}
      >
        {parsed ? <Scene parsed={parsed} intensity={intensity} /> : null}
      </Canvas>
    </div>
  );
}
