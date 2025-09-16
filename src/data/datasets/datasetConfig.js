// Dataset Manager for StockWise AI
// Handles multiple Kaggle datasets for different prediction scenarios

export const AVAILABLE_DATASETS = {
  ECOMMERCE_SALES: {
    id: 'ecommerce_sales',
    name: 'E-commerce Sales Data',
    description: 'Retail transaction data for e-commerce analysis and forecasting',
    source: 'Kaggle: prasad22/retail-transactions-dataset',
    attributes: ['transaction_id', 'product_name', 'category', 'quantity', 'price', 'customer_id', 'date'],
    predictionType: 'Sales Forecasting',
    icon: '🛒',
    color: 'bg-blue-500',
    filename: 'ecommerce_sales.csv',
    sampleSize: '500K+ transactions',
    timeRange: '2020-2024',
    confidence: 'High (87-92%)'
  },
  
  INVENTORY_MANAGEMENT: {
    id: 'inventory_mgmt',
    name: 'Inventory Management Data',
    description: 'Sales data optimized for inventory management and stock predictions',
    source: 'Kaggle: vinothkannaece/sales-dataset',
    attributes: ['product_id', 'sales_quantity', 'stock_level', 'reorder_point', 'supplier', 'date'],
    predictionType: 'Stock Optimization',
    icon: '📦',
    color: 'bg-green-500',
    filename: 'inventory_mgmt.csv',
    sampleSize: '100K+ records',
    timeRange: '2021-2024',
    confidence: 'High (85-90%)'
  },
  
  SEASONAL_TRENDS: {
    id: 'seasonal_trends',
    name: 'Seasonal Trends Data',
    description: 'Weekly sales transactions showing seasonal patterns and trends',
    source: 'Kaggle: crawford/weekly-sales-transactions',
    attributes: ['week', 'year', 'sales_amount', 'product_category', 'season', 'promotion'],
    predictionType: 'Seasonal Forecasting',
    icon: '📅',
    color: 'bg-purple-500',
    filename: 'seasonal_trends.csv',
    sampleSize: '200K+ weekly records',
    timeRange: '2019-2024',
    confidence: 'Medium (78-85%)'
  },
  
  CUSTOMER_BEHAVIOR: {
    id: 'customer_behavior',
    name: 'Customer Behavior Data',
    description: 'Sales transactions for customer behavior analysis and segmentation',
    source: 'Kaggle: srinivasav22/sales-transactions-dataset',
    attributes: ['customer_id', 'product_id', 'purchase_amount', 'frequency', 'segment', 'lifetime_value'],
    predictionType: 'Demand Prediction',
    icon: '👥',
    color: 'bg-orange-500',
    filename: 'customer_behavior.csv',
    sampleSize: '300K+ transactions',
    timeRange: '2022-2024',
    confidence: 'High (88-93%)'
  }
}

export const getDatasetById = (id) => {
  return AVAILABLE_DATASETS[Object.keys(AVAILABLE_DATASETS).find(key => 
    AVAILABLE_DATASETS[key].id === id
  )]
}

export const getAllDatasets = () => {
  return Object.values(AVAILABLE_DATASETS)
}

// Mock data structure for each dataset type
export const DATASET_SAMPLES = {
  ecommerce_sales: [
    { product_name: "iPhone 13 Case", category: "Electronics", price: 450, sales_volume: 1240, date: "2024-09-01", platform: "Shopee" },
    { product_name: "Wireless Earbuds", category: "Electronics", price: 1200, sales_volume: 980, date: "2024-09-01", platform: "Lazada" },
    { product_name: "Beauty Serum", category: "Beauty", price: 890, sales_volume: 523, date: "2024-09-01", platform: "Facebook" }
  ],
  
  inventory_mgmt: [
    { sku: "IP13-CASE-001", current_stock: 45, reorder_point: 10, lead_time: 7, demand_rate: 12 },
    { sku: "BT-EAR-002", current_stock: 8, reorder_point: 15, lead_time: 14, demand_rate: 8 },
    { sku: "BEA-SER-004", current_stock: 32, reorder_point: 10, lead_time: 5, demand_rate: 6 }
  ],
  
  seasonal_trends: [
    { month: "December", category: "Electronics", weather: "Cool", holiday: "New Year", sales_multiplier: 1.8 },
    { month: "April", category: "Beauty", weather: "Hot", holiday: "Songkran", sales_multiplier: 1.3 },
    { month: "July", category: "Fashion", weather: "Rainy", holiday: "None", sales_multiplier: 0.9 }
  ],
  
  customer_behavior: [
    { customer_segment: "Tech Enthusiasts", product_affinity: "Electronics", purchase_frequency: "Weekly", avg_order_value: 2500 },
    { customer_segment: "Beauty Lovers", product_affinity: "Cosmetics", purchase_frequency: "Monthly", avg_order_value: 1200 },
    { customer_segment: "Bargain Hunters", product_affinity: "Mixed", purchase_frequency: "Bi-weekly", avg_order_value: 800 }
  ]
}