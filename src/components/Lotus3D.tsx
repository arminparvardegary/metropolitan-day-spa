"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function LotusMesh() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
  });

  return (
    <group ref={ref}>
      {[...Array(5)].map((_, i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 5, 0]}>
          <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 3]}>
            <coneGeometry args={[0.6, 2.5, 32]} />
            <MeshDistortMaterial
              color="#F5E6C4"
              emissive="#D4AF37"
              emissiveIntensity={0.1}
              distort={0.4}
              speed={1.5}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        </group>
      ))}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function Lotus3D() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-0 opacity-60">
      <Canvas dpr={[1, 2]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <LotusMesh />
        </Float>
      </Canvas>
    </div>
  );
}

