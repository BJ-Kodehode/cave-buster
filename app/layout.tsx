import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cave Buster - Movie Review Platform",
  description: "A full-stack movie review platform where film enthusiasts share their passion – Rate, review, and discover cinema!",
  keywords: ["movies", "reviews", "cinema", "film", "rating"],
  authors: [{ name: "Cave Buster Team" }],
  openGraph: {
    title: "Cave Buster - Movie Review Platform",
    description: "Rate, review, and discover cinema with fellow film enthusiasts",
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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#000000",
          colorInputBackground: "#1f2937",
          colorInputText: "#ffffff",
        },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
        >
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
