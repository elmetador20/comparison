"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { TRENDING_SEARCHES } from "../data/constants"
import { useNavigate } from "react-router-dom"

// Add these mock suggestions for different product categories
const getProductSuggestions = (searchQuery) => {
  const allSuggestions = [
    // Electronics
    "iPhone 15 Pro Max",
    "Samsung Galaxy S24 Ultra",
    "MacBook Air M3",
    "iPad Pro",
    "Apple Watch Series 9",
    "Sony WH-1000XM5",
    "AirPods Pro",
    "Dell XPS 13",
    "HP Spectre x360",
    "Surface Pro 9",

    // Home & Kitchen
    "LG Refrigerator",
    "Samsung Washing Machine",
    "Whirlpool AC",
    "Philips Air Fryer",
    "Prestige Cooker",
    "Bajaj Mixer Grinder",
    "Kent Water Purifier",
    "Godrej Microwave",
    "Blue Star AC",
    "IFB Dishwasher",

    // Fashion
    "Nike Shoes",
    "Adidas Sneakers",
    "Levi's Jeans",
    "Zara Shirts",
    "H&M Dresses",
    "Puma T-shirts",
    "Reebok Sports Shoes",
    "Van Heusen Formal Shirts",
    "Allen Solly Trousers",

    // Books & Media
    "Harry Potter Books",
    "Game of Thrones",
    "The Alchemist",
    "Rich Dad Poor Dad",
    "Atomic Habits",
    "Think and Grow Rich",
    "The Power of Now",
    "Sapiens Book",
    "The Monk Who Sold His Ferrari",

    // Sports & Fitness
    "Gym Equipment",
    "Yoga Mat",
    "Dumbbells",
    "Treadmill",
    "Exercise Bike",
    "Protein Powder",
    "Whey Protein",
    "Fitness Tracker",
    "Running Shoes",
    "Sports Watch",

    // Beauty & Personal Care
    "Lakme Foundation",
    "Maybelline Lipstick",
    "L'Oreal Shampoo",
    "Nivea Cream",
    "Dove Soap",
    "Gillette Razor",
    "Oral-B Toothbrush",
    "Pantene Hair Oil",
    "Garnier Face Wash",
  ]

  if (!searchQuery.trim()) return TRENDING_SEARCHES

  return allSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8)
}

export function SearchBar({
  placeholder = "Search for products, brands, or categories...",
  showTrending = false,
  initialQuery = "",
  className = "",
}) {
  const [query, setQuery] = useState(initialQuery)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`)
      setShowSuggestions(false)
    }
  }

  const handleInputChange = (e) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    setShowSuggestions(newQuery.length > 0 || showTrending)
  }

  const handleTrendingClick = (trend) => {
    setQuery(trend)
    navigate(`/search?q=${encodeURIComponent(trend)}`)
    setShowSuggestions(false)
  }

  const clearSearch = () => {
    setQuery("")
    setShowSuggestions(false)
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 text-lg border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-medium text-white rounded-xl"
        >
          Search
        </button>
      </form>

      {showTrending && showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg z-50 p-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {query ? "Suggestions" : "Trending Searches"}
          </h4>
          <div className="flex flex-wrap gap-2">
            {getProductSuggestions(query).map((suggestion) => (
              <span
                key={suggestion}
                className="inline-flex items-center rounded-full border border-transparent bg-gray-100 dark:bg-gray-700 px-2.5 py-0.5 text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                onClick={() => handleTrendingClick(suggestion)}
              >
                {suggestion}
              </span>
            ))}
          </div>
          {query && getProductSuggestions(query).length === 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No suggestions found</p>
          )}
        </div>
      )}
    </div>
  )
}
