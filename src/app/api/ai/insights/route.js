import { NextResponse } from 'next/server'
import { getDemoInsights, getSnapshot } from '../../../../lib/demoStore'

// Simple server-side AI endpoint for demo mode. If no API key, returns cached demo insights.
// Payload: { datasetId?: string }
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}))
    const datasetId = body.datasetId || 'electronics'
    const query = (body.query || '').trim()

    // In a full build, this is where we would call Gemini with a validated prompt.
    // For demo, always return cached insights plus a snapshot for context.
    const insights = getDemoInsights()
    const snapshot = getSnapshot(datasetId)

    const answer = query
      ? `Demo response for "${query}" using ${snapshot.metrics.datasetName}: focus on top SKUs, reorder ${snapshot.reorders?.[0]?.sku || 'key items'} to avoid stockout.`
      : 'Provide a question to get a demo insight.'

    return NextResponse.json({
      source: 'demo-cache',
      datasetId,
      insights,
      snapshot,
      answer
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate insights', detail: error?.message }, { status: 500 })
  }
}
