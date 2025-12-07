"use client";

import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingCTA from "@/components/FloatingCTA";
import { ToastProvider } from "@/components/ToastProvider";

export default function AboutPage() {
  return (
    <ToastProvider>
      <ScrollProgress />
      <main className="overflow-x-hidden">
        <Navbar />
        <div className="pt-24">
          <About />
          <Testimonials />
        </div>
        <Footer />
      </main>
      <FloatingCTA />
    </ToastProvider>
  );
}

