"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Clock, Mail, Instagram, Facebook, Sparkles, Navigation, ExternalLink, LocateFixed } from "lucide-react";
import { useToast } from "./ToastProvider";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["1122 Goffle Road", "Hawthorne, NJ 07506"],
    color: "from-rose-400 to-rose-600",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["973.310.3720"],
    color: "from-emerald-400 to-emerald-600",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["support@metrodayspa.com"],
    color: "from-violet-400 to-violet-600",
  },
];

const hours = [
  { day: "Monday", hours: "9:30 AM - 7:00 PM" },
  { day: "Tuesday", hours: "9:30 AM - 7:00 PM" },
  { day: "Wednesday", hours: "9:30 AM - 7:00 PM" },
  { day: "Thursday", hours: "9:30 AM - 7:00 PM" },
  { day: "Friday", hours: "9:30 AM - 7:00 PM" },
  { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
  { day: "Sunday", hours: "10:00 AM - 6:00 PM" },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const { showToast } = useToast();

  return (
    <section id="contact" className="relative py-32 overflow-hidden bg-charcoal-950">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-[180px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(212,175,55,0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 rounded-full mb-6 border border-gold-500/30"
          >
            <Navigation className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 font-sans text-sm tracking-wide">Find Us</span>
          </motion.div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 animate-shimmer bg-[length:200%_100%]">
              Touch
            </span>
          </h2>

          <p className="font-sans text-white/60 text-lg">
            We&apos;d love to hear from you. Visit us or reach out anytime.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid gap-4"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-gold-500/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Hover Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <div className="relative z-10 flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center shadow-lg`}>
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-white mb-1">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="font-sans text-white/60">{detail}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white">Opening Hours</h3>
                  <p className="font-sans text-sm text-gold-400">We&apos;re open for you</p>
                </div>
              </div>

              <div className="space-y-3">
                {hours.map((item) => (
                  <div
                    key={item.day}
                    className={`flex justify-between items-center py-2 px-3 rounded-lg transition-all duration-300 ${
                      today === item.day
                        ? "bg-gold-500/20 border border-gold-500/30"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <span className={`font-sans ${today === item.day ? "text-gold-400 font-medium" : "text-white/70"}`}>
                      {item.day}
                      {today === item.day && (
                        <span className="ml-2 text-xs bg-gold-500 text-white px-2 py-0.5 rounded-full">
                          Today
                        </span>
                      )}
                    </span>
                    <span className={`font-sans ${item.hours === "Closed" ? "text-rose-400" : today === item.day ? "text-white" : "text-white/50"}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-4"
            >
              {[
                { icon: Instagram, label: "Instagram", href: "#" },
                { icon: Facebook, label: "Facebook", href: "#" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-3 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-white/70 hover:text-white hover:border-gold-500/30 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                  <span className="font-sans text-sm">{social.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="sticky top-32">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Map Container */}
                <div className="aspect-[4/3] lg:aspect-square bg-charcoal-900">
                  <iframe
                    src="https://maps.google.com/maps?q=1122+Goffle+Road,+Hawthorne,+NJ+07506&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Metropolitan Day Spa Location"
                  />
                </div>

                {/* Overlay Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <div className="bg-charcoal-950/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-white text-lg mb-1">Metropolitan Day Spa</h4>
                        <p className="font-sans text-white/60 text-sm">1122 Goffle Rd, Hawthorne, NJ</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (!navigator.geolocation) {
                              showToast("Geolocation is not available", "error");
                              return;
                            }
                            navigator.geolocation.getCurrentPosition(
                              (pos) => {
                                const { latitude, longitude } = pos.coords;
                                const url = `https://www.google.com/maps/dir/${latitude},${longitude}/1122+Goffle+Rd+Hawthorne+NJ+07506`;
                                window.open(url, "_blank");
                                showToast("Opened directions from your location", "success");
                              },
                              () => showToast("Location permission denied", "error")
                            );
                          }}
                          className="flex items-center gap-2 px-3 py-2 bg-white/10 text-white rounded-full border border-white/20 text-xs"
                        >
                          <LocateFixed className="w-4 h-4" />
                          My route
                        </motion.button>
                        <motion.a
                          href="https://maps.google.com/?q=1122+Goffle+Rd+Hawthorne+NJ+07506"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white rounded-full font-sans text-sm shadow-lg"
                        >
                          <span>Directions</span>
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
