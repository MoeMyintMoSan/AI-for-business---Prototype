// Demo data store for small-scale, offline-friendly demos
// Provides sample transactions, inventory, and heuristics for risk/alert computation.

let uploadedDataset = null

const SAMPLE_DATASETS = {
  electronics: {
    name: 'Electronics Accessories',
    leadTimes: { default: 7, Electronics: 7, Accessories: 10 },
    minThreshold: 10,
    transactions: [
      { date: '2024-09-01', sku: 'IP13-CASE-001', product: 'iPhone 13 Clear Case', category: 'Accessories', qty: 18, price: 450, channel: 'Shopee' },
      { date: '2024-09-02', sku: 'IP13-CASE-001', product: 'iPhone 13 Clear Case', category: 'Accessories', qty: 22, price: 450, channel: 'Shopee' },
      { date: '2024-09-01', sku: 'BT-EAR-002', product: 'Wireless Bluetooth Earbuds', category: 'Electronics', qty: 14, price: 1200, channel: 'Lazada' },
      { date: '2024-09-02', sku: 'BT-EAR-002', product: 'Wireless Bluetooth Earbuds', category: 'Electronics', qty: 10, price: 1200, channel: 'Lazada' },
      { date: '2024-09-03', sku: 'BT-EAR-002', product: 'Wireless Bluetooth Earbuds', category: 'Electronics', qty: 12, price: 1200, channel: 'Shopee' },
      { date: '2024-09-01', sku: 'SAM-CHG-003', product: 'Samsung Fast Charger', category: 'Electronics', qty: 9, price: 650, channel: 'Shopee' },
      { date: '2024-09-02', sku: 'SAM-CHG-003', product: 'Samsung Fast Charger', category: 'Electronics', qty: 7, price: 650, channel: 'Shopee' },
      { date: '2024-09-03', sku: 'SAM-CHG-003', product: 'Samsung Fast Charger', category: 'Electronics', qty: 8, price: 650, channel: 'Shopee' },
      { date: '2024-09-01', sku: 'BEA-SER-004', product: 'Beauty Face Serum', category: 'Beauty', qty: 6, price: 890, channel: 'Facebook' }
    ],
    stockLevels: {
      'IP13-CASE-001': { current: 45 },
      'BT-EAR-002': { current: 8 },
      'SAM-CHG-003': { current: 0 },
      'BEA-SER-004': { current: 32 }
    }
  },
  beauty: {
    name: 'Beauty & Personal Care',
    leadTimes: { default: 5, Beauty: 5 },
    minThreshold: 8,
    transactions: [
      { date: '2024-09-01', sku: 'BEA-SER-010', product: 'Hyaluronic Face Serum', category: 'Beauty', qty: 15, price: 990, channel: 'Shopee' },
      { date: '2024-09-02', sku: 'BEA-SER-010', product: 'Hyaluronic Face Serum', category: 'Beauty', qty: 12, price: 990, channel: 'Lazada' },
      { date: '2024-09-03', sku: 'BEA-MSK-002', product: 'Vitamin C Sheet Mask', category: 'Beauty', qty: 30, price: 120, channel: 'Shopee' },
      { date: '2024-09-04', sku: 'BEA-MSK-002', product: 'Vitamin C Sheet Mask', category: 'Beauty', qty: 24, price: 120, channel: 'Shopee' },
      { date: '2024-09-05', sku: 'BEA-OIL-003', product: 'Argan Hair Oil', category: 'Beauty', qty: 10, price: 450, channel: 'Facebook' },
      { date: '2024-09-05', sku: 'BEA-OIL-003', product: 'Argan Hair Oil', category: 'Beauty', qty: 8, price: 450, channel: 'Facebook' }
    ],
    stockLevels: {
      'BEA-SER-010': { current: 20 },
      'BEA-MSK-002': { current: 60 },
      'BEA-OIL-003': { current: 12 }
    }
  }
}

function getDataset(datasetId = 'electronics') {
  if (datasetId === 'uploaded' && uploadedDataset) return uploadedDataset
  return SAMPLE_DATASETS[datasetId] || SAMPLE_DATASETS.electronics
}

function setUploadedDataset(rows) {
  if (!rows || rows.length === 0) return

  const transactions = rows.map((row) => ({
    date: row.date,
    sku: row.sku,
    product: row.product,
    category: row.category || 'General',
    qty: Number(row.qty || row.quantity || 0),
    price: Number(row.price || 0),
    channel: row.channel || 'Unknown'
  })).filter((r) => r.sku && r.date)

  const stockLevels = {}
  transactions.forEach((t) => {
    if (!stockLevels[t.sku]) {
      stockLevels[t.sku] = { current: Math.max(8, Math.round(t.qty * 0.6)) }
    }
  })

  uploadedDataset = {
    id: 'uploaded',
    name: 'Uploaded CSV',
    leadTimes: { default: 7 },
    minThreshold: 8,
    transactions,
    stockLevels
  }
}

function aggregateBySku(dataset) {
  const map = {}
  dataset.transactions.forEach((tx) => {
    const key = tx.sku
    if (!map[key]) {
      map[key] = {
        sku: tx.sku,
        product: tx.product,
        category: tx.category,
        channel: tx.channel,
        qty: 0,
        revenue: 0,
        days: new Set()
      }
    }
    map[key].qty += tx.qty
    map[key].revenue += tx.qty * tx.price
    map[key].days.add(tx.date)
  })
  return map
}

function computeMetrics(datasetId) {
  const dataset = getDataset(datasetId)
  const agg = aggregateBySku(dataset)
  const totalRevenue = Object.values(agg).reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = dataset.transactions.length
  const topProducts = Object.values(agg)
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5)
    .map((item) => ({ name: item.product, sales: item.qty, revenue: item.revenue }))

  return {
    datasetId,
    datasetName: dataset.name,
    revenue: totalRevenue,
    orders: totalOrders,
    aov: totalOrders ? totalRevenue / totalOrders : 0,
    topProducts
  }
}

function computeInventory(datasetId) {
  const dataset = getDataset(datasetId)
  const agg = aggregateBySku(dataset)
  const items = Object.values(agg).map((item) => {
    const stock = dataset.stockLevels[item.sku]?.current ?? 0
    const leadTime = dataset.leadTimes[item.category] || dataset.leadTimes.default || 7
    const avgDaily = item.qty / (item.days.size || 1)
    const riskThreshold = avgDaily * leadTime
    const status = stock === 0 ? 'out' : stock < riskThreshold ? 'low' : 'good'
    const reorderQty = Math.max(dataset.minThreshold, Math.round(avgDaily * 14)) - stock

    return {
      sku: item.sku,
      name: item.product,
      category: item.category,
      currentStock: stock,
      avgDaily: Number(avgDaily.toFixed(2)),
      status,
      reorderQty: reorderQty > 0 ? reorderQty : 0,
      riskThreshold: Math.round(riskThreshold)
    }
  })

  const summary = {
    total: items.length,
    good: items.filter((i) => i.status === 'good').length,
    low: items.filter((i) => i.status === 'low').length,
    out: items.filter((i) => i.status === 'out').length
  }

  return { items, summary }
}

function buildAlerts(datasetId) {
  const { items } = computeInventory(datasetId)
  const alerts = []
  items.forEach((item) => {
    if (item.status === 'out') {
      alerts.push({
        title: `Stockout: ${item.name}`,
        message: `${item.sku} has zero stock. Reorder at least ${Math.max(10, item.reorderQty || 10)} units.`,
        priority: 'high',
        type: 'stock'
      })
    } else if (item.status === 'low') {
      alerts.push({
        title: `Low stock: ${item.name}`,
        message: `${item.sku} below lead-time cover. Add ${Math.max(item.reorderQty, 8)} units to avoid stockout.`,
        priority: 'medium',
        type: 'stock'
      })
    }
  })
  return alerts.slice(0, 8)
}

function buildReorderPlan(datasetId) {
  const { items } = computeInventory(datasetId)
  return items
    .filter((i) => i.reorderQty > 0)
    .map((i) => ({
      sku: i.sku,
      name: i.name,
      reorderQty: i.reorderQty,
      reason: i.status === 'out' ? 'Stockout' : 'Below lead-time cover',
      suggestedDate: 'within 5 days'
    }))
}

function getForecastSnapshot(datasetId) {
  const metrics = computeMetrics(datasetId)
  const inventory = computeInventory(datasetId)
  const alerts = buildAlerts(datasetId)
  const reorders = buildReorderPlan(datasetId)

  return {
    metrics,
    inventory,
    alerts,
    reorders
  }
}

const DEMO_INSIGHTS = {
  risks: [
    { title: 'Wireless Earbuds stockout risk', why: 'Cover < 5 days at current velocity', action: 'Reorder 25 units now', confidence: 88 },
    { title: 'Samsung Charger lost sales', why: 'Already out of stock for 2 days', action: 'Rush order 30 units', confidence: 86 }
  ],
  opportunities: [
    { title: 'iPhone Case upsell', why: 'High attach rate with new phone launch', action: 'Bundle with screen protectors', confidence: 80 },
    { title: 'Beauty Serum margin', why: 'Stable demand with 18% margin headroom', action: 'Test +8% price increase', confidence: 76 }
  ],
  reorders: [
    { sku: 'BT-EAR-002', qty: 25, when: 'Order this week', reason: 'Stockout risk in 5 days' },
    { sku: 'SAM-CHG-003', qty: 30, when: 'Order today', reason: 'Zero stock, high velocity' }
  ]
}

export function getDemoInsights() {
  return DEMO_INSIGHTS
}

export function getSnapshot(datasetId) {
  return getForecastSnapshot(datasetId)
}

export function listDatasets() {
  const base = Object.keys(SAMPLE_DATASETS).map((key) => ({ id: key, name: SAMPLE_DATASETS[key].name }))
  if (uploadedDataset) {
    base.unshift({ id: 'uploaded', name: 'Uploaded CSV' })
  }
  return base
}

export default {
  getDataset,
  getSnapshot,
  computeMetrics,
  computeInventory,
  buildAlerts,
  buildReorderPlan,
  listDatasets,
  getDemoInsights,
  setUploadedDataset
}
