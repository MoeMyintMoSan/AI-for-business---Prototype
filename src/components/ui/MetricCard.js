const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  iconBgColor = 'bg-primary', 
  change = null,
  changeType = 'neutral' // 'positive', 'negative', 'neutral'
}) => {
  const getChangeColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success'
      case 'negative': return 'text-danger'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {change && (
            <p className={`text-sm ${getChangeColor(changeType)}`}>{change}</p>
          )}
        </div>
        {icon && (
          <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center ml-4`}>
            {typeof icon === 'string' ? (
              <span className="text-white text-xl">{icon}</span>
            ) : (
              <div className="text-white">{icon}</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MetricCard