"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How can I book faster?",
    a: "Hit “Quick Book” or the “Book Online” buttons on cards to prefill the form with the service and suggested times.",
  },
  {
    q: "What happens if I’m running late?",
    a: "We cover up to 10 minutes. After that, we may shorten the session to keep the next appointments on time.",
  },
  {
    q: "Which service is best for deep relaxation?",
    a: "Try the Signature Massage with aromatherapy, or the Couples package for a complete shared unwind.",
  },
  {
    q: "Can I choose my therapist?",
    a: "Yes. Add your preferred therapist in the booking form and we’ll schedule based on availability.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-28 bg-charcoal-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold-500/20 blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gold-600/10 blur-[160px]" />
      </div>
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="max-w-lg space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10">
              <HelpCircle className="w-4 h-4 text-gold-300" />
              <span className="text-xs uppercase tracking-[0.3em] text-white/80">FAQ</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl">Frequently Asked Questions</h2>
            <p className="text-white/70 leading-relaxed">
              Have questions before booking? We've answered them clearly and concisely to help you decide.
            </p>
          </div>

          <div className="flex-1 w-full space-y-3">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.q}
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="font-sans text-white text-sm md:text-base">{item.q}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className="text-white/60"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-5 text-white/70 text-sm leading-relaxed">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

