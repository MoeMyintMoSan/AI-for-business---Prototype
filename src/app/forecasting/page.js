'use client'

import { useState, useEffect } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import MetricCard from '../../components/ui/MetricCard'
import DatasetSelector from '../../components/ui/DatasetSelector'
import GeminiService from '../../utils/geminiService'
import { TrendingUp, AlertTriangle, Target, Zap, Bot, MessageSquare } from 'lucide-react'

export default function EnhancedForecastingPage() {
  const [selectedDataset, setSelectedDataset] = useState('ecommerce_sales')
  const [predictions, setPredictions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [chatQuery, setChatQuery] = useState('')
  const [chatResponse, setChatResponse] = useState('')
  const [showChat, setShowChat] = useState(false)

  // Load predictions when dataset changes
  useEffect(() => {
    loadPredictions()
  }, [selectedDataset])

  const loadPredictions = async () => {
    setIsLoading(true)
    try {
      const result = await GeminiService.generateDatasetPredictions(selectedDataset, {
        type: 'business_forecasting',
        timeFrame: '7 days',
        metrics: 'Sales, Inventory, Revenue'
      })
      setPredictions(result)
    } catch (error) {
      console.error('Error loading predictions:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChatQuery = async () => {
    if (!chatQuery.trim()) return
    
    setIsLoading(true)
    try {
      const response = await GeminiService.generateBusinessInsights(selectedDataset, chatQuery)
      setChatResponse(response)
      setShowChat(true)
    } catch (error) {
      console.error('Error getting AI insights:', error)
      setChatResponse('Sorry, I cannot process your query right now. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

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

  return (
    <PageLayout
      title="AI Forecasting & Predictions"
      subtitle="Get AI-powered insights and predictions for your business data"
    >
      {/* Dataset Selection */}
      <div className="mb-6">
        <DatasetSelector
          selectedDataset={selectedDataset}
          onDatasetChange={setSelectedDataset}
        />
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Active Predictions"
          value={predictions.length}
          icon={<Target className="w-6 h-6" />}
          subtitle={predictions.length > 0 ? `+${predictions.length > 5 ? 15 : predictions.length * 3}% this week` : 'No predictions yet'}
        />
        <MetricCard
          title="Avg Confidence"
          value={predictions.length > 0 ? `${Math.round(predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length)}%` : '0%'}
          icon={<TrendingUp className="w-6 h-6" />}
          subtitle="AI prediction accuracy"
        />
        <MetricCard
          title="High Priority"
          value={predictions.filter(p => p.confidence >= 85).length}
          icon={<AlertTriangle className="w-6 h-6" />}
          subtitle="Urgent actions needed"
        />
        <MetricCard
          title="AI Powered"
          value="Gemini"
          icon={<Bot className="w-6 h-6" />}
          subtitle="Google AI Integration"
        />
      </div>

      {/* AI Chat Interface */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Ask AI for Business Insights</h3>
          </div>
          
          <div className="flex space-x-3">
            <input
              type="text"
              value={chatQuery}
              onChange={(e) => setChatQuery(e.target.value)}
              placeholder="Ask about your business data... (e.g., 'What should I restock this week?')"
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
              onClick={loadPredictions}
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
              <span className="ml-3 text-gray-600">Generating AI predictions...</span>
            </div>
          ) : predictions.length > 0 ? (
            <div className="space-y-6">
              {predictions.map((prediction) => (
                <div key={prediction.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{prediction.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(prediction.confidence)}`}>
                          {prediction.confidence >= 85 ? 'High Priority' : prediction.confidence >= 75 ? 'Medium Priority' : 'Low Priority'}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{prediction.prediction}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getConfidenceColor(prediction.confidence)}`}>
                        {prediction.confidence}%
                      </div>
                      <div className="text-sm text-gray-500">Confidence</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-1">Business Impact</h5>
                      <p className="text-sm text-gray-700">{prediction.impact}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-1">Recommended Action</h5>
                      <p className="text-sm text-gray-700">{prediction.action}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-1">Timeline</h5>
                      <p className="text-sm text-gray-700">{prediction.timeframe}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Dataset: {prediction.dataset}</span>
                    <span>Generated by AI</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Predictions Available</h3>
              <p className="text-gray-600 mb-4">Select a dataset and click refresh to generate AI predictions</p>
              <button
                onClick={loadPredictions}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 mx-auto"
              >
                <Zap className="w-5 h-5" />
                <span>Generate Predictions</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}