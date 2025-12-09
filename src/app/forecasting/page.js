'use client'

import { useEffect, useMemo, useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import MetricCard from '../../components/ui/MetricCard'
import DatasetSelector from '../../components/ui/DatasetSelector'
import demoStore from '../../lib/demoStore'
import { getAllDatasets } from '../../data/datasets/datasetConfig'
import { TrendingUp, AlertTriangle, Target, Zap, Bot, MessageSquare } from 'lucide-react'

export default function EnhancedForecastingPage() {
  const baseDatasets = useMemo(() => getAllDatasets(), [])
  const hasUploaded = demoStore.listDatasets().some((d) => d.id === 'uploaded')
  const datasetOptions = useMemo(() => {
    const opts = [...baseDatasets]
    if (hasUploaded) {
      opts.unshift({
        id: 'uploaded',
        name: 'Uploaded CSV',
        description: 'Uses your latest uploaded file',
        source: 'User upload',
        attributes: ['sku', 'product', 'qty', 'date', 'channel'],
        predictionType: 'Demand & stock insights',
        icon: 'database',
        color: 'bg-slate-500',
        sampleSize: 'Your rows',
        timeRange: 'From file',
        confidence: 'Varies by data quality'
      })
    }
    return opts
  }, [baseDatasets, hasUploaded])

  const [selectedDataset, setSelectedDataset] = useState(datasetOptions[0]?.id || 'ecommerce_sales')
  const [insights, setInsights] = useState(null)
  const [snapshot, setSnapshot] = useState(() => demoStore.getSnapshot('electronics'))
  const [isLoading, setIsLoading] = useState(false)
  const [chatQuery, setChatQuery] = useState('')
  const [chatResponse, setChatResponse] = useState('')
  const [showChat, setShowChat] = useState(false)

  const normalizeDatasetId = (id) => {
    if (id === 'ecommerce_sales' || id === 'inventory_mgmt') return 'electronics'
    if (id === 'customer_behavior' || id === 'seasonal_trends') return 'beauty'
    return id || 'electronics'
  }

  useEffect(() => {
    const fallbackId = datasetOptions[0]?.id || 'ecommerce_sales'
    if (!datasetOptions.find((d) => d.id === selectedDataset)) {
      setSelectedDataset(fallbackId)
      return
    }
    const normalized = normalizeDatasetId(selectedDataset)
    setSnapshot(demoStore.getSnapshot(normalized))
    loadInsights(selectedDataset)
  }, [selectedDataset, datasetOptions])

  const loadInsights = async (datasetId) => {
    const normalized = normalizeDatasetId(datasetId)
    setIsLoading(true)
    try {
      const res = await fetch('/api/ai/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ datasetId: normalized })
      })
      const data = await res.json()
      setInsights(data.insights)
    } catch (error) {
      console.error('Error loading insights', error)
      setInsights(demoStore.getDemoInsights())
    } finally {
      setIsLoading(false)
    }
  }

  const handleChatQuery = async () => {
    if (!chatQuery.trim()) return
    setIsLoading(true)
    try {
      const res = await fetch('/api/ai/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ datasetId: normalizeDatasetId(selectedDataset), query: chatQuery })
      })
      const data = await res.json()
      setChatResponse(data.answer || 'Demo response unavailable')
      setShowChat(true)
    } catch (error) {
      setChatResponse('Could not fetch AI answer (demo).')
      setShowChat(true)
    } finally {
      setIsLoading(false)
    }
  }

  const predictions = insights?.reorders || []

  const getPriorityColor = (confidence) => {
    if (confidence >= 85) return 'text-red-600 bg-red-50 border-red-200'
    if (confidence >= 75) return 'text-orange-600 bg-orange-50 border-orange-200'
    return 'text-blue-600 bg-blue-50 border-blue-200'
  }

  const getConfidenceColor = (confidence) => {
    if (confidence >= 85) return 'text-green-600'
    if (confidence >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const avgConfidence = insights?.risks?.length
    ? Math.round(insights.risks.reduce((acc, r) => acc + (r.confidence || 70), 0) / insights.risks.length)
    : 0

  return (
    <PageLayout
      title="AI Forecasting & Predictions"
      subtitle="Demo-safe insights powered by cached AI output"
    >
      {/* Dataset Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <DatasetSelector
            selectedDataset={selectedDataset}
            onDatasetChange={setSelectedDataset}
            datasets={datasetOptions}
          />
          <div className="text-sm text-gray-500">Source: demo cache</div>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Active Predictions" value={predictions.length} icon={<Target className="w-6 h-6" />} subtitle="Reorder suggestions" />
        <MetricCard title="Avg Confidence" value={`${avgConfidence || 0}%`} icon={<TrendingUp className="w-6 h-6" />} subtitle="Demo AI confidence" />
        <MetricCard title="High Priority" value={(insights?.risks?.length || 0).toString()} icon={<AlertTriangle className="w-6 h-6" />} subtitle="Risks detected" />
        <MetricCard title="Dataset" value={selectedDataset} icon={<Bot className="w-6 h-6" />} subtitle="Demo dataset" />
      </div>

      {/* AI Chat Interface */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Ask AI (demo)</h3>
          </div>

          <div className="flex space-x-3">
            <input
              type="text"
              value={chatQuery}
              onChange={(e) => setChatQuery(e.target.value)}
              placeholder="In demo, responses are cached."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleChatQuery()}
            />
            <button
              onClick={handleChatQuery}
              disabled={isLoading || !chatQuery.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Bot className="w-4 h-4" />
              <span>{isLoading ? 'Thinking...' : 'Ask AI'}</span>
            </button>
          </div>
        </div>

        {showChat && chatResponse && (
          <div className="p-6 bg-blue-50 border-b border-gray-200">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">AI Response:</h4>
                <p className="text-gray-700 leading-relaxed">{chatResponse}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Predictions List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">AI Predictions & Insights</h3>
            <button
              onClick={() => loadInsights(selectedDataset)}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>{isLoading ? 'Loading...' : 'Refresh'}</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading demo insights...</span>
            </div>
          ) : predictions.length > 0 ? (
            <div className="space-y-6">
              {predictions.map((prediction, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{prediction.reason}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(85)}`}>
                          High Priority
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">Reorder {prediction.qty} units ({prediction.when})</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getConfidenceColor(85)}`}>85%</div>
                      <div className="text-sm text-gray-500">Confidence</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-1">SKU</h5>
                      <p className="text-sm text-gray-700">{prediction.sku}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-1">Action</h5>
                      <p className="text-sm text-gray-700">Order now to avoid stockout</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-1">Timeline</h5>
                      <p className="text-sm text-gray-700">{prediction.when}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Dataset: {selectedDataset}</span>
                    <span>Generated from demo cache</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Predictions Available</h3>
              <p className="text-gray-600 mb-4">Select a dataset and click refresh to load demo insights</p>
              <button
                onClick={() => loadInsights(selectedDataset)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 mx-auto"
              >
                <Zap className="w-5 h-5" />
                <span>Load Insights</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}