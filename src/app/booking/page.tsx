"use client";

import Navbar from "@/components/Navbar";
import Booking from "@/components/Booking";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingCTA from "@/components/FloatingCTA";
import { ToastProvider } from "@/components/ToastProvider";

export default function BookingPage() {
  return (
    <ToastProvider>
      <ScrollProgress />
      <main className="overflow-x-hidden">
        <Navbar />
        <div className="pt-24">
          <Booking />
          <FAQ />
        </div>
        <Footer />
      </main>
      <FloatingCTA />
    </ToastProvider>
  );
}

