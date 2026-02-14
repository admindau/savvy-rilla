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
  /** thickness for extruded fills */
  depth?: number;
  /** disable animation (reduced motion / low power) */
  animate?: boolean;
  className?: string;
};

type ParsedSVG = {
  paths: any[];
  xml?: Document | undefined;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function Stars({ count = 900 }: { count?: number }) {
  const geom = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const rMin = 10;
    const rMax = 28;

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
        opacity: 0.5,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  return <points geometry={geom} material={mat} frustumCulled={false} />;
}

function GlowDisc({ radius = 2.6 }: { radius?: number }) {
  const mat = useMemo(() => {
    const m = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00f5a0),
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    return m;
  }, []);

  return (
    <group renderOrder={1} frustumCulled={false}>
      <mesh frustumCulled={false} renderOrder={1}>
        <circleGeometry args={[radius, 128]} />
        <primitive object={mat} attach="material" />
      </mesh>

      {/* Outer halo */}
      <mesh frustumCulled={false} renderOrder={0} scale={1.35}>
        <ringGeometry args={[radius * 0.82, radius * 1.05, 128]} />
        <meshBasicMaterial
          color={"#00f5a0"}
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function SceneRig({ children, animate = true }: { children: React.ReactNode; animate?: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!rig.current) return;

    // baseline rotation gives “alive” depth
    if (animate) {
      rig.current.rotation.y += delta * 0.14;
      rig.current.rotation.x = THREE.MathUtils.lerp(rig.current.rotation.x, -0.08, 0.05);
      rig.current.rotation.z = THREE.MathUtils.lerp(rig.current.rotation.z, 0.05, 0.05);
    }

    // subtle parallax (desktop) — makes the mark feel like it sits in space
    const px = clamp(pointer.x, -0.7, 0.7);
    const py = clamp(pointer.y, -0.7, 0.7);
    rig.current.rotation.y += px * 0.003;
    rig.current.rotation.x += -py * 0.003;
  });

  return (
    <group ref={rig} frustumCulled={false}>
      {children}
    </group>
  );
}

function SVGMark({
  parsed,
  depth = 0.22,
  animate = true,
}: {
  parsed: ParsedSVG | null;
  depth?: number;
  animate?: boolean;
}) {
  const { fills, strokes, boundsScale } = useMemo(() => {
    if (!parsed?.paths?.length) {
      return {
        fills: [] as { geom: THREE.ExtrudeGeometry; mat: THREE.MeshStandardMaterial; key: string }[],
        strokes: [] as { obj: THREE.Line; key: string }[],
        boundsScale: 1,
      };
    }

    const fills: { geom: THREE.ExtrudeGeometry; mat: THREE.MeshStandardMaterial; key: string }[] =
      [];
    const strokes: { obj: THREE.Line; key: string }[] = [];

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
          geom.computeVertexNormals();

          const mat = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#e9eef7"),
            metalness: 0.55,
            roughness: 0.22,
            emissive: new THREE.Color("#00f5a0"),
            emissiveIntensity: 0.12,
            transparent: true,
            opacity: clamp(fillOpacity, 0, 1),
            side: THREE.DoubleSide,
          });

          const key = `fill-${i}-${j}`;
          fills.push({ geom, mat, key });

          const mesh = new THREE.Mesh(geom, mat);
          mesh.frustumCulled = false;
          tmpGroup.add(mesh);
        });
      }

      // STROKES
      if (stroke && stroke !== "none" && strokeOpacity > 0.001) {
        const subPaths: any[] = p.subPaths ?? [];
        const targets = subPaths.length ? subPaths : [p];

        targets.forEach((sp: any, k: number) => {
          const pts: THREE.Vector2[] = sp.getPoints?.(240) ?? p.getPoints?.(240) ?? [];
          if (!pts?.length) return;

          const pts3 = pts.map((v) => new THREE.Vector3(v.x, -v.y, 0));
          const geom = new THREE.BufferGeometry().setFromPoints(pts3);

          const mat = new THREE.LineBasicMaterial({
            color: new THREE.Color("#00f5a0"),
            transparent: true,
            opacity: clamp(strokeOpacity, 0, 1) * 0.92,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });

          // visual weight hint (WebGL lineWidth is unreliable)
          mat.opacity = clamp(mat.opacity * (1 + (strokeWidth - 1) * 0.08), 0, 1);

          const front = new THREE.Line(geom, mat);
          front.frustumCulled = false;
          front.renderOrder = 3;
          front.position.set(0, 0, 0);

          const back = new THREE.Line(geom, mat);
          back.frustumCulled = false;
          back.renderOrder = 3;
          back.position.set(0, 0, depth);

          strokes.push({ obj: front, key: `stroke-${i}-${k}` });
          strokes.push({ obj: back, key: `stroke-${i}-${k}-back` });

          tmpGroup.add(front);
          tmpGroup.add(back);
        });
      }
    });

    // Normalize size using bounds so any SVG stays consistent.
    const box = new THREE.Box3().setFromObject(tmpGroup);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const boundsScale = maxDim > 0 ? 4.4 / maxDim : 1;

    return { fills, strokes, boundsScale };
  }, [parsed, depth]);

  // SVG failed or empty => fallback always visible
  if (!parsed?.paths?.length) {
    return (
      <group frustumCulled={false} scale={[1, 1, 1]}>
        <GlowDisc />
        <mesh frustumCulled={false} position={[0, 0, 0.02]}>
          <torusGeometry args={[1.65, 0.05, 16, 96]} />
          <meshBasicMaterial
            color={"#00f5a0"}
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    );
  }

  return (
    <SceneRig animate={animate}>
      <group
        frustumCulled={false}
        scale={[boundsScale, boundsScale, boundsScale]}
        position={[0, -0.1, 0]}
      >
        <GlowDisc radius={2.5} />

        {fills.map(({ geom, mat, key }) => (
          <mesh key={key} geometry={geom} material={mat} frustumCulled={false} renderOrder={2} />
        ))}

        {/* Avoid JSX <line> (can collide with SVG typings). Render THREE.Line directly. */}
        {strokes.map(({ obj, key }) => (
          <primitive key={key} object={obj} />
        ))}
      </group>
    </SceneRig>
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

  useEffect(() => {
    let mounted = true;

    async function run() {
      try {
        const res = await fetch(src, { cache: "force-cache" });
        if (!res.ok) throw new Error(`SVG fetch failed: ${res.status}`);
        const text = await res.text();

        const loader = new SVGLoader();
        const out = loader.parse(text) as any;

        const paths = Array.isArray(out?.paths) ? out.paths : [];
        if (!paths.length) throw new Error("SVG parsed but no paths found.");

        if (mounted) setParsed({ paths, xml: out.xml });
      } catch {
        if (mounted) setParsed(null);
      }
    }

    run();
    return () => {
      mounted = false;
    };
  }, [src]);

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "default" }}
        camera={{ position: [0.0, 0.35, 9.6], fov: 34, near: 0.1, far: 220 }}
      >
        <color attach="background" args={["transparent"]} />

        {/* Stars first (deep space) */}
        <group position={[0, 0, -10]} frustumCulled={false}>
          <Stars count={900} />
        </group>

        {/* Lighting tuned for depth */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[7, 6, 10]} intensity={1.25} />
        <directionalLight position={[-8, 3, 6]} intensity={0.55} />
        <directionalLight position={[0, -6, -10]} intensity={0.35} />

        <fog attach="fog" args={["#000000", 12, 30]} />

        {/* Place the logo slightly right so it reads as “behind the panels” */}
        <group scale={[scale, scale, scale]} position={[2.4, 0.15, 0]} frustumCulled={false}>
          <SVGMark parsed={parsed} depth={depth} animate={animate} />
        </group>
      </Canvas>
    </div>
  );
}
