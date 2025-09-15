import { useNavigate } from "react-router-dom"
import { Card } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { 
  ArrowLeft, ChevronRight, Smartphone, Laptop, Shirt, Home, Footprints, 
  Headphones, Book, Camera, Watch, ChefHat, Dumbbell, Sparkles 
} from "lucide-react"

const categories = [
  { name: "Smartphones", icon: Smartphone, color: "bg-blue-500", items: "2.5k+" },
  { name: "Laptops", icon: Laptop, color: "bg-purple-500", items: "1.8k+" },
  { name: "Fashion", icon: Shirt, color: "bg-pink-500", items: "5.2k+" },
  { name: "Home Appliances", icon: Home, color: "bg-green-500", items: "3.1k+" },
  { name: "Footwear", icon: Footprints, color: "bg-orange-500", items: "2.9k+" },
  { name: "Audio", icon: Headphones, color: "bg-red-500", items: "1.4k+" },
  { name: "Books", icon: Book, color: "bg-amber-500", items: "4.7k+" },
  { name: "Cameras", icon: Camera, color: "bg-slate-500", items: "890+" },
  { name: "Smartwatches", icon: Watch, color: "bg-cyan-500", items: "1.2k+" },
  { name: "Kitchen Appliances", icon: ChefHat, color: "bg-emerald-500", items: "2.3k+" },
  { name: "Sports & Fitness", icon: Dumbbell, color: "bg-indigo-500", items: "1.9k+" },
  { name: "Beauty & Personal Care", icon: Sparkles, color: "bg-rose-500", items: "3.6k+" },
]

export default function CategoriesPage() {
  const navigate = useNavigate()

  // const handleCategoryClick = (categoryName) => {
  //   navigate(`/category/${categoryName.toLowerCase().replace(/\s+/g, '-')}`)
  // }

  const handleBackToHome = () => {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleBackToHome}
            className="flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
          <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Explore Categories</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Discover products across all categories</p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card 
                key={category.name} 
                className="group relative overflow-hidden cursor-pointer hover:shadow-xl dark:hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 bg-white dark:bg-gray-800"
                onClick={() => handleCategoryClick(category.name)}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 ${category.color} opacity-5 group-hover:opacity-10 dark:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300`} />
                
                {/* Card Content */}
                <div className="relative p-6 flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {category.name}
                    </h3>
                     <Badge variant="secondary" className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-0"> 
                     
                    </Badge>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-200 dark:group-hover:border-gray-600 rounded-lg transition-colors duration-300" />
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Can't find what you're looking for?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Browse our complete product catalog or use the search feature</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
                Browse All Products
              </Button>
              <Button variant="outline" size="lg" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                Advanced Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
