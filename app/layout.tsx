import type { Metadata } from "next";
import { FrescoFoodProvider } from "context";
import { Fira_Sans } from "next/font/google";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

import "./globals.css";

export const metadata: Metadata = {
  title: "Fresco Foods",
  description: "Generated by create next app",
};

const firaSans = Fira_Sans({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={firaSans.className}>
      <body className="min-h-screen flex flex-col justify-between">
        <header className="sticky top-0 z-10">
          <Navbar />
        </header>
        <FrescoFoodProvider>{children}</FrescoFoodProvider>
        <Footer />
      </body>
    </html>
  );
}
