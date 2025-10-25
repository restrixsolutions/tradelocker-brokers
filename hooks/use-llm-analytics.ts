'use client'

import { useState, useCallback } from 'react'
import { usePostHog } from 'posthog-js/react'

interface LLMRequest {
  type: 'chat' | 'embedding'
  model?: string
  messages?: Array<{ role: string; content: string }>
  input?: string | string[]
  distinctId?: string
  traceId?: string
  properties?: Record<string, any>
  groups?: Record<string, string>
  privacyMode?: boolean
}

interface LLMResponse {
  success: boolean
  data?: any
  error?: string
}

export function useLLMAnalytics() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const posthog = usePostHog()

  const generateId = useCallback(() => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }, [])

  const makeRequest = useCallback(async (request: LLMRequest): Promise<LLMResponse> => {
    setLoading(true)
    setError(null)

    try {
      // Generate trace ID if not provided
      const traceId = request.traceId || generateId()
      
      // Get distinct ID from PostHog if not provided
      const distinctId = request.distinctId || posthog?.get_distinct_id()

      const response = await fetch('/api/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...request,
          traceId,
          distinctId,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Request failed')
      }

      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [posthog, generateId])

  const chatCompletion = useCallback(async ({
    messages,
    model = 'gpt-4o-mini',
    properties = {},
    groups = {},
    privacyMode = false
  }: {
    messages: Array<{ role: string; content: string }>
    model?: string
    properties?: Record<string, any>
    groups?: Record<string, string>
    privacyMode?: boolean
  }) => {
    return makeRequest({
      type: 'chat',
      messages,
      model,
      properties,
      groups,
      privacyMode
    })
  }, [makeRequest])

  const createEmbedding = useCallback(async ({
    input,
    model = 'text-embedding-3-small',
    properties = {},
    groups = {},
    privacyMode = false
  }: {
    input: string | string[]
    model?: string
    properties?: Record<string, any>
    groups?: Record<string, string>
    privacyMode?: boolean
  }) => {
    return makeRequest({
      type: 'embedding',
      input,
      model,
      properties,
      groups,
      privacyMode
    })
  }, [makeRequest])

  return {
    chatCompletion,
    createEmbedding,
    makeRequest,
    loading,
    error,
    clearError: () => setError(null)
  }
}
