import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { 
  ArrowLeft, Mail, Phone, MapPin, Clock, Send, 
  MessageCircle, User, Building 
} from "lucide-react"

export default function ContactPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })

  const handleBackToHome = () => {
    navigate("/")
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    content: "support@kickcraze.in",
    description: "We usually respond within 12 hours",
    color: "bg-blue-500"
  },
  {
    icon: Phone,
    title: "Call Us",
    content: "+91 98765 43210",
    description: "Mon-Sat, 10AM - 7PM IST",
    color: "bg-green-500"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    content: "KIET Group of Institutions, Delhi-NCR",
    description: "Ghaziabad, Uttar Pradesh, India",
    color: "bg-purple-500"
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Monday - Saturday",
    description: "10:00 AM - 7:00 PM IST",
    color: "bg-orange-500"
  }
]


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleBackToHome}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Button>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Us</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Get in touch with our team</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Have questions about our products or need support? We're here to help!
            </p>
            
            {contactInfo.map((info) => {
              const Icon = info.icon
              return (
                <Card key={info.title} className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{info.title}</h3>
                      <p>{info.content}</p>
                      <p className="text-sm text-gray-500">{info.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium flex items-center">
                      <User className="w-4 h-4 mr-2" /> Full Name *
                    </label>
                    <Input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium flex items-center">
                      <Mail className="w-4 h-4 mr-2" /> Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center">
                    <Building className="w-4 h-4 mr-2" /> Company
                  </label>
                  <Input
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" /> Subject *
                  </label>
                  <Input
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Message *</label>
                  <Textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1 bg-blue-600 text-white">
                    <Send className="w-4 h-4 mr-2" /> Send
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setFormData({ name: "", email: "", company: "", subject: "", message: "" })}
                  >
                    Clear
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
