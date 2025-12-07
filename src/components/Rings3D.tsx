"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Torus } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function RingGroup() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.08;
    groupRef.current.rotation.y = Math.cos(t * 0.1) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Torus args={[3, 0.02, 8, 48]} rotation={[Math.PI / 2.5, 0, 0]}>
          <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} />
        </Torus>
      </Float>
      <Float speed={1} rotationIntensity={0.8} floatIntensity={0.8}>
        <Torus args={[4, 0.01, 8, 48]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial color="#F5E6C4" metalness={0.7} roughness={0.3} />
        </Torus>
      </Float>
    </group>
  );
}

export default function Rings3D() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-0 opacity-30">
      <Canvas
        dpr={1}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        frameloop="demand"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[0, 0, 5]} intensity={1} />
        <RingGroup />
      </Canvas>
    </div>
  );
}

