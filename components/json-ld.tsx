export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TradeLockerBrokers.com",
    description: "Curated list of brokers and prop firms that support the TradeLocker platform",
    url: "https://tradelockerbrokers.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://tradelockerbrokers.com/search?q={search_term_string}",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TradeLockerBrokers.com",
    description: "Your trusted source for TradeLocker-compatible brokers and prop firms",
    url: "https://tradelockerbrokers.com",
    logo: "https://tradelockerbrokers.com/logo.png",
    sameAs: [],
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
        url: "https://tradelockerbrokers.com/logo.png",
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
