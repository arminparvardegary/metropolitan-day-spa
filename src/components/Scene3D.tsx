"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function FloatingCrystal() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={2.5}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#F5E6C4"
          emissive="#D4AF37"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
          distort={0.3}
          speed={1}
        />
      </mesh>
    </Float>
  );
}

function GoldenParticles() {
  return (
    <Sparkles
      count={50}
      scale={10}
      size={3}
      speed={0.3}
      opacity={0.5}
      color="#FFD700"
    />
  );
}

export default function Scene3D() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay rendering for better initial page load
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 8], fov: 50 }}
        frameloop="demand"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#D4AF37" />

        <group position={[3.5, -0.5, 0]}>
          <FloatingCrystal />
        </group>

        <GoldenParticles />
      </Canvas>
    </div>
  );
}

