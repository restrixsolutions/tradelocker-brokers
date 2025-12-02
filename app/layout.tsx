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
    icon: [
      { url: "/tradelocker-favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/tradelocker-favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/tradelocker-favicon.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/tradelocker-favicon.png", sizes: "192x192", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.png",
      },
      {
        rel: "mask-icon",
        url: "/tradelocker-favicon.png",
      },
    ],
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
    creator: "@forexproprank",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com",
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: 'TradeLocker Brokers RSS Feed' }],
      'application/feed+json': [{ url: '/feed.json', title: 'TradeLocker Brokers JSON Feed' }],
    },
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
        
        {/* Critical SEO Meta Tags - Explicit for crawler detection */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Discover verified brokers and prop firms using TradeLocker. Compare spreads, execution speed, funding options, and features. Your complete TradeLocker directory updated for 2025." />
        <meta name="keywords" content="TradeLocker, forex brokers, prop firms, trading platform, ECN, spreads, execution, funded trading, proprietary trading" />
        <meta name="author" content="TradeLockerBrokers.com" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Open Graph Protocol - Explicit for social media crawlers */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TradeLocker Brokers & Prop Firms 2025 | Compare Trading Platforms" />
        <meta property="og:description" content="Discover verified brokers and prop firms using TradeLocker. Compare spreads, execution, funding options. Your complete directory." />
        <meta property="og:url" content="https://tradelockerbrokers.com" />
        <meta property="og:site_name" content="TradeLocker Brokers" />
        <meta property="og:image" content="https://tradelockerbrokers.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="TradeLocker Brokers & Prop Firms - Compare Top Trading Platforms 2025" />
        
        {/* Twitter Card - Explicit for Twitter crawler */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@forexproprank" />
        <meta name="twitter:creator" content="@forexproprank" />
        <meta name="twitter:title" content="TradeLocker Brokers & Prop Firms 2025" />
        <meta name="twitter:description" content="Compare verified brokers and prop firms using TradeLocker. Find your perfect trading platform." />
        <meta name="twitter:image" content="https://tradelockerbrokers.com/og-image.png" />
        
        {/* Canonical URL - Explicit for SEO */}
        <link rel="canonical" href="https://tradelockerbrokers.com" />
        
        {/* Google Search Console Verification - Add your verification code when ready */}
        {/* <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" /> */}
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-TileImage" content="/tradelocker-favicon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="TradeLocker Brokers" />
        
        {/* Structured Data Feeds */}
        <link rel="alternate" type="application/rss+xml" title="TradeLocker Brokers RSS Feed" href="/feed.xml" />
        <link rel="alternate" type="application/feed+json" title="TradeLocker Brokers JSON Feed" href="/feed.json" />
        
        {/* Icons and Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" sizes="32x32" href="/tradelocker-favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/tradelocker-favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
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
