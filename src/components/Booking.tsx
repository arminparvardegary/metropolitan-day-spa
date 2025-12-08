"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Calendar, Clock, User, Phone, Mail, Sparkles, CheckCircle, ChevronRight, UserCheck } from "lucide-react";
import { useToast } from "./ToastProvider";
import dynamic from "next/dynamic";

const MinimalScene3D = dynamic(() => import("./MinimalScene3D"), { ssr: false });

const services = [
  "Signature Massage",
  "Luxury Facial",
  "Body Treatment",
  "Nail Artistry",
  "Hair Styling",
  "Couples Package",
];

const timeSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM",
];

export default function Booking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [formStep, setFormStep] = useState(1);
  const [therapist, setTherapist] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const saveBooking = () => {
    const booking = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      service: selectedService,
      date: selectedDate || new Date().toLocaleDateString(),
      time: selectedTime,
      therapist,
      notes,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(localStorage.getItem("spa_bookings") || "[]");
    existingBookings.push(booking);
    localStorage.setItem("spa_bookings", JSON.stringify(existingBookings));

    // Reset form
    setSelectedService("");
    setSelectedTime("");
    setSelectedDate("");
    setFormStep(1);
    setTherapist("");
    setNotes("");
    setName("");
    setPhone("");
    setEmail("");

    showToast("Booking confirmed! We'll contact you shortly.", "success");
  };

  useEffect(() => {
    const listener = (e: Event) => {
      const detail = (e as CustomEvent<{ service?: string; time?: string }>).detail || {};
      if (detail.service) setSelectedService(detail.service);
      if (detail.time) setSelectedTime(detail.time);
      setFormStep(2);
    };
    window.addEventListener("quick-book", listener as EventListener);
    return () => window.removeEventListener("quick-book", listener as EventListener);
  }, []);

  return (
    <section id="booking" className="relative py-32 overflow-hidden bg-charcoal-950">
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <MinimalScene3D />
      </div>

      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-400 rounded-full blur-[200px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-500 rounded-full blur-[180px]"
        />
      </div>

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold-900/30 rounded-full mb-6"
          >
            <Calendar className="w-4 h-4 text-gold-400" />
            <span className="text-gold-300 font-sans text-sm tracking-wide">Book Your Visit</span>
          </motion.div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Reserve Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-700">
              Escape
            </span>
          </h2>

          <p className="font-sans text-gray-300 text-lg">
            Schedule your appointment and begin your journey to relaxation
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center items-center gap-4 mb-12"
        >
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <motion.div
                animate={formStep >= step ? { scale: 1 } : { scale: 0.9 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-sans text-sm font-medium transition-all duration-300 ${
                  formStep > step
                    ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white"
                    : formStep === step
                    ? "bg-gold-500 text-charcoal-900"
                    : "bg-charcoal-700 text-gray-400"
                }`}
              >
                {formStep > step ? <CheckCircle className="w-5 h-5" /> : step}
              </motion.div>
              {step < 3 && (
                <div className={`w-16 md:w-24 h-0.5 mx-2 transition-colors duration-300 ${
                  formStep > step ? "bg-gold-500" : "bg-charcoal-700"
                }`} />
              )}
            </div>
          ))}
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-charcoal-900 rounded-3xl shadow-xl shadow-black/50 p-8 md:p-12 border border-charcoal-800">
            {/* Step 1: Select Service */}
            {formStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="font-serif text-2xl text-white mb-6">
                  Choose Your Treatment
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  {services.map((service) => (
                    <motion.button
                      key={service}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedService(service)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                        selectedService === service
                          ? "border-gold-500 bg-gold-900/20 shadow-md"
                          : "border-charcoal-700 hover:border-gold-700 bg-charcoal-800"
                      }`}
                    >
                      <Sparkles className={`w-5 h-5 mb-2 ${selectedService === service ? "text-gold-400" : "text-charcoal-500"}`} />
                      <span className={`font-sans text-sm ${selectedService === service ? "text-gold-400 font-medium" : "text-gray-300"}`}>
                        {service}
                      </span>
                    </motion.button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setSelectedService("Signature Massage");
                      setFormStep(2);
                    }}
                    className="px-4 py-2 text-sm rounded-full bg-gold-500 text-charcoal-900 flex items-center gap-2 hover:bg-gold-400 transition-colors"
                  >
                    Quick book popular massage
                  </button>
                  <button
                    onClick={() => {
                      setSelectedService("Couples Package");
                      setFormStep(2);
                    }}
                    className="px-4 py-2 text-sm rounded-full bg-charcoal-700 text-white flex items-center gap-2 hover:bg-charcoal-600 transition-colors"
                  >
                    Couples package
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Select Time */}
            {formStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                  <h3 className="font-serif text-2xl text-white mb-6">
                  Pick Your Time
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
                  {timeSlots.map((time) => (
                    <motion.button
                      key={time}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                        selectedTime === time
                          ? "border-gold-500 bg-gold-900/20 shadow-md"
                          : "border-charcoal-700 hover:border-gold-700 bg-charcoal-800"
                      }`}
                    >
                      <Clock className={`w-4 h-4 mx-auto mb-1 ${selectedTime === time ? "text-gold-400" : "text-charcoal-500"}`} />
                      <span className={`font-sans text-sm ${selectedTime === time ? "text-gold-400 font-medium" : "text-gray-300"}`}>
                        {time}
                      </span>
                    </motion.button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="px-3 py-2 rounded-full bg-rose-900/30 text-rose-400">
                    Peak time: 6:00 PM
                  </span>
                  <span className="px-3 py-2 rounded-full bg-emerald-900/30 text-emerald-400">
                    Quieter: 11:00 AM
                  </span>
                </div>
              </motion.div>
            )}

            {/* Step 3: Your Details */}
            {formStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h3 className="font-serif text-2xl text-white mb-6">
                  Your Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-charcoal-700 bg-charcoal-800 focus:border-gold-500 focus:ring-0 font-sans text-white placeholder:text-charcoal-400 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-charcoal-700 bg-charcoal-800 focus:border-gold-500 focus:ring-0 font-sans text-white placeholder:text-charcoal-400 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      required
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-charcoal-700 bg-charcoal-800 focus:border-gold-500 focus:ring-0 font-sans text-white placeholder:text-charcoal-400 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-charcoal-700 bg-charcoal-800 focus:border-gold-500 focus:ring-0 font-sans text-white placeholder:text-charcoal-400 transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
                    <input
                      type="text"
                      value={therapist}
                      onChange={(e) => setTherapist(e.target.value)}
                      placeholder="Preferred Therapist (Optional)"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-charcoal-700 bg-charcoal-800 focus:border-gold-500 focus:ring-0 font-sans text-white placeholder:text-charcoal-400 transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Notes or special requests"
                      className="w-full rounded-xl border-2 border-charcoal-700 bg-charcoal-800 focus:border-gold-500 focus:ring-0 font-sans text-white placeholder:text-charcoal-400 transition-colors px-4 py-3 min-h-[110px]"
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-charcoal-800 rounded-2xl p-6 mb-8">
                  <h4 className="font-serif text-lg text-white mb-4">Booking Summary</h4>
                  <div className="space-y-2 text-sm font-sans">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Service</span>
                      <span className="text-white font-medium">{selectedService}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Time</span>
                      <span className="text-white font-medium">{selectedTime}</span>
                    </div>
                  {therapist && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Therapist</span>
                      <span className="text-white font-medium">{therapist}</span>
                    </div>
                  )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {formStep > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormStep(formStep - 1)}
                  className="px-6 py-3 font-sans text-gray-300 hover:text-white transition-colors"
                >
                  ← Back
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (formStep < 3) {
                    setFormStep(formStep + 1);
                  } else {
                    if (!name || !email || !phone) {
                      showToast("Please fill in all required fields.", "error");
                      return;
                    }
                    saveBooking();
                  }
                }}
                disabled={
                  (formStep === 1 && !selectedService) ||
                  (formStep === 2 && !selectedTime) ||
                  (formStep === 3 && (!name || !email || !phone))
                }
                className={`ml-auto flex items-center gap-2 px-8 py-4 rounded-full font-sans font-medium tracking-wide transition-all duration-300 ${
                  ((formStep === 1 && !selectedService) || (formStep === 2 && !selectedTime) || (formStep === 3 && (!name || !email || !phone)))
                    ? "bg-charcoal-700 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {formStep === 3 ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Confirm Booking</span>
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
