'use client'

import { useMemo, useState } from 'react'
import PageLayout from '../../components/layout/PageLayout'
import MetricCard from '../../components/ui/MetricCard'
import DataTable from '../../components/ui/DataTable'
import SearchBar from '../../components/ui/SearchBar'
import StatusBadge from '../../components/ui/StatusBadge'
import ActionButton from '../../components/ui/ActionButton'
import demoStore from '../../lib/demoStore'
import { Package, Plus, Filter, RefreshCw, Download, CheckCircle, AlertTriangle, OctagonAlert } from 'lucide-react'
import { exportCSV, printSummary } from '../../utils/exportUtils'

export default function InventoryPage() {
  const [datasetId, setDatasetId] = useState('electronics')
  const snapshot = useMemo(() => demoStore.getSnapshot(datasetId), [datasetId])
  const datasets = demoStore.listDatasets()
  const inventoryData = snapshot.inventory.items.map((item, idx) => ({ id: idx + 1, ...item }))

  const columns = [
    {
      key: 'name',
      label: 'Product Name',
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.sku}</div>
        </div>
      )
    },
    { key: 'category', label: 'Category' },
    { key: 'currentStock', label: 'Stock', render: (value) => <span className="font-medium">{value}</span> },
    { key: 'avgDaily', label: 'Avg Daily' },
    { key: 'reorderQty', label: 'Reorder Qty' },
    { key: 'status', label: 'Status', render: (value) => <StatusBadge status={value} />, sortable: false }
  ]

  const summary = snapshot.inventory.summary
  const reorderPlan = snapshot.reorders

  const exportReorderCSV = () => {
    if (!reorderPlan.length) return
    exportCSV('reorder_plan.csv', ['sku', 'name', 'reorderQty', 'reason', 'suggestedDate'], reorderPlan)
  }

  const exportReorderPDF = () => {
    if (!reorderPlan.length) return
    const lines = reorderPlan.map((r) => `${r.sku} - ${r.name}: ${r.reorderQty} units (${r.reason}, ${r.suggestedDate})`)
    printSummary('Reorder Plan', lines)
  }

  return (
    <PageLayout
      title="Inventory Management"
      subtitle="Stock risk and reorder plan from demo data"
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
        <button className="flex items-center gap-2 text-sm text-primary" onClick={() => setDatasetId((prev) => prev)}>
          <RefreshCw className="w-4 h-4" /> Refresh snapshot
        </button>
      </div>

      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Total SKUs" value={summary.total.toString()} subtitle="Active products" icon={<Package size={24} />} iconBgColor="bg-primary" />
        <MetricCard title="In Stock" value={summary.good.toString()} subtitle="Good cover" icon={<CheckCircle className="w-6 h-6" />} iconBgColor="bg-success" />
        <MetricCard title="Low Stock" value={summary.low.toString()} subtitle="Below lead-time" icon={<AlertTriangle className="w-6 h-6" />} iconBgColor="bg-warning" />
        <MetricCard title="Out of Stock" value={summary.out.toString()} subtitle="Needs action" icon={<OctagonAlert className="w-6 h-6" />} iconBgColor="bg-danger" />
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <SearchBar placeholder="Search products, SKU, or category..." size="md" />
          </div>
          <div className="flex gap-3">
            <ActionButton variant="outline" size="md">
              <Filter size={16} />
              Filter
            </ActionButton>
            <ActionButton variant="primary" size="md">
              <Plus size={16} />
              Add Product
            </ActionButton>
            <ActionButton variant="outline" size="md" onClick={exportReorderCSV}>
              <Download size={16} />
              Reorder CSV
            </ActionButton>
            <ActionButton variant="outline" size="md" onClick={exportReorderPDF}>
              <Download size={16} />
              Reorder PDF
            </ActionButton>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <DataTable columns={columns} data={inventoryData} loading={false} sortable={true} />
    </PageLayout>
  )
}