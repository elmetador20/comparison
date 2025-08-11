"use client"
import { useNavigate, Link } from "react-router-dom"
import { ShoppingCart, TrendingUp, Shield, Zap, Users, Award } from "lucide-react"
import { SearchBar } from "../components/SearchBar"
import { ThemeToggle } from "../components/ThemeToggle"
import { ProductCarousel } from "../components/ProductCarousel"
import { CATEGORIES } from "../data/constants"

export default function HomePage() {
  const navigate = useNavigate()

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  const featuredDeals = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
      price: 134900,
      originalPrice: 149900,
      discount: 10,
      category: "Smartphones",
      rating: 4.8,
      reviews: 2847,
    },
    {
      id: 16,
      name: "Havells Ceiling Fan 1200mm",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
      price: 2999,
      originalPrice: 3499,
      discount: 14,
      category: "Home Appliances",
      rating: 4.2,
      reviews: 1876,
    },
    {
      id: 23,
      name: "Levi's 511 Slim Fit Jeans",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      price: 3499,
      originalPrice: 4999,
      discount: 30,
      category: "Fashion",
      rating: 4.3,
      reviews: 1234,
    },
    {
      id: 33,
      name: "Sony WH-1000XM5 Headphones",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      price: 29999,
      originalPrice: 34999,
      discount: 14,
      category: "Audio",
      rating: 4.8,
      reviews: 2156,
    },
    {
      id: 5,
      name: "MacBook Air M3 13-inch",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      price: 114900,
      originalPrice: 124900,
      discount: 8,
      category: "Laptops",
      rating: 4.9,
      reviews: 1456,
    },
    {
      id: 29,
      name: "Nike Air Max 270 Running Shoes",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
      price: 8999,
      originalPrice: 12999,
      discount: 31,
      category: "Footwear",
      rating: 4.6,
      reviews: 892,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PriceCompare</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Find Best Deals</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <SearchBar onSearch={handleSearch} showTrending={true} />
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/categories"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Categories
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Contact
              </Link>
              <ThemeToggle />
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900">
                Login
              </button>
            </nav>
          </div>
        </div>
      </header>

    
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            Compare Prices
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Save Money
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Compare products across Amazon, Flipkart, Tata CLiQ, and Croma. Find the best deals and save money on every
            purchase with real-time price tracking.
          </p>

        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">10L+</div>
              <div className="text-gray-600 dark:text-gray-300">Products Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">₹50Cr+</div>
              <div className="text-gray-600 dark:text-gray-300">Money Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">5L+</div>
              <div className="text-gray-600 dark:text-gray-300">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Popular Categories</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Discover the best deals across top product categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="rounded-xl border bg-card text-card-foreground shadow-sm group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-md hover:scale-105 bg-white dark:bg-gray-800 dark:border-gray-700"
                onClick={() => handleSearch(category.name)}
              >
                <div className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 dark:group-hover:from-blue-800 dark:group-hover:to-purple-800 transition-colors">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{category.productCount}+ products</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
        <ProductCarousel
          products={featuredDeals}
          title="Today's Best Deals"
          subtitle="Handpicked deals with maximum savings - Auto-rotating every 4 seconds"
        />
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How PriceCompare Works</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Simple steps to find the best deals across India</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 dark:text-white">Search Products</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Enter any product name or browse categories to find what you're looking for across multiple platforms
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 dark:text-white">Compare Prices</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                View real-time prices from Amazon, Flipkart, Tata CLiQ, and Croma with delivery details and offers
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 dark:text-white">Save Money</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Choose the best deal and save money on every purchase with our intelligent price comparison
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white border-0 overflow-hidden">
            <div className="py-16 px-8 text-center relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">🎉 Special Launch Offer!</h3>
                <p className="text-xl mb-8 opacity-90">
                  Get exclusive deals and early access to flash sales. Join 5 lakh+ smart shoppers!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-8 py-3 bg-white text-purple-600 hover:bg-gray-100">
                    <Users className="w-5 h-5 mr-2" />
                    Join Community
                  </button>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 py-3 border-white text-white hover:bg-white hover:text-purple-600 bg-transparent">
                    <Award className="w-5 h-5 mr-2" />
                    Claim Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <footer className="bg-gray-900 dark:bg-black text-white py-16 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">PriceCompare</h3>
                  <p className="text-xs text-gray-400">Find Best Deals</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                India's most trusted price comparison platform. Compare prices across top e-commerce sites and save
                money on every purchase.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="hover:text-white transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/deals" className="hover:text-white transition-colors">
                    Today's Deals
                  </Link>
                </li>
                <li>
                  <Link to="/trending" className="hover:text-white transition-colors">
                    Trending
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link to="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg">Partners</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 dark:bg-gray-700 p-3 rounded-lg text-center">
                  <div className="text-orange-400 font-bold">Amazon</div>
                </div>
                <div className="bg-gray-800 dark:bg-gray-700 p-3 rounded-lg text-center">
                  <div className="text-blue-400 font-bold">Flipkart</div>
                </div>
                <div className="bg-gray-800 dark:bg-gray-700 p-3 rounded-lg text-center">
                  <div className="text-red-400 font-bold">Tata CLiQ</div>
                </div>
                <div className="bg-gray-800 dark:bg-gray-700 p-3 rounded-lg text-center">
                  <div className="text-green-400 font-bold">Croma</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 dark:border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PriceCompare. All rights reserved. Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
