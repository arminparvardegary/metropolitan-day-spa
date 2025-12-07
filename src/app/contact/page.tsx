"use client";

import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingCTA from "@/components/FloatingCTA";
import { ToastProvider } from "@/components/ToastProvider";

export default function ContactPage() {
  return (
    <ToastProvider>
      <ScrollProgress />
      <main className="overflow-x-hidden">
        <Navbar />
        <div className="pt-24">
          <Contact />
        </div>
        <Footer />
      </main>
      <FloatingCTA />
    </ToastProvider>
  );
}

