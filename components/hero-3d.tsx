"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

type Hero3DProps = {
  /** Image to use as the “logo texture” (PNG recommended). */
  textureUrl?: string;

  /** disable animation (reduced motion / low power) */
  animate?: boolean;

  /** overall scale */
  scale?: number;

  /** subtle depth amount (z offset for glow layers) */
  depth?: number;

  className?: string;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function LogoScene({
  textureUrl,
  animate = true,
  scale = 1,
  depth = 0.12,
}: {
  textureUrl: string;
  animate?: boolean;
  scale?: number;
  depth?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const tex = useLoader(THREE.TextureLoader, textureUrl);

  const planeMat = useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.needsUpdate = true;

    return new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, [tex]);

  const glowMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00f5a0),
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, []);

  const ringMat = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color(0x00f5a0),
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((_, dt) => {
    if (!group.current || !animate) return;
    group.current.rotation.y += dt * 0.35;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -0.08, 0.05);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, 0.04, 0.05);
  });

  // Plane ratio: square-ish by default; you can tune if you swap assets
  const w = 2.2 * scale;
  const h = 2.2 * scale;

  return (
    <group ref={group} frustumCulled={false}>
      {/* Soft glow disc behind */}
      <mesh position={[0, 0, -depth]} frustumCulled={false}>
        <circleGeometry args={[1.45 * scale, 96]} />
        <primitive object={glowMat} attach="material" />
      </mesh>

      {/* Halo ring */}
      <mesh position={[0, 0, -depth * 1.2]} frustumCulled={false}>
        <ringGeometry args={[1.2 * scale, 1.55 * scale, 128]} />
        <primitive object={ringMat} attach="material" />
      </mesh>

      {/* The logo “card” */}
      <mesh position={[0, 0, 0]} frustumCulled={false}>
        <planeGeometry args={[w, h]} />
        <primitive object={planeMat} attach="material" />
      </mesh>

      {/* Thin rim (gives it a premium “object” feel) */}
      <mesh position={[0, 0, depth * 0.25]} frustumCulled={false}>
        <torusGeometry args={[1.1 * scale, 0.02 * scale, 18, 120]} />
        <meshBasicMaterial
          color={"#00f5a0"}
          transparent
          opacity={0.10}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

export default function Hero3D({
  textureUrl = "/logo-white.png",
  animate = true,
  scale = 1,
  depth = 0.12,
  className,
}: Hero3DProps) {
  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "default" }}
        camera={{ position: [0, 0.12, 6.2], fov: 34, near: 0.1, far: 100 }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.85} />
        <directionalLight position={[6, 6, 10]} intensity={0.75} />
        <fog attach="fog" args={["#000000", 10, 20]} />

        <LogoScene textureUrl={textureUrl} animate={animate} scale={clamp(scale, 0.7, 1.25)} depth={depth} />
      </Canvas>
    </div>
  );
}
