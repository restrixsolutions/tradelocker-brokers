import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { WebsiteJsonLd, OrganizationJsonLd } from "@/components/json-ld"
import { DisclaimerBanner } from "@/components/disclaimer-banner"
import PostHogWrapper from "./posthog-wrapper"
import GoogleAnalytics from "@/components/google-analytics"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tradelockerbrokers.com'),
  title: {
    default: "TL Brokers | Compare Brokers & Prop Firms That Support TradeLocker",
    template: "%s | TL Brokers"
  },
  description:
    "TL Brokers is an independent directory comparing listed brokers and prop firms that support the TradeLocker platform. Compare spreads, execution speed, funding options, and features. Updated for 2025.",
  generator: "Next.js",
  applicationName: "TL Brokers",
  referrer: "origin-when-cross-origin",
  keywords: ["brokers that use TradeLocker", "forex brokers", "prop firms", "trading platform", "ECN", "spreads", "execution", "funded trading", "proprietary trading"],
  authors: [{ name: "TL Brokers" }],
  creator: "TL Brokers",
  publisher: "TL Brokers",
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
      { url: "/favicon-mark.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-mark.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-v2.ico", sizes: "any" },
    ],
    shortcut: "/favicon-mark.png",
    apple: [
      { url: "/favicon-mark.png", sizes: "180x180", type: "image/png" },
      { url: "/favicon-mark.png", sizes: "192x192", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/favicon-mark.png",
      },
      {
        rel: "mask-icon",
        url: "/favicon-mark.png",
      },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "TL Brokers | Compare Brokers & Prop Firms That Support TradeLocker",
    description: "Independent directory comparing listed brokers and prop firms that support the TradeLocker platform. Compare spreads, execution, funding options.",
    url: "https://tradelockerbrokers.com",
    siteName: "TL Brokers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TL Brokers - Compare Brokers & Prop Firms That Support TradeLocker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TL Brokers | Brokers & Prop Firms That Support TradeLocker",
    description: "Independent comparison of listed brokers and prop firms that support the TradeLocker platform.",
    images: ["/og-image.png"],
    creator: "@forexproprank",
  },
  alternates: {
    canonical: "https://tradelockerbrokers.com",
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: 'TL Brokers RSS Feed' }],
      'application/feed+json': [{ url: '/feed.json', title: 'TL Brokers JSON Feed' }],
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
        <Script
          {...({ nowprocket: true, "nitro-exclude": true } as any)}
          id="sa-dynamic-optimization"
          strategy="afterInteractive"
          data-uuid="b0300dfc-4f0e-44b7-9c09-9dfa0d605a24"
          src="data:text/javascript;base64,dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO3NjcmlwdC5zZXRBdHRyaWJ1dGUoIm5vd3Byb2NrZXQiLCAiIik7c2NyaXB0LnNldEF0dHJpYnV0ZSgibml0cm8tZXhjbHVkZSIsICIiKTtzY3JpcHQuc3JjID0gImh0dHBzOi8vZGFzaGJvYXJkLnNlYXJjaGF0bGFzLmNvbS9zY3JpcHRzL2R5bmFtaWNfb3B0aW1pemF0aW9uLmpzIjtzY3JpcHQuZGF0YXNldC51dWlkID0gImIwMzAwZGZjLTRmMGUtNDRiNy05YzA5LTlkZmEwZDYwNWEyNCI7c2NyaXB0LmlkID0gInNhLWR5bmFtaWMtb3B0aW1pemF0aW9uLWxvYWRlciI7ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpOw=="
        />
        
        {/* Critical SEO Meta Tags - Explicit for crawler detection */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="TL Brokers is an independent directory comparing listed brokers and prop firms that support the TradeLocker platform. Compare spreads, execution speed, funding options, and features. Updated for 2025." />
        <meta name="keywords" content="brokers that use TradeLocker, forex brokers, prop firms, trading platform, ECN, spreads, execution, funded trading, proprietary trading" />
        <meta name="author" content="TL Brokers" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Open Graph Protocol - Explicit for social media crawlers */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TL Brokers | Compare Brokers & Prop Firms That Support TradeLocker" />
        <meta property="og:description" content="Independent directory comparing listed brokers and prop firms that support the TradeLocker platform. Compare spreads, execution, funding options." />
        <meta property="og:url" content="https://tradelockerbrokers.com" />
        <meta property="og:site_name" content="TL Brokers" />
        <meta property="og:image" content="https://tradelockerbrokers.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="TL Brokers - Compare Brokers & Prop Firms That Support TradeLocker" />
        
        {/* Twitter Card - Explicit for Twitter crawler */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@forexproprank" />
        <meta name="twitter:creator" content="@forexproprank" />
        <meta name="twitter:title" content="TL Brokers | Brokers & Prop Firms That Support TradeLocker" />
        <meta name="twitter:description" content="Independent comparison of listed brokers and prop firms that support the TradeLocker platform." />
        <meta name="twitter:image" content="https://tradelockerbrokers.com/og-image.png" />
        
        {/* Canonical URL - Explicit for SEO */}
        <link rel="canonical" href="https://tradelockerbrokers.com" />
        
        {/* Google Search Console Verification - Add your verification code when ready */}
        {/* <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" /> */}
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#0f766e" />
        <meta name="msapplication-TileColor" content="#0f766e" />
        <meta name="msapplication-TileImage" content="/favicon-mark.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="TL Brokers" />
        
        {/* Structured Data Feeds */}
        <link rel="alternate" type="application/rss+xml" title="TL Brokers RSS Feed" href="/feed.xml" />
        <link rel="alternate" type="application/feed+json" title="TL Brokers JSON Feed" href="/feed.json" />
        
        {/* Icons and Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-mark.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-mark.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-mark.png" />
        <link rel="shortcut icon" href="/favicon-v2.ico" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <DisclaimerBanner />
        <PostHogWrapper>
          {children}
        </PostHogWrapper>
        <Analytics />
      </body>
    </html>
  )
}
