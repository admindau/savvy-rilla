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

function Stars({ count = 800 }: { count?: number }) {
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
        opacity: 0.62,
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
      opacity: 0.13,
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

      <mesh frustumCulled={false} renderOrder={0} scale={1.35}>
        <ringGeometry args={[radius * 0.82, radius * 1.08, 128]} />
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

function SVGMark({
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
          geom.computeVertexNormals();

          const baseColor = new THREE.Color("#e9eef7");
          const emissive = new THREE.Color("#00f5a0");

          const material = new THREE.MeshStandardMaterial({
            color: baseColor,
            metalness: 0.62,
            roughness: 0.22,
            emissive,
            emissiveIntensity: 0.28,
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

      // STROKES -> THREE.Line objects (avoid JSX <line> being treated as SVG)
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
            opacity: clamp(strokeOpacity, 0, 1) * 0.95,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });

          // Slight visual weight hint (since WebGL lineWidth is unreliable)
          material.opacity = clamp(material.opacity * (1 + (strokeWidth - 1) * 0.08), 0, 1);

          const front = new THREE.Line(geom, material);
          front.frustumCulled = false;
          front.renderOrder = 3;
          front.position.set(0, 0, 0);

          const back = new THREE.Line(geom, material);
          back.frustumCulled = false;
          back.renderOrder = 3;
          back.position.set(0, 0, depth);

          front.name = `stroke-${i}-${k}`;
          back.name = `stroke-${i}-${k}-back`;

          strokeObjects.push(front, back);
          tmpGroup.add(front);
          tmpGroup.add(back);
        });
      }
    });

    // Normalize to a stable size using bounds.
    const box = new THREE.Box3().setFromObject(tmpGroup);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const boundsScale = maxDim > 0 ? 4.35 / maxDim : 1;

    return { fillMeshes, strokeObjects, boundsScale };
  }, [parsed, depth]);

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.getElapsedTime();

    // stable motion (no drift): set absolute rotations instead of incremental adds
    const px = clamp(state.pointer.x, -0.6, 0.6);
    const py = clamp(state.pointer.y, -0.6, 0.6);

    const baseY = animate ? t * 0.12 : 0;
    const baseX = -0.12;
    const baseZ = 0.045;

    group.current.rotation.y = baseY + px * 0.14;
    group.current.rotation.x = baseX + -py * 0.10;
    group.current.rotation.z = baseZ;
  });

  // SVG failed or empty => fallback always visible
  if (!parsed?.paths?.length) {
    return (
      <group ref={group} position={[0, 0, 0]} frustumCulled={false}>
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
    <group
      ref={group}
      frustumCulled={false}
      scale={[boundsScale, boundsScale, boundsScale]}
      position={[0, -0.02, 0]}
    >
      <GlowDisc radius={2.45} />

      {fillMeshes.map(({ geom, material, key }) => (
        <mesh key={key} geometry={geom} material={material} frustumCulled={false} renderOrder={2} />
      ))}

      {strokeObjects.map((obj) => (
        <primitive key={obj.uuid} object={obj} />
      ))}
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
        camera={{ position: [0, 0.18, 8.6], fov: 30, near: 0.1, far: 140 }}
      >
        <color attach="background" args={["transparent"]} />

        <Stars count={900} />

        {/* lighting tuned for depth */}
        <ambientLight intensity={0.48} />
        <hemisphereLight
          args={[new THREE.Color("#cfefff"), new THREE.Color("#001018"), 0.72]}
        />
        <directionalLight position={[7, 8, 12]} intensity={1.35} />
        <directionalLight position={[-9, -3, -10]} intensity={0.6} />
        <pointLight position={[1.4, 2.4, 7]} intensity={0.7} color={new THREE.Color("#00f5a0")} />

        <spotLight
          position={[0, 6.5, 9]}
          angle={0.35}
          penumbra={0.9}
          intensity={0.55}
          color={new THREE.Color("#cfefff")}
          castShadow={false}
        />

        <fog attach="fog" args={["#000000", 11, 28]} />

        <group scale={[scale, scale, scale]} position={[2.15, 0.35, 0]} frustumCulled={false}>
          <SVGMark parsed={parsed} depth={depth} animate={animate} />
        </group>
      </Canvas>
    </div>
  );
}
