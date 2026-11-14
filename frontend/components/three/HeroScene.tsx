"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Core() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.25;
    // gentle parallax toward the pointer
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.35,
      0.05
    );
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      state.pointer.x * 0.25,
      0.05
    );
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[1.2, 2]} />
          <MeshDistortMaterial
            color="#1e6fd9"
            distort={0.38}
            speed={1.5}
            roughness={0.12}
            metalness={0.55}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.75, 1]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

function Rings() {
  const a = useRef<THREE.Mesh>(null!);
  const b = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    a.current.rotation.z += delta * 0.35;
    b.current.rotation.z -= delta * 0.25;
  });

  return (
    <>
      <mesh ref={a} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <torusGeometry args={[2.35, 0.012, 16, 160]} />
        <meshBasicMaterial color="#0b2a5b" transparent opacity={0.55} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 3, -0.5, 0]}>
        <torusGeometry args={[2.75, 0.01, 16, 160]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} />
      </mesh>
    </>
  );
}

function Particles({ count = 900 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += delta * 0.015;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#1e6fd9"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 5, 5]} intensity={1.4} />
      <pointLight position={[-4, -2, 3]} intensity={18} color="#22d3ee" />
      <Core />
      <Rings />
      <Particles />
    </Canvas>
  );
}