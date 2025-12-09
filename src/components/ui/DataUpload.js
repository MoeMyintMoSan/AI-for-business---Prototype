"use client"

import { useState } from 'react'
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function DataUpload({ onParsed }) {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState([])
  const [dragActive, setDragActive] = useState(false)

  const processFile = async (file) => {
    if (!file) return

    setStatus('uploading')
    setMessage('Parsing CSV...')
    setErrors([])

    const text = await file.text()
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'text/csv' },
        body: text
      })
      const data = await res.json()
      if (data.error) {
        setStatus('error')
        setMessage(data.error)
        setErrors(data.detail ? [data.detail] : [])
        return
      }
      setStatus('success')
      setMessage(`Parsed ${data.rowCount} rows`)
      setErrors(data.errors || [])
      onParsed?.(data)
    } catch (err) {
      setStatus('error')
      setMessage('Failed to parse file')
      setErrors([err.message])
    }
  }

  const handleFileInput = async (event) => {
    const file = event.target.files?.[0]
    await processFile(file)
  }

  const handleDrop = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    setDragActive(false)
    const file = event.dataTransfer?.files?.[0]
    await processFile(file)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setDragActive(false)
  }

  return (
    <div
      className={`bg-white border ${dragActive ? 'border-primary' : 'border-gray-200'} rounded-lg p-4`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="flex items-center gap-3 mb-4">
        <Upload className="w-5 h-5 text-primary" />
        <div>
          <div className="font-semibold text-gray-900">Upload CSV (demo)</div>
          <div className="text-sm text-gray-600">Columns: date, sku, product, category, qty, price, channel</div>
          <div className="text-xs text-gray-500">Drag & drop or click to browse. Data will populate dashboard, inventory, alerts, and forecasting.</div>
        </div>
      </div>

      <label
        className={`border-2 border-dashed ${dragActive ? 'border-primary bg-blue-50' : 'border-gray-300'} rounded-lg w-full py-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors`}
      >
        <Upload className={`w-8 h-8 ${dragActive ? 'text-primary' : 'text-gray-400'}`} />
        <div className="text-sm text-gray-700">Drop CSV here or click to select</div>
        <div className="text-xs text-gray-500">Only .csv files are supported</div>
        <input type="file" accept=".csv" onChange={handleFileInput} className="hidden" />
      </label>
      <div className="mt-3 text-sm">
        {status === 'uploading' && <span className="text-gray-600">{message}</span>}
        {status === 'success' && (
          <span className="text-green-700 flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> {message}</span>
        )}
        {status === 'error' && (
          <span className="text-red-700 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {message}</span>
        )}
      </div>
      {errors.length > 0 && (
        <ul className="mt-2 text-xs text-red-700 list-disc list-inside space-y-1">
          {errors.slice(0, 5).map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
          {errors.length > 5 && <li>+{errors.length - 5} more...</li>}
        </ul>
      )}
    </div>
  )
}
