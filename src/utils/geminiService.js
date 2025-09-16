// Gemini API Service for StockWise AI with Dataset Integration
import { AVAILABLE_DATASETS, DATASET_SAMPLES, getDatasetById } from '../data/datasets/datasetConfig'

class GeminiService {
  constructor() {
    // In production, this would come from environment variables
    this.apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'demo-key'
    this.isDemoMode = !process.env.NEXT_PUBLIC_GEMINI_API_KEY || this.apiKey === 'demo-key'
    
    if (!this.isDemoMode) {
      // Only import and initialize if we have a real API key
      this.initializeGemini()
    }
  }

  async initializeGemini() {
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      this.genAI = new GoogleGenerativeAI(this.apiKey)
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' })
    } catch (error) {
      console.warn('Gemini API not available, using demo mode')
      this.isDemoMode = true
    }
  }

  async generateDatasetPredictions(datasetId, predictionParams = {}) {
    const dataset = getDatasetById(datasetId)
    if (!dataset) {
      throw new Error('Dataset not found')
    }

    const prompt = `
    You are an AI business analyst for Thai MSME businesses. Analyze this ${dataset.name} dataset and provide specific predictions:

    Dataset: ${dataset.name}
    Description: ${dataset.description}
    Attributes: ${dataset.attributes.join(', ')}
    Sample Data: ${JSON.stringify(DATASET_SAMPLES[datasetId]?.slice(0, 3) || [])}
    
    Prediction Request: ${predictionParams.type || 'General business insights'}
    Time Horizon: ${predictionParams.timeFrame || '7 days'}
    Target Metrics: ${predictionParams.metrics || 'Sales, Stock levels, Revenue'}

    Provide 3 specific, actionable predictions with:
    1. Predicted values/trends
    2. Confidence level (%)
    3. Business impact
    4. Recommended actions

    Format as JSON with clear business language for MSME owners.
    `

    if (this.isDemoMode) {
      return this.generateDemoPredictions(datasetId, predictionParams)
    }

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return this.parsePredictions(response.text(), dataset)
    } catch (error) {
      console.log('Using demo predictions:', error)
      return this.generateDemoPredictions(datasetId, predictionParams)
    }
  }

  async generateBusinessInsights(datasetId, customQuery = '') {
    const dataset = getDatasetById(datasetId)
    
    const prompt = `
    Based on the ${dataset.name} dataset, answer this business question: "${customQuery}"
    
    Context:
    - Thai MSME business context
    - Use Thai Baht (฿) for currency
    - Focus on actionable advice
    - Consider local market conditions (Shopee, Lazada platforms)
    
    Dataset attributes: ${dataset.attributes.join(', ')}
    Sample data: ${JSON.stringify(DATASET_SAMPLES[datasetId]?.slice(0, 2) || [])}
    
    Provide a clear, practical answer in 2-3 sentences.
    `

    if (this.isDemoMode) {
      return this.generateDemoInsight(datasetId, customQuery)
    }

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.log('Using demo insight:', error)
      return this.generateDemoInsight(datasetId, customQuery)
    }
  }

  generateDemoPredictions(datasetId, params) {
    const dataset = getDatasetById(datasetId)
    const predictions = {
      ecommerce_sales: [
        {
          id: 1,
          title: "Electronics Sales Surge",
          prediction: "Electronics category will increase by 18% in next 7 days",
          confidence: 89,
          impact: "High - Potential ฿12,500 additional revenue",
          action: "Increase iPhone case inventory by 30 units immediately",
          timeframe: "7 days",
          dataset: dataset.name
        },
        {
          id: 2,
          title: "Platform Performance",
          prediction: "Shopee will outperform Lazada by 23% this week",
          confidence: 85,
          impact: "Medium - Shift marketing budget to optimize",
          action: "Reallocate 40% of Lazada budget to Shopee campaigns",
          timeframe: "7 days",
          dataset: dataset.name
        },
        {
          id: 3,
          title: "Price Optimization",
          prediction: "Beauty products can handle 8% price increase",
          confidence: 78,
          impact: "High - ฿3,200 monthly revenue increase",
          action: "Test price increase on top 3 beauty products",
          timeframe: "30 days",
          dataset: dataset.name
        }
      ],
      inventory_mgmt: [
        {
          id: 1,
          title: "Critical Stockout Risk",
          prediction: "Wireless Earbuds will stockout in 6 days",
          confidence: 94,
          impact: "Critical - ฿15,600 potential lost sales",
          action: "Emergency reorder 25 units, expedite shipping",
          timeframe: "6 days",
          dataset: dataset.name
        },
        {
          id: 2,
          title: "Optimal Reorder Point",
          prediction: "iPhone cases reorder point should be 15 units (not 10)",
          confidence: 87,
          impact: "Medium - Reduce stockout risk by 60%",
          action: "Update reorder point in inventory system",
          timeframe: "Immediate",
          dataset: dataset.name
        },
        {
          id: 3,
          title: "Lead Time Optimization",
          prediction: "Beauty products lead time can be reduced to 3 days",
          confidence: 82,
          impact: "Low - Improve cash flow efficiency",
          action: "Negotiate with suppliers for faster delivery",
          timeframe: "30 days",
          dataset: dataset.name
        }
      ],
      seasonal_trends: [
        {
          id: 1,
          title: "Holiday Season Preparation",
          prediction: "October sales will be 45% higher than September",
          confidence: 91,
          impact: "Very High - ฿28,900 additional revenue opportunity",
          action: "Increase inventory by 50% for top categories",
          timeframe: "30 days",
          dataset: dataset.name
        },
        {
          id: 2,
          title: "Weather Impact",
          prediction: "Rainy season will decrease fashion sales by 15%",
          confidence: 76,
          impact: "Medium - Plan alternative strategies",
          action: "Launch indoor/comfort fashion promotions",
          timeframe: "60 days",
          dataset: dataset.name
        },
        {
          id: 3,
          title: "Category Shift",
          prediction: "Electronics demand peaks during cool weather",
          confidence: 83,
          impact: "High - Seasonal opportunity window",
          action: "Stock up electronics before November",
          timeframe: "45 days",
          dataset: dataset.name
        }
      ],
      customer_behavior: [
        {
          id: 1,
          title: "Customer Segment Growth",
          prediction: "Tech Enthusiasts segment growing 25% monthly",
          confidence: 88,
          impact: "High - New revenue stream expansion",
          action: "Launch premium tech accessories line",
          timeframe: "14 days",
          dataset: dataset.name
        },
        {
          id: 2,
          title: "Purchase Frequency Increase",
          prediction: "Beauty customers will buy 30% more frequently",
          confidence: 84,
          impact: "Medium - Customer lifetime value increase",
          action: "Create subscription/loyalty program",
          timeframe: "21 days",
          dataset: dataset.name
        },
        {
          id: 3,
          title: "Cross-Selling Opportunity",
          prediction: "Electronics buyers have 65% chance to buy accessories",
          confidence: 79,
          impact: "Medium - ฿180 average order value increase",
          action: "Bundle electronics with accessories",
          timeframe: "7 days",
          dataset: dataset.name
        }
      ]
    }

    return predictions[datasetId] || predictions.ecommerce_sales
  }

  generateDemoInsight(datasetId, query) {
    const insights = {
      ecommerce_sales: `Based on your e-commerce sales data, I recommend focusing on electronics this week. Your iPhone cases are trending up 18% and Shopee platform is outperforming Lazada. Consider increasing your iPhone case inventory by 30 units.`,
      inventory_mgmt: `Your inventory data shows critical issues with wireless earbuds - you'll run out in 6 days. I recommend emergency restocking 25 units immediately to avoid ฿15,600 in lost sales.`,
      seasonal_trends: `Seasonal patterns indicate October will be 45% stronger than September. Start preparing now by increasing inventory for your top categories, especially electronics which perform well in cooler weather.`,
      customer_behavior: `Your customer behavior analysis shows Tech Enthusiasts are growing 25% monthly. This segment has high value - consider launching premium accessories to capture this growth opportunity.`
    }

    return insights[datasetId] || insights.ecommerce_sales + ` (Query: "${query}")`
  }

  parsePredictions(text, dataset) {
    // Parse Gemini response into structured predictions
    try {
      // Try to parse as JSON first
      return JSON.parse(text)
    } catch {
      // Fallback to demo data if parsing fails
      return this.generateDemoPredictions(dataset.id, {})
    }
  }

  // Legacy methods for compatibility
  async generateInventoryInsights(inventoryData, salesData) {
    return this.generateDatasetPredictions('inventory_mgmt', {
      type: 'inventory_optimization',
      data: inventoryData
    })
  }

  async generateForecastingAdvice(forecastData, accuracy) {
    return this.generateDatasetPredictions('ecommerce_sales', {
      type: 'sales_forecasting',
      accuracy: accuracy
    })
  }
}

export default new GeminiService()