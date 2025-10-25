'use client'

import { useState } from 'react'
import { useLLMAnalytics } from '@/hooks/use-llm-analytics'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, Bot, Sparkles } from 'lucide-react'

export function LLMAnalyticsDemo() {
  const [prompt, setPrompt] = useState('Tell me a fun fact about hedgehogs')
  const [response, setResponse] = useState('')
  const [conversationId] = useState(() => Math.random().toString(36).substring(2, 15))
  
  const { chatCompletion, createEmbedding, loading, error } = useLLMAnalytics()

  const handleChatCompletion = async () => {
    const result = await chatCompletion({
      messages: [
        { role: 'user', content: prompt }
      ],
      model: 'gpt-4o-mini',
      properties: {
        conversation_id: conversationId,
        feature: 'demo',
        timestamp: new Date().toISOString()
      },
      groups: {
        demo: 'llm-analytics'
      }
    })

    if (result.success) {
      setResponse(result.data.content)
    } else if (result.error?.includes('API key not configured')) {
      setResponse('⚠️ OpenAI API key not configured. Please set OPENAI_API_KEY environment variable to test this feature.')
    }
  }

  const handleEmbedding = async () => {
    const result = await createEmbedding({
      input: prompt,
      model: 'text-embedding-3-small',
      properties: {
        conversation_id: conversationId,
        feature: 'embedding_demo',
        timestamp: new Date().toISOString()
      }
    })

    if (result.success) {
      setResponse(`Embedding created with ${result.data.embeddings.length} vectors`)
    } else if (result.error?.includes('API key not configured')) {
      setResponse('⚠️ OpenAI API key not configured. Please set OPENAI_API_KEY environment variable to test this feature.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            LLM Analytics Demo
          </CardTitle>
          <CardDescription>
            Test OpenAI LLM calls with PostHog analytics tracking. 
            Check your PostHog dashboard to see the captured events.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="prompt" className="text-sm font-medium">
              Prompt
            </label>
            <Textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleChatCompletion} 
              disabled={loading || !prompt.trim()}
              className="flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Chat Completion
            </Button>
            
            <Button 
              onClick={handleEmbedding} 
              disabled={loading || !prompt.trim()}
              variant="outline"
              className="flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
              Create Embedding
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">Error: {error}</p>
            </div>
          )}

          {response && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Response</label>
              <div className="p-3 bg-gray-50 border rounded-md">
                <p className="text-sm whitespace-pre-wrap">{response}</p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Conversation ID: {conversationId}</Badge>
            <Badge variant="outline">PostHog Analytics Enabled</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What's Being Tracked</CardTitle>
          <CardDescription>
            PostHog automatically captures these events and properties:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">$ai_generation Events</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Model used (gpt-4o-mini)</li>
                <li>• Input/output tokens</li>
                <li>• Latency in seconds</li>
                <li>• Total cost in USD</li>
                <li>• Custom properties</li>
                <li>• User groups</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">$ai_embedding Events</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Embedding model</li>
                <li>• Input text</li>
                <li>• Vector dimensions</li>
                <li>• Usage statistics</li>
                <li>• Custom properties</li>
                <li>• Trace correlation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
