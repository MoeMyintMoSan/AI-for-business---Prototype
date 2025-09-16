'use client'

import PageLayout from '../../components/layout/PageLayout'
import MetricCard from '../../components/ui/MetricCard'
import DataTable from '../../components/ui/DataTable'
import SearchBar from '../../components/ui/SearchBar'
import StatusBadge from '../../components/ui/StatusBadge'
import ActionButton from '../../components/ui/ActionButton'
import { Package, Plus, Filter } from 'lucide-react'

export default function InventoryPage() {
  // Mock inventory data
  const inventoryData = [
    {
      id: 1,
      name: "iPhone 13 Clear Case",
      sku: "IP13-CASE-001",
      currentStock: 45,
      minThreshold: 10,
      status: "good",
      platform: "Shopee",
      salesVelocity: "12/week",
      category: "Electronics"
    },
    {
      id: 2,
      name: "Wireless Bluetooth Earbuds",
      sku: "BT-EAR-002",
      currentStock: 8,
      minThreshold: 15,
      status: "low",
      platform: "Lazada",
      salesVelocity: "8/week",
      category: "Electronics"
    },
    {
      id: 3,
      name: "Samsung Fast Charger",
      sku: "SAM-CHG-003",
      currentStock: 0,
      minThreshold: 5,
      status: "out",
      platform: "Shopee",
      salesVelocity: "15/week",
      category: "Electronics"
    },
    {
      id: 4,
      name: "Beauty Face Serum",
      sku: "BEA-SER-004",
      currentStock: 32,
      minThreshold: 10,
      status: "good",
      platform: "Facebook",
      salesVelocity: "6/week",
      category: "Beauty"
    },
    {
      id: 5,
      name: "Portable Phone Stand",
      sku: "PHN-STD-005",
      currentStock: 7,
      minThreshold: 12,
      status: "low",
      platform: "Lazada",
      salesVelocity: "4/week",
      category: "Accessories"
    }
  ]

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
    {
      key: 'category',
      label: 'Category'
    },
    {
      key: 'currentStock',
      label: 'Stock',
      render: (value) => (
        <span className="font-medium">{value}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={value} />,
      sortable: false
    },
    {
      key: 'platform',
      label: 'Platform'
    },
    {
      key: 'salesVelocity',
      label: 'Sales Velocity'
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value, row) => (
        <div className="flex gap-2">
          <ActionButton variant="outline" size="sm">
            Edit
          </ActionButton>
          {row.status === 'low' || row.status === 'out' ? (
            <ActionButton variant="warning" size="sm">
              Reorder
            </ActionButton>
          ) : null}
        </div>
      ),
      sortable: false
    }
  ]

  // Calculate summary stats
  const totalSKU = inventoryData.length
  const inStock = inventoryData.filter(item => item.status === 'good').length
  const lowStock = inventoryData.filter(item => item.status === 'low').length
  const outOfStock = inventoryData.filter(item => item.status === 'out').length

  return (
    <PageLayout 
      title="Inventory Management" 
      subtitle="Manage your product inventory and stock levels"
    >
      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total SKUs"
          value={totalSKU.toString()}
          subtitle="Active products"
          icon={<Package size={24} />}
          iconBgColor="bg-primary"
        />
        
        <MetricCard
          title="In Stock"
          value={inStock.toString()}
          subtitle="Good stock levels"
          icon="🟢"
          iconBgColor="bg-success"
        />
        
        <MetricCard
          title="Low Stock"
          value={lowStock.toString()}
          subtitle="Needs attention"
          icon="🟡"
          iconBgColor="bg-warning"
        />
        
        <MetricCard
          title="Out of Stock"
          value={outOfStock.toString()}
          subtitle="Immediate action needed"
          icon="🔴"
          iconBgColor="bg-danger"
        />
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <SearchBar 
              placeholder="Search products, SKU, or category..."
              size="md"
            />
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
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <DataTable
        columns={columns}
        data={inventoryData}
        loading={false}
        sortable={true}
      />
    </PageLayout>
  )
}