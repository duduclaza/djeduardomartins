import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/providers/SessionProvider";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

export const metadata: Metadata = {
  title: "DJ EDUARDO MARTINS | Tribal House & Pop House",
  description:
    "DJ Eduardo Martins — tribal house e pop house para a pista. Ouça, baixe e acompanhe as produções de Eduardo Martins, com 16 anos de carreira em casas noturnas de Minas Gerais e São Paulo, voltado ao público LGBTQIA+.",
  metadataBase: new URL("https://djeduardoclaza.com"),
  openGraph: {
    title: "DJ EDUARDO MARTINS",
    description: "Tribal House & Pop House — Pride Edition",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${orbitron.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SessionProvider>
          <ScrollProgress />
          <CursorGlow />
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
