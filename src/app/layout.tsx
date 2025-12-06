import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Metropolitan Day Spa | Luxury Wellness Experience in Hawthorne, NJ",
  description:
    "Experience ultimate relaxation and rejuvenation at Metropolitan Day Spa. Premium massage therapy, facials, body treatments, and nail services in an upscale, friendly atmosphere.",
  keywords: [
    "day spa",
    "massage",
    "facial",
    "wellness",
    "Hawthorne NJ",
    "relaxation",
    "spa treatments",
  ],
  openGraph: {
    title: "Metropolitan Day Spa",
    description: "Your sanctuary of serenity and wellness",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${montserrat.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}

