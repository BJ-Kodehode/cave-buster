import { type Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { 
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        >
          <header className="bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--border)] sticky top-0 z-50">
            {/* Top navigation bar */}
            <div className="flex justify-between items-center p-4 gap-4 h-16">
              <div className="flex items-center gap-2">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-[var(--accent-warm)] to-[var(--accent-cool)] bg-clip-text text-transparent">
                    🏴‍☠️ Cave Buster
                  </h1>
                </Link>
              </div>
              
              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton>
                    <button className="text-[var(--foreground)]/70 hover:text-[var(--accent-cool)] transition-colors font-medium">
                      Logg inn
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="btn-primary rounded-full font-medium text-sm h-10 px-5">
                      Registrer deg
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>
          <div className="min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}