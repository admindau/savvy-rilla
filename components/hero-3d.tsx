// components/hero-3d.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three-stdlib";

type Hero3DProps = {
  /** public path to the svg, e.g. "/srt-logo.svg" */
  src?: string;
  /** overall scale in world units */
  scale?: number;
  /** thickness for extruded fills (only applies to vector paths) */
  depth?: number;
  /** disable animation (reduced motion / low power) */
  animate?: boolean;
  className?: string;
};

type ParsedSVG = {
  paths: any[];
  xml?: Document | undefined;
  hasImageTag?: boolean;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Ultra-subtle starfield, used as depth texture (not a "space wallpaper").
 */
function Stars({ count = 900 }: { count?: number }) {
  const geom = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const rMin = 10;
    const rMax = 26;

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

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count]);

  const mat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#cfefff"),
        size: 0.055,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.48,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  return <points geometry={geom} material={mat} frustumCulled={false} />;
}

/**
 * Dust / micro particles close to camera to sell atmosphere depth.
 */
function Dust({ count = 260 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { geom, mat, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = -2 - Math.random() * 8;

      speeds[i] = 0.08 + Math.random() * 0.18;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const m = new THREE.PointsMaterial({
      color: new THREE.Color("#9fead3"),
      size: 0.03,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geom: g, mat: m, speeds };
  }, [count]);

  useFrame((_, delta) => {
    const p = ref.current?.geometry.getAttribute("position") as THREE.BufferAttribute | undefined;
    if (!p) return;

    for (let i = 0; i < count; i++) {
      let z = p.getZ(i);
      z += speeds[i] * delta;

      if (z > 1.2) {
        z = -10 - Math.random() * 8;
        p.setX(i, (Math.random() - 0.5) * 10);
        p.setY(i, (Math.random() - 0.5) * 6);
      }
      p.setZ(i, z);
    }

    p.needsUpdate = true;
  });

  return <points ref={ref} geometry={geom} material={mat} frustumCulled={false} />;
}

/**
 * Subtle rings / disc used as "holographic cradle" under logo.
 */
function GlowDisc({ radius = 2.45 }: { radius?: number }) {
  return (
    <group renderOrder={1} frustumCulled={false}>
      <mesh frustumCulled={false} renderOrder={1}>
        <circleGeometry args={[radius, 128]} />
        <meshBasicMaterial
          color={"#00f5a0"}
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh frustumCulled={false} renderOrder={0} scale={1.32}>
        <ringGeometry args={[radius * 0.82, radius * 1.08, 128]} />
        <meshBasicMaterial
          color={"#00f5a0"}
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* faint rim ring */}
      <mesh frustumCulled={false} renderOrder={2} scale={1.0} position={[0, 0, 0.03]}>
        <ringGeometry args={[radius * 1.01, radius * 1.03, 160]} />
        <meshBasicMaterial
          color={"#00f5a0"}
          transparent
          opacity={0.09}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/**
 * CAMERA MICRO-PARALLAX
 * - very small movement only, prevents “mask” dominance
 */
function CinematicCameraRig({ enabled = true }: { enabled?: boolean }) {
  const { camera } = useThree();
  const base = useRef(new THREE.Vector3(0, 0.18, 7.6));
  const t = useRef(0);

  useFrame((state, delta) => {
    if (!enabled) return;

    // smooth ramp-in so there’s no “pop”
    t.current = clamp(t.current + delta * 0.5, 0, 1);
    const ramp = easeOutCubic(t.current);

    const px = clamp(state.pointer.x, -0.6, 0.6);
    const py = clamp(state.pointer.y, -0.6, 0.6);

    const target = new THREE.Vector3(
      base.current.x + px * 0.24 * ramp,
      base.current.y + py * 0.18 * ramp,
      base.current.z
    );

    camera.position.lerp(target, 0.06);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/**
 * VECTOR MODE
 * - Extrudes SVG paths (requires real <path> shapes in SVG).
 */
function SVGExtrudedMark({
  parsed,
  depth = 0.22,
  animate = true,
}: {
  parsed: ParsedSVG | null;
  depth?: number;
  animate?: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  const { fillMeshes, strokeObjects, boundsScale } = useMemo(() => {
    if (!parsed?.paths?.length) {
      return { fillMeshes: [] as any[], strokeObjects: [] as THREE.Object3D[], boundsScale: 1 };
    }

    const fillMeshes: {
      geom: THREE.ExtrudeGeometry;
      material: THREE.MeshStandardMaterial;
      key: string;
    }[] = [];

    const strokeObjects: THREE.Object3D[] = [];
    const tmpGroup = new THREE.Group();

    parsed.paths.forEach((p: any, i: number) => {
      const style = p.userData?.style ?? {};
      const fill = (style.fill ?? "").toString().trim();
      const stroke = (style.stroke ?? "").toString().trim();
      const fillOpacity = Number(style.fillOpacity ?? style.opacity ?? 1);
      const strokeOpacity = Number(style.strokeOpacity ?? style.opacity ?? 1);
      const strokeWidth = Number(style.strokeWidth ?? 1);

      // FILLS
      if (fill && fill !== "none" && fillOpacity > 0.001) {
        const shapes = SVGLoader.createShapes(p);
        shapes.forEach((s: THREE.Shape, j: number) => {
          const geom = new THREE.ExtrudeGeometry(s, {
            depth,
            bevelEnabled: false,
            curveSegments: 12,
          });

          // Flip Y to match SVG coordinate space
          geom.scale(1, -1, 1);
          geom.computeVertexNormals();

          const baseColor = new THREE.Color("#e9eef7");
          const emissive = new THREE.Color("#00f5a0");

          const material = new THREE.MeshStandardMaterial({
            color: baseColor,
            metalness: 0.62,
            roughness: 0.23,
            emissive,
            emissiveIntensity: 0.14, // cinematic: lower than neon
            transparent: true,
            opacity: clamp(fillOpacity, 0, 1) * 0.55,
            side: THREE.DoubleSide,
          });

          const key = `fill-${i}-${j}`;
          fillMeshes.push({ geom, material, key });

          const mesh = new THREE.Mesh(geom, material);
          mesh.frustumCulled = false;
          tmpGroup.add(mesh);
        });
      }

      // STROKES -> THREE.Line objects (avoid JSX <line> = SVG DOM element)
      if (stroke && stroke !== "none" && strokeOpacity > 0.001) {
        const subPaths: any[] = p.subPaths ?? [];
        const targets = subPaths.length ? subPaths : [p];

        targets.forEach((sp: any, k: number) => {
          const pts: THREE.Vector2[] = sp.getPoints?.(260) ?? p.getPoints?.(260) ?? [];
          if (!pts?.length) return;

          const pts3 = pts.map((v) => new THREE.Vector3(v.x, -v.y, 0));
          const geom = new THREE.BufferGeometry().setFromPoints(pts3);

          const material = new THREE.LineBasicMaterial({
            color: new THREE.Color("#00f5a0"),
            transparent: true,
            opacity: clamp(strokeOpacity, 0, 1) * 0.55,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });

          // subtle width hint (webgl linewidth unreliable)
          material.opacity = clamp(material.opacity * (1 + (strokeWidth - 1) * 0.06), 0, 1);

          const front = new THREE.Line(geom, material);
          front.frustumCulled = false;
          front.renderOrder = 3;
          front.position.set(0, 0, 0);

          const back = new THREE.Line(geom, material);
          back.frustumCulled = false;
          back.renderOrder = 3;
          back.position.set(0, 0, depth);

          strokeObjects.push(front, back);
          tmpGroup.add(front);
          tmpGroup.add(back);
        });
      }
    });

    // Normalize bounds
    const box = new THREE.Box3().setFromObject(tmpGroup);
    const size = new THREE.Vector3();
    box.getSize(size);

    const center = new THREE.Vector3();
    box.getCenter(center);

    for (const m of fillMeshes) m.geom.translate(-center.x, -center.y, -center.z);

    for (const o of strokeObjects) {
      const line = o as THREE.Line;
      const g = line.geometry as THREE.BufferGeometry;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (g as any).translate?.(-center.x, -center.y, -center.z);
    }

    const maxDim = Math.max(size.x, size.y, size.z);
    const boundsScale = maxDim > 0 ? 4.0 / maxDim : 1;

    return { fillMeshes, strokeObjects, boundsScale };
  }, [parsed, depth]);

  // Cinematic motion: gentle oscillation (prevents face-on flatten silhouette)
  const phase = useRef(Math.random() * 10);

  useFrame((state, delta) => {
    if (!group.current) return;

    const px = clamp(state.pointer.x, -0.55, 0.55);
    const py = clamp(state.pointer.y, -0.55, 0.55);

    if (animate) {
      phase.current += delta * 0.35;
      const ry = Math.sin(phase.current) * 0.38; // clamp rotation range
      const rx = -0.12 + Math.cos(phase.current * 0.7) * 0.06;
      const rz = 0.05;

      group.current.rotation.y = lerp(group.current.rotation.y, ry + px * 0.18, 0.06);
      group.current.rotation.x = lerp(group.current.rotation.x, rx + -py * 0.12, 0.06);
      group.current.rotation.z = lerp(group.current.rotation.z, rz, 0.06);
    } else {
      group.current.rotation.y = lerp(group.current.rotation.y, px * 0.16, 0.06);
      group.current.rotation.x = lerp(group.current.rotation.x, -0.12 + -py * 0.08, 0.06);
      group.current.rotation.z = lerp(group.current.rotation.z, 0.05, 0.06);
    }
  });

  return (
    <group
      ref={group}
      frustumCulled={false}
      scale={[boundsScale, boundsScale, boundsScale]}
      position={[0, -0.05, 0]}
    >
      <GlowDisc radius={2.35} />

      {fillMeshes.map(({ geom, material, key }) => (
        <mesh key={key} geometry={geom} material={material} frustumCulled={false} renderOrder={2} />
      ))}

      {strokeObjects.map((obj) => (
        <primitive key={obj.uuid} object={obj} />
      ))}
    </group>
  );
}

/**
 * TEXTURE MODE (for raster-in-SVG)
 * - Guaranteed visible for SVGs that contain <image> tags.
 */
function SVGTextureMark({
  svgText,
  animate = true,
}: {
  svgText: string;
  animate?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const [mask, setMask] = useState<THREE.Texture | null>(null);
  const [aspect, setAspect] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function buildMask() {
      try {
        const encoded = encodeURIComponent(svgText)
          .replace(/'/g, "%27")
          .replace(/"/g, "%22");
        const dataUrl = `data:image/svg+xml;charset=utf-8,${encoded}`;

        const img = new Image();
        img.decoding = "async";
        img.crossOrigin = "anonymous";

        img.onload = () => {
          if (cancelled) return;

          const w = img.naturalWidth || 1024;
          const h = img.naturalHeight || 1024;
          setAspect(w / h);

          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          ctx.clearRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);

          const data = ctx.getImageData(0, 0, w, h);
          const d = data.data;

          // Build alpha-only mask
          for (let i = 0; i < d.length; i += 4) {
            const a = d[i + 3];
            if (a > 8) {
              d[i + 0] = 255;
              d[i + 1] = 255;
              d[i + 2] = 255;
              d[i + 3] = Math.min(255, a + 26);
            } else {
              d[i + 3] = 0;
            }
          }

          ctx.putImageData(data, 0, 0);

          const tex = new THREE.CanvasTexture(canvas);
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.minFilter = THREE.LinearMipmapLinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.anisotropy = 8;
          tex.needsUpdate = true;

          setMask(tex);
        };

        img.onerror = () => {
          if (!cancelled) setMask(null);
        };

        img.src = dataUrl;
      } catch {
        if (!cancelled) setMask(null);
      }
    }

    buildMask();
    return () => {
      cancelled = true;
    };
  }, [svgText]);

  const phase = useRef(Math.random() * 10);

  useFrame((state, delta) => {
    if (!group.current) return;

    const px = clamp(state.pointer.x, -0.6, 0.6);
    const py = clamp(state.pointer.y, -0.6, 0.6);

    if (animate) {
      phase.current += delta * 0.34;
      const ry = Math.sin(phase.current) * 0.36;
      const rx = -0.1 + Math.cos(phase.current * 0.72) * 0.05;
      const rz = 0.045;

      group.current.rotation.y = lerp(group.current.rotation.y, ry + px * 0.16, 0.06);
      group.current.rotation.x = lerp(group.current.rotation.x, rx + -py * 0.1, 0.06);
      group.current.rotation.z = lerp(group.current.rotation.z, rz, 0.06);
    } else {
      group.current.rotation.y = lerp(group.current.rotation.y, px * 0.14, 0.06);
      group.current.rotation.x = lerp(group.current.rotation.x, -0.1 + -py * 0.08, 0.06);
      group.current.rotation.z = lerp(group.current.rotation.z, 0.045, 0.06);
    }
  });

  const width = 3.35 * aspect;
  const height = 3.35;

  return (
    <group ref={group} frustumCulled={false} position={[0, -0.04, 0]}>
      <GlowDisc radius={2.35} />

      {/* faint atmosphere plate behind mark */}
      <mesh frustumCulled={false} position={[0, 0, -0.42]}>
        <planeGeometry args={[width * 1.35, height * 1.35]} />
        <meshBasicMaterial
          color={"#001015"}
          transparent
          opacity={0.22}
          depthWrite={false}
          blending={THREE.NormalBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {!mask ? (
        <mesh frustumCulled={false} position={[0, 0, 0.05]}>
          <torusGeometry args={[1.55, 0.055, 18, 96]} />
          <meshBasicMaterial
            color={"#00f5a0"}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ) : (
        <>
          {/* subtle “fake depth” stack */}
          {[0.14, 0.095, 0.06].map((z, idx) => (
            <mesh key={`plate-${idx}`} frustumCulled={false} position={[0, 0, -z]}>
              <planeGeometry args={[width, height]} />
              <meshStandardMaterial
                color={"#081015"}
                metalness={0.7}
                roughness={0.34}
                transparent
                opacity={0.68}
                alphaMap={mask}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
          ))}

          {/* front face */}
          <mesh frustumCulled={false} position={[0, 0, 0.02]}>
            <planeGeometry args={[width, height]} />
            <meshStandardMaterial
              color={"#e9eef7"}
              emissive={"#00f5a0"}
              emissiveIntensity={0.15} // cinematic: reduced
              metalness={0.6}
              roughness={0.26}
              transparent
              opacity={0.94}
              alphaMap={mask}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>

          {/* rim / halo (subtle, not neon) */}
          <mesh frustumCulled={false} position={[0, 0, 0.06]}>
            <planeGeometry args={[width * 1.02, height * 1.02]} />
            <meshBasicMaterial
              color={"#00f5a0"}
              transparent
              opacity={0.045}
              alphaMap={mask}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

export default function Hero3D({
  src = "/srt-logo.svg",
  scale = 1,
  depth = 0.22,
  animate = true,
  className,
}: Hero3DProps) {
  const [parsed, setParsed] = useState<ParsedSVG | null>(null);
  const [svgText, setSvgText] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    async function run() {
      try {
        const res = await fetch(src, { cache: "force-cache" });
        if (!res.ok) throw new Error(`SVG fetch failed: ${res.status}`);
        const text = await res.text();
        if (!mounted) return;

        setSvgText(text);

        const hasImageTag = /<image\b/i.test(text);

        const loader = new SVGLoader();
        const out = loader.parse(text) as any;
        const paths = Array.isArray(out?.paths) ? out.paths : [];

        setParsed({ paths, xml: out.xml, hasImageTag });
      } catch {
        if (!mounted) return;
        setSvgText("");
        setParsed(null);
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, [src]);

  // Use texture mode if SVG is image-based or too few paths to extrude reliably.
  const useTextureMode = !!svgText && (!!parsed?.hasImageTag || (parsed?.paths?.length ?? 0) < 2);

  // Cinematic presence but less domination:
  const finalScale = scale * 0.78;

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "default" }}
        camera={{ position: [0, 0.18, 7.6], fov: 32, near: 0.1, far: 140 }}
        onCreated={({ gl }) => {
          // cinematic renderer tuning
          try {
            gl.setClearColor(0x000000, 0);
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.05;
            gl.outputColorSpace = THREE.SRGBColorSpace;
          } catch {}
        }}
      >
        <CinematicCameraRig enabled={animate} />

        <Stars count={920} />
        <Dust count={260} />

        {/* Lighting: serious infra + cinematic rim */}
        <ambientLight intensity={0.48} />
        <hemisphereLight args={[new THREE.Color("#cfefff"), new THREE.Color("#000b10"), 0.7]} />

        {/* Key (cool) */}
        <directionalLight position={[7, 8, 10]} intensity={1.15} color={new THREE.Color("#e9f4ff")} />

        {/* Fill (deep) */}
        <directionalLight position={[-7, -2, -9]} intensity={0.55} color={new THREE.Color("#0b2830")} />

        {/* Teal accent rim */}
        <pointLight position={[0, 2.4, 6]} intensity={0.7} color={new THREE.Color("#00f5a0")} />
        <pointLight position={[2.8, -0.2, 3.2]} intensity={0.35} color={new THREE.Color("#00f5a0")} />

        {/* Fog tuned to dissolve edges (depth cue) */}
        <fog attach="fog" args={["#000000", 11.5, 24.5]} />

        <group scale={[finalScale, finalScale, finalScale]} frustumCulled={false}>
          {useTextureMode ? (
            <SVGTextureMark svgText={svgText} animate={animate} />
          ) : (
            <SVGExtrudedMark parsed={parsed} depth={depth} animate={animate} />
          )}
        </group>
      </Canvas>
    </div>
  );
}
