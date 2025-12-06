"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Sparkles, Star, Play, ArrowRight, Diamond } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const floatingImages = [
  { src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=400", delay: 0 },
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400", delay: 0.2 },
  { src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=400", delay: 0.4 },
];

export default function Hero() {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden bg-charcoal-950"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      {/* Gradient Orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-1/4 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gold-500/20 to-transparent blur-[120px]"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0]
        }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-tl from-gold-600/15 to-transparent blur-[150px]"
      />

      {/* Floating Sparkles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold-400 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0,
          }}
          animate={{
            y: [null, "-100vh"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Content Container */}
      <motion.div style={{ opacity }} className="relative z-20 container-custom py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-gold-500/20 to-gold-600/10 rounded-full border border-gold-500/30 mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Diamond className="w-4 h-4 text-gold-400" />
              </motion.div>
              <span className="text-gold-400 font-sans text-sm tracking-widest uppercase">
                Premium Wellness Destination
              </span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-gold-400 fill-gold-400" />
                ))}
              </div>
            </motion.div>

            {/* Main Title with Reveal Animation */}
            <div className="space-y-2 mb-8">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-white font-light tracking-tight"
                >
                  Elevate
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tight"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600">
                    Your Soul
                  </span>
                </motion.h1>
              </div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="font-sans text-xl text-white/60 max-w-lg mb-10 leading-relaxed"
            >
              Step into a realm where ancient healing meets modern luxury. 
              Every moment is crafted to transform your wellness journey.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap gap-4"
            >
              {/* Primary CTA */}
              <Link
                href="#booking"
                className="group relative inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-950 font-sans font-bold tracking-wide rounded-full overflow-hidden shadow-2xl shadow-gold-500/30 hover:shadow-gold-500/50 transition-shadow"
              >
                <span className="relative z-10">Begin Your Journey</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
                <motion.span
                  className="absolute inset-0 bg-white"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                  style={{ opacity: 0.2 }}
                />
              </Link>

              {/* Secondary CTA */}
              <button className="group flex items-center gap-4 px-6 py-5 text-white/80 font-sans font-medium hover:text-white transition-colors">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-white/20 group-hover:border-gold-400/50 transition-all"
                >
                  <Play className="w-5 h-5 fill-current ml-1" />
                </motion.div>
                <span>Watch Experience</span>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex gap-10 mt-16 pt-10 border-t border-white/10"
            >
              {[
                { value: "15+", label: "Years Excellence" },
                { value: "10K+", label: "Happy Clients" },
                { value: "4.9", label: "Star Rating" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="font-serif text-4xl text-gold-400 mb-1">{stat.value}</div>
                  <div className="font-sans text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Image Composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative hidden lg:block"
          >
            {/* Main Image */}
            <motion.div
              style={{
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              className="relative z-10"
            >
              <div className="relative w-full aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1000"
                  alt="Luxury spa experience"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 to-transparent" />
              </div>

              {/* Decorative Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 border border-dashed border-gold-500/30 rounded-[4rem]"
              />
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute -left-20 top-20 z-20"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-serif text-white text-lg">50+ Treatments</div>
                    <div className="font-sans text-white/60 text-sm">Customized for you</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="absolute -right-10 bottom-32 z-20"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl p-5 shadow-xl shadow-gold-500/30"
              >
                <div className="text-charcoal-950">
                  <div className="font-serif text-2xl font-bold">Open Today</div>
                  <div className="font-sans text-sm opacity-80">10 AM - 8 PM</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <Link
          href="#services"
          className="flex flex-col items-center gap-3 text-white/40 hover:text-gold-400 transition-colors group"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-8 h-12 border-2 border-current rounded-full flex justify-center pt-2 group-hover:border-gold-400 transition-colors">
              <motion.div
                animate={{ y: [0, 16, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-3 bg-current rounded-full group-hover:bg-gold-400"
              />
            </div>
          </motion.div>
          <span className="font-sans text-xs tracking-[0.3em] uppercase">Explore</span>
        </Link>
      </motion.div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
    </section>
  );
}
