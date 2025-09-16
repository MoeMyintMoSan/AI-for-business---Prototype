'use client'

import PageLayout from '../../components/layout/PageLayout'
import MetricCard from '../../components/ui/MetricCard'
import ChartContainer from '../../components/charts/ChartContainer'
import LineChart from '../../components/charts/LineChart'
import BarChart from '../../components/charts/BarChart'
import DonutChart from '../../components/charts/DonutChart'
import ActionButton from '../../components/ui/ActionButton'
import { TrendingUp, DollarSign, Package, Users, Download, Calendar } from 'lucide-react'

export default function AnalyticsPage() {
  // Mock analytics data
  const salesTrendData = [
    { name: 'Jan', sales: 4200, orders: 145, customers: 89 },
    { name: 'Feb', sales: 3800, orders: 132, customers: 78 },
    { name: 'Mar', sales: 5100, orders: 178, customers: 112 },
    { name: 'Apr', sales: 4600, orders: 165, customers: 98 },
    { name: 'May', sales: 5800, orders: 205, customers: 134 },
    { name: 'Jun', sales: 6200, orders: 223, customers: 156 },
    { name: 'Jul', sales: 5900, orders: 210, customers: 142 },
    { name: 'Aug', sales: 6800, orders: 245, customers: 178 },
    { name: 'Sep', sales: 7200, orders: 268, customers: 189 },
    { name: 'Oct', sales: 6900, orders: 252, customers: 167 },
    { name: 'Nov', sales: 8100, orders: 298, customers: 234 },
    { name: 'Dec', sales: 9200, orders: 334, customers: 267 }
  ]

  const categoryPerformanceData = [
    { name: 'Electronics', value: 45, amount: 28500 },
    { name: 'Beauty', value: 25, amount: 15800 },
    { name: 'Accessories', value: 20, amount: 12600 },
    { name: 'Fashion', value: 10, amount: 6300 }
  ]

  const topProductsData = [
    { name: 'iPhone 13 Case', sales: 1240, revenue: 18600 },
    { name: 'Wireless Earbuds', sales: 980, revenue: 58800 },
    { name: 'Samsung Charger', sales: 756, revenue: 15120 },
    { name: 'Beauty Serum', sales: 523, revenue: 26150 },
    { name: 'Laptop Stand', sales: 467, revenue: 23350 }
  ]

  const performanceMetrics = [
    { metric: 'Average Order Value', value: '₿89.45', change: '+12.5%', trend: 'up' },
    { metric: 'Conversion Rate', value: '3.2%', change: '+0.8%', trend: 'up' },
    { metric: 'Customer Retention', value: '76%', change: '+5.2%', trend: 'up' },
    { metric: 'Inventory Turnover', value: '8.3x', change: '-1.2%', trend: 'down' }
  ]

  const salesTrendLines = [
    { dataKey: 'sales', name: 'Sales (₿)', color: '#1E40AF', strokeWidth: 3 },
    { dataKey: 'orders', name: 'Orders', color: '#059669', strokeWidth: 2 }
  ]

  const categoryColors = ['#1E40AF', '#059669', '#DC2626', '#9333EA']

  return (
    <PageLayout 
      title="Analytics & Reports" 
      subtitle="Comprehensive insights into your business performance"
    >
      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Revenue"
          value="₿63,420"
          change="+15.2% from last month"
          changeType="positive"
          icon={<DollarSign size={24} />}
          iconBgColor="bg-success"
        />
        
        <MetricCard
          title="Total Orders"
          value="2,847"
          change="+8.7% from last month"
          changeType="positive"
          icon={<Package size={24} />}
          iconBgColor="bg-primary"
        />
        
        <MetricCard
          title="Active Customers"
          value="1,923"
          change="+12.3% from last month"
          changeType="positive"
          icon={<Users size={24} />}
          iconBgColor="bg-info"
        />
        
        <MetricCard
          title="Growth Rate"
          value="18.5%"
          change="Monthly growth"
          changeType="positive"
          icon={<TrendingUp size={24} />}
          iconBgColor="bg-warning"
        />
      </div>

      {/* Time Period Selector */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Report Period</h3>
            <p className="text-sm text-gray-600">Select time range for analytics</p>
          </div>
          <div className="flex gap-3">
            <ActionButton variant="outline" size="md">
              <Calendar size={16} />
              Last 7 Days
            </ActionButton>
            <ActionButton variant="outline" size="md">
              Last 30 Days
            </ActionButton>
            <ActionButton variant="primary" size="md">
              Last 12 Months
            </ActionButton>
            <ActionButton variant="outline" size="md">
              <Download size={16} />
              Export
            </ActionButton>
          </div>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <ChartContainer
        title="Sales Performance Trend"
        subtitle="Monthly sales and order volume over the past year"
        className="mb-8"
      >
        <LineChart
          data={salesTrendData}
          lines={salesTrendLines}
          height={400}
        />
      </ChartContainer>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Category Performance */}
        <ChartContainer
          title="Category Performance"
          subtitle="Revenue distribution by product category"
        >
          <DonutChart
            data={categoryPerformanceData}
            colors={categoryColors}
            height={300}
          />
        </ChartContainer>

        {/* Top Products */}
        <ChartContainer
          title="Top Performing Products"
          subtitle="Best sellers by unit sales"
        >
          <BarChart
            data={topProductsData}
            bars={[{ dataKey: 'sales', name: 'Units Sold', color: '#1E40AF' }]}
            height={300}
          />
        </ChartContainer>
      </div>

      {/* Performance Metrics Table */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Key Performance Indicators</h3>
            <p className="text-sm text-gray-600">Essential business metrics and trends</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {performanceMetrics.map((item, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">{item.metric}</span>
                <span className={`text-xs font-medium ${
                  item.trend === 'up' ? 'text-success' : 'text-danger'
                }`}>
                  {item.trend === 'up' ? '↗' : '↘'} {item.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products Revenue Table */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Product Revenue Analysis</h3>
            <p className="text-sm text-gray-600">Detailed breakdown of top-performing products</p>
          </div>
          <ActionButton variant="outline" size="md">
            View Full Report
          </ActionButton>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Units Sold</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Avg. Unit Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Performance</th>
              </tr>
            </thead>
            <tbody>
              {topProductsData.map((product, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{product.name}</td>
                  <td className="py-3 px-4 text-gray-600">{product.sales.toLocaleString()}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">₿{product.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">₿{(product.revenue / product.sales).toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${index < 2 ? 'bg-success' : index < 4 ? 'bg-warning' : 'bg-gray-400'}`}></div>
                      <span className={`text-sm font-medium ${index < 2 ? 'text-success' : index < 4 ? 'text-warning' : 'text-gray-600'}`}>
                        {index < 2 ? 'Excellent' : index < 4 ? 'Good' : 'Average'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights Panel */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💡 Business Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-info text-xl">📈</span>
              <div>
                <p className="font-medium text-gray-900">Strong Q4 Performance</p>
                <p className="text-sm text-gray-600">Revenue is up 18.5% compared to last quarter, driven by electronics sales.</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-success text-xl">🎯</span>
              <div>
                <p className="font-medium text-gray-900">Customer Growth</p>
                <p className="text-sm text-gray-600">New customer acquisition is 12.3% above target for this period.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}