"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X, Gift, Clock, Sparkles } from "lucide-react";

export default function SpecialOffer() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    // Show popup after 3 seconds
    const showTimer = setTimeout(() => {
      const hasSeenOffer = sessionStorage.getItem("hasSeenOffer");
      if (!hasSeenOffer) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const closeOffer = () => {
    setIsVisible(false);
    sessionStorage.setItem("hasSeenOffer", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-charcoal-950/80 backdrop-blur-sm"
          onClick={closeOffer}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white rounded-sm overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={closeOffer}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
            >
              <X className="w-4 h-4 text-charcoal-700" />
            </button>

            {/* Header Image */}
            <div className="relative h-48 bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute w-64 h-64 border border-white/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute w-48 h-48 border border-white/20 rounded-full"
                />
                <Gift className="w-20 h-20 text-white relative z-10" />
              </div>
              
              {/* Sparkles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [-20, -60],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                  className="absolute"
                  style={{
                    left: `${20 + i * 15}%`,
                    bottom: "20%",
                  }}
                >
                  <Sparkles className="w-4 h-4 text-white/60" />
                </motion.div>
              ))}
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              <h3 className="font-serif text-3xl text-charcoal-900 mb-2">
                Special Offer!
              </h3>
              <p className="font-sans text-charcoal-600 mb-6">
                Get <span className="text-gold-600 font-semibold">20% OFF</span> on your first visit
              </p>

              {/* Countdown */}
              <div className="flex justify-center gap-4 mb-6">
                {[
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Minutes" },
                  { value: timeLeft.seconds, label: "Seconds" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="w-16 h-16 bg-charcoal-950 rounded-sm flex items-center justify-center mb-1">
                      <span className="font-serif text-2xl text-gold-400">
                        {item.value.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <span className="font-sans text-xs text-charcoal-500 uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Code */}
              <div className="bg-cream-50 border-2 border-dashed border-gold-300 rounded-sm p-4 mb-6">
                <p className="font-sans text-sm text-charcoal-500 mb-1">Use code</p>
                <p className="font-mono text-2xl text-gold-600 font-bold tracking-widest">
                  WELCOME20
                </p>
              </div>

              {/* CTA */}
              <a
                href="/booking"
                onClick={closeOffer}
                className="inline-block w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-sans font-semibold rounded-sm hover:from-gold-600 hover:to-gold-700 transition-all"
              >
                Book Now & Save
              </a>

              <p className="font-sans text-xs text-charcoal-400 mt-4">
                *Valid for new customers only. Cannot be combined with other offers.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

