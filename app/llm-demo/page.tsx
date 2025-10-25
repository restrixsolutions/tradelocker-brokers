import { LLMAnalyticsDemo } from '@/components/llm-analytics-demo'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LLM Analytics Demo | TradeLocker Brokers',
  description: 'Test OpenAI LLM calls with PostHog analytics tracking',
}

export default function LLMAnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">LLM Analytics Demo</h1>
          <p className="text-muted-foreground mt-2">
            Experience OpenAI integration with PostHog analytics tracking
          </p>
        </div>
        
        <LLMAnalyticsDemo />
      </div>
    </div>
  )
}
