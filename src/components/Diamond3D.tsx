"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshRefractionMaterial, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function DiamondMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.8, 0]} />
        <meshPhysicalMaterial 
          color="#D4AF37"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

export default function Diamond3D() {
  return (
    <div className="w-40 h-40 mx-auto absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none">
      <Canvas dpr={[1, 2]} gl={{ alpha: true }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#D4AF37" />
        <Environment preset="city" />
        <DiamondMesh />
      </Canvas>
    </div>
  );
}

