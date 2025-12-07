"use client";

import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingCTA from "@/components/FloatingCTA";
import { ToastProvider } from "@/components/ToastProvider";

export default function GalleryPage() {
  return (
    <ToastProvider>
      <ScrollProgress />
      <main className="overflow-x-hidden">
        <Navbar />
        <div className="pt-24">
          <Gallery />
        </div>
        <Footer />
      </main>
      <FloatingCTA />
    </ToastProvider>
  );
}

