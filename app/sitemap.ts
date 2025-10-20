import { MetadataRoute } from 'next'
import { getSupabaseServerClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tradelockerbrokers.com'
  
  // Get all brokers and prop firms for dynamic URLs
  const supabase = await getSupabaseServerClient()
  
  const [brokersResult, propFirmsResult] = await Promise.all([
    supabase.from('brokers').select('id, name'),
    supabase.from('prop_firms').select('id, name')
  ])
  
  const brokers = brokersResult.data || []
  const propFirms = propFirmsResult.data || []
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/brokers`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/prop-firms`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-to-use`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]
  
  // Dynamic broker pages (if you have individual broker pages)
  const brokerPages = brokers.map((broker) => ({
    url: `${baseUrl}/brokers/${broker.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // Dynamic prop firm pages (if you have individual prop firm pages)
  const propFirmPages = propFirms.map((propFirm) => ({
    url: `${baseUrl}/prop-firms/${propFirm.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // Combine all pages
  // Note: Only include dynamic pages if you actually have those routes
  return [...staticPages]
}
