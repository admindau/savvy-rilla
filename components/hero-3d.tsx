// components/hero-3d.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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
        size: 0.06,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.52,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  return <points geometry={geom} material={mat} frustumCulled={false} />;
}

function GlowDisc({ radius = 2.55 }: { radius?: number }) {
  return (
    <group renderOrder={1} frustumCulled={false}>
      <mesh frustumCulled={false} renderOrder={1}>
        <circleGeometry args={[radius, 128]} />
        <meshBasicMaterial
          color={"#00f5a0"}
          transparent
          opacity={0.09}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh frustumCulled={false} renderOrder={0} scale={1.35}>
        <ringGeometry args={[radius * 0.82, radius * 1.08, 128]} />
        <meshBasicMaterial
          color={"#00f5a0"}
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/**
 * VECTOR MODE
 * - Extrudes SVG paths into actual geometry.
 * - Works only if the SVG contains real <path> shapes.
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
            curveSegments: 10,
          });

          // Flip Y to match SVG coordinate space
          geom.scale(1, -1, 1);
          geom.computeVertexNormals();

          const baseColor = new THREE.Color("#e9eef7");
          const emissive = new THREE.Color("#00f5a0");

          const material = new THREE.MeshStandardMaterial({
            color: baseColor,
            metalness: 0.55,
            roughness: 0.25,
            emissive,
            emissiveIntensity: 0.16,
            transparent: true,
            opacity: clamp(fillOpacity, 0, 1),
            side: THREE.DoubleSide,
          });

          const key = `fill-${i}-${j}`;
          fillMeshes.push({ geom, material, key });

          const mesh = new THREE.Mesh(geom, material);
          mesh.frustumCulled = false;
          tmpGroup.add(mesh);
        });
      }

      // STROKES -> THREE.Line objects (avoid JSX <line> being treated as SVG DOM)
      if (stroke && stroke !== "none" && strokeOpacity > 0.001) {
        const subPaths: any[] = p.subPaths ?? [];
        const targets = subPaths.length ? subPaths : [p];

        targets.forEach((sp: any, k: number) => {
          const pts: THREE.Vector2[] = sp.getPoints?.(240) ?? p.getPoints?.(240) ?? [];
          if (!pts?.length) return;

          const pts3 = pts.map((v) => new THREE.Vector3(v.x, -v.y, 0));
          const geom = new THREE.BufferGeometry().setFromPoints(pts3);

          const material = new THREE.LineBasicMaterial({
            color: new THREE.Color("#00f5a0"),
            transparent: true,
            opacity: clamp(strokeOpacity, 0, 1) * 0.9,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });

          // visual hint for width (WebGL lineWidth is unreliable)
          material.opacity = clamp(material.opacity * (1 + (strokeWidth - 1) * 0.08), 0, 1);

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

    // Normalize to stable size using bounds and center at origin.
    const box = new THREE.Box3().setFromObject(tmpGroup);
    const size = new THREE.Vector3();
    box.getSize(size);

    const center = new THREE.Vector3();
    box.getCenter(center);

    // Translate all geometries so the mark is centered at (0,0,0)
    for (const m of fillMeshes) m.geom.translate(-center.x, -center.y, -center.z);

    for (const o of strokeObjects) {
      const line = o as THREE.Line;
      const g = line.geometry as THREE.BufferGeometry;
      // BufferGeometry has translate()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (g as any).translate?.(-center.x, -center.y, -center.z);
    }

    const maxDim = Math.max(size.x, size.y, size.z);
    const boundsScale = maxDim > 0 ? 4.25 / maxDim : 1;

    return { fillMeshes, strokeObjects, boundsScale };
  }, [parsed, depth]);

  useFrame((state, delta) => {
    if (!group.current) return;

    if (animate) {
      group.current.rotation.y += delta * 0.18;
      group.current.rotation.x = lerp(group.current.rotation.x, -0.12, 0.05);
      group.current.rotation.z = lerp(group.current.rotation.z, 0.06, 0.05);
    }

    const px = clamp(state.pointer.x, -0.65, 0.65);
    const py = clamp(state.pointer.y, -0.65, 0.65);
    group.current.rotation.y += px * 0.0022;
    group.current.rotation.x += -py * 0.0022;
  });

  return (
    <group
      ref={group}
      frustumCulled={false}
      scale={[boundsScale, boundsScale, boundsScale]}
      position={[0, -0.06, 0]}
    >
      <GlowDisc radius={2.4} />

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
 * TEXTURE MODE
 * Your /public/srt-logo.svg is mostly <image> content (raster-in-svg).
 * SVGLoader can’t convert <image> to vector paths, so “extrude” produces nothing.
 *
 * This mode:
 * - Renders the SVG as an alpha mask on a plane.
 * - Adds “fake depth” by stacking a few offset planes.
 * - Keeps lighting / depth feel without requiring vector paths.
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

          // Build an alpha-only mask: anything not transparent becomes solid white.
          for (let i = 0; i < d.length; i += 4) {
            const a = d[i + 3]; // alpha
            // If visible, force RGB to white and keep alpha.
            if (a > 8) {
              d[i + 0] = 255;
              d[i + 1] = 255;
              d[i + 2] = 255;
              d[i + 3] = Math.min(255, a + 30); // slightly thicken
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

  useFrame((state, delta) => {
    if (!group.current) return;

    if (animate) {
      group.current.rotation.y += delta * 0.14;
      group.current.rotation.x = lerp(group.current.rotation.x, -0.1, 0.05);
      group.current.rotation.z = lerp(group.current.rotation.z, 0.045, 0.05);
    }

    const px = clamp(state.pointer.x, -0.7, 0.7);
    const py = clamp(state.pointer.y, -0.7, 0.7);
    group.current.rotation.y += px * 0.002;
    group.current.rotation.x += -py * 0.002;
  });

  // Plane sizing: match the mark proportions
  const width = 3.6 * aspect;
  const height = 3.6;

  return (
    <group ref={group} frustumCulled={false} position={[0, -0.05, 0]}>
      <GlowDisc radius={2.45} />

      {/* If mask not ready, still show a subtle ring so users see “something” loading */}
      {!mask ? (
        <mesh frustumCulled={false} position={[0, 0, 0.05]}>
          <torusGeometry args={[1.6, 0.06, 18, 96]} />
          <meshBasicMaterial
            color={"#00f5a0"}
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ) : (
        <>
          {/* Back plates (fake thickness) */}
          {[0.14, 0.09, 0.05].map((z, idx) => (
            <mesh key={`plate-${idx}`} frustumCulled={false} position={[0, 0, -z]}>
              <planeGeometry args={[width, height]} />
              <meshStandardMaterial
                color={"#0b1116"}
                metalness={0.7}
                roughness={0.32}
                transparent
                opacity={0.75}
                alphaMap={mask}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
          ))}

          {/* Front face */}
          <mesh frustumCulled={false} position={[0, 0, 0.02]}>
            <planeGeometry args={[width, height]} />
            <meshStandardMaterial
              color={"#e9eef7"}
              emissive={"#00f5a0"}
              emissiveIntensity={0.22}
              metalness={0.55}
              roughness={0.24}
              transparent
              opacity={0.98}
              alphaMap={mask}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>

          {/* Outline glow pass */}
          <mesh frustumCulled={false} position={[0, 0, 0.06]}>
            <planeGeometry args={[width * 1.02, height * 1.02]} />
            <meshBasicMaterial
              color={"#00f5a0"}
              transparent
              opacity={0.07}
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

        // Try vector parse anyway — if this SVG is vector, we’ll use the extruded mark.
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

  // Decide render mode:
  // - If SVG contains <image> OR has too few paths, texture mode wins (ensures visibility).
  const useTextureMode = !!svgText && (!!parsed?.hasImageTag || (parsed?.paths?.length ?? 0) < 2);

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "default" }}
        camera={{ position: [0, 0.18, 7.2], fov: 32, near: 0.1, far: 120 }}
        onCreated={({ gl }) => {
          // Ensure true transparency behind the canvas (so hero background shows through)
          try {
            gl.setClearColor(0x000000, 0);
          } catch {}
        }}
      >
        <Stars count={920} />

        {/* Lighting tuned for depth */}
        <ambientLight intensity={0.52} />
        <hemisphereLight
          args={[new THREE.Color("#cfefff"), new THREE.Color("#001018"), 0.62]}
        />
        <directionalLight position={[6, 7, 10]} intensity={1.18} />
        <directionalLight position={[-7, -2, -8]} intensity={0.52} />
        <pointLight position={[0, 2.2, 6]} intensity={0.62} color={new THREE.Color("#00f5a0")} />

        <fog attach="fog" args={["#000000", 12, 26]} />

        <group scale={[scale, scale, scale]} frustumCulled={false}>
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
