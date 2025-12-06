"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeftRight } from "lucide-react";

const treatments = [
  {
    title: "Rejuvenating Facial",
    before: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=400&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Deep Tissue Massage",
    before: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=400&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=400&auto=format&fit=crop",
  },
  {
    title: "Luxury Manicure",
    before: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=400&auto=format&fit=crop",
  },
];

function BeforeAfterSlider({ title, before, after }: { title: string; before: string; after: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="group">
      <div
        ref={containerRef}
        className="relative h-80 rounded-sm overflow-hidden cursor-ew-resize select-none"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <Image
            src={after}
            alt={`${title} - After`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute bottom-4 right-4 bg-gold-500 text-white text-xs font-sans font-medium px-3 py-1 rounded-full">
            After
          </div>
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full" style={{ width: `${100 / (sliderPosition / 100)}%` }}>
            <Image
              src={before}
              alt={`${title} - Before`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="absolute bottom-4 left-4 bg-charcoal-800 text-white text-xs font-sans font-medium px-3 py-1 rounded-full">
            Before
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5 text-gold-600" />
          </div>
        </div>
      </div>

      <h4 className="font-serif text-xl text-charcoal-900 mt-4 text-center group-hover:text-gold-600 transition-colors">
        {title}
      </h4>
    </div>
  );
}

export default function BeforeAfter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-tag flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-gold-400" />
            Transformations
            <span className="w-8 h-px bg-gold-400" />
          </span>
          <h2 className="section-title mt-4">
            See The <span className="text-gradient">Results</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Drag the slider to reveal the transformation
          </p>
        </motion.div>

        {/* Before/After Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BeforeAfterSlider {...treatment} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

