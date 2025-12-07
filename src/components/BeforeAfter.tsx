"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftRight, ChevronLeft, ChevronRight } from "lucide-react";

const treatments = [
  {
    title: "Rejuvenating Facial",
    before: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=1400&auto=format&fit=crop&q=90",
    after: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1400&auto=format&fit=crop&q=90",
  },
  {
    title: "Deep Tissue Massage",
    before: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&auto=format&fit=crop&q=90",
    after: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&auto=format&fit=crop&q=90",
  },
  {
    title: "Luxury Glow Body",
    before: "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=1400&auto=format&fit=crop&q=90",
    after: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1400&auto=format&fit=crop&q=90",
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
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % treatments.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

        {/* Hero Slider */}
        <div className="relative mb-12">
          <BeforeAfterSlider {...treatments[active]} />
          <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
            <button
              onClick={() => setActive((prev) => (prev - 1 + treatments.length) % treatments.length)}
              className="pointer-events-auto w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-charcoal-800 hover:text-gold-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActive((prev) => (prev + 1) % treatments.length)}
              className="pointer-events-auto w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-charcoal-800 hover:text-gold-600"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {treatments.map((item, idx) => (
              <button
                key={item.title}
                onClick={() => setActive(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === active ? "bg-gold-500" : "bg-cream-300"}`}
              />
            ))}
          </div>
        </div>

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

