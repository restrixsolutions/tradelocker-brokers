import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { WebsiteJsonLd, OrganizationJsonLd } from "@/components/json-ld"
import PostHogWrapper from "./posthog-wrapper"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tradelockerbrokers.com'),
  title: {
    default: "Top TradeLocker Brokers & Prop Firms (2025) – Compare Spreads, Execution & Funding",
    template: "%s | TradeLocker Brokers & Prop Firms"
  },
  description:
    "Curated list of brokers and prop firms that support the TradeLocker platform. Compare spreads, execution, funding, and more.",
  generator: "Next.js",
  applicationName: "TradeLocker Brokers & Prop Firms",
  referrer: "origin-when-cross-origin",
  keywords: ["TradeLocker", "forex brokers", "prop firms", "trading platform", "ECN", "spreads", "execution", "funded trading", "proprietary trading"],
  authors: [{ name: "TradeLockerBrokers.com" }],
  creator: "TradeLockerBrokers.com",
  publisher: "TradeLockerBrokers.com",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/icon.png",
    },
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Top TradeLocker Brokers & Prop Firms (2025)",
    description: "Curated list of brokers and prop firms that support the TradeLocker platform. Compare spreads, execution, funding options, and more.",
    url: "https://tradelockerbrokers.com",
    siteName: "TradeLocker Brokers & Prop Firms",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TradeLocker Brokers & Prop Firms - Compare Trading Platforms",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top TradeLocker Brokers & Prop Firms (2025)",
    description: "Curated list of brokers and prop firms that support the TradeLocker platform.",
    images: ["/og-image.png"],
    creator: "@tradelockerbrokers",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com",
  },
  category: "finance",
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
        {/* Google Search Console Verification - Replace with your actual verification code */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#6366f1" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <PostHogWrapper>
          {children}
        </PostHogWrapper>
        <Analytics />
      </body>
    </html>
  )
}
