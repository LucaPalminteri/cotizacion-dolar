import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "cyan" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export const metadata: Metadata = {
  title: "Cotización del Dólar",
  description:
    "Consulta los tipos de cambio del dólar en Argentina, incluyendo el dólar oficial, blue, MEP, contado con liquidación y más. Información actualizada en tiempo real.",
  keywords: [
    "Tipo de cambio",
    "Dólar Argentina",
    "Dólar Blue",
    "Dólar Oficial",
    "Dólar MEP",
    "Dólar CCL",
    "Economía Argentina",
    "Finanzas",
    "Conversión de Moneda",
  ],
  authors: [
    {
      name: "Luca Palminteri",
      url: "https://github.com/LucaPalminteri",
    },
  ],
  openGraph: {
    title: "Cotización del Dólar",
    description:
      "Consulta los tipos de cambio del dólar en Argentina, incluyendo el dólar oficial, blue, MEP, contado con liquidación y más. Información actualizada en tiempo real.",
    type: "website",
    siteName: "Cambio Dólar Argentina",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cotización del Dólar",
    description:
      "Consulta los tipos de cambio del dólar en Argentina, incluyendo el dólar oficial, blue, MEP, contado con liquidación y más. Información actualizada en tiempo real.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
