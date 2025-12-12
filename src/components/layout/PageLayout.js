import Header from './Header'

const PageLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-app">
      <Header />
      
      <main className="w-full max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-10 xl:px-12 py-8 sm:py-10 space-y-8">
        {(title || subtitle) && (
          <div className="space-y-2">
            {title && (
              <h1 className="text-4xl sm:text-4xl font-bold text-ink tracking-tight">
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
        
        <div className="space-y-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default PageLayout