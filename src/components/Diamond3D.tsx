"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function DiamondMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.003;
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <octahedronGeometry args={[1.8, 0]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

export default function Diamond3D() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="w-40 h-40 mx-auto absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none">
      <Canvas
        dpr={1}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        frameloop="demand"
      >
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <DiamondMesh />
      </Canvas>
    </div>
  );
}

