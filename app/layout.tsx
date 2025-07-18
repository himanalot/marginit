import type { Metadata } from "next";
import { Inter, Be_Vietnam_Pro } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: "MarginIt - The Finance Platform for Students",
  description: "Join the waitlist for the social trading platform that connects student traders worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider waitlistUrl="/">
      <html lang="en">
        <body
          className={`${inter.variable} ${beVietnamPro.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
