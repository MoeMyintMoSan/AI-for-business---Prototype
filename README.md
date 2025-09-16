# 🚀 StockWise AI - Intelligent Inventory Management

A Next.js-powered AI inventory management system for Thai MSMEs, featuring real-time predictions powered by Google's Gemini AI and Kaggle datasets.

## ✨ Features

- 📊 **Real-time Dashboard** - Revenue tracking, sales metrics, and KPIs
- 📦 **Smart Inventory Management** - Stock levels, alerts, and reorder predictions
- 🤖 **AI-Powered Forecasting** - Gemini AI integration with Kaggle datasets
- 🔔 **Intelligent Alerts** - Critical stock and sales notifications
- 📈 **Advanced Analytics** - Sales trends and performance insights
- 💬 **AI Chat Assistant** - Ask questions about your business data

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
# or
yarn install
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory:
```bash
# Gemini AI Configuration
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# Dataset Configuration
NEXT_PUBLIC_DATASET_PATH=/src/data/datasets

# Development Settings
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=StockWise AI
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 3. Download Kaggle Datasets

**Prerequisites:**
```bash
# Install kagglehub
pip install kagglehub

# Authenticate with Kaggle (first time only)
kaggle auth login
```

**Run the dataset downloader:**
```bash
# Navigate to project directory
cd path/to/stockwise/demo

# Run the dataset downloader script
python download_datasets.py
```

**Manual dataset download (alternative):**
```python
import kagglehub

# Download the 4 datasets used in StockWise AI
datasets = [
    "prasad22/retail-transactions-dataset",      # E-commerce Sales
    "vinothkannaece/sales-dataset",             # Inventory Management  
    "crawford/weekly-sales-transactions",        # Seasonal Trends
    "srinivasav22/sales-transactions-dataset"   # Customer Behavior
]

for dataset in datasets:
    path = kagglehub.dataset_download(dataset)
    print(f"Downloaded: {dataset} to {path}")
```

### 4. Start Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
demo/
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── analytics/          # Sales analytics page
│   │   ├── forecasting/        # AI predictions & chat
│   │   ├── inventory/          # Inventory management
│   │   └── alerts/             # Smart alerts system
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── layout/             # Layout components
│   │   └── charts/             # Chart components
│   ├── data/
│   │   └── datasets/           # Kaggle datasets (not in git)
│   └── utils/
│       └── geminiService.js    # Gemini AI integration
├── download_datasets.py        # Kaggle dataset downloader
└── .env.local                  # Environment variables
```

## 🎯 Key Pages

- **Dashboard** (`/`) - Overview metrics and KPIs
- **Inventory** (`/inventory`) - Stock management and alerts  
- **Forecasting** (`/forecasting`) - AI predictions with dataset selection
- **Analytics** (`/analytics`) - Sales trends and performance
- **Alerts** (`/alerts`) - Critical notifications and actions

## 🤖 AI Features

### Gemini AI Integration
- Real-time business insights and predictions
- Natural language chat interface
- Dataset-driven analysis and recommendations

### Supported Datasets
1. **E-commerce Sales Data** - Transaction analysis and sales forecasting
2. **Inventory Management Data** - Stock optimization and reorder predictions  
3. **Seasonal Trends Data** - Seasonal patterns and holiday impact
4. **Customer Behavior Data** - Customer segmentation and behavior analysis

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Troubleshooting

**Datasets not loading?**
- Ensure datasets are downloaded to `src/data/datasets/`
- Check that `.env.local` contains your Gemini API key
- Verify Kaggle authentication: `kaggle auth status`

**AI features not working?**
- Verify Gemini API key in `.env.local`
- Check browser console for API errors
- Ensure you have valid API quota

## 📄 License

This project is developed for educational and demonstration purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
