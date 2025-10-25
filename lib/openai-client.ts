import { OpenAI } from '@posthog/ai'
import { PostHog } from 'posthog-node'

// Initialize PostHog server-side client
const phClient = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_KEY!,
  { 
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    flushAt: 1, // Send events immediately for better testing
    flushInterval: 1000 // Flush every second
  }
)

// Initialize OpenAI client with PostHog integration
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  posthog: phClient,
})

// Helper function to make LLM calls with analytics
export async function generateWithAnalytics({
  model = "gpt-4o-mini",
  messages,
  distinctId,
  traceId,
  properties = {},
  groups = {},
  privacyMode = false
}: {
  model?: string
  messages: Array<{ role: string; content: string }>
  distinctId?: string
  traceId?: string
  properties?: Record<string, any>
  groups?: Record<string, string>
  privacyMode?: boolean
}) {
  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      posthogDistinctId: distinctId,
      posthogTraceId: traceId,
      posthogProperties: properties,
      posthogGroups: groups,
      posthogPrivacyMode: privacyMode
    })

    return {
      success: true,
      content: completion.choices[0]?.message?.content,
      usage: completion.usage,
      model: completion.model
    }
  } catch (error) {
    console.error('OpenAI API error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Helper function for embeddings with analytics
export async function createEmbeddingWithAnalytics({
  input,
  model = "text-embedding-3-small",
  distinctId,
  traceId,
  properties = {},
  groups = {},
  privacyMode = false
}: {
  input: string | string[]
  model?: string
  distinctId?: string
  traceId?: string
  properties?: Record<string, any>
  groups?: Record<string, string>
  privacyMode?: boolean
}) {
  try {
    const response = await openai.embeddings.create({
      input,
      model,
      posthogDistinctId: distinctId,
      posthogTraceId: traceId,
      posthogProperties: properties,
      posthogGroups: groups,
      posthogPrivacyMode: privacyMode
    })

    return {
      success: true,
      embeddings: response.data,
      usage: response.usage,
      model: response.model
    }
  } catch (error) {
    console.error('OpenAI Embeddings API error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Graceful shutdown function
export function shutdownPostHog() {
  phClient.shutdown()
}

// Export the PostHog client for direct use if needed
export { phClient }
