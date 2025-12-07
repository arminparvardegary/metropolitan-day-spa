"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Loyal Client",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Metropolitan Day Spa is my absolute favorite escape! The atmosphere is so peaceful, and every treatment I've had has been exceptional. The staff truly goes above and beyond to ensure you feel pampered and relaxed.",
    service: "Massage",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Regular Visitor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "I was skeptical about spa treatments, but after my first visit here, I'm a convert. The deep tissue massage was incredible, and the aromatherapy session left me feeling rejuvenated for days.",
    service: "Massage",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "First-Time Guest",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
    text: "From the moment I walked in, I knew this was a special place. The attention to detail, the soothing ambiance, and the skilled therapists made my experience unforgettable. Already booked my next appointment!",
    service: "Facial",
  },
  {
    id: 4,
    name: "David Park",
    role: "VIP Member",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "As a member for over 3 years, I can confidently say that the quality and service at Metropolitan Day Spa is unmatched. The team remembers my preferences and always delivers a personalized experience.",
    service: "Body",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [filter, setFilter] = useState<"All" | "Massage" | "Facial" | "Body">("All");

  const filteredTestimonials = testimonials.filter(
    (t) => filter === "All" || t.service === filter
  );
  const safeTestimonials = filteredTestimonials.length ? filteredTestimonials : testimonials;

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % safeTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [safeTestimonials.length]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + safeTestimonials.length) % safeTestimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % safeTestimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-cream-50 to-white">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-gold-300/30 rounded-full blur-[200px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-400/20 rounded-full blur-[180px]"
        />
      </div>

      {/* Large Quote Mark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 0.03, scale: 1 } : {}}
        className="absolute top-20 left-1/2 -translate-x-1/2"
      >
        <Quote className="w-96 h-96 text-charcoal-900" />
      </motion.div>

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-100 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-gold-600" />
            <span className="text-gold-700 font-sans text-sm tracking-wide">Testimonials</span>
          </motion.div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal-900 mb-6">
            What Our Guests{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700">
              Say
            </span>
          </h2>

          <p className="font-sans text-charcoal-600 text-lg">
            Discover why thousands choose us for their wellness journey
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["All", "Massage", "Facial", "Body"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setFilter(item as any);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                filter === item
                  ? "bg-charcoal-900 text-white border-charcoal-900"
                  : "bg-white border-cream-200 text-charcoal-700 hover:border-gold-400"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-charcoal-700 hover:text-gold-600 hover:shadow-xl transition-all border border-cream-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </div>
          <div className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-charcoal-700 hover:text-gold-600 hover:shadow-xl transition-all border border-cream-100"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Testimonial Card */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative"
              >
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-charcoal-200/30 border border-cream-100">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Quote className="w-5 h-5 text-white" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(safeTestimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-gold-500 fill-gold-500" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="font-serif text-xl md:text-2xl text-charcoal-800 text-center leading-relaxed mb-8 italic">
                  &ldquo;{safeTestimonials[currentIndex].text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex flex-col items-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3 ring-4 ring-gold-100">
                      <Image
                      src={safeTestimonials[currentIndex].avatar}
                      alt={safeTestimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-serif text-lg text-charcoal-900 font-medium">
                    {safeTestimonials[currentIndex].name}
                    </h4>
                    <span className="font-sans text-sm text-gold-600">
                    {safeTestimonials[currentIndex].role} • {safeTestimonials[currentIndex].service}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
          {safeTestimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-gradient-to-r from-gold-500 to-gold-600"
                    : "w-2 bg-cream-300 hover:bg-gold-300"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-20 pt-10 border-t border-cream-200"
        >
          {[
            { value: "4.9", label: "Average Rating" },
            { value: "2,500+", label: "5-Star Reviews" },
            { value: "98%", label: "Would Recommend" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-serif text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700 font-medium mb-1">
                {stat.value}
              </div>
              <div className="font-sans text-sm text-charcoal-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
