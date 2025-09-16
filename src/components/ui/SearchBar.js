'use client'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

const SearchBar = ({ 
  placeholder = 'Search...', 
  value = '',
  onChange,
  onClear,
  className = '',
  size = 'md'
}) => {
  const [searchValue, setSearchValue] = useState(value)

  const handleChange = (e) => {
    const newValue = e.target.value
    setSearchValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const handleClear = () => {
    setSearchValue('')
    if (onClear) {
      onClear()
    }
    if (onChange) {
      onChange('')
    }
  }

  const getSizeClasses = (size) => {
    switch (size) {
      case 'sm':
        return 'py-2 pl-9 pr-8 text-sm'
      case 'lg':
        return 'py-4 pl-11 pr-10 text-lg'
      default:
        return 'py-3 pl-10 pr-9 text-base'
    }
  }

  const getIconSize = (size) => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4'
      case 'lg':
        return 'w-6 h-6'
      default:
        return 'w-5 h-5'
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className={`${getIconSize(size)} text-gray-400`} />
      </div>
      
      <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`
          block w-full rounded-lg border border-gray-200 bg-white
          focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20
          placeholder-gray-400 transition-colors duration-200
          ${getSizeClasses(size)}
        `}
      />
      
      {searchValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        >
          <X className={`${getIconSize(size)}`} />
        </button>
      )}
    </div>
  )
}

export default SearchBar