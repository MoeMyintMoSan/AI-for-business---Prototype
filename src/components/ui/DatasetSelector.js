'use client'

import { useState } from 'react'
import { ChevronDown, Database, TrendingUp, Zap, Info, ShoppingCart, Box, Calendar, Users } from 'lucide-react'
import { AVAILABLE_DATASETS, getDatasetById } from '../../data/datasets/datasetConfig'

const iconMap = {
  cart: ShoppingCart,
  box: Box,
  calendar: Calendar,
  users: Users
}

const DatasetSelector = ({ onDatasetChange, selectedDataset, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const datasets = Object.values(AVAILABLE_DATASETS)
  const current = selectedDataset ? getDatasetById(selectedDataset) || datasets[0] : datasets[0]

  const renderIcon = (dataset) => {
    const Icon = iconMap[dataset.icon] || Database
    return <Icon className="w-5 h-5" />
  }

  const handleSelect = (dataset) => {
    onDatasetChange(dataset.id)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Dataset Selector Dropdown */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${current.color} flex items-center justify-center text-white`}>
              {renderIcon(current)}
            </div>
            <div className="text-left">
              <div className="font-medium text-gray-900">{current.name}</div>
              <div className="text-sm text-gray-500">{current.predictionType}</div>
              {current.id === 'uploaded' && (
                <div className="text-xs text-primary font-medium">Uploaded CSV active</div>
              )}
            </div>
          </div>
          <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-auto">
            {datasets.map((dataset) => (
              <button
                key={dataset.id}
                onClick={() => handleSelect(dataset)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
              >
                <div className={`w-8 h-8 rounded ${dataset.color} flex items-center justify-center text-white`}>
                  {renderIcon(dataset)}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{dataset.name}</div>
                  <div className="text-xs text-gray-500">{dataset.description}</div>
                </div>
                {selectedDataset === dataset.id && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dataset Information Panel */}
      <div className="mt-4 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            Dataset Information
          </h4>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-primary hover:text-primary-dark flex items-center gap-1"
          >
            <Info className="h-4 w-4" />
            {showDetails ? 'Hide' : 'Show'} Details
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Source:</span>
            <div className="font-medium text-gray-900">{current.source}</div>
          </div>
          <div>
            <span className="text-gray-600">Sample Size:</span>
            <div className="font-medium text-gray-900">{current.sampleSize}</div>
          </div>
          <div>
            <span className="text-gray-600">Time Range:</span>
            <div className="font-medium text-gray-900">{current.timeRange}</div>
          </div>
          <div>
            <span className="text-gray-600">Confidence:</span>
            <div className="font-medium text-gray-900">{current.confidence}</div>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="mb-3">
              <span className="text-sm text-gray-600">Key Attributes:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {current.attributes.map((attr, index) => (
                  <span key={index} className="px-2 py-1 bg-white rounded text-xs text-gray-700 border">
                    {attr}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Prediction Type:</span>
              <div className="flex items-center gap-2 mt-1">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-gray-900">{current.predictionType}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="bg-white rounded p-3 border border-gray-200 text-center">
          <div className="text-lg font-bold text-primary">92%</div>
          <div className="text-xs text-gray-600">Accuracy</div>
        </div>
        <div className="bg-white rounded p-3 border border-gray-200 text-center">
          <div className="text-lg font-bold text-success">Live</div>
          <div className="text-xs text-gray-600">Status</div>
        </div>
        <div className="bg-white rounded p-3 border border-gray-200 text-center">
          <div className="text-lg font-bold text-warning">AI</div>
          <div className="text-xs text-gray-600">Powered</div>
        </div>
      </div>
    </div>
  )
}

export default DatasetSelector