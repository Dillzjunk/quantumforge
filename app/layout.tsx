import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuantumForge \u2014 AI Application Generator",
  description:
    "Turn natural language into production-ready web & mobile apps in minutes. Cinematic terminal. Viral growth. Built for founders.",
  applicationName: "QuantumForge",
  authors: [{ name: "QuantumForge" }],
  keywords: ["AI", "app generator", "no-code", "Next.js", "React Native", "startup"],
  openGraph: {
    title: "QuantumForge \u2014 From prompt to production",
    description: "AI-powered application generator with a cinematic terminal. Ship apps in minutes, not months.",
    type: "website",
    siteName: "QuantumForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuantumForge \u2014 AI Application Generator",
    description: "From natural language to deployed apps. Cinematic terminal. Viral by design.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "QuantumForge",
  },
  formatDetection: { telephone: false },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#05050a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
