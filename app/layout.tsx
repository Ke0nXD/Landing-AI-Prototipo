import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "AI Landing Lab",
  description:
    "Plataforma full-stack para gerar landing pages profissionais com IA, preview editavel e marketing kit.",
  metadataBase: new URL("https://ai-landing-lab.vercel.app"),
  openGraph: {
    title: "AI Landing Lab",
    description:
      "Gere estrutura, copy, visual e marketing kit para landing pages modernas.",
    images: ["/assets/ai-landing-lab-landing-concept.png"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#050914] text-white">{children}</body>
    </html>
  );
}
