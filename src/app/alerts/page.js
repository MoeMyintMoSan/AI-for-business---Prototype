'use client'

import { useMemo, useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import MetricCard from '../../components/ui/MetricCard'
import ActionButton from '../../components/ui/ActionButton'
import StatusBadge from '../../components/ui/StatusBadge'
import demoStore from '../../lib/demoStore'
import { Bell, AlertTriangle, CheckCircle, Clock, Filter, RefreshCw, Download, Package, LineChart, Settings, Bot, BarChart3 } from 'lucide-react'
import { exportCSV, printSummary } from '../../utils/exportUtils'

export default function AlertsPage() {
  const [datasetId, setDatasetId] = useState('electronics')
  const snapshot = useMemo(() => demoStore.getSnapshot(datasetId), [datasetId])
  const datasets = demoStore.listDatasets()
  const alerts = snapshot.alerts.map((a, idx) => ({ id: idx + 1, status: 'active', actionRequired: true, priority: a.priority || 'medium', ...a }))
  const [selectedFilter, setSelectedFilter] = useState('all')

  const filterOptions = [
    { key: 'all', label: 'All Alerts', count: alerts.length },
    { key: 'high', label: 'High Priority', count: alerts.filter((a) => a.priority === 'high').length },
    { key: 'stock', label: 'Stock', count: alerts.filter((a) => a.type === 'stock').length }
  ]

  const filteredAlerts = alerts.filter((alert) => {
    switch (selectedFilter) {
      case 'high':
        return alert.priority === 'high'
      case 'stock':
        return alert.type === 'stock'
      default:
        return true
    }
  })

  const getAlertIcon = (type) => {
      switch (type) {
        case 'stock':
          return <Package className="w-5 h-5" />
        default:
          return <LineChart className="w-5 h-5" />
      }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-danger'
      case 'medium':
        return 'text-warning'
      case 'low':
        return 'text-info'
      default:
        return 'text-gray-500'
    }
  }

  const activeAlerts = alerts.length
  const highPriorityAlerts = alerts.filter((a) => a.priority === 'high').length
  const actionRequiredAlerts = alerts.length

  const exportAlertsCSV = () => {
    if (!alerts.length) return
    exportCSV('alerts.csv', ['title', 'message', 'priority', 'type'], alerts)
  }

  const exportAlertsPDF = () => {
    if (!alerts.length) return
    const lines = alerts.map((a) => `${a.priority.toUpperCase()} - ${a.title}: ${a.message}`)
    printSummary('Alerts Summary', lines)
  }

  return (
    <PageLayout
      title="Alerts & Notifications"
      subtitle="Live alerts generated from the selected demo dataset"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Dataset</label>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            value={datasetId}
            onChange={(e) => setDatasetId(e.target.value)}
          >
            {datasets.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
        <button className="flex items-center gap-2 text-sm text-primary" onClick={() => setSelectedFilter('all')}>
          <RefreshCw className="w-4 h-4" /> Reset filters
        </button>
      </div>

      {/* Alert Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Active Alerts" value={activeAlerts.toString()} subtitle="Require attention" icon={<Bell size={24} />} iconBgColor="bg-warning" />
        <MetricCard title="High Priority" value={highPriorityAlerts.toString()} subtitle="Critical issues" icon={<AlertTriangle size={24} />} iconBgColor="bg-danger" />
        <MetricCard title="Action Required" value={actionRequiredAlerts.toString()} subtitle="Need your input" icon={<Clock size={24} />} iconBgColor="bg-info" />
        <MetricCard title="Resolved Today" value="—" subtitle="Demo mode" icon={<CheckCircle size={24} />} iconBgColor="bg-success" />
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Alert Center</h3>
            <p className="text-sm text-gray-600">Filtered by demo dataset</p>
          </div>
          <div className="flex gap-3">
            <ActionButton variant="outline" size="md">
              <Filter size={16} />
              Filter
            </ActionButton>
            <ActionButton variant="primary" size="md" onClick={() => setSelectedFilter('all')}>
              Clear Filters
            </ActionButton>
            <ActionButton variant="outline" size="md" onClick={exportAlertsCSV}>
              <Download size={16} />
              Export CSV
            </ActionButton>
            <ActionButton variant="outline" size="md" onClick={exportAlertsPDF}>
              <Download size={16} />
              Print PDF
            </ActionButton>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {filterOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setSelectedFilter(option.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === option.key ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label} ({option.count})
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Alerts ({filteredAlerts.length})</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="text-2xl text-gray-700">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-base font-semibold text-gray-900 truncate">{alert.title}</h4>
                      <StatusBadge status={alert.status} variant="warning" />
                      <span className={`text-xs font-medium uppercase tracking-wide ${getPriorityColor(alert.priority)}`}>
                        {alert.priority}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{alert.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Live from {datasetId} dataset</span>
                      <div className="flex gap-2">
                        <ActionButton variant="outline" size="sm">Dismiss</ActionButton>
                        <ActionButton variant="primary" size="sm">Take Action</ActionButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4 flex justify-center text-gray-400">
              <Bell className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-500">No alerts match your current filter.</p>
          </div>
        )}
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionButton variant="outline" size="md" className="justify-center"><BarChart3 className="w-4 h-4" /> View Reports</ActionButton>
          <ActionButton variant="outline" size="md" className="justify-center"><Package className="w-4 h-4" /> Manage Inventory</ActionButton>
          <ActionButton variant="outline" size="md" className="justify-center"><Bot className="w-4 h-4" /> AI Insights</ActionButton>
          <ActionButton variant="outline" size="md" className="justify-center"><Settings className="w-4 h-4" /> Settings</ActionButton>
        </div>
      </div>
    </PageLayout>
  )
}