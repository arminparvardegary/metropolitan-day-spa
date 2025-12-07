"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Torus } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function RingGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    groupRef.current.rotation.y = Math.cos(t * 0.15) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Torus args={[3, 0.02, 16, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0} />
        </Torus>
      </Float>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Torus args={[4, 0.01, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial color="#F5E6C4" metalness={0.8} roughness={0.2} />
        </Torus>
      </Float>
    </group>
  );
}

export default function Rings3D() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-0 opacity-30">
      <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} intensity={1} />
        <RingGroup />
      </Canvas>
    </div>
  );
}

