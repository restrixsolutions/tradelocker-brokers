'use client'

import dynamic from 'next/dynamic'

const PostHogProviderWrapper = dynamic(
  () => import('./posthog-provider').then(mod => mod.PostHogProviderWrapper),
  { 
    ssr: false,
    loading: () => null
  }
)

export default function PostHogWrapper({ children }: { children: React.ReactNode }) {
  return <PostHogProviderWrapper>{children}</PostHogProviderWrapper>
}
