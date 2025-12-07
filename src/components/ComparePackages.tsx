"use client";

import { motion } from "framer-motion";
import { Check, ArrowUpRight, Sparkles } from "lucide-react";
import { useToast } from "./ToastProvider";

const packages = [
  {
    name: "Essential Glow",
    price: "$180",
    duration: "2 hrs",
    features: ["Signature Massage 60m", "Express Facial", "Aromatherapy", "Refreshments"],
    highlight: false,
  },
  {
    name: "Luxury Escape",
    price: "$260",
    duration: "2.5 hrs",
    features: ["Deep Tissue Massage 75m", "Diamond Facial", "Body Scrub", "Sauna Access", "Herbal Tea"],
    highlight: true,
  },
  {
    name: "Couples Retreat",
    price: "$340",
    duration: "3 hrs",
    features: ["Couples Massage 90m", "Hot Stone Upgrade", "Dual Facial", "Private Suite", "Champagne"],
    highlight: false,
  },
];

export default function ComparePackages() {
  const { showToast } = useToast();

  const handleQuickBook = (pkg: string) => {
    window.dispatchEvent(
      new CustomEvent("quick-book", {
        detail: { service: pkg, time: "Next Available" },
      })
    );
    showToast(`${pkg} added to booking`, "success");
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-gold-100 rounded-full blur-[140px]" />
      </div>
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-100 rounded-full text-gold-700 text-xs tracking-[0.25em] uppercase mb-4">
            <Sparkles className="w-4 h-4" /> Packages
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal-900 mb-4">
            Compare Our Packages
          </h2>
          <p className="text-charcoal-600">
            Detailed yet concise. Click any package to instantly add it to your booking form.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-3xl border shadow-xl p-6 flex flex-col gap-4 ${
                pkg.highlight
                  ? "border-gold-400 bg-gradient-to-b from-amber-50 to-white"
                  : "border-cream-200 bg-white"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-charcoal-900">{pkg.name}</h3>
                  <p className="text-charcoal-500 text-sm">{pkg.duration}</p>
                </div>
                <span className="font-serif text-3xl text-gold-600">{pkg.price}</span>
              </div>
              <div className="space-y-2">
                {pkg.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-charcoal-700 text-sm">
                    <Check className="w-4 h-4 text-gold-500" />
                    {feat}
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleQuickBook(pkg.name)}
                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sans font-semibold ${
                  pkg.highlight
                    ? "bg-charcoal-900 text-white"
                    : "bg-gold-500 text-charcoal-950"
                }`}
              >
                Quick Book
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

