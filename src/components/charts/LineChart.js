'use client'
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const LineChart = ({ 
  data, 
  xDataKey = 'name',
  lines = [],
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  className = ''
}) => {
  const defaultColors = ['#1E40AF', '#3B82F6', '#10B981', '#F59E0B', '#EF4444']

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />}
          <XAxis 
            dataKey={xDataKey} 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickLine={false}
          />
          {showTooltip && (
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
          )}
          {showLegend && <Legend />}
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color || defaultColors[index % defaultColors.length]}
              strokeWidth={line.strokeWidth || 2}
              dot={line.showDots !== false}
              name={line.name || line.dataKey}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LineChart