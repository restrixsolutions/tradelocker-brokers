// Centralized SEO configuration
// NOTE: SITE_URL is intentionally a single constant so the production domain can be
// swapped in one place if/when the site moves to a non-infringing domain.
export const SITE_URL = 'https://tradelockerbrokers.com'
// Brand identity. Kept as a single constant so the site name can be changed everywhere
// from here. "TradeLocker" must NOT be used as our brand/identity — only as a
// descriptive reference to the third-party platform our listed brokers support.
export const BRAND = 'TL Brokers'
export const LOGO_PATH = '/tradelocker-logo.png'
export const FAVICON_PATH = '/favicon-logo.png'
export const DEFAULT_DESC = 'Independent comparison of forex brokers and prop firms that support the TradeLocker trading platform.'

// Independence / non-affiliation notice. Surface this anywhere the site could be
// mistaken for the official TradeLocker product.
export const AFFILIATION_DISCLAIMER =
  'TL Brokers is an independent comparison and affiliate website. We are not affiliated with, ' +
  'endorsed by, sponsored by, or operated by TradeLocker Limited. "TradeLocker" and related marks ' +
  'are trademarks of their respective owner and are used here only for descriptive, comparative purposes.'

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
export const AUTHOR_NAME = 'TL Brokers Editorial'

// Structured data configurations
export const SCHEMA_CONFIG = {
  organization: {
    name: BRAND,
    alternateName: 'TL Brokers Directory',
    description: 'Independent comparison of brokers and prop firms that support the TradeLocker trading platform.',
    url: SITE_URL,
    logo: `${SITE_URL}${LOGO_PATH}`
  },
  website: {
    name: BRAND,
    alternateName: 'TL Brokers Directory',
    description: 'Independent comparison of brokers and prop firms that support the TradeLocker trading platform.',
    url: SITE_URL,
    inLanguage: 'en-US',
    keywords: KEYWORDS.main
  }
}
