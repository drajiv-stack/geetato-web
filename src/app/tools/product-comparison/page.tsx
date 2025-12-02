"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GitCompare, Plus, X, Check, Star, Info, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Link from "next/link"

const allProducts = [
  {
    id: 1,
    name: "Protein Almond Cookies",
    category: "Gluten-Free",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-protein-4d7c2e20-20251024085551.jpg",
    price: 349,
    priceDisplay: "₹349",
    rating: 4.9,
    reviews: 1250,
    nutrition: { protein: "12g", carbs: "18g", fat: "8g", calories: "210", fiber: "4g", sugar: "6g" },
    ingredients: ["Almonds", "Oat Flour", "Dates", "Protein Powder", "Dark Chocolate"],
    features: ["High Protein", "Gluten-Free", "Natural Sweeteners", "No Preservatives"],
    servingSize: "2 cookies (40g)"
  },
  {
    id: 2,
    name: "Ragi Chocolate Brownies",
    category: "Low Sugar",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-ragi-ch-9805a154-20251024085554.jpg",
    price: 399,
    priceDisplay: "₹399",
    rating: 4.8,
    reviews: 980,
    nutrition: { protein: "10g", carbs: "22g", fat: "9g", calories: "230", fiber: "5g", sugar: "8g" },
    ingredients: ["Ragi Flour", "Dark Chocolate", "Dates", "Coconut Oil", "Almonds"],
    features: ["Low Sugar", "High Fiber", "Ancient Grains", "Rich in Calcium"],
    servingSize: "1 brownie (50g)"
  },
  {
    id: 3,
    name: "Millet Energy Bars",
    category: "Vegan",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-millet--9a9f4bb1-20251024085553.jpg",
    price: 299,
    priceDisplay: "₹299",
    rating: 4.7,
    reviews: 756,
    nutrition: { protein: "8g", carbs: "25g", fat: "7g", calories: "200", fiber: "6g", sugar: "10g" },
    ingredients: ["Multi-Millet", "Dates", "Nuts", "Seeds", "Honey"],
    features: ["Vegan", "Gluten-Free", "Energy Boost", "High Fiber"],
    servingSize: "1 bar (45g)"
  },
  {
    id: 4,
    name: "Quinoa Date Cookies",
    category: "Gluten-Free",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-quinoa--e372851b-20251024085554.jpg",
    price: 329,
    priceDisplay: "₹329",
    rating: 4.9,
    reviews: 542,
    nutrition: { protein: "9g", carbs: "20g", fat: "6g", calories: "190", fiber: "4g", sugar: "7g" },
    ingredients: ["Quinoa Flour", "Dates", "Almonds", "Coconut Sugar", "Vanilla"],
    features: ["Complete Protein", "Gluten-Free", "Low Sugar", "Ancient Grains"],
    servingSize: "2 cookies (35g)"
  },
  {
    id: 5,
    name: "Coconut Macaroons",
    category: "Low Sugar",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-coconut-f54603d1-20251024085552.jpg",
    price: 279,
    priceDisplay: "₹279",
    rating: 4.6,
    reviews: 823,
    nutrition: { protein: "5g", carbs: "15g", fat: "10g", calories: "180", fiber: "3g", sugar: "5g" },
    ingredients: ["Coconut", "Dates", "Almond Flour", "Vanilla", "Sea Salt"],
    features: ["Low Sugar", "Keto-Friendly", "No Refined Sugar", "Coconut Rich"],
    servingSize: "3 macaroons (40g)"
  },
  {
    id: 6,
    name: "Oat Protein Bites",
    category: "High Protein",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-oat-pro-0a822990-20251024085553.jpg",
    price: 359,
    priceDisplay: "₹359",
    rating: 5.0,
    reviews: 234,
    nutrition: { protein: "15g", carbs: "18g", fat: "7g", calories: "220", fiber: "5g", sugar: "4g" },
    ingredients: ["Oats", "Protein Powder", "Peanut Butter", "Honey", "Dark Chocolate"],
    features: ["Highest Protein", "Post-Workout", "Energy Boost", "Muscle Recovery"],
    servingSize: "4 bites (50g)"
  }
]

export default function ProductComparisonPage() {
  const [selectedProducts, setSelectedProducts] = useState<typeof allProducts>([])
  const [showProductSelector, setShowProductSelector] = useState(false)

  const addProduct = (product: typeof allProducts[0]) => {
    if (selectedProducts.length < 4 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product])
      setShowProductSelector(false)
    }
  }

  const removeProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId))
  }

  const availableProducts = allProducts.filter(
    p => !selectedProducts.find(sp => sp.id === p.id)
  )

  const getBestValue = () => {
    if (selectedProducts.length < 2) return null
    return selectedProducts.reduce((best, current) => 
      (current.price < best.price) ? current : best
    )
  }

  const getHighestProtein = () => {
    if (selectedProducts.length < 2) return null
    return selectedProducts.reduce((best, current) => 
      (parseInt(current.nutrition.protein) > parseInt(best.nutrition.protein)) ? current : best
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#FAF0E6] via-[#FAFAF8] to-[#D4A5D4]/10 paper-texture">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div 
                className="inline-flex items-center gap-2 bg-[#F4A261]/20 text-[#F4A261] px-4 py-2 rounded-full mb-6 font-semibold text-sm border border-[#F4A261]/30 shadow-3d"
                whileHover={{ scale: 1.05 }}
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <GitCompare className="w-4 h-4" />
                Product Comparison Tool
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                Compare Products <span className="text-[#F4A261]">Side-by-Side</span>
              </h1>
              
              <p className="text-xl text-[#5D4037]/80 max-w-3xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
                Find your perfect snack by comparing nutrition facts, ingredients, prices, and benefits across our product range
              </p>
            </div>

            {/* Product Selection Area */}
            <div className="mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {[0, 1, 2, 3].map((index) => {
                  const product = selectedProducts[index]
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {product ? (
                        <Card className="p-4 border-2 border-[#E85D75] rounded-2xl shadow-3d bg-white relative group">
                          <button
                            onClick={() => removeProduct(product.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#E85D75] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          
                          <div className="aspect-square rounded-xl overflow-hidden mb-3">
                            <img 
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <h3 className="font-bold text-sm text-[#2C2C2E] line-clamp-2" style={{ fontFamily: "var(--font-heading)" }}>
                            {product.name}
                          </h3>
                          <p className="text-xs text-[#5D4037]/60 mt-1" style={{ fontFamily: "var(--font-body)" }}>
                            {product.priceDisplay}
                          </p>
                        </Card>
                      ) : (
                        <button
                          onClick={() => setShowProductSelector(true)}
                          className="w-full aspect-square border-2 border-dashed border-[#E85D75]/30 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-[#E85D75] hover:bg-[#FAF0E6] transition-all group"
                        >
                          <Plus className="w-8 h-8 text-[#E85D75]/40 group-hover:text-[#E85D75]" />
                          <span className="text-sm font-semibold text-[#5D4037]/40 group-hover:text-[#5D4037]" style={{ fontFamily: "var(--font-accent)" }}>
                            Add Product
                          </span>
                        </button>
                      )}
                    </motion.div>
                  )
                })}
              </div>
              
              {selectedProducts.length > 0 && selectedProducts.length < 4 && (
                <div className="text-center mt-4">
                  <Button
                    onClick={() => setShowProductSelector(true)}
                    variant="outline"
                    className="border-2 border-[#E85D75] text-[#E85D75] hover:bg-[#E85D75] hover:text-white rounded-full"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Product
                  </Button>
                </div>
              )}
            </div>

            {/* Comparison Table */}
            {selectedProducts.length >= 2 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto space-y-8"
              >
                {/* Best Value & Highest Protein Indicators */}
                <div className="grid md:grid-cols-2 gap-4">
                  {getBestValue() && (
                    <Card className="p-6 border-2 border-[#88A85D] rounded-2xl bg-gradient-to-br from-white to-[#88A85D]/5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#88A85D] flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#88A85D] mb-1" style={{ fontFamily: "var(--font-accent)" }}>
                            BEST VALUE
                          </div>
                          <div className="font-black text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                            {getBestValue()?.name}
                          </div>
                          <div className="text-sm text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                            {getBestValue()?.priceDisplay} per pack
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                  
                  {getHighestProtein() && (
                    <Card className="p-6 border-2 border-[#E85D75] rounded-2xl bg-gradient-to-br from-white to-[#E85D75]/5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#E85D75] flex items-center justify-center">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#E85D75] mb-1" style={{ fontFamily: "var(--font-accent)" }}>
                            HIGHEST PROTEIN
                          </div>
                          <div className="font-black text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                            {getHighestProtein()?.name}
                          </div>
                          <div className="text-sm text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                            {getHighestProtein()?.nutrition.protein} per serving
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>

                {/* Nutrition Comparison */}
                <Card className="overflow-hidden border-2 border-[#E85D75]/20 rounded-3xl shadow-3d">
                  <div className="p-6 bg-gradient-to-r from-[#E85D75] to-[#F4A261]">
                    <h2 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>
                      Nutrition Facts Comparison
                    </h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#FAF0E6]">
                        <tr>
                          <th className="p-4 text-left font-bold text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                            Nutrient
                          </th>
                          {selectedProducts.map(product => (
                            <th key={product.id} className="p-4 text-center font-bold text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                              <div className="text-sm">{product.name}</div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(selectedProducts[0].nutrition).map((nutrient, idx) => (
                          <tr key={nutrient} className={idx % 2 === 0 ? "bg-white" : "bg-[#FAFAF8]"}>
                            <td className="p-4 font-semibold text-[#5D4037] capitalize" style={{ fontFamily: "var(--font-accent)" }}>
                              {nutrient}
                            </td>
                            {selectedProducts.map(product => (
                              <td key={product.id} className="p-4 text-center font-bold text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                                {product.nutrition[nutrient as keyof typeof product.nutrition]}
                              </td>
                            ))}
                          </tr>
                        ))}
                        <tr className="bg-[#E85D75]/5">
                          <td className="p-4 font-semibold text-[#5D4037]" style={{ fontFamily: "var(--font-accent)" }}>
                            Price
                          </td>
                          {selectedProducts.map(product => (
                            <td key={product.id} className="p-4 text-center font-black text-[#E85D75]" style={{ fontFamily: "var(--font-heading)" }}>
                              {product.priceDisplay}
                            </td>
                          ))}
                        </tr>
                        <tr className="bg-white">
                          <td className="p-4 font-semibold text-[#5D4037]" style={{ fontFamily: "var(--font-accent)" }}>
                            Rating
                          </td>
                          {selectedProducts.map(product => (
                            <td key={product.id} className="p-4 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Star className="w-4 h-4 fill-[#F4A261] text-[#F4A261]" />
                                <span className="font-bold text-[#2C2C2E]">{product.rating}</span>
                                <span className="text-xs text-[#5D4037]/60">({product.reviews})</span>
                              </div>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Ingredients & Features */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Ingredients */}
                  <Card className="p-6 border-2 border-[#E85D75]/20 rounded-3xl shadow-3d">
                    <h3 className="text-xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                      Key Ingredients
                    </h3>
                    <div className="space-y-4">
                      {selectedProducts.map(product => (
                        <div key={product.id}>
                          <div className="font-bold text-sm text-[#E85D75] mb-2" style={{ fontFamily: "var(--font-accent)" }}>
                            {product.name}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {product.ingredients.map((ingredient, idx) => (
                              <span 
                                key={idx}
                                className="px-3 py-1 bg-[#FAF0E6] rounded-full text-xs font-semibold text-[#5D4037]"
                                style={{ fontFamily: "var(--font-body)" }}
                              >
                                {ingredient}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Features */}
                  <Card className="p-6 border-2 border-[#E85D75]/20 rounded-3xl shadow-3d">
                    <h3 className="text-xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                      Key Features
                    </h3>
                    <div className="space-y-4">
                      {selectedProducts.map(product => (
                        <div key={product.id}>
                          <div className="font-bold text-sm text-[#E85D75] mb-2" style={{ fontFamily: "var(--font-accent)" }}>
                            {product.name}
                          </div>
                          <div className="space-y-2">
                            {product.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#88A85D]" />
                                <span className="text-sm text-[#5D4037]" style={{ fontFamily: "var(--font-body)" }}>
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    className="bg-[#E85D75] hover:bg-[#E85D75]/90 text-white font-bold btn-3d"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    <Link href="/products">
                      View All Products
                    </Link>
                  </Button>
                  <Button
                    onClick={() => setSelectedProducts([])}
                    variant="outline"
                    className="border-2 border-[#88A85D] text-[#88A85D] hover:bg-[#88A85D] hover:text-white font-bold btn-3d"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    Clear Comparison
                  </Button>
                </div>
              </motion.div>
            ) : (
              <Card className="p-12 border-2 border-dashed border-[#E85D75]/30 rounded-3xl bg-[#FAF0E6]/50 text-center max-w-2xl mx-auto">
                <GitCompare className="w-16 h-16 text-[#E85D75]/30 mx-auto mb-4" />
                <h3 className="text-2xl font-black mb-2 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                  Start Comparing Products
                </h3>
                <p className="text-[#5D4037]/70 mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  Select at least 2 products above to see a detailed side-by-side comparison
                </p>
                <Button
                  onClick={() => setShowProductSelector(true)}
                  className="bg-[#E85D75] hover:bg-[#E85D75]/90 text-white font-bold btn-3d"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Products
                </Button>
              </Card>
            )}
          </motion.div>
        </div>
      </section>

      {/* Product Selector Modal */}
      <AnimatePresence>
        {showProductSelector && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProductSelector(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-10 z-50 flex items-center justify-center"
            >
              <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl shadow-3d">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                    Select a Product
                  </h2>
                  <button
                    onClick={() => setShowProductSelector(false)}
                    className="p-2 hover:bg-[#FAF0E6] rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-[#2C2C2E]" />
                  </button>
                </div>
                
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {availableProducts.map((product) => (
                    <motion.button
                      key={product.id}
                      onClick={() => addProduct(product)}
                      whileHover={{ y: -4 }}
                      className="text-left border-2 border-transparent hover:border-[#E85D75] rounded-2xl overflow-hidden transition-all"
                    >
                      <div className="aspect-square overflow-hidden">
                        <img 
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-sm text-[#2C2C2E] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
                          {product.priceDisplay}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
