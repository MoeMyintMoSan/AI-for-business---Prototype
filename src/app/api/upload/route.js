import { NextResponse } from 'next/server'
import Papa from 'papaparse'

// Lightweight CSV parser for demo uploads. Expects text/csv body.
// Returns parsed rows and basic validation results; does not persist.
export async function POST(request) {
  try {
    const text = await request.text()
    if (!text || text.length === 0) {
      return NextResponse.json({ error: 'Empty upload' }, { status: 400 })
    }

    const result = Papa.parse(text, { header: true, skipEmptyLines: true })
    const rows = result.data || []
    const required = ['date', 'sku', 'product', 'category', 'qty', 'price', 'channel']

    const errors = []
    rows.forEach((row, idx) => {
      required.forEach((field) => {
        if (row[field] === undefined || row[field] === null || row[field] === '') {
          errors.push(`Row ${idx + 1}: missing ${field}`)
        }
      })
    })

    return NextResponse.json({
      rows,
      errors,
      columns: result.meta?.fields || [],
      rowCount: rows.length
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse CSV', detail: error?.message }, { status: 500 })
  }
}
