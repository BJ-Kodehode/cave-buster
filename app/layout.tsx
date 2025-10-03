import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { 
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
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
          <header className="flex justify-between items-center p-4 gap-4 h-16 bg-gray-900/50 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                🎬 Cave Buster
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton>
                  <button className="text-gray-300 hover:text-white transition-colors font-medium">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full font-medium text-sm h-10 px-5 transition-all">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  appearance={{
                    baseTheme: dark,
                    elements: {
                      avatarBox: "w-10 h-10",
                      userButtonPopoverCard: "bg-gray-900 border border-gray-700",
                      userButtonPopoverActions: "bg-gray-900",
                    }
                  }}
                />
              </SignedIn>
            </div>
          </header>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
