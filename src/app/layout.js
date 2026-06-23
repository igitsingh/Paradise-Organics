import { Cormorant_Garamond, Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700"],
});

const aachen = localFont({
  src: '../../public/fonts/Aachen.ttf',
  variable: '--font-aachen',
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: "Paradise Organics – Origin Matters",
  description: "A luxury cinematic 3D journey through the highlands of Meghalaya to discover The Golden Root™ – single-origin, curcumin-verified premium Lakadong turmeric.",
  keywords: "turmeric, Lakadong, organic turmeric, Meghalaya, single origin, premium spices, curcumin, organic farming, India, luxury spices",
  openGraph: {
    title: "Paradise Organics – Origin Matters",
    description: "An immersive WebGL exploration of the world's most premium single-origin Lakadong turmeric.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable} ${aachen.variable}`}>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
