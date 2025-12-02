import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Amparo Cardoso Bosch | Full-Stack Developer",
  description:
    "Full Stack Developer con +3 años construyendo apps web escalables en PERN/MERN. Especializada en React, Next.js, Node.js, TypeScript y bases de datos SQL/NoSQL.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "PostgreSQL",
    "MongoDB",
    "Argentina",
    "Desarrolladora Web",
  ],
  authors: [{ name: "Amparo Cardoso Bosch" }],
  creator: "Amparo Cardoso Bosch",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://amparo-cardoso-bosch.vercel.app",
    title: "Amparo Cardoso Bosch | Full-Stack Developer",
    description:
      "Full Stack Developer con +3 años construyendo apps web escalables. React, Next.js, Node.js, TypeScript.",
    siteName: "Amparo Cardoso Bosch Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amparo Cardoso Bosch | Full-Stack Developer",
    description: "Full Stack Developer con +3 años construyendo apps web escalables.",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#0f0f17",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
