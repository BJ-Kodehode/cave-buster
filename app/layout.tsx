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
          colorPrimary: "#D35400", // Ockra accent
          colorBackground: "#3E2723", // Mørk brun
          colorInputBackground: "rgba(62, 39, 35, 0.8)",
          colorInputText: "#F5E1A4", // Krem tekst
          colorText: "#F5E1A4",
          colorTextSecondary: "rgba(245, 225, 164, 0.7)",
          borderRadius: "12px",
        },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        >
          <header className="flex justify-between items-center p-4 gap-4 h-16 bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-[var(--accent-warm)] to-[var(--accent-cool)] bg-clip-text text-transparent">
                �‍☠️ Cave Buster
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton>
                  <button className="text-[var(--foreground)]/70 hover:text-[var(--accent-cool)] transition-colors font-medium">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="btn-primary rounded-full font-medium text-sm h-10 px-5">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  appearance={{
                    baseTheme: dark,
                    variables: {
                      colorPrimary: "#D35400",
                      colorBackground: "#3E2723",
                    },
                    elements: {
                      avatarBox: "w-10 h-10 border-2 border-[var(--accent-warm)]",
                      userButtonPopoverCard: "bg-[var(--background)] border border-[var(--border)]",
                      userButtonPopoverActions: "bg-[var(--background)]",
                    }
                  }}
                />
              </SignedIn>
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
