import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
// app/layout.tsx
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

// Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Only one metadata declaration
export const metadata: Metadata = {
  title: "Emgo Farms",
  description: "Professional Agriculture Solutions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-white text-gray-800 font-sans flex flex-col">
        {/* Navbar is a client component */}
        <Navbar />

        {/* Main content */}
        <main className="grow mt-18">{children}</main>

        {/* Footer is a client component */}
        <Footer />
      </body>
    </html>
  );
}
