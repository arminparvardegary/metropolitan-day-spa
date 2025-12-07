"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useState, useEffect } from "react";

export default function MinimalScene3D() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop="demand"
      >
        <Sparkles count={30} scale={10} size={2} speed={0.3} opacity={0.35} color="#D4AF37" />
      </Canvas>
    </div>
  );
}

