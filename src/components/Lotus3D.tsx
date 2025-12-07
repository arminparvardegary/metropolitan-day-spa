"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function LotusMesh() {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });

  return (
    <group ref={ref}>
      {[...Array(5)].map((_, i) => (
        <group key={i} rotation={[0, (i * Math.PI * 2) / 5, 0]}>
          <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 3]}>
            <coneGeometry args={[0.6, 2.5, 8]} />
            <meshStandardMaterial
              color="#F5E6C4"
              emissive="#D4AF37"
              emissiveIntensity={0.15}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        </group>
      ))}
      <mesh>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function Lotus3D() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-0 opacity-60">
      <Canvas
        dpr={1}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        frameloop="demand"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <LotusMesh />
        </Float>
      </Canvas>
    </div>
  );
}

