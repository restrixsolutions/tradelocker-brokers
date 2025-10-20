import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { WebsiteJsonLd, OrganizationJsonLd } from "@/components/json-ld"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Top TradeLocker Brokers & Prop Firms (2025) – Compare Spreads, Execution & Funding",
  description:
    "Curated list of brokers and prop firms that support the TradeLocker platform. Compare spreads, execution, funding, and more.",
  generator: "v0.app",
  keywords: ["TradeLocker", "forex brokers", "prop firms", "trading platform", "ECN", "spreads", "execution"],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Top TradeLocker Brokers & Prop Firms (2025)",
    description: "Curated list of brokers and prop firms that support the TradeLocker platform.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top TradeLocker Brokers & Prop Firms (2025)",
    description: "Curated list of brokers and prop firms that support the TradeLocker platform.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <WebsiteJsonLd />
        <OrganizationJsonLd />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
