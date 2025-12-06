"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import BeforeAfter from "@/components/BeforeAfter";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingCTA from "@/components/FloatingCTA";
import SpecialOffer from "@/components/SpecialOffer";

export default function Home() {
  return (
    <>
      {/* Loading Screen */}
      <PageLoader />
      
      {/* Custom Cursor (Desktop only) */}
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Main Content */}
      <main className="overflow-x-hidden">
        <Navbar />
        <Hero />
        <Services />
        <About />
        <BeforeAfter />
        <Testimonials />
        <Gallery />
        <Booking />
        <Contact />
        <Footer />
      </main>
      
      {/* Floating Action Button */}
      <FloatingCTA />
      
      {/* Special Offer Popup */}
      <SpecialOffer />
    </>
  );
}
