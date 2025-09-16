import Header from './Header'

const PageLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-gray-600 text-lg">
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