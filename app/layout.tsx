import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { WebsiteJsonLd, OrganizationJsonLd } from "@/components/json-ld"
import PostHogWrapper from "./posthog-wrapper"
import GoogleAnalytics from "@/components/google-analytics"
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
    default: "TradeLocker Brokers & Prop Firms 2025 | Compare Trading Platforms",
    template: "%s | TradeLocker Brokers"
  },
  description:
    "Discover verified brokers and prop firms using TradeLocker. Compare spreads, execution speed, funding options, and features. Your complete TradeLocker directory updated for 2025.",
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
    title: "TradeLocker Brokers & Prop Firms 2025 | Compare Trading Platforms",
    description: "Discover verified brokers and prop firms using TradeLocker. Compare spreads, execution, funding options. Your complete directory.",
    url: "https://tradelockerbrokers.com",
    siteName: "TradeLocker Brokers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TradeLocker Brokers & Prop Firms - Compare Top Trading Platforms 2025",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TradeLocker Brokers & Prop Firms 2025",
    description: "Compare verified brokers and prop firms using TradeLocker. Find your perfect trading platform.",
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
        <GoogleAnalytics />
        {/* Google Search Console Verification - Add your verification code when ready */}
        {/* <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" /> */}
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
