'use client'

import { useMemo, useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import MetricCard from '../components/ui/MetricCard'
import Link from 'next/link'
import demoStore from '../lib/demoStore'
import DataUpload from '../components/ui/DataUpload'
import { DollarSign, TrendingUp, AlertTriangle, OctagonAlert, Package, LineChart } from 'lucide-react'

export default function Dashboard() {
  const [datasetId, setDatasetId] = useState('electronics')
  const snapshot = useMemo(() => demoStore.getSnapshot(datasetId), [datasetId])
  const datasets = demoStore.listDatasets()
  const [uploadNotice, setUploadNotice] = useState('')

  const { metrics, inventory, alerts } = snapshot

  return (
    <PageLayout
      title="Demo Dashboard"
      subtitle="Upload or switch a sample dataset to show immediate value"
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
        <div className="text-sm text-gray-500">Showing snapshot from demo data</div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Revenue"
          value={`฿${metrics.revenue.toLocaleString()}`}
          subtitle={`${metrics.orders} orders | AOV ฿${metrics.aov.toFixed(0)}`}
          icon={<DollarSign className="w-6 h-6" />}
          iconBgColor="bg-primary-light"
        />
        <MetricCard
          title="Top Product"
          value={metrics.topProducts[0]?.name || '—'}
          subtitle={`${metrics.topProducts[0]?.sales || 0} units`}
          icon={<TrendingUp className="w-6 h-6" />}
          iconBgColor="bg-success"
        />
        <MetricCard
          title="Low Stock"
          value={inventory.summary.low.toString()}
          subtitle="Below lead-time cover"
          icon={<AlertTriangle className="w-6 h-6" />}
          iconBgColor="bg-warning"
        />
        <MetricCard
          title="Out of Stock"
          value={inventory.summary.out.toString()}
          subtitle="Needs action"
          icon={<OctagonAlert className="w-6 h-6" />}
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

      {/* Upload (demo) */}
      <div className="mb-8">
        <DataUpload onParsed={(data) => {
          if (data?.rows?.length) {
            demoStore.setUploadedDataset(data.rows)
            setDatasetId('uploaded')
            setUploadNotice(`Using uploaded CSV (${data.rowCount} rows) across dashboard, inventory, alerts, and forecasting.`)
          }
        }} />
      </div>

      {uploadNotice && (
        <div className="mb-6 text-sm text-primary font-medium bg-primary/10 border border-primary/30 rounded-lg px-4 py-3">
          {uploadNotice}
        </div>
      )}

      {/* Alerts preview */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Live Alerts</h3>
            <p className="text-sm text-gray-600">Risk and opportunity signals from the dataset</p>
          </div>
          <Link href="/alerts" className="text-primary text-sm font-medium">View all</Link>
        </div>
        <div className="space-y-3">
          {alerts.slice(0, 4).map((alert, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl text-gray-700">
                {alert.type === 'stock' ? <Package className="w-5 h-5" /> : <LineChart className="w-5 h-5" />}
              </span>
              <div>
                <div className="font-medium text-gray-900">{alert.title}</div>
                <div className="text-sm text-gray-600">{alert.message}</div>
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <div className="text-sm text-gray-500">No alerts for this dataset.</div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}