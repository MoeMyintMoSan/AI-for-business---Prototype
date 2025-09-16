import LoadingSpinner from '../ui/LoadingSpinner'

const ChartContainer = ({ 
  title,
  subtitle,
  children,
  loading = false,
  error = null,
  actions = null,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      {/* Header */}
      {(title || subtitle || actions) && (
        <div className="flex items-center justify-between mb-6">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <LoadingSpinner size="lg" text="Loading chart..." />
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-danger text-2xl mb-2">⚠️</div>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        )}
        
        {!error && children}
      </div>
    </div>
  )
}

export default ChartContainer