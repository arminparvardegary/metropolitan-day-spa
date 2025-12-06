"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Award, Users, Calendar, Sparkles, Heart, CheckCircle } from "lucide-react";

const stats = [
  { 
    icon: Calendar, 
    value: 15, 
    suffix: "+", 
    label: "Years of Excellence",
    color: "from-gold-400 to-gold-600"
  },
  { 
    icon: Users, 
    value: 10000, 
    suffix: "+", 
    label: "Happy Clients",
    color: "from-rose-400 to-rose-600"
  },
  { 
    icon: Award, 
    value: 25, 
    suffix: "+", 
    label: "Awards Won",
    color: "from-emerald-400 to-emerald-600"
  },
  { 
    icon: Heart, 
    value: 50, 
    suffix: "+", 
    label: "Expert Therapists",
    color: "from-violet-400 to-violet-600"
  },
];

const features = [
  "Certified & Licensed Therapists",
  "Premium Organic Products",
  "Personalized Treatments",
  "Luxurious Private Rooms",
  "State-of-the-art Equipment",
  "Complimentary Refreshments",
];

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const step = value / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="about" ref={containerRef} className="relative py-32 overflow-hidden bg-white">
      {/* Floating Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-gold-300 to-gold-500 blur-[150px]"
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image */}
            <motion.div style={{ y: imageY }} className="relative z-10">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop"
                  alt="Spa interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/30 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Secondary Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-10 -right-10 lg:right-auto lg:-left-10 w-2/3 z-20"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=1974&auto=format&fit=crop"
                  alt="Spa treatment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </motion.div>

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
              className="absolute top-10 right-0 lg:-right-8 z-30"
            >
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex flex-col items-center justify-center text-white shadow-xl">
                <span className="font-serif text-3xl font-bold">15+</span>
                <span className="text-xs tracking-wide">Years</span>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -left-8 w-24 h-24 border-2 border-dashed border-gold-300/50 rounded-full"
            />
          </motion.div>

          {/* Content */}
          <motion.div style={{ y: textY }} className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-100 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-gold-600" />
                <span className="text-gold-700 font-sans text-sm tracking-wide">About Us</span>
              </div>

              <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 mb-6 leading-tight">
                Where Luxury Meets{" "}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700">
                    Tranquility
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 to-gold-600 origin-left rounded-full"
                  />
                </span>
              </h2>

              <p className="font-sans text-charcoal-600 text-lg leading-relaxed mb-6">
                Nestled in the heart of New Jersey, Metropolitan Day Spa has been a sanctuary 
                of wellness since 2009. Our commitment to excellence has made us a premier 
                destination for those seeking the finest in spa treatments.
              </p>

              <p className="font-sans text-charcoal-600 leading-relaxed mb-8">
                We believe that true beauty radiates from within. Our holistic approach combines 
                ancient wisdom with modern techniques, creating transformative experiences that 
                nurture both body and soul.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-2 text-charcoal-700"
                  >
                    <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0" />
                    <span className="font-sans text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal-900 text-white rounded-full font-sans font-medium tracking-wide hover:bg-charcoal-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Discover Our Story</span>
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              <div className="relative p-8 rounded-3xl bg-cream-50 border border-cream-100 hover:border-gold-200 transition-all duration-300 overflow-hidden">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="font-serif text-4xl lg:text-5xl text-charcoal-900 mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                
                <span className="font-sans text-sm text-charcoal-600">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
