"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera, Environment, Stars, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function FloatingCrystal() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.25;
  });

  return (
    <Float
      speed={2} 
      rotationIntensity={1.5} 
      floatIntensity={2} 
    >
      <mesh ref={meshRef} scale={2.5}>
        <icosahedronGeometry args={[1, 1]} /> 
        <MeshDistortMaterial
          color="#F5E6C4" 
          emissive="#D4AF37"
          emissiveIntensity={0.2}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.9}
          roughness={0.1}
          distort={0.4} 
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

function GoldenParticles() {
  return (
    <Sparkles 
      count={150} 
      scale={12} 
      size={4} 
      speed={0.4} 
      opacity={0.6} 
      color="#FFD700" 
    />
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <Environment preset="city" />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#ffffff" />
        <spotLight position={[-5, -5, -5]} intensity={1.5} color="#D4AF37" />

        <group position={[3.5, -0.5, 0]}>
           <FloatingCrystal />
        </group>
        
        <GoldenParticles />
      </Canvas>
    </div>
  );
}

