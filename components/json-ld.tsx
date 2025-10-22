import { SITE_URL, BRAND, SOCIAL, SCHEMA_CONFIG } from "@/lib/seo"

export function WebsiteJsonLd() {
  // Filter out empty social URLs
  const sameAs = Object.values(SOCIAL).filter(url => url && url.length > 0)
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SCHEMA_CONFIG.website.name,
    alternateName: SCHEMA_CONFIG.website.alternateName,
    description: SCHEMA_CONFIG.website.description,
    url: SCHEMA_CONFIG.website.url,
    inLanguage: SCHEMA_CONFIG.website.inLanguage,
    keywords: SCHEMA_CONFIG.website.keywords.join(", "),
    sameAs,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      suppressHydrationWarning
    />
  )
}

export function OrganizationJsonLd() {
  // Filter out empty social URLs
  const sameAs = Object.values(SOCIAL).filter(url => url && url.length > 0)
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SCHEMA_CONFIG.organization.name,
    description: SCHEMA_CONFIG.organization.description,
    url: SCHEMA_CONFIG.organization.url,
    logo: SCHEMA_CONFIG.organization.logo,
    sameAs,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      suppressHydrationWarning
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      suppressHydrationWarning
    />
  )
}

export function ArticleJsonLd({
  title,
  description,
  datePublished,
  dateModified,
  authorName = "TradeLockerBrokers.com",
}: {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  authorName?: string
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "TradeLockerBrokers.com",
      logo: {
        "@type": "ImageObject",
        url: "https://tradelockerbrokers.com/tradelocker-logo.png",
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      suppressHydrationWarning
    />
  )
}

export function ItemListJsonLd({ 
  items, 
  type = 'broker' 
}: { 
  items: Array<{ name: string; url: string; position: number }>, 
  type?: 'broker' | 'prop-firm' 
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Best TradeLocker ${type === 'broker' ? 'Brokers' : 'Prop Firms'} 2025`,
    "description": `Curated list of top ${type === 'broker' ? 'brokers' : 'prop firms'} supporting TradeLocker platform`,
    "numberOfItems": items.length,
    "itemListElement": items.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "url": item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      suppressHydrationWarning
    />
  )
}

export function FAQPageJsonLd({ faqs }: { 
  faqs: Array<{ question: string; answer: string }> 
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      suppressHydrationWarning
    />
  )
}

export function BlogPostingJsonLd({
  title,
  description,
  publishDate,
  lastUpdated,
  author = "TradeLockerBrokers.com",
  image,
  url,
  category,
  tags,
}: {
  title: string
  description: string
  publishDate: string
  lastUpdated?: string
  author?: string
  image?: string
  url: string
  category?: string
  tags?: string[]
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image || "https://tradelockerbrokers.com/og-image.png",
    "datePublished": publishDate,
    "dateModified": lastUpdated || publishDate,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://tradelockerbrokers.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "TradeLockerBrokers.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tradelockerbrokers.com/tradelocker-logo.png",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url,
    },
    ...(category && { "articleSection": category }),
    ...(tags && tags.length > 0 && { "keywords": tags.join(", ") }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      suppressHydrationWarning
    />
  )
}
