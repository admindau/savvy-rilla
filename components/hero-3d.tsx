"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three-stdlib";

type Hero3DProps = {
  /** disable animation (reduced motion / low power) */
  animate?: boolean;
  /** public path to the svg, e.g. "/srt-logo.svg" */
  src?: string;
  /** overall scale in world units */
  scale?: number;
  /** thickness for extruded fills */
  depth?: number;
  className?: string;
};

type ParsedSVG = {
  paths: any[];
  xml?: Document | undefined;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
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
            curveSegments: 8,
          });
          geom.computeVertexNormals();

          const baseColor = new THREE.Color("#e9eef7");
          const emissive = new THREE.Color("#00f5a0");

          const material = new THREE.MeshStandardMaterial({
            color: baseColor,
            metalness: 0.45,
            roughness: 0.22,
            emissive,
            emissiveIntensity: 0.12,
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

      // STROKES (render as THREE.Line, not JSX <line>)
      if (stroke && stroke !== "none" && strokeOpacity > 0.001) {
        const subPaths: any[] = p.subPaths ?? [];
        const targets = subPaths.length ? subPaths : [p];

        targets.forEach((sp: any, k: number) => {
          const pts: THREE.Vector2[] = sp.getPoints?.(220) ?? p.getPoints?.(220) ?? [];
          if (!pts?.length) return;

          const pts3 = pts.map((v) => new THREE.Vector3(v.x, -v.y, 0));
          const geom = new THREE.BufferGeometry().setFromPoints(pts3);

          const material = new THREE.LineBasicMaterial({
            color: new THREE.Color("#00f5a0"),
            transparent: true,
            opacity: clamp(strokeOpacity, 0, 1) * 0.95,
            depthWrite: false,
          });

          // Fake “strokeWidth”
          material.opacity = clamp(material.opacity * (1 + (strokeWidth - 1) * 0.08), 0, 1);

          // Front line
          const lineFront = new THREE.Line(geom, material);
          lineFront.frustumCulled = false;
          lineFront.renderOrder = 3;
          lineFront.position.set(0, 0, 0);

          // Back line (so it never disappears on rotation)
          const lineBack = new THREE.Line(geom, material);
          lineBack.frustumCulled = false;
          lineBack.renderOrder = 3;
          lineBack.position.set(0, 0, depth);

          // Give stable names for debugging
          lineFront.name = `stroke-${i}-${k}`;
          lineBack.name = `stroke-${i}-${k}-back`;

          strokeObjects.push(lineFront, lineBack);
          tmpGroup.add(lineFront);
          tmpGroup.add(lineBack);
        });
      }
    });

    // Normalize scale using bounds
    const box = new THREE.Box3().setFromObject(tmpGroup);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const boundsScale = maxDim > 0 ? 4.4 / maxDim : 1;

    return { fillMeshes, strokeObjects, boundsScale };
  }, [parsed, depth]);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (!animate) return;
    group.current.rotation.y += delta * 0.16;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -0.1, 0.05);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, 0.06, 0.05);
  });

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
      position={[0, -0.1, 0]}
    >
      <GlowDisc radius={2.5} />

      {fillMeshes.map(({ geom, material, key }) => (
        <mesh key={key} geometry={geom} material={material} frustumCulled={false} renderOrder={2} />
      ))}

      {/* Render THREE.Line objects explicitly */}
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
        camera={{ position: [0, 0.25, 8.5], fov: 35, near: 0.1, far: 200 }}
      >
        <color attach="background" args={["transparent"]} />

        <ambientLight intensity={0.55} />
        <directionalLight position={[6, 6, 10]} intensity={1.15} />
        <directionalLight position={[-6, -3, -6]} intensity={0.45} />

        <fog attach="fog" args={["#000000", 12, 26]} />

        <group scale={[scale, scale, scale]} frustumCulled={false}>
          <SVGMark parsed={parsed} depth={depth} animate={animate} />
        </group>
      </Canvas>
    </div>
  );
}
