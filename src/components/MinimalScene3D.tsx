"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";

export default function MinimalScene3D() {
  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
           <Sparkles count={50} scale={10} size={2} speed={0.5} opacity={0.4} color="#D4AF37" />
        </Float>
      </Canvas>
    </div>
  );
}

