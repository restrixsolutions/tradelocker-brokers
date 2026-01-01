/**
 * SEO Meta Tags Component
 * This component provides explicit meta tags for better crawler detection
 * Use this in pages that need custom SEO beyond Next.js metadata
 */

interface SEOMetaProps {
  title: string
  description: string
  canonical: string
  ogImage?: string
  ogType?: 'website' | 'article'
  keywords?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

export function SEOMeta({
  title,
  description,
  canonical,
  ogImage = '/og-image.png',
  ogType = 'website',
  keywords,
  author = 'TradeLockerBrokers.com',
  publishedTime,
  modifiedTime,
}: SEOMetaProps) {
  const fullOgImage = ogImage.startsWith('http') 
    ? ogImage 
    : `https://tradelockerbrokers.com${ogImage}`
  
  return (
    <>
      {/* Primary Meta Tags */}
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="TradeLocker Brokers" />
      
      {/* Article specific tags */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:creator" content="@forexproprank" />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    </>
  )
}





