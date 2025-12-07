"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin, Sparkles, Heart, ArrowUp } from "lucide-react";
import dynamic from "next/dynamic";

const Diamond3D = dynamic(() => import("./Diamond3D"), { ssr: false });

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const services = [
  "Massage Therapy",
  "Facial Treatments",
  "Body Treatments",
  "Nail Services",
  "Hair Styling",
  "Waxing",
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-charcoal-950 overflow-hidden pt-20">
      {/* 3D Diamond */}
      <Diamond3D />

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Top Decoration */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      {/* Main Footer */}
      <div className="container-custom py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-6 h-6 text-gold-400" />
                <div className="flex flex-col">
                  <span className="font-serif text-2xl text-white font-medium">Metropolitan</span>
                  <span className="font-sans text-xs tracking-[0.3em] uppercase text-gold-400">Day Spa</span>
                </div>
              </motion.div>
            </Link>
            <p className="font-sans text-white/60 leading-relaxed mb-6">
              Your sanctuary for relaxation and rejuvenation. Experience the art of wellness in the heart of New Jersey.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-gold-400 hover:bg-white/10 transition-all border border-white/10"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gold-500" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-sans text-white/60 hover:text-gold-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gold-500 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gold-500" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="font-sans text-white/60 hover:text-gold-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gold-500 group-hover:w-4 transition-all duration-300" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-gold-500" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-500 mt-1 flex-shrink-0" />
                <span className="font-sans text-white/60">
                  1122 Goffle Road<br />Hawthorne, NJ 07506
                </span>
              </li>
              <li>
                <a href="tel:9733103720" className="flex items-center gap-3 font-sans text-white/60 hover:text-gold-400 transition-colors">
                  <Phone className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  973.310.3720
                </a>
              </li>
              <li>
                <a href="mailto:support@metrodayspa.com" className="flex items-center gap-3 font-sans text-white/60 hover:text-gold-400 transition-colors">
                  <Mail className="w-5 h-5 text-gold-500 flex-shrink-0" />
                  support@metrodayspa.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-sans text-sm text-white/40 flex items-center gap-1">
              © {new Date().getFullYear()} Metropolitan Day Spa. Made with 
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline mx-1" /> 
              in New Jersey
            </p>
            
            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-white/60 hover:text-gold-400 hover:bg-white/10 transition-all text-sm font-sans border border-white/10"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
