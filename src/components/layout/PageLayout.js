import Header from './Header'

const PageLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-app">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h1 className="text-3xl font-bold text-ink mb-2 tracking-tight">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-muted text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className="space-y-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default PageLayout