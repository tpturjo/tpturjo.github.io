import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
  adjustFontFallback: true,
  variable: "--font-newsreader",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Tridib Paul Turjo - Software Developer & Applied AI",
  description: "Software Developer · Applied AI & Research Systems",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
