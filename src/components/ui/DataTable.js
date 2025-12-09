'use client'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useMemo } from 'react'
import LoadingSpinner from './LoadingSpinner'

const DataTable = ({ 
  columns, 
  data, 
  loading = false,
  sortable = true,
  className = ''
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  const handleSort = (key) => {
    if (!sortable) return
    
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [data, sortConfig])

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronDown className="w-4 h-4 text-gray-400" />
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4 text-primary" />
      : <ChevronDown className="w-4 h-4 text-primary" />
  }

  if (loading) {
    return (
      <div className="card p-8">
        <LoadingSpinner size="lg" text="Loading data..." />
      </div>
    )
  }

  return (
    <div className={`card overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead style={{ background: 'linear-gradient(90deg, var(--accent-soft), var(--secondary-soft))' }}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    px-6 py-3 text-left text-xs font-semibold text-subtle-ink uppercase tracking-wider
                    ${sortable && column.sortable !== false ? 'cursor-pointer hover:bg-primary-soft' : ''}
                  `}
                  onClick={() => sortable && column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    {sortable && column.sortable !== false && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => {
              const stripeColor = rowIndex % 2 === 0 ? 'var(--accent-soft)' : 'var(--secondary-soft)'
              return (
                <tr
                  key={row.id || rowIndex}
                  className="transition-colors"
                  style={{ background: stripeColor }}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-ink">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {sortedData.length === 0 && (
        <div className="text-center py-8 text-muted">
          No data available
        </div>
      )}
    </div>
  )
}

export default DataTable