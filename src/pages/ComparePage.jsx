"use client"
import { useParams, Link } from "react-router-dom"
import {
  Star,
  ShoppingCart,
  Truck,
  Shield,
  Award,
  ExternalLink,
  Heart,
  Share2,
  TrendingDown,
  TrendingUp,
  AlertCircle,
} from "lucide-react"
import { formatPrice, calculateDiscountPercentage } from "../utils/helpers"
import { PLATFORMS } from "../data/constants"
import { COMPREHENSIVE_PRODUCTS } from "../data/mockData"

export default function ProductComparisonPage() {
  const { id } = useParams()

  // Find the product from mock data
  const product = COMPREHENSIVE_PRODUCTS.find((p) => p.id === id)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        Product not found.
      </div>
    )
  }

  // Mock platform comparison data (simplified for direct use)
  const platformComparisons = [
    {
      platform: PLATFORMS[0], // Amazon
      price: 134900,
      originalPrice: 149900,
      rating: 4.8,
      reviews: 2847,
      delivery: {
        time: "Tomorrow",
        cost: 0,
        isFree: true,
      },
      inStock: true,
      seller: "Amazon.com",
      warranty: "1 Year Apple India Warranty",
      returnPolicy: "10 days replacement, 30 days return",
      isLowestPrice: true,
      offers: [
        "10% instant discount with HDFC Bank cards",
        "No Cost EMI starting ₹11,242/month",
        "Exchange up to ₹25,000 off",
      ],
      url: "https://amazon.in/dp/example",
      lastUpdated: "2 minutes ago",
    },
    {
      platform: PLATFORMS[1], // Flipkart
      price: 139900,
      originalPrice: 149900,
      rating: 4.7,
      reviews: 1923,
      delivery: {
        time: "2-3 days",
        cost: 0,
        isFree: true,
      },
      inStock: true,
      seller: "Flipkart",
      warranty: "1 Year Apple India Warranty",
      returnPolicy: "7 days replacement only",
      isLowestPrice: false,
      offers: ["5% cashback with Flipkart Axis Bank Card", "Exchange up to ₹20,000 off", "EMI starting ₹11,658/month"],
      url: "https://flipkart.com/example",
      lastUpdated: "5 minutes ago",
    },
    {
      platform: PLATFORMS[2], // Tata CLiQ
      price: 142900,
      originalPrice: 149900,
      rating: 4.6,
      reviews: 456,
      delivery: {
        time: "3-5 days",
        cost: 0,
        isFree: true,
      },
      inStock: true,
      seller: "Tata CLiQ",
      warranty: "1 Year Apple India Warranty",
      returnPolicy: "15 days easy returns",
      isLowestPrice: false,
      offers: ["Tata Neu coins worth ₹1,429", "Additional 5% off with Tata CLiQ credit card"],
      url: "https://tatacliq.com/example",
      lastUpdated: "8 minutes ago",
    },
    {
      platform: PLATFORMS[3], // Croma
      price: 149900,
      originalPrice: 149900,
      rating: 4.5,
      reviews: 234,
      delivery: {
        time: "5-7 days",
        cost: 0,
        isFree: true,
      },
      inStock: false,
      seller: "Croma Retail",
      warranty: "1 Year Apple India Warranty + Extended warranty available",
      returnPolicy: "30 days return policy",
      isLowestPrice: false,
      offers: ["Free installation and setup", "Croma extended warranty available"],
      url: "https://croma.com/example",
      lastUpdated: "12 minutes ago",
    },
  ]

  const lowestPrice = Math.min(...platformComparisons.map((p) => p.price))
  const highestPrice = Math.max(...platformComparisons.map((p) => p.price))
  const maxSavings = highestPrice - lowestPrice
  const averageRating = platformComparisons.reduce((sum, p) => sum + p.rating, 0) / platformComparisons.length
  const totalReviews = platformComparisons.reduce((sum, p) => sum + p.reviews, 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
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
            <nav className="flex items-center space-x-6">
              <Link
                to="/search"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                Back to Search
              </Link>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 bg-transparent">
                Login
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <span>/</span>
          <Link to="/search" className="hover:text-blue-600 dark:hover:text-blue-400">
            Search
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        {/* Product Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="sticky top-24">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`/placeholder.svg?height=100&width=100&text=${i}`}
                    alt={`${product.name} view ${i}`}
                    width={100}
                    height={100}
                    className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground dark:bg-gray-700 dark:text-gray-300">
                  {product.brand}
                </span>
                <span className="inline-flex items-center rounded-full border border-input bg-background px-2.5 py-0.5 text-xs font-semibold text-foreground dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300">
                  {product.category}
                </span>
                <span className="inline-flex items-center rounded-full border border-transparent bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 hover:bg-green-100">
                  In Stock
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Price Summary */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm bg-gradient-to-r from-green-50 to-blue-50 border-green-200 dark:from-green-950 dark:to-blue-950 dark:border-green-800">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {formatPrice(lowestPrice)}
                      </h3>
                      <span className="inline-flex items-center rounded-full border border-transparent bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-white hover:bg-green-600">
                        <Award className="w-3 h-3 mr-1" />
                        Best Price
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      Save up to {formatPrice(maxSavings)} compared to highest price
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {averageRating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">({totalReviews.toLocaleString()} reviews)</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-4 py-2 flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Heart className="w-5 h-5 mr-2" />
                    Add to Wishlist
                  </button>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 px-4 py-2 flex-1 bg-transparent">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share Product
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="font-semibold whitespace-nowrap tracking-tight text-xl text-gray-900 dark:text-white">
                  Key Specifications
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(product.specifications || {}).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <span className="text-gray-600 dark:text-gray-300 font-medium">{key}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Alert */}
        <div className="relative w-full rounded-lg border-2 border-blue-200 bg-blue-50 p-4 text-sm [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-4 dark:border-blue-800 dark:bg-blue-950 mb-8">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <div className="text-sm [&_p]:leading-relaxed text-blue-800 dark:text-blue-200">
            <strong>Price Alert:</strong> This product's price has dropped by ₹15,000 in the last 30 days.
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-blue-600 dark:text-blue-400 hover:underline p-0 h-auto ml-2">
              Set price alert for further drops
            </button>
          </div>
        </div>

        {/* Price Comparison Table */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 mb-12">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold whitespace-nowrap tracking-tight text-2xl flex items-center gap-2 text-gray-900 dark:text-white">
              <TrendingDown className="w-6 h-6 text-green-600 dark:text-green-400" />
              Price Comparison Across Platforms
            </h3>
            <p className="text-sm text-muted-foreground text-gray-600 dark:text-gray-300">
              Real-time prices updated every few minutes
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-6">
              {platformComparisons.map((comparison, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                    comparison.isLowestPrice
                      ? "border-green-500 bg-green-50 shadow-md dark:border-green-700 dark:bg-green-950"
                      : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 items-center">
                    {/* Platform Info */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={comparison.platform.logo || "/placeholder.svg"}
                          alt={comparison.platform.name}
                          width={80}
                          height={32}
                          className="h-8 w-auto"
                        />
                        {comparison.isLowestPrice && (
                          <span className="inline-flex items-center rounded-full border border-transparent bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-white hover:bg-green-600">
                            <Award className="w-3 h-3 mr-1" />
                            Best Price
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Updated {comparison.lastUpdated}</p>
                    </div>

                    {/* Price */}
                    <div className="lg:col-span-1">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                        {formatPrice(comparison.price)}
                      </div>
                      {comparison.originalPrice > comparison.price && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                            {formatPrice(comparison.originalPrice)}
                          </span>
                          <span className="inline-flex items-center rounded-full border border-transparent bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 hover:bg-red-100">
                            {calculateDiscountPercentage(comparison.originalPrice, comparison.price)}% OFF
                          </span>
                        </div>
                      )}
                      {comparison.isLowestPrice && (
                        <div className="text-sm text-green-600 dark:text-green-400 font-medium mt-1">
                          Save {formatPrice(highestPrice - comparison.price)}
                        </div>
                      )}
                    </div>

                    {/* Rating & Reviews */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900 dark:text-white">{comparison.rating}</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {comparison.reviews.toLocaleString()} reviews
                      </div>
                    </div>

                    {/* Delivery */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Truck className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        <span className="font-medium text-gray-900 dark:text-white">{comparison.delivery.time}</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {comparison.delivery.isFree ? "Free delivery" : formatPrice(comparison.delivery.cost)}
                      </div>
                    </div>

                    {/* Stock & Warranty */}
                    <div className="lg:col-span-1">
                      <span
                        className={`inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold ${comparison.inStock ? "bg-green-500 text-white" : "bg-red-500 text-white"} mb-2`}
                      >
                        {comparison.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        <Shield className="w-3 h-3 inline mr-1" />
                        {comparison.warranty}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="lg:col-span-2">
                      <a
                        href={comparison.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 px-4 py-2 w-full mb-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white ${
                          !comparison.inStock ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Buy Now on {comparison.platform.name}
                      </a>
                      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        Sold by {comparison.seller}
                      </div>
                    </div>
                  </div>

                  {/* Offers */}
                  {comparison.offers.length > 0 && (
                    <>
                      <div className="shrink-0 bg-border h-[1px] w-full bg-gray-200 dark:bg-gray-700 my-4" />
                      <div>
                        <h4 className="font-medium text-sm mb-3 text-gray-900 dark:text-white">Special Offers:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {comparison.offers.map((offer, offerIndex) => (
                            <div
                              key={offerIndex}
                              className="text-sm text-green-700 bg-green-100 px-3 py-2 rounded-lg border border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800"
                            >
                              • {offer}
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price History & Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="rounded-xl border bg-card text-card-foreground shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold whitespace-nowrap tracking-tight text-xl flex items-center gap-2 text-gray-900 dark:text-white">
                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Price History (Last 30 Days)
              </h3>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-6">
                <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg flex items-center justify-center dark:from-blue-900 dark:to-purple-900">
                  <div className="text-center">
                    <TrendingDown className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-gray-300">Price trend chart</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Interactive chart would be here</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-green-50 p-4 rounded-lg dark:bg-green-950">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatPrice(lowestPrice)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Lowest Ever</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg dark:bg-blue-950">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {formatPrice(Math.round((lowestPrice + highestPrice) / 2))}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Average Price</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg dark:bg-red-950">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">{formatPrice(highestPrice)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Highest Price</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold whitespace-nowrap tracking-tight text-xl flex items-center gap-2 text-gray-900 dark:text-white">
                <AlertCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Price Alerts & Tracking
              </h3>
            </div>
            <div className="p-6 pt-0">
              <div className="space-y-6">
                <p className="text-gray-600 dark:text-gray-300">Get notified when the price drops below your target</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Target Price
                    </label>
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                          ₹
                        </span>
                        <input
                          type="number"
                          placeholder="130000"
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-400"
                        />
                      </div>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Set Alert
                      </button>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 dark:bg-purple-950 dark:border-purple-800">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-purple-900 dark:text-purple-200 mb-1">
                          Smart Price Protection
                        </h4>
                        <p className="text-sm text-purple-700 dark:text-purple-300">
                          We'll monitor prices across all platforms and notify you instantly when your target price is
                          reached or when there are special offers.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">Quick Alert Options:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 text-xs bg-transparent">
                        5% price drop
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 text-xs bg-transparent">
                        10% price drop
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 text-xs bg-transparent">
                        Any discount
                      </button>
                      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 text-xs bg-transparent">
                        Back in stock
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold whitespace-nowrap tracking-tight text-xl text-gray-900 dark:text-white">
              You Might Also Like
            </h3>
            <p className="text-sm text-muted-foreground text-gray-600 dark:text-gray-300">
              Similar products in the same category
            </p>
          </div>
          <div className="p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "iPhone 15 Pro 128GB", price: 124900, image: "/placeholder.svg?height=200&width=200" },
                { name: "Samsung Galaxy S24 Ultra", price: 124999, image: "/placeholder.svg?height=200&width=200" },
                { name: "Google Pixel 8 Pro", price: 89999, image: "/placeholder.svg?height=200&width=200" },
                { name: "OnePlus 12", price: 69999, image: "/placeholder.svg?height=200&width=200" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border bg-card text-card-foreground shadow-sm group hover:shadow-lg transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="p-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">{item.name}</h4>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{formatPrice(item.price)}</div>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 w-full mt-3 text-xs">
                      Compare Prices
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
