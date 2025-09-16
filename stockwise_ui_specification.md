# StockWise AI - Frontend Prototype Development Guide

## Project Overview
**Purpose:** Create a Next.js frontend prototype to showcase StockWise AI's dashboard and core functionality for final presentation
**Target:** MSME owners/managers in Thailand (non-technical users)
**Focus:** Intuitive, mobile-first design with core inventory management features

---

## Design System & Branding

### Primary Colors
```css
:root {
  /* Primary Brand Colors */
  --primary-blue: #1E40AF;      /* Main brand color - professional trust */
  --primary-light: #3B82F6;     /* Lighter blue for buttons/accents */
  --primary-dark: #1E3A8A;      /* Darker blue for headers */
  
  /* Secondary Colors */
  --success-green: #10B981;     /* Stock level good */
  --warning-yellow: #F59E0B;    /* Low stock warning */
  --danger-red: #EF4444;        /* Out of stock / critical */
  --info-cyan: #06B6D4;         /* Information highlights */
  
  /* Neutral Colors */
  --gray-50: #F9FAFB;          /* Background */
  --gray-100: #F3F4F6;         /* Card backgrounds */
  --gray-200: #E5E7EB;         /* Borders */
  --gray-600: #4B5563;         /* Text secondary */
  --gray-900: #111827;         /* Text primary */
  --white: #FFFFFF;            /* Pure white */
}
```

### Typography
- **Primary Font:** Inter (clean, professional, good for data)
- **Headings:** 600-700 weight
- **Body:** 400-500 weight
- **Numbers/Data:** 500-600 weight (emphasis on metrics)

### Design Principles
- **Mobile-First:** Responsive design starting from 320px
- **Clean & Minimal:** Avoid clutter, focus on key metrics
- **Data-Driven:** Charts and numbers prominently displayed
- **Intuitive Navigation:** Maximum 3 clicks to any feature
- **Thai-Friendly:** Support for Thai text, local currency format

---

## Page Structure & Layout

### 1. Landing/Dashboard Page (`/`)
**Primary Purpose:** Overview of business health and key metrics

#### Layout Components:
```
┌─────────────────────────────────────────┐
│ Header: Logo + Navigation + User Info   │
├─────────────────────────────────────────┤
│ Key Metrics Cards (4-card grid)         │
│ ┌─────────┬─────────┬─────────┬─────────┐│
│ │Revenue  │Inventory│Low Stock│Stockouts││
│ │₿45,280  │₿28,950  │   12    │    3    ││
│ └─────────┴─────────┴─────────┴─────────┘│
├─────────────────────────────────────────┤
│ Sales Forecast Chart (7-day trend)      │
├─────────────────────────────────────────┤
│ Quick Actions Bar                       │
│ [Add Product] [Generate Report] [Alerts]│
├─────────────────────────────────────────┤
│ Recent Activity Feed (5 latest items)   │
└─────────────────────────────────────────┘
```

#### Key Features:
- **Revenue Card:** Total monthly revenue with % change
- **Inventory Value:** Current stock value
- **Low Stock Alert:** Count of products below threshold
- **Stockout Alert:** Count of out-of-stock products
- **Sales Forecast:** Interactive line chart showing 7-day prediction
- **Quick Actions:** Primary CTA buttons
- **Activity Feed:** Recent stock movements, alerts, reorders

#### Mock Data Examples:
```javascript
const dashboardData = {
  revenue: { current: 45280, change: "+12.5%" },
  inventoryValue: 28950,
  lowStockCount: 12,
  stockoutCount: 3,
  salesForecast: [1200, 1350, 1180, 1420, 1380, 1450, 1520],
  recentActivity: [
    "iPhone 13 Case restocked (50 units)",
    "Wireless Earbuds low stock alert",
    "Samsung Charger sold out",
    "Forecast updated for next week",
    "Beauty Serum reorder suggested"
  ]
}
```

---

### 2. Inventory Management Page (`/inventory`)
**Primary Purpose:** Detailed product management and stock levels

#### Layout Components:
```
┌─────────────────────────────────────────┐
│ Page Header + Search/Filter Bar         │
├─────────────────────────────────────────┤
│ Inventory Summary Cards                 │
│ ┌─────────┬─────────┬─────────┬─────────┐│
│ │Total SKU│In Stock │Low Stock│Out Stock││
│ │   245   │   198   │   12    │    3    ││
│ └─────────┴─────────┴─────────┴─────────┘│
├─────────────────────────────────────────┤
│ Product Table with Status Indicators    │
│ ┌──────────────────────────────────────┐ │
│ │Product Name    │Stock│Status│Actions │ │
│ │iPhone 13 Case  │ 45  │ 🟢   │[Edit]  │ │
│ │Wireless Earbuds│  8  │ 🟡   │[Edit]  │ │
│ │Samsung Charger │  0  │ 🔴   │[Edit]  │ │
│ └──────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ Bulk Actions + Add Product Button       │
└─────────────────────────────────────────┘
```

#### Key Features:
- **Search & Filter:** By category, stock status, platform
- **Status Indicators:** 🟢 Good Stock, 🟡 Low Stock, 🔴 Out of Stock
- **Sortable Columns:** Name, Stock Level, Sales Velocity, Platform
- **Quick Actions:** Edit, Reorder, View Analytics per product
- **Bulk Operations:** Multi-select for bulk updates

#### Mock Data Examples:
```javascript
const inventoryData = [
  {
    id: 1,
    name: "iPhone 13 Clear Case",
    sku: "IP13-CASE-001",
    currentStock: 45,
    minThreshold: 10,
    status: "good", // good, low, out
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
  }
]
```

---

### 3. AI Forecasting Page (`/forecasting`)
**Primary Purpose:** Display AI predictions and demand forecasting

#### Layout Components:
```
┌─────────────────────────────────────────┐
│ Forecasting Header + Time Range Selector│
├─────────────────────────────────────────┤
│ Forecast Accuracy Metrics               │
│ ┌─────────┬─────────┬─────────┬─────────┐│
│ │Overall  │This Week│Last Week│Trend    ││
│ │  87%    │   89%   │   84%   │ ↗ +5%  ││
│ └─────────┴─────────┴─────────┴─────────┘│
├─────────────────────────────────────────┤
│ Main Forecast Chart (Sales Prediction)  │
│ [Interactive chart with past vs predicted]│
├─────────────────────────────────────────┤
│ Top Products Forecast Table             │
│ ┌──────────────────────────────────────┐ │
│ │Product        │Current│7-day │Trend │ │
│ │iPhone Case    │  45   │ 38   │ ↘ 7  │ │
│ │Earbuds        │  8    │ 15   │ ↗ 7  │ │
│ └──────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ AI Insights & Recommendations           │
└─────────────────────────────────────────┘
```

#### Key Features:
- **Time Range Selector:** 7 days, 30 days, 90 days
- **Accuracy Metrics:** Model performance indicators
- **Interactive Charts:** Historical data vs AI predictions
- **Product-Level Forecasts:** Individual SKU predictions
- **AI Insights:** Natural language recommendations

#### Mock Data Examples:
```javascript
const forecastData = {
  accuracy: { overall: 87, thisWeek: 89, lastWeek: 84 },
  salesPrediction: {
    historical: [120, 135, 118, 142, 138, 145, 152],
    predicted: [148, 155, 162, 158, 165, 172, 168]
  },
  topProducts: [
    {
      name: "iPhone 13 Case",
      current: 45,
      predicted7day: 38,
      trend: -7,
      confidence: 89
    }
  ],
  aiInsights: [
    "Electronics sales expected to increase 12% next week",
    "Recommend restocking Wireless Earbuds within 3 days",
    "Beauty products show seasonal decline pattern"
  ]
}
```

---

### 4. Alerts & Notifications Page (`/alerts`)
**Primary Purpose:** Manage stock alerts and AI recommendations

#### Layout Components:
```
┌─────────────────────────────────────────┐
│ Alerts Header + Filter Tabs             │
│ [All] [Critical] [Low Stock] [Reorder]  │
├─────────────────────────────────────────┤
│ Alert Summary Cards                     │
│ ┌─────────┬─────────┬─────────┬─────────┐│
│ │Critical │Low Stock│Reorder  │Resolved ││
│ │    3    │   12    │    7    │   45    ││
│ └─────────┴─────────┴─────────┴─────────┘│
├─────────────────────────────────────────┤
│ Alerts Feed                             │
│ ┌──────────────────────────────────────┐ │
│ │🔴 Samsung Charger - Out of Stock     │ │
│ │🟡 Wireless Earbuds - Low Stock (8)   │ │
│ │🔵 iPhone Case - Reorder Suggested    │ │
│ │✅ Beauty Serum - Restocked (Resolved)│ │
│ └──────────────────────────────────────┘ │
├─────────────────────────────────────────┤
│ Bulk Actions + Settings                 │
└─────────────────────────────────────────┘
```

#### Key Features:
- **Alert Categories:** Critical, Low Stock, Reorder Suggestions, Resolved
- **Priority Indicators:** Color-coded urgency levels
- **Action Buttons:** Mark as resolved, snooze, take action
- **Bulk Management:** Select multiple alerts
- **Alert Settings:** Configure thresholds and notification preferences

---

### 5. Analytics & Reports Page (`/analytics`)
**Primary Purpose:** Business intelligence and performance metrics

#### Layout Components:
```
┌─────────────────────────────────────────┐
│ Analytics Header + Date Range Picker    │
├─────────────────────────────────────────┤
│ KPI Overview Cards                      │
│ ┌─────────┬─────────┬─────────┬─────────┐│
│ │Revenue  │Turnover │Profit   │Accuracy ││
│ │₿45,280  │  2.1x   │₿18,650  │  87%    ││
│ └─────────┴─────────┴─────────┴─────────┘│
├─────────────────────────────────────────┤
│ Charts Section (2x2 Grid)               │
│ ┌──────────────┬──────────────────────┐ │
│ │Sales Trend   │Category Performance  │ │
│ │[Line Chart]  │[Donut Chart]        │ │
│ ├──────────────┼──────────────────────┤ │
│ │Stock Turnover│Platform Comparison   │ │
│ │[Bar Chart]   │[Stacked Bar Chart]   │ │
│ └──────────────┴──────────────────────┘ │
├─────────────────────────────────────────┤
│ Export Options + Scheduled Reports      │
└─────────────────────────────────────────┘
```

#### Key Features:
- **Date Range Picker:** Custom periods for analysis
- **KPI Cards:** Revenue, Inventory Turnover, Profit Margin, Forecast Accuracy
- **Interactive Charts:** Sales trends, category performance, platform comparison
- **Export Options:** PDF reports, CSV data export
- **Insights Panel:** AI-generated business insights

---

## Navigation & Layout

### Header Component
```
┌─────────────────────────────────────────┐
│ [Logo] StockWise AI    [Dashboard] [Inventory] [Forecasting] [Alerts] [Analytics]     [Profile] │
└─────────────────────────────────────────┘
```

### Mobile Navigation (Hamburger Menu)
```
☰ Menu
├── 📊 Dashboard
├── 📦 Inventory
├── 🔮 Forecasting
├── 🔔 Alerts
└── 📈 Analytics
```

### Sidebar (Desktop - Optional)
- Collapsible sidebar with icons and labels
- Quick stats mini-widgets
- Recent alerts preview

---

## Component Library Requirements

### Essential Components
1. **MetricCard**: Displays KPI with value, label, and trend
2. **StatusBadge**: Color-coded status indicators
3. **DataTable**: Sortable, filterable product table
4. **Chart Components**: Line, Bar, Donut charts (use Chart.js or Recharts)
5. **AlertItem**: Individual alert with actions
6. **SearchBar**: Global search with filters
7. **DateRangePicker**: Custom date selection
8. **ActionButton**: Primary and secondary buttons
9. **EmptyState**: When no data is available
10. **LoadingSpinner**: Data loading states

### Mock Data Structure
```javascript
// Create separate JSON files for each data type
export const mockDashboard = { /* dashboard data */ };
export const mockInventory = [ /* inventory array */ ];
export const mockForecasts = { /* forecast data */ };
export const mockAlerts = [ /* alerts array */ ];
export const mockAnalytics = { /* analytics data */ };
```

---

## Technical Implementation

### Project Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── charts/       # Chart components
│   └── layout/       # Layout components
├── pages/            # Next.js pages
├── data/             # Mock data files
├── styles/           # CSS/SCSS files
├── utils/            # Helper functions
└── types/            # TypeScript types
```

### Key Libraries
- **Next.js 14+** with App Router
- **Tailwind CSS** for styling
- **Chart.js** or **Recharts** for charts
- **Lucide React** for icons
- **Date-fns** for date formatting
- **TypeScript** for type safety

### Responsive Breakpoints
```css
/* Mobile First Approach */
sm: 640px    /* Small tablets */
md: 768px    /* Tablets */
lg: 1024px   /* Desktops */
xl: 1280px   /* Large desktops */
```

---

## Data Formatting Standards

### Currency
- **Thai Baht:** ฿45,280 (with comma separators)
- **Decimals:** Show .00 for whole numbers
- **Negative:** Red color with minus sign

### Numbers
- **Large Numbers:** Use K (thousands), M (millions)
- **Percentages:** One decimal place (87.5%)
- **Stock Quantities:** Whole numbers only

### Dates
- **Format:** DD/MM/YYYY (Thai standard)
- **Relative:** "2 hours ago", "Yesterday"
- **Charts:** Short format (Jan 15, Feb 20)

---

## Content & Copy Guidelines

### Tone & Voice
- **Professional but friendly**
- **Clear and concise**
- **Action-oriented** for buttons
- **Helpful** for error messages

### Key Terminology
- **SKU:** Stock Keeping Unit
- **Turnover:** Inventory turnover rate
- **Velocity:** Sales velocity
- **Threshold:** Minimum stock level
- **Forecast:** AI prediction
- **Alert:** Notification/warning

### Button Labels
- Primary: "View Details", "Generate Report", "Add Product"
- Secondary: "Edit", "Delete", "Export"
- Alerts: "Mark Resolved", "Take Action", "Snooze"

---

## Prototype Limitations (What NOT to Build)

### Exclude These Features:
- ❌ User authentication/login
- ❌ Real API integration
- ❌ Data persistence
- ❌ User settings/preferences
- ❌ Multi-tenant support
- ❌ Advanced filtering
- ❌ File upload functionality
- ❌ Notification system
- ❌ Help/support chat

### Focus On:
- ✅ Visual design and layout
- ✅ Interactive charts and tables
- ✅ Responsive design
- ✅ Core navigation flow
- ✅ Data presentation
- ✅ Status indicators and alerts
- ✅ Mock data demonstration

---

## Screenshot Requirements for Presentation

### Key Screenshots Needed:
1. **Dashboard Overview** - Full desktop view
2. **Mobile Dashboard** - Responsive design
3. **Inventory Table** - Product management
4. **Forecasting Charts** - AI predictions
5. **Alerts Page** - Notification management
6. **Analytics Dashboard** - Business intelligence

### Demo Flow for Presentation:
1. Start with Dashboard showing healthy metrics
2. Navigate to Inventory showing mixed stock levels
3. Show Forecasting with AI predictions
4. Demonstrate Alerts with actionable items
5. End with Analytics showing business insights

This prototype will effectively demonstrate StockWise AI's core value proposition for MSMEs while maintaining simplicity and focus on the essential features that solve real business problems.
