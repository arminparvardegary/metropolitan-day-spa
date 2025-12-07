"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, X, Copy, Sparkles } from "lucide-react";
import { useToast } from "./ToastProvider";

export default function PromoBar() {
  const [visible, setVisible] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("promo-bar-hidden");
    if (stored === "true") setVisible(false);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("GLOW15");
    showToast("Promo code copied: GLOW15", "success");
  };

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("promo-bar-hidden", "true");
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-charcoal-950 to-charcoal-900 text-white"
      >
        <div className="container-custom py-3 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Tag className="w-4 h-4 text-gold-300" />
            </div>
            <div>
              <div className="font-semibold tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-300" />
                Today only: 15% off
              </div>
              <p className="text-white/70 text-xs">Code: GLOW15 — online booking until end of day</p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 transition-colors text-white/90 text-xs"
            >
              <Copy className="w-4 h-4" />
              Copy code
            </button>
            <button
              onClick={handleClose}
              aria-label="Dismiss promo"
              className="p-2 text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

