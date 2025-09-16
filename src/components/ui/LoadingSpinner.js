import { Loader2 } from 'lucide-react'

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  text = null,
  className = ''
}) => {
  const getSizeClasses = (size) => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4'
      case 'lg':
        return 'w-8 h-8'
      case 'xl':
        return 'w-12 h-12'
      default:
        return 'w-6 h-6'
    }
  }

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'text-primary'
      case 'white':
        return 'text-white'
      case 'gray':
        return 'text-gray-500'
      case 'success':
        return 'text-success'
      case 'warning':
        return 'text-warning'
      case 'danger':
        return 'text-danger'
      default:
        return 'text-primary'
    }
  }

  const getTextSize = (size) => {
    switch (size) {
      case 'sm':
        return 'text-sm'
      case 'lg':
        return 'text-lg'
      case 'xl':
        return 'text-xl'
      default:
        return 'text-base'
    }
  }

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <Loader2 className={`animate-spin ${getSizeClasses(size)} ${getColorClasses(color)}`} />
      {text && (
        <span className={`${getTextSize(size)} ${getColorClasses(color)} font-medium`}>
          {text}
        </span>
      )}
    </div>
  )
}

export default LoadingSpinner