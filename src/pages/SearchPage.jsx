"use client"

import { useState, useMemo } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { Filter, Grid, List, Star, ShoppingCart, Heart, SlidersHorizontal } from "lucide-react"
import { SearchBar } from "../components/SearchBar"
import { formatPrice, debounce } from "../utils/helpers"
import { COMPREHENSIVE_PRODUCTS, COMPREHENSIVE_PRICES } from "../data/mockData"

export default function SearchResultsPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("q") || ""

  const [viewMode, setViewMode] = useState("grid")
  const [filters, setFilters] = useState({
    priceRange: [0, 200000],
    inStock: true,
    brand: undefined,
    category: undefined,
  })
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)

  // Use comprehensive product database instead of limited mock data
  const mockResults = COMPREHENSIVE_PRODUCTS
  const mockPrices = COMPREHENSIVE_PRICES

  const brands = [
    "Apple",
    "Samsung",
    "LG",
    "Nike",
    "Sony",
    "Philips",
    "Levi's",
    "Canon",
    "Dell",
    "HP",
    "Xiaomi",
    "Realme",
    "Adidas",
    "Puma",
    "Havells",
    "Bajaj",
    "Orient",
    "Crompton",
    "Daikin",
    "Blue Star",
    "Whirlpool",
    "Prestige",
    "Wrangler",
    "Lee Cooper",
    "Pepe Jeans",
    "Van Heusen",
    "Allen Solly",
    "Reebok",
    "JBL",
    "Nikon",
    "Lenovo",
    "OnePlus",
    "Google",
  ]

  const categories = [
    "Smartphones",
    "Laptops",
    "Home Appliances",
    "Kitchen Appliances",
    "Footwear",
    "Audio",
    "Fashion",
    "Cameras",
    "Tablets",
    "Smartwatches",
    "Books",
    "Sports & Fitness",
    "Beauty & Personal Care",
  ]

  const handleSearch = (newQuery) => {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`)
  }

  const debouncedFilterUpdate = useMemo(
    () =>
      debounce((newFilters) => {
        setFilters(newFilters)
      }, 300),
    [],
  )

  const filteredResults = useMemo(() => {
    let results = mockResults.filter((product) => {
      const searchTerm = query.toLowerCase()
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm) ||
        (searchTerm.includes("fan") && product.name.toLowerCase().includes("fan")) ||
        (searchTerm.includes("jeans") && product.name.toLowerCase().includes("jeans")) ||
        (searchTerm.includes("phone") && product.category === "Smartphones") ||
        (searchTerm.includes("laptop") && product.category === "Laptops") ||
        (searchTerm.includes("fridge") && product.name.toLowerCase().includes("refrigerator")) ||
        (searchTerm.includes("ac") && product.name.toLowerCase().includes("ac")) ||
        (searchTerm.includes("shoes") && product.category === "Footwear") ||
        (searchTerm.includes("headphone") && product.category === "Audio") ||
        (searchTerm.includes("camera") && product.category === "Cameras")
      )
    })

    
    if (filters.brand) {
      results = results.filter((product) => product.brand === filters.brand)
    }
    if (filters.category) {
      results = results.filter((product) => product.category === filters.category)
    }
    if (filters.inStock) {
      results = results.filter((product) => mockPrices[product.id]?.inStock)
    }
    if (filters.priceRange) {
      results = results.filter((product) => {
        const price = mockPrices[product.id]?.price || 0
        return price >= filters.priceRange[0] && price <= filters.priceRange[1]
      })
    }

    switch (sortBy) {
      case "price-low":
        results.sort((a, b) => (mockPrices[a.id]?.price || 0) - (mockPrices[b.id]?.price || 0))
        break
      case "price-high":
        results.sort((a, b) => (mockPrices[b.id]?.price || 0) - (mockPrices[a.id]?.price || 0))
        break
      case "rating":
        results.sort((a, b) => (mockPrices[b.id]?.rating || 0) - (mockPrices[a.id]?.rating || 0))
        break
      default:
 
        break
    }

    return results
  }, [query, filters, sortBy, mockResults, mockPrices])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
 
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
                PriceCompare
              </Link>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <SearchBar onSearch={handleSearch} initialQuery={query} />
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                Home
              </Link>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 bg-transparent">
                Login
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
  
          <div className="lg:hidden">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full mb-4"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>


          <div className={`lg:w-1/4 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm sticky top-24 bg-white dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 border-b dark:border-gray-700">
                <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900 dark:text-white">
                  <Filter className="w-5 h-5" />
                  Filters
                </h3>
              </div>
              <div className="p-6 space-y-6">
            
                <div>
                  <h4 className="font-medium mb-4 text-gray-900 dark:text-white">Price Range</h4>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="5000"
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      debouncedFilterUpdate({
                        ...filters,
                        priceRange: [Number.parseInt(e.target.value), filters.priceRange[1]],
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mb-3"
                  />
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="5000"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      debouncedFilterUpdate({
                        ...filters,
                        priceRange: [filters.priceRange[0], Number.parseInt(e.target.value)],
                      })
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mb-3"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{formatPrice(filters.priceRange[0])}</span>
                    <span>{formatPrice(filters.priceRange[1])}</span>
                  </div>
                </div>

                <div className="shrink-0 bg-border h-[1px] w-full bg-gray-200 dark:bg-gray-700" />

    
                <div>
                  <h4 className="font-medium mb-4 text-gray-900 dark:text-white">Brands</h4>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={brand}
                          checked={filters.brand === brand}
                          onChange={(e) => {
                            setFilters({ ...filters, brand: e.target.checked ? brand : undefined })
                          }}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400"
                        />
                        <label htmlFor={brand} className="text-sm cursor-pointer text-gray-700 dark:text-gray-300">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 bg-border h-[1px] w-full bg-gray-200 dark:bg-gray-700" />

            
                <div>
                  <h4 className="font-medium mb-4 text-gray-900 dark:text-white">Categories</h4>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={category}
                          checked={filters.category === category}
                          onChange={(e) => {
                            setFilters({ ...filters, category: e.target.checked ? category : undefined })
                          }}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400"
                        />
                        <label htmlFor={category} className="text-sm cursor-pointer text-gray-700 dark:text-gray-300">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 bg-border h-[1px] w-full bg-gray-200 dark:bg-gray-700" />

           
                <div>
                  <h4 className="font-medium mb-4 text-gray-900 dark:text-white">Availability</h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="inStock"
                      checked={filters.inStock}
                      onChange={(e) => {
                        setFilters({ ...filters, inStock: e.target.checked })
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400"
                    />
                    <label htmlFor="inStock" className="text-sm cursor-pointer text-gray-700 dark:text-gray-300">
                      In Stock Only
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

       
          <div className="lg:w-3/4">
         
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Search Results</h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Found {filteredResults.length} products for "{query}"
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex h-10 w-48 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>

                <div className="flex border rounded-lg border-gray-300 dark:border-gray-600">
                  <button
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 rounded-r-none ${
                      viewMode === "grid"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 rounded-l-none ${
                      viewMode === "list"
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          
            {filteredResults.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Try adjusting your search or filters</p>
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() =>
                    setFilters({ priceRange: [0, 200000], inStock: true, brand: undefined, category: undefined })
                  }
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}
              >
                {filteredResults.map((product) => {
                  const priceData = mockPrices[product.id]
                  return (
                    <div
                      key={product.id}
                      className={`rounded-xl border bg-card text-card-foreground shadow-sm group hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 ${
                        viewMode === "list" ? "flex flex-row" : ""
                      }`}
                    >
                      <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                        <div className={`relative ${viewMode === "list" ? "p-4" : "p-6 pb-4"}`}>
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={300}
                            height={200}
                            className={`object-cover rounded-lg group-hover:scale-105 transition-transform duration-300 ${
                              viewMode === "list" ? "w-full h-32" : "w-full h-48"
                            }`}
                          />
                          {!priceData?.inStock && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                              <span className="text-white font-medium">Out of Stock</span>
                            </div>
                          )}
                          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 absolute top-2 right-2 w-8 h-8 p-0 bg-white/80 hover:bg-white rounded-full">
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className={`${viewMode === "list" ? "p-6 flex-1" : "p-6"}`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-flex items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground dark:bg-gray-700 dark:text-gray-300">
                            {product.brand}
                          </span>
                          {priceData && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium dark:text-gray-300">{priceData.rating}</span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">({priceData.reviews})</span>
                            </div>
                          )}
                        </div>

                        <h3
                          className={`font-semibold text-gray-900 dark:text-white mb-2 ${viewMode === "list" ? "text-lg" : "text-xl"}`}
                        >
                          {product.name}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        {priceData && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {formatPrice(priceData.price)}
                              </span>
                              {priceData.originalPrice > priceData.price && (
                                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                                  {formatPrice(priceData.originalPrice)}
                                </span>
                              )}
                            </div>
                            {priceData.originalPrice > priceData.price && (
                              <span className="inline-flex items-center rounded-full border border-transparent bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 hover:bg-green-100">
                                Save {formatPrice(priceData.originalPrice - priceData.price)}
                              </span>
                            )}
                          </div>
                        )}

                        <div className="flex gap-2 mt-auto">
                          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 flex-1 bg-transparent">
                            View Details
                          </button>
                          <Link
                            to={`/compare/${product.id}`}
                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white ${
                              !priceData?.inStock ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            Compare
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

      
            {filteredResults.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                    disabled
                  >
                    Previous
                  </button>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 bg-blue-600 text-white hover:bg-blue-700">
                    1
                  </button>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                    2
                  </button>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                    3
                  </button>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
