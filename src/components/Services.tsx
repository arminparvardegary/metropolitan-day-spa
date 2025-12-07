"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { ArrowUpRight, Star, Clock, Sparkles, Crown, Zap, Filter } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Signature Massage",
    subtitle: "Deep Tissue & Relaxation",
    description: "Experience our renowned massage therapy combining ancient techniques with modern wellness",
    duration: "60-90 min",
    price: 120,
    rating: 4.9,
    reviews: 324,
    popular: true,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000",
    gradient: "from-amber-500 to-orange-600",
    category: "Massage",
  },
  {
    id: 2,
    title: "Diamond Facial",
    subtitle: "Anti-Aging & Glow",
    description: "Premium facial treatment using diamond-infused serums for ultimate radiance",
    duration: "75 min",
    price: 180,
    rating: 5.0,
    reviews: 256,
    popular: true,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000",
    gradient: "from-rose-500 to-pink-600",
    category: "Facial",
  },
  {
    id: 3,
    title: "Body Sculpting",
    subtitle: "Detox & Rejuvenate",
    description: "Full body wrap and sculpting treatment for complete renewal and detoxification",
    duration: "90 min",
    price: 200,
    rating: 4.8,
    reviews: 198,
    popular: false,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000",
    gradient: "from-emerald-500 to-teal-600",
    category: "Body",
  },
  {
    id: 4,
    title: "Luxury Manicure",
    subtitle: "Nail Art & Care",
    description: "Indulgent hand treatment with premium polish and expert nail artistry",
    duration: "60 min",
    price: 85,
    rating: 4.9,
    reviews: 412,
    popular: false,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000",
    gradient: "from-violet-500 to-purple-600",
    category: "Nails",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "popular" | "rating" | "price">("all");

  const filtered = useMemo(() => {
    let list = services.filter((s) =>
      `${s.title} ${s.subtitle} ${s.category}`.toLowerCase().includes(search.toLowerCase())
    );
    if (filter === "popular") list = list.filter((s) => s.popular);
    if (filter === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (filter === "price") list = [...list].sort((a, b) => a.price - b.price);
    return list;
  }, [search, filter]);

  return (
    <section id="services" className="relative py-32 bg-cream-50 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-gold-200/40 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gold-300/30 rounded-full blur-[120px]" />
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-charcoal-900 rounded-full mb-8"
          >
            <Zap className="w-4 h-4 text-gold-400" />
            <span className="text-gold-400 font-sans text-sm tracking-widest uppercase">
              Our Treatments
            </span>
          </motion.div>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-charcoal-900 mb-6">
            Curated{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700">
                Experiences
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 to-gold-600 origin-left"
              />
            </span>
          </h2>

          <p className="font-sans text-xl text-charcoal-600">
            Each service is a journey, meticulously designed for your transformation
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between mb-10">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Quick search services or category (e.g. Massage, Facial)"
              className="w-full rounded-2xl border border-cream-200 bg-white px-4 py-3 pl-11 font-sans text-sm focus:border-gold-500 focus:outline-none shadow-sm"
            />
            <Filter className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All" },
              { key: "popular", label: "Most Popular" },
              { key: "rating", label: "Top Rated" },
              { key: "price", label: "Lower Price" },
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => setFilter(btn.key as any)}
                className={`px-4 py-2 rounded-full text-sm font-sans border transition-all ${
                  filter === btn.key
                    ? "bg-charcoal-900 text-white border-charcoal-900"
                    : "bg-white border-cream-200 text-charcoal-700 hover:border-gold-400"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onMouseEnter={() => setActiveCard(service.id)}
              onMouseLeave={() => setActiveCard(null)}
              className="group relative"
            >
              <div className={`relative h-[500px] rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-700 ${activeCard === service.id ? 'shadow-2xl shadow-charcoal-400/20' : 'shadow-xl'}`}>
                {/* Background Image */}
                <motion.div
                  animate={activeCard === service.id ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </motion.div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity`} />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  {/* Top Badges */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                    {service.popular && (
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full"
                      >
                        <Crown className="w-4 h-4 text-charcoal-950" />
                        <span className="text-charcoal-950 font-sans text-xs font-bold uppercase tracking-wide">
                          Most Popular
                        </span>
                      </motion.div>
                    )}
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full ml-auto">
                      <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                      <span className="text-white font-sans text-sm font-medium">
                        {service.rating}
                      </span>
                      <span className="text-white/60 text-sm">({service.reviews})</span>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div>
                    <motion.div
                      animate={activeCard === service.id ? { y: 0, opacity: 1 } : { y: 0, opacity: 1 }}
                      className="mb-4"
                    >
                      <span className="font-sans text-gold-400 text-sm tracking-widest uppercase mb-2 block">
                        {service.subtitle}
                      </span>
                      <h3 className="font-serif text-4xl text-white mb-3">
                        {service.title}
                      </h3>
                      <p className="font-sans text-white/70 leading-relaxed max-w-sm">
                        {service.description}
                      </p>
                    </motion.div>

                    {/* Info Row */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/10">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-white/60">
                          <Clock className="w-4 h-4" />
                          <span className="font-sans text-sm">{service.duration}</span>
                        </div>
                      <div className="font-serif text-2xl text-gold-400">${service.price}</div>
                      </div>

                      <motion.a
                        href="/booking"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center group/btn"
                      >
                        <ArrowUpRight className="w-6 h-6 text-charcoal-900 group-hover/btn:rotate-45 transition-transform" />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Number */}
                <motion.div
                  animate={activeCard === service.id ? { opacity: 0.05, scale: 1.2 } : { opacity: 0, scale: 1 }}
                  className="absolute top-10 right-10 font-serif text-[200px] text-white font-bold leading-none pointer-events-none"
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="/booking"
            className="group inline-flex items-center gap-4 px-10 py-5 bg-charcoal-900 text-white rounded-full font-sans font-bold tracking-wide hover:bg-charcoal-800 transition-colors shadow-xl hover:shadow-2xl"
          >
            <span>Explore All Treatments</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
