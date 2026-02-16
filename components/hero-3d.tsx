"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type Hero3DProps = {
  /** URL to an SVG in /public, e.g. "/srt-logo.svg" */
  svgUrl?: string;
  className?: string;
  lowPower?: boolean;
  /** Force-disable animation (used for reduced-motion or low-power fallbacks) */
  staticOnly?: boolean;
};

// --- Utils ---------------------------------------------------------------

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

// Convert an SVG (including embedded raster images) into a luminance alpha-map.
// This avoids the "big square" problem when the SVG contains a full-rect bitmap.
function useSVGMaskTexture(svgUrl: string) {
  const [alpha, setAlpha] = useState<THREE.Texture | null>(null);
  const [glow, setGlow] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      if (cancelled) return;
      const w = img.naturalWidth || 1024;
      const h = img.naturalHeight || 1024;

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Draw
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      // Post-process to build an alpha-map from luminance.
      // This makes the logo visible as a "filled" mark while preserving soft edges.
      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];
        const a = d[i + 3];

        // Luminance (0-255). Respect existing alpha.
        const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) * (a / 255);

        // Threshold to kill background haze.
        const outA = lum < 12 ? 0 : clamp(lum * 1.15, 0, 255);

        // White source, alpha carries the mask.
        d[i] = 255;
        d[i + 1] = 255;
        d[i + 2] = 255;
        d[i + 3] = outA;
      }
      ctx.putImageData(imgData, 0, 0);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      tex.needsUpdate = true;

      // Build a slightly expanded glow texture.
      const glowCanvas = document.createElement("canvas");
      glowCanvas.width = w;
      glowCanvas.height = h;
      const gctx = glowCanvas.getContext("2d", { willReadFrequently: true });
      if (!gctx) return;
      gctx.clearRect(0, 0, w, h);
      gctx.filter = "blur(2.2px)";
      gctx.drawImage(canvas, 0, 0);
      gctx.filter = "blur(5px)";
      gctx.globalAlpha = 0.55;
      gctx.drawImage(canvas, 0, 0);

      const glowTex = new THREE.CanvasTexture(glowCanvas);
      glowTex.colorSpace = THREE.SRGBColorSpace;
      glowTex.wrapS = THREE.ClampToEdgeWrapping;
      glowTex.wrapT = THREE.ClampToEdgeWrapping;
      glowTex.minFilter = THREE.LinearMipmapLinearFilter;
      glowTex.magFilter = THREE.LinearFilter;
      glowTex.generateMipmaps = true;
      glowTex.needsUpdate = true;

      setAlpha(tex);
      setGlow(glowTex);
    };

    // Load SVG via data URL to ensure consistent sizing across browsers.
    fetch(svgUrl)
      .then((r) => r.text())
      .then((svgText) => {
        if (cancelled) return;
        const encoded = encodeURIComponent(svgText)
          .replace(/%0A/g, "")
          .replace(/%20/g, " ");
        img.src = `data:image/svg+xml;charset=utf-8,${encoded}`;
      })
      .catch(() => {
        // Fail silently; the scene will still render stars.
      });

    return () => {
      cancelled = true;
      setAlpha(null);
      setGlow(null);
    };
  }, [svgUrl]);

  return { alpha, glow };
}

// --- Scene parts ---------------------------------------------------------

function StarsField({ density = 420, radius = 18 }: { density?: number; radius?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(density * 3);
    for (let i = 0; i < density; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const rr = radius * (0.35 + 0.65 * Math.pow(Math.random(), 0.7));
      const x = rr * Math.sin(phi) * Math.cos(theta);
      const y = rr * Math.sin(phi) * Math.sin(theta);
      const z = rr * Math.cos(phi);
      arr[i * 3 + 0] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [density, radius]);

  const points = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.02;
    points.current.rotation.x = Math.sin(t * 0.08) * 0.015;
  });

  return (
    <points ref={points} frustumCulled={false} renderOrder={-30}>
      <bufferGeometry>
        {/* IMPORTANT: use args to satisfy TS typings */}
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        transparent
        opacity={0.55}
        depthWrite={false}
        color={new THREE.Color("#d7fff3")}
      />
    </points>
  );
}

function Dust({ count = 520, radius = 12 }: { count?: number; radius?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // thin volumetric layer
      const x = (Math.random() - 0.5) * radius * 2;
      const y = (Math.random() - 0.5) * radius * 0.9;
      const z = -3 - Math.random() * 14;
      arr[i * 3 + 0] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return arr;
  }, [count, radius]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.01;
  });

  return (
    <points ref={ref} frustumCulled={false} renderOrder={-25}>
      <bufferGeometry>
        {/* IMPORTANT: use args to satisfy TS typings */}
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        transparent
        opacity={0.12}
        depthWrite={false}
        color={new THREE.Color("#66ffd1")}
      />
    </points>
  );
}

function SVGAtmosphereMark({ svgUrl }: { svgUrl: string }) {
  const group = useRef<THREE.Group>(null);
  const { alpha, glow } = useSVGMaskTexture(svgUrl);

  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [current, setCurrent] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setTarget({ x: nx, y: ny });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;

    // Ease cursor influence.
    setCurrent((c) => {
      const nx = c.x + (target.x - c.x) * 0.04;
      const ny = c.y + (target.y - c.y) * 0.04;
      return { x: nx, y: ny };
    });

    // Breathing motion
    const t = state.clock.elapsedTime;
    const bob = Math.sin(t * 0.35) * 0.035;

    // Clamp rotation so it never becomes a face-on “giant silhouette”.
    const rx = clamp(current.y * 0.18 + Math.sin(t * 0.15) * 0.05, -0.22, 0.22);
    const ry = clamp(current.x * 0.28 + Math.cos(t * 0.12) * 0.06, -0.32, 0.32);

    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, rx, 4.2, state.clock.getDelta());
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ry, 4.2, state.clock.getDelta());
    g.position.y = THREE.MathUtils.damp(g.position.y, bob, 3.2, state.clock.getDelta());
  });

  const w = 3.1;
  const h = 3.1;

  return (
    <group ref={group} position={[0.65, 0.12, -7.8]} scale={[1.05, 1.05, 1.05]}>
      {/* Core mark */}
      <mesh>
        <planeGeometry args={[w, h, 1, 1]} />
        <meshStandardMaterial
          color={"#eaf6ff"}
          transparent
          opacity={0.22}
          alphaMap={alpha ?? undefined}
          alphaTest={0.08}
          emissive={"#64ffd1"}
          emissiveIntensity={0.08}
          roughness={0.78}
          metalness={0.05}
          depthWrite={false}
        />
      </mesh>

      {/* Glow pass */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[w * 1.02, h * 1.02, 1, 1]} />
        <meshBasicMaterial
          color={"#66ffd1"}
          transparent
          opacity={0.16}
          alphaMap={glow ?? undefined}
          alphaTest={0.02}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Rim highlight */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[w * 1.01, h * 1.01, 1, 1]} />
        <meshBasicMaterial
          color={"#bfffe9"}
          transparent
          opacity={0.10}
          alphaMap={glow ?? undefined}
          alphaTest={0.03}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function CameraRig({ staticOnly }: { staticOnly: boolean }) {
  const { camera } = useThree();
  const base = useMemo(() => new THREE.Vector3(0, 0.15, 10.8), []);
  const target = useMemo(() => new THREE.Vector3(0, 0.05, 0), []);

  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (staticOnly) return;
    const onMove = (e: PointerEvent) => {
      setPointer({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [staticOnly]);

  useFrame((_state, dt) => {
    const tx = base.x + pointer.x * 0.25;
    const ty = base.y + pointer.y * 0.18;
    const tz = base.z;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, 2.4, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, 2.4, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, tz, 2.4, dt);
    camera.lookAt(target);
  });

  return null;
}

function Scene({ svgUrl, staticOnly }: { svgUrl?: string; staticOnly: boolean }) {
  return (
    <>
      <fog attach="fog" args={["#020507", 8.5, 18]} />

      <ambientLight intensity={0.22} />
      <directionalLight position={[6, 5, 7]} intensity={0.45} color={"#dff7ff"} />
      <directionalLight position={[-6, -2, 5]} intensity={0.18} color={"#6dffd4"} />
      <pointLight position={[0, 2.5, 6]} intensity={0.32} color={"#66ffd1"} distance={18} />

      <StarsField />
      <Dust />

      {svgUrl ? <SVGAtmosphereMark svgUrl={svgUrl} /> : null}
      <CameraRig staticOnly={staticOnly} />
    </>
  );
}

export default function Hero3D({
  svgUrl = "/srt-logo.svg",
  className,
  lowPower,
  staticOnly,
}: Hero3DProps) {
  const reduced = useReducedMotion();
  const disableAnim = !!staticOnly || !!lowPower || reduced;

  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={disableAnim ? 1 : [1, 1.5]}
        camera={{ position: [0, 0.15, 10.8], fov: 50, near: 0.1, far: 40 }}
        gl={{
          antialias: !disableAnim,
          alpha: true,
          powerPreference: "default",
        }}
      >
        <color attach="background" args={["#000000"]} />
        <Scene svgUrl={svgUrl} staticOnly={disableAnim} />
      </Canvas>
    </div>
  );
}
