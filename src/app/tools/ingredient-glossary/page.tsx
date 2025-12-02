"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Search, Leaf, Zap, Heart, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

const ingredients = [
  {
    id: "ragi",
    name: "Ragi (Finger Millet)",
    category: "Ancient Grains",
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&q=80",
    description: "Nutrient-dense ancient grain packed with calcium, iron, and fiber. Known as finger millet, it's a staple in Indian cuisine for centuries.",
    benefits: [
      "Highest calcium content among cereals",
      "Rich in iron and amino acids",
      "Helps manage diabetes",
      "Supports bone health",
      "High in dietary fiber"
    ],
    nutrition: {
      protein: "7.3g per 100g",
      fiber: "3.6g per 100g",
      calcium: "344mg per 100g",
      iron: "3.9mg per 100g"
    },
    usedIn: ["Ragi Chocolate Brownies", "Ragi Energy Bars"]
  },
  {
    id: "quinoa",
    name: "Quinoa",
    category: "Ancient Grains",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80",
    description: "Complete protein source with all 9 essential amino acids. This superfood from South America is naturally gluten-free and highly nutritious.",
    benefits: [
      "Complete protein source",
      "Gluten-free alternative",
      "Rich in antioxidants",
      "High in magnesium",
      "Low glycemic index"
    ],
    nutrition: {
      protein: "14g per 100g",
      fiber: "7g per 100g",
      magnesium: "197mg per 100g",
      iron: "4.6mg per 100g"
    },
    usedIn: ["Quinoa Date Cookies", "Quinoa Energy Bites"]
  },
  {
    id: "millet",
    name: "Millet",
    category: "Ancient Grains",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    description: "Group of small-seeded grasses that are naturally gluten-free and rich in nutrients. Traditional staple in India and Africa.",
    benefits: [
      "Gluten-free and easy to digest",
      "Rich in B vitamins",
      "Supports heart health",
      "Helps control blood sugar",
      "Good source of phosphorus"
    ],
    nutrition: {
      protein: "11g per 100g",
      fiber: "8.5g per 100g",
      phosphorus: "285mg per 100g",
      magnesium: "114mg per 100g"
    },
    usedIn: ["Millet Energy Bars", "Multi-Millet Cookies"]
  },
  {
    id: "almonds",
    name: "Almonds",
    category: "Nuts & Seeds",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=800&q=80",
    description: "Nutrient-dense tree nuts packed with healthy fats, protein, and vitamin E. Perfect for energy and heart health.",
    benefits: [
      "Rich in vitamin E",
      "Heart-healthy fats",
      "Supports brain function",
      "Good protein source",
      "Helps with weight management"
    ],
    nutrition: {
      protein: "21g per 100g",
      fiber: "12.5g per 100g",
      vitaminE: "25.6mg per 100g",
      calcium: "269mg per 100g"
    },
    usedIn: ["Protein Almond Cookies", "Almond Energy Bars"]
  },
  {
    id: "dates",
    name: "Dates",
    category: "Natural Sweeteners",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1584270853783-c2f2e4a18447?w=800&q=80",
    description: "Natural sweetener loaded with fiber, potassium, and antioxidants. Nature's candy that provides sustained energy.",
    benefits: [
      "Natural energy booster",
      "High in fiber",
      "Rich in potassium",
      "Supports digestive health",
      "Contains antioxidants"
    ],
    nutrition: {
      fiber: "6.7g per 100g",
      potassium: "696mg per 100g",
      magnesium: "54mg per 100g",
      iron: "0.9mg per 100g"
    },
    usedIn: ["Quinoa Date Cookies", "Date Energy Balls"]
  },
  {
    id: "oats",
    name: "Oats",
    category: "Whole Grains",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&q=80",
    description: "Whole grain powerhouse rich in beta-glucan fiber. Supports heart health and provides sustained energy.",
    benefits: [
      "Lowers cholesterol",
      "Rich in beta-glucan fiber",
      "Supports heart health",
      "Helps control blood sugar",
      "Promotes satiety"
    ],
    nutrition: {
      protein: "13.2g per 100g",
      fiber: "10.1g per 100g",
      betaGlucan: "4g per 100g",
      iron: "4.3mg per 100g"
    },
    usedIn: ["Oat Protein Bites", "Oatmeal Cookies"]
  }
]

const categories = ["All", "Ancient Grains", "Nuts & Seeds", "Natural Sweeteners", "Whole Grains"]

export default function IngredientGlossaryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIngredient, setSelectedIngredient] = useState<typeof ingredients[0] | null>(null)

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesCategory = selectedCategory === "All" || ingredient.category === selectedCategory
    const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ingredient.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#FAF0E6] via-[#FAFAF8] to-[#D4A5D4]/10 paper-texture">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div 
                className="inline-flex items-center gap-2 bg-[#88A85D]/20 text-[#88A85D] px-4 py-2 rounded-full mb-6 font-semibold text-sm border border-[#88A85D]/30 shadow-3d"
                whileHover={{ scale: 1.05 }}
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <BookOpen className="w-4 h-4" />
                Ingredient Encyclopedia
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                Ancient Grains & <span className="text-[#88A85D]">Superfoods</span> Glossary
              </h1>
              
              <p className="text-xl text-[#5D4037]/80 max-w-3xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
                Discover the nutritional powerhouses behind Geetato products. Learn about their health benefits, traditional uses, and why we choose them.
              </p>
            </div>

            {/* Search & Filter */}
            <div className="mb-12">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5D4037]/40" />
                <Input
                  type="text"
                  placeholder="Search ingredients, benefits, or nutrition..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 w-full rounded-2xl border-2 border-[#88A85D]/20 focus:border-[#88A85D] bg-white text-lg"
                />
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-full font-semibold text-sm transition-all btn-3d ${
                      selectedCategory === category
                        ? "bg-[#88A85D] text-white shadow-3d"
                        : "bg-white text-[#5D4037] hover:bg-[#FAF0E6] border border-[#88A85D]/20"
                    }`}
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Ingredients Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredIngredients.map((ingredient, idx) => (
                <motion.div
                  key={ingredient.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  layout
                >
                  <Card 
                    className="group overflow-hidden border-2 border-transparent hover:border-[#88A85D] transition-all duration-300 hover:shadow-3d cursor-pointer bg-white rounded-3xl card-3d h-full"
                    onClick={() => setSelectedIngredient(ingredient)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                        src={ingredient.image}
                        alt={ingredient.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center gap-2 text-white/90 mb-2">
                          <ingredient.icon className="w-4 h-4" />
                          <span className="text-xs font-semibold uppercase tracking-wide" style={{ fontFamily: "var(--font-accent)" }}>
                            {ingredient.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>
                          {ingredient.name}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-sm text-[#5D4037]/80 mb-4 line-clamp-2" style={{ fontFamily: "var(--font-body)" }}>
                        {ingredient.description}
                      </p>
                      
                      <Button
                        variant="outline"
                        className="w-full border-[#88A85D] text-[#88A85D] hover:bg-[#88A85D] hover:text-white rounded-full"
                        style={{ fontFamily: "var(--font-accent)" }}
                      >
                        Learn More
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredIngredients.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-[#5D4037]/20 mx-auto mb-4" />
                <p className="text-lg text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
                  No ingredients found. Try a different search term.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Ingredient Detail Modal */}
      {selectedIngredient && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIngredient(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <Card className="p-8 md:p-12 rounded-3xl shadow-3d bg-white">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="relative h-64 md:h-full rounded-2xl overflow-hidden mb-6 md:mb-0">
                    <img
                      src={selectedIngredient.image}
                      alt={selectedIngredient.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="inline-flex items-center gap-2 bg-[#88A85D]/10 text-[#88A85D] px-3 py-1.5 rounded-full mb-4 font-semibold text-xs" style={{ fontFamily: "var(--font-accent)" }}>
                    <selectedIngredient.icon className="w-3 h-3" />
                    {selectedIngredient.category}
                  </div>
                  
                  <h2 className="text-3xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                    {selectedIngredient.name}
                  </h2>
                  
                  <p className="text-[#5D4037]/80 mb-6 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {selectedIngredient.description}
                  </p>
                  
                  {/* Benefits */}
                  <div className="mb-6">
                    <h3 className="text-lg font-black mb-3 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                      Health Benefits
                    </h3>
                    <ul className="space-y-2">
                      {selectedIngredient.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#88A85D] flex-shrink-0 mt-2" />
                          <span className="text-sm text-[#5D4037]/80" style={{ fontFamily: "var(--font-body)" }}>
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Nutrition */}
                  <div className="mb-6 p-4 bg-[#FAF0E6] rounded-2xl">
                    <h3 className="text-lg font-black mb-3 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                      Nutritional Profile
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(selectedIngredient.nutrition).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-lg font-black text-[#88A85D]" style={{ fontFamily: "var(--font-heading)" }}>
                            {value}
                          </div>
                          <div className="text-xs text-[#5D4037]/70 capitalize" style={{ fontFamily: "var(--font-body)" }}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Used In */}
                  <div>
                    <h3 className="text-sm font-bold mb-2 text-[#5D4037]/70" style={{ fontFamily: "var(--font-accent)" }}>
                      FOUND IN THESE PRODUCTS:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedIngredient.usedIn.map((product, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1.5 bg-white border border-[#88A85D]/20 rounded-full text-xs font-semibold text-[#5D4037]"
                          style={{ fontFamily: "var(--font-accent)" }}
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => setSelectedIngredient(null)}
                    className="w-full mt-6 bg-[#88A85D] hover:bg-[#88A85D]/90 text-white font-bold btn-3d"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  )
}
