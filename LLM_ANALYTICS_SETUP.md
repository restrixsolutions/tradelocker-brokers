# LLM Analytics with PostHog Integration

This document outlines the complete setup of OpenAI LLM analytics with PostHog tracking for the TradeLocker Brokers website.

## Overview

The integration provides:
- Automatic tracking of OpenAI API calls
- Cost and usage analytics
- Performance monitoring
- Custom property tracking
- User behavior analysis

## Installation

The following packages have been installed:
- `@posthog/ai` - PostHog AI analytics SDK
- `posthog-node` - PostHog server-side client
- `openai` - OpenAI JavaScript SDK

## Configuration

### Environment Variables

Add the following to your `.env.local` file:

```bash
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# PostHog Configuration (already configured)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

## File Structure

```
lib/
├── openai-client.ts          # OpenAI client with PostHog integration
hooks/
├── use-llm-analytics.ts      # React hook for client-side usage
app/
├── api/llm/route.ts          # API endpoint for LLM requests
├── llm-demo/page.tsx         # Demo page
components/
├── llm-analytics-demo.tsx    # Demo component
```

## Usage

### Server-Side Usage

```typescript
import { generateWithAnalytics, createEmbeddingWithAnalytics } from '@/lib/openai-client'

// Chat completion with analytics
const result = await generateWithAnalytics({
  model: 'gpt-4o-mini',
  messages: [{ role: 'user', content: 'Hello!' }],
  distinctId: 'user_123',
  traceId: 'trace_123',
  properties: { feature: 'chat' },
  groups: { company: 'company_id' }
})

// Embedding with analytics
const embedding = await createEmbeddingWithAnalytics({
  input: 'text to embed',
  model: 'text-embedding-3-small',
  distinctId: 'user_123',
  properties: { feature: 'search' }
})
```

### Client-Side Usage

```typescript
import { useLLMAnalytics } from '@/hooks/use-llm-analytics'

function MyComponent() {
  const { chatCompletion, createEmbedding, loading, error } = useLLMAnalytics()

  const handleChat = async () => {
    const result = await chatCompletion({
      messages: [{ role: 'user', content: 'Hello!' }],
      properties: { feature: 'demo' }
    })
    
    if (result.success) {
      console.log(result.data.content)
    }
  }

  return (
    <button onClick={handleChat} disabled={loading}>
      {loading ? 'Loading...' : 'Send Message'}
    </button>
  )
}
```

### API Endpoint Usage

```typescript
// POST /api/llm
const response = await fetch('/api/llm', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'chat', // or 'embedding'
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: 'Hello!' }],
    distinctId: 'user_123',
    properties: { feature: 'api_demo' }
  })
})
```

## Tracked Events

### $ai_generation Events
- **$ai_model**: The specific model used (e.g., gpt-4o-mini)
- **$ai_latency**: Response time in seconds
- **$ai_input_tokens**: Number of input tokens
- **$ai_output_tokens**: Number of output tokens
- **$ai_total_cost_usd**: Total cost in USD
- **$ai_input**: Array of input messages
- **$ai_output_choices**: Array of response choices
- **Custom properties**: Any additional data you provide

### $ai_embedding Events
- **$ai_model**: Embedding model used
- **$ai_input**: Input text or array of texts
- **$ai_embeddings**: Generated embedding vectors
- **$ai_usage**: Token usage statistics
- **Custom properties**: Any additional data you provide

## Demo Page

Visit `/llm-demo` to test the integration:
- Interactive chat completion demo
- Embedding generation demo
- Real-time analytics tracking
- Custom property examples

## PostHog Dashboard

Check your PostHog dashboard at:
- **LLM Analytics > Generations**: View all LLM generation events
- **LLM Analytics > Traces**: View correlated trace data
- **Events**: Search for `$ai_generation` and `$ai_embedding` events

## Best Practices

1. **Always provide distinct IDs** for user tracking
2. **Use trace IDs** to correlate related requests
3. **Add meaningful properties** for better analytics
4. **Group users** by company or organization
5. **Monitor costs** using the `$ai_total_cost_usd` property

## Error Handling

The integration includes comprehensive error handling:
- API errors are caught and logged
- Failed requests return error details
- PostHog events are sent asynchronously (won't block requests)

## Privacy Considerations

- Set `privacyMode: true` for sensitive data
- Don't include PII in custom properties
- Use anonymous distinct IDs when appropriate

## Troubleshooting

1. **No events in PostHog**: Check API keys and network connectivity
2. **High latency**: Monitor `$ai_latency` property
3. **High costs**: Track `$ai_total_cost_usd` and optimize prompts
4. **Missing properties**: Ensure custom properties are properly formatted

## Next Steps

1. Add your OpenAI API key to environment variables
2. Test the demo page at `/llm-demo`
3. Check PostHog dashboard for captured events
4. Integrate into your existing features
5. Set up alerts for cost and performance monitoring
