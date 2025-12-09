'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, BarChart3, Package, Bot, Bell, LineChart } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart3 },
    { name: 'Inventory', href: '/inventory', icon: Package },
    { name: 'Forecasting', href: '/forecasting', icon: Bot },
    { name: 'Alerts', href: '/alerts', icon: Bell },
    { name: 'Analytics', href: '/analytics', icon: LineChart },
  ]

  return (
    <header className="bg-white border-b border-subtle shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-primary" />
              <span className="text-xl font-extrabold text-ink">StockWise AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-subtle-ink hover:text-primary px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <span className="text-sm text-subtle-ink">Demo</span>
            <div className="bg-primary text-white px-3 py-1 pill text-sm shadow-soft">
              Active Session
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-subtle-ink hover:text-primary p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-subtle pt-4 pb-4 bg-white">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-subtle-ink hover:text-primary px-3 py-2 rounded-lg text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header