const StatusBadge = ({ 
  status, 
  label, 
  size = 'md' // 'sm', 'md', 'lg'
}) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'good':
      case 'in-stock':
      case 'high':
        return 'bg-success text-white'
      case 'low':
      case 'warning':
      case 'low-stock':
        return 'bg-warning text-white'
      case 'critical':
      case 'danger':
      case 'out-of-stock':
      case 'out':
        return 'bg-danger text-white'
      case 'info':
      case 'pending':
        return 'bg-info text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getSizeClasses = (size) => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs'
      case 'lg':
        return 'px-4 py-2 text-base'
      default:
        return 'px-3 py-1 text-sm'
    }
  }

  const getIndicator = (status) => {
    switch (status) {
      case 'good':
      case 'in-stock':
      case 'high':
        return '🟢'
      case 'low':
      case 'warning':
      case 'low-stock':
        return '🟡'
      case 'critical':
      case 'danger':
      case 'out-of-stock':
      case 'out':
        return '🔴'
      case 'info':
      case 'pending':
        return '🔵'
      default:
        return '⚫'
    }
  }

  return (
    <span className={`
      inline-flex items-center gap-1 font-medium rounded-full 
      ${getStatusStyles(status)} 
      ${getSizeClasses(size)}
    `}>
      <span className="text-xs">{getIndicator(status)}</span>
      {label || status}
    </span>
  )
}

export default StatusBadge