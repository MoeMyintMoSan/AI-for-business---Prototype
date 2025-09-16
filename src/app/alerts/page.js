'use client'

import PageLayout from '../../components/layout/PageLayout'
import MetricCard from '../../components/ui/MetricCard'
import ActionButton from '../../components/ui/ActionButton'
import StatusBadge from '../../components/ui/StatusBadge'
import { Bell, AlertTriangle, CheckCircle, Clock, Filter } from 'lucide-react'
import { useState } from 'react'

export default function AlertsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Mock alerts data
  const alerts = [
    {
      id: 1,
      type: 'stock',
      priority: 'high',
      title: 'Critical Stock Level - Wireless Earbuds',
      message: 'Only 3 units remaining. Restock immediately to avoid stockout.',
      timestamp: '2 minutes ago',
      status: 'active',
      actionRequired: true
    },
    {
      id: 2,
      type: 'forecast',
      priority: 'medium',
      title: 'Demand Spike Predicted - iPhone Cases',
      message: 'AI forecasts 40% increase in demand for next week. Consider increasing order quantity.',
      timestamp: '15 minutes ago',
      status: 'active',
      actionRequired: true
    },
    {
      id: 3,
      type: 'system',
      priority: 'low',
      title: 'Weekly Report Generated',
      message: 'Your weekly inventory report is ready for review.',
      timestamp: '1 hour ago',
      status: 'read',
      actionRequired: false
    },
    {
      id: 4,
      type: 'stock',
      priority: 'high',
      title: 'Stockout Alert - Samsung Charger',
      message: 'Product is completely out of stock. Immediate restocking required.',
      timestamp: '3 hours ago',
      status: 'resolved',
      actionRequired: false
    },
    {
      id: 5,
      type: 'forecast',
      priority: 'medium',
      title: 'Seasonal Trend Alert - Beauty Products',
      message: 'Declining demand detected for beauty category. Consider promotional strategies.',
      timestamp: '5 hours ago',
      status: 'active',
      actionRequired: true
    },
    {
      id: 6,
      type: 'system',
      priority: 'low',
      title: 'Model Accuracy Update',
      message: 'Forecasting model accuracy improved to 89%. No action required.',
      timestamp: '1 day ago',
      status: 'read',
      actionRequired: false
    }
  ]

  const filterOptions = [
    { key: 'all', label: 'All Alerts', count: alerts.length },
    { key: 'active', label: 'Active', count: alerts.filter(a => a.status === 'active').length },
    { key: 'high', label: 'High Priority', count: alerts.filter(a => a.priority === 'high').length },
    { key: 'action-required', label: 'Action Required', count: alerts.filter(a => a.actionRequired).length }
  ]

  const filteredAlerts = alerts.filter(alert => {
    switch (selectedFilter) {
      case 'active':
        return alert.status === 'active'
      case 'high':
        return alert.priority === 'high'
      case 'action-required':
        return alert.actionRequired
      default:
        return true
    }
  })

  const getAlertIcon = (type) => {
    switch (type) {
      case 'stock':
        return '📦'
      case 'forecast':
        return '📈'
      case 'system':
        return '⚙️'
      default:
        return '🔔'
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

  const getStatusVariant = (status) => {
    switch (status) {
      case 'active':
        return 'warning'
      case 'resolved':
        return 'success'
      case 'read':
        return 'secondary'
      default:
        return 'secondary'
    }
  }

  const activeAlerts = alerts.filter(a => a.status === 'active').length
  const highPriorityAlerts = alerts.filter(a => a.priority === 'high').length
  const actionRequiredAlerts = alerts.filter(a => a.actionRequired).length

  return (
    <PageLayout 
      title="Alerts & Notifications" 
      subtitle="Stay informed about your inventory status and forecasting insights"
    >
      {/* Alert Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Active Alerts"
          value={activeAlerts.toString()}
          subtitle="Require attention"
          icon={<Bell size={24} />}
          iconBgColor="bg-warning"
        />
        
        <MetricCard
          title="High Priority"
          value={highPriorityAlerts.toString()}
          subtitle="Critical issues"
          icon={<AlertTriangle size={24} />}
          iconBgColor="bg-danger"
        />
        
        <MetricCard
          title="Action Required"
          value={actionRequiredAlerts.toString()}
          subtitle="Need your input"
          icon={<Clock size={24} />}
          iconBgColor="bg-info"
        />
        
        <MetricCard
          title="Resolved Today"
          value="7"
          subtitle="Issues fixed"
          icon={<CheckCircle size={24} />}
          iconBgColor="bg-success"
        />
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Alert Center</h3>
            <p className="text-sm text-gray-600">Filter and manage your notifications</p>
          </div>
          <div className="flex gap-3">
            <ActionButton variant="outline" size="md">
              <Filter size={16} />
              Filter
            </ActionButton>
            <ActionButton variant="primary" size="md">
              Mark All Read
            </ActionButton>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {filterOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setSelectedFilter(option.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === option.key
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Alerts ({filteredAlerts.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Alert Icon */}
                  <div className="text-2xl">
                    {getAlertIcon(alert.type)}
                  </div>
                  
                  {/* Alert Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-base font-semibold text-gray-900 truncate">
                        {alert.title}
                      </h4>
                      <StatusBadge 
                        status={alert.status} 
                        variant={getStatusVariant(alert.status)}
                      />
                      <span className={`text-xs font-medium uppercase tracking-wide ${getPriorityColor(alert.priority)}`}>
                        {alert.priority}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {alert.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {alert.timestamp}
                      </span>
                      
                      {alert.actionRequired && (
                        <div className="flex gap-2">
                          <ActionButton variant="outline" size="sm">
                            Dismiss
                          </ActionButton>
                          <ActionButton variant="primary" size="sm">
                            Take Action
                          </ActionButton>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredAlerts.length === 0 && (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">🔕</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts found</h3>
            <p className="text-gray-500">No alerts match your current filter.</p>
          </div>
        )}
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🚀 Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionButton variant="outline" size="md" className="justify-center">
            📊 View Reports
          </ActionButton>
          <ActionButton variant="outline" size="md" className="justify-center">
            📦 Manage Inventory
          </ActionButton>
          <ActionButton variant="outline" size="md" className="justify-center">
            🤖 AI Insights
          </ActionButton>
          <ActionButton variant="outline" size="md" className="justify-center">
            ⚙️ Settings
          </ActionButton>
        </div>
      </div>
    </PageLayout>
  )
}