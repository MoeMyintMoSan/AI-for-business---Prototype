import { Loader2 } from 'lucide-react'

const ActionButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const getVariantStyles = (variant) => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white hover:bg-primary-dark focus:ring-primary'
      case 'secondary':
        return 'bg-primary-light text-white hover:bg-primary focus:ring-primary-light'
      case 'success':
        return 'bg-success text-white hover:opacity-90 focus:ring-success'
      case 'warning':
        return 'bg-warning text-white hover:opacity-90 focus:ring-warning'
      case 'danger':
        return 'bg-danger text-white hover:opacity-90 focus:ring-danger'
      case 'outline':
        return 'border border-primary text-primary bg-white hover:bg-primary hover:text-white focus:ring-primary'
      case 'ghost':
        return 'text-primary hover:bg-primary-light hover:bg-opacity-10 focus:ring-primary'
      default:
        return 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-200'
    }
  }

  const getSizeStyles = (size) => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm'
      case 'lg':
        return 'px-6 py-3 text-lg'
      case 'xl':
        return 'px-8 py-4 text-xl'
      default:
        return 'px-4 py-2 text-base'
    }
  }

  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-lg 
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${getVariantStyles(variant)}
        ${getSizeStyles(size)}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  )
}

export default ActionButton