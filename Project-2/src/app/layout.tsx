import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emperor Smart Solutions | Modern Web Development & Digital Solutions",
  description: "Custom, responsive and high-performing websites that turn visitors into customers. Smart ideas, powerful solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="font-sans bg-[#FBF8F1] text-[#1F2421] antialiased selection:bg-[#B88E44] selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
