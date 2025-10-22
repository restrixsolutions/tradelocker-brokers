// Centralized SEO configuration
export const SITE_URL = 'https://tradelockerbrokers.com'
export const BRAND = 'TradeLocker Brokers'
export const DEFAULT_DESC = 'Compare brokers and prop firms that integrate with the TradeLocker trading platform.'

// Social media handles
export const SOCIAL = {
  medium: 'https://medium.com/@forexproprank',
  linkedin: 'https://www.linkedin.com/in/forexproprank',
  twitter: 'https://twitter.com/forexproprank',
  parent: 'https://forexpotrank.com'
}

// Default OG image
export const OG_IMAGE = '/og-image.png'

// Helper function to generate absolute URLs
export function absoluteUrl(path: string): string {
  // Ensure path starts with /
  if (!path.startsWith('/')) {
    path = `/${path}`
  }
  return `${SITE_URL}${path}`
}

// SEO keywords
export const KEYWORDS = {
  main: [
    'TradeLocker brokers',
    'TradeLocker prop firms',
    'TradeLocker compatible platforms',
    'TradeLocker trading',
    'best TradeLocker brokers',
    'TradeLocker forex brokers'
  ],
  brokers: [
    'TradeLocker brokers',
    'forex brokers',
    'ECN brokers',
    'raw spreads',
    'fast execution',
    'regulated trading',
    'trading platform'
  ],
  propFirms: [
    'TradeLocker prop firms',
    'funded trading',
    'prop trading',
    'profit split',
    'instant funding',
    'challenge',
    'evaluation programs',
    'funded accounts'
  ],
  howTo: [
    'TradeLocker guide',
    'how to use TradeLocker',
    'TradeLocker tutorial',
    'forex trading platform',
    'trading guide',
    'TradeLocker setup'
  ]
}

// Author name for articles
export const AUTHOR_NAME = 'TradeLocker Brokers Editorial'

// Structured data configurations
export const SCHEMA_CONFIG = {
  organization: {
    name: BRAND,
    alternateName: 'Best TradeLocker-Compatible Brokers',
    description: 'Compare the top brokers and prop firms that integrate directly with the TradeLocker trading platform.',
    url: SITE_URL,
    logo: `${SITE_URL}/tradelocker-logo.png`
  },
  website: {
    name: BRAND,
    alternateName: 'Best TradeLocker-Compatible Brokers',
    description: 'Compare the top brokers and prop firms that integrate directly with the TradeLocker trading platform.',
    url: SITE_URL,
    inLanguage: 'en-US',
    keywords: KEYWORDS.main
  }
}
