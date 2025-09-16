import PageLayout from '../components/layout/PageLayout'
import MetricCard from '../components/ui/MetricCard'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <PageLayout 
      title="Dashboard" 
      subtitle="Welcome to StockWise AI - Your intelligent inventory management system"
    >
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Monthly Revenue"
          value="฿45,280"
          change="+12.5% from last month"
          changeType="positive"
          icon="💰"
          iconBgColor="bg-primary-light"
        />
        
        <MetricCard
          title="Inventory Value"
          value="฿28,950"
          subtitle="245 total products"
          icon="📦"
          iconBgColor="bg-info"
        />
        
        <MetricCard
          title="Low Stock Items"
          value="12"
          change="Needs attention"
          changeType="negative"
          icon="⚠️"
          iconBgColor="bg-warning"
        />
        
        <MetricCard
          title="Out of Stock"
          value="3"
          change="Immediate action required"
          changeType="negative"
          icon="🚨"
          iconBgColor="bg-danger"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link href="/inventory" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
            Manage Inventory
          </Link>
          <Link href="/forecasting" className="bg-primary-light text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors">
            View Forecasts
          </Link>
          <Link href="/alerts" className="bg-warning text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
            Check Alerts
          </Link>
          <Link href="/analytics" className="bg-success text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
            View Reports
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-success">📈</span>
            <span className="text-sm text-gray-600">iPhone 13 Case restocked (50 units) - 2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-warning">⚠️</span>
            <span className="text-sm text-gray-600">Wireless Earbuds low stock alert - 4 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-danger">🚨</span>
            <span className="text-sm text-gray-600">Samsung Charger sold out - 6 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-info">🔮</span>
            <span className="text-sm text-gray-600">AI forecast updated for next week - 1 day ago</span>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}