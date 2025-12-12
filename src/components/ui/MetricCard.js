const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  tone = 'primary',
  change = null,
  changeType = 'neutral' // 'positive', 'negative', 'neutral'
}) => {
  const toneMap = {
    primary: { badge: 'bg-primary text-white', wash: 'var(--accent-soft)' },
    secondary: { badge: 'bg-secondary text-white', wash: 'var(--secondary-soft)' },
    neutral: { badge: 'bg-ink text-white', wash: 'var(--card)' }
  }
  const toneStyles = toneMap[tone] || toneMap.primary

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success'
      case 'negative': return 'text-danger'
      default: return 'text-muted'
    }
  }

  return (
    <div className="relative overflow-hidden card p-6" style={{ background: `linear-gradient(135deg, ${toneStyles.wash}, #ffffff)` }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm font-semibold text-subtle-ink mb-1 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-extrabold text-ink mb-1 leading-tight">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted">{subtitle}</p>
          )}
          {change && (
            <p className={`text-sm font-semibold mt-2 ${getChangeColor(changeType)}`}>{change}</p>
          )}
        </div>
        {icon && (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-soft ${toneStyles.badge}`}>
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