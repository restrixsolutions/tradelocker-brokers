import { NextRequest, NextResponse } from 'next/server'
import { generateWithAnalytics, createEmbeddingWithAnalytics } from '@/lib/openai-client'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      type, 
      model, 
      messages, 
      input, 
      distinctId, 
      traceId, 
      properties, 
      groups, 
      privacyMode 
    } = body

    // Validate required fields
    if (!type || (type !== 'chat' && type !== 'embedding')) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "chat" or "embedding"' },
        { status: 400 }
      )
    }

    if (type === 'chat' && !messages) {
      return NextResponse.json(
        { error: 'Messages are required for chat completions' },
        { status: 400 }
      )
    }

    if (type === 'embedding' && !input) {
      return NextResponse.json(
        { error: 'Input is required for embeddings' },
        { status: 400 }
      )
    }

    let result

    if (type === 'chat') {
      result = await generateWithAnalytics({
        model: model || 'gpt-4o-mini',
        messages,
        distinctId,
        traceId,
        properties,
        groups,
        privacyMode
      })
    } else {
      result = await createEmbeddingWithAnalytics({
        input,
        model: model || 'text-embedding-3-small',
        distinctId,
        traceId,
        properties,
        groups,
        privacyMode
      })
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
