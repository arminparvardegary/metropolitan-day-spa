"use client";

import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import ComparePackages from "@/components/ComparePackages";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingCTA from "@/components/FloatingCTA";
import { ToastProvider } from "@/components/ToastProvider";

export default function ServicesPage() {
  return (
    <ToastProvider>
      <ScrollProgress />
      <main className="overflow-x-hidden">
        <Navbar />
        <div className="pt-24">
          <Services />
          <ComparePackages />
        </div>
        <Footer />
      </main>
      <FloatingCTA />
    </ToastProvider>
  );
}

