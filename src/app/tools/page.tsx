"use client"

import { motion } from "framer-motion"
import { Calculator, BookOpen, GitCompare, ArrowRight, Sparkles, Target, Leaf, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Link from "next/link"

const tools = [
  {
    id: "nutrition-calculator",
    icon: Calculator,
    title: "Nutrition Calculator",
    subtitle: "Calculate your daily nutritional needs",
    description: "Get personalized daily calorie, protein, carbs, and fat recommendations based on your age, weight, height, activity level, and health goals.",
    color: "from-[#E85D75] to-[#F4A261]",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    features: [
      "BMI & BMR calculation",
      "Macro distribution",
      "Activity level adjustments",
      "Goal-based recommendations"
    ],
    href: "/tools/nutrition-calculator"
  },
  {
    id: "ingredient-glossary",
    icon: BookOpen,
    title: "Ingredient Glossary",
    subtitle: "Learn about ancient grains & superfoods",
    description: "Comprehensive guide to Indian superfoods, ancient grains, and natural ingredients used in Geetato products with health benefits and nutritional profiles.",
    color: "from-[#88A85D] to-[#89CFF0]",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&q=80",
    features: [
      "50+ ingredient profiles",
      "Health benefits explained",
      "Nutritional breakdowns",
      "Recipe suggestions"
    ],
    href: "/tools/ingredient-glossary"
  },
  {
    id: "product-comparison",
    icon: GitCompare,
    title: "Product Comparison",
    subtitle: "Compare products side-by-side",
    description: "Compare nutrition facts, ingredients, prices, and health benefits across multiple Geetato products to find your perfect match.",
    color: "from-[#F4A261] to-[#D4A5D4]",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    features: [
      "Side-by-side comparison",
      "Nutrition analysis",
      "Price comparison",
      "Best value finder"
    ],
    href: "/tools/product-comparison"
  }
]

const benefits = [
  {
    icon: Target,
    title: "Make Informed Choices",
    description: "Data-driven insights to help you choose the right products"
  },
  {
    icon: Leaf,
    title: "Understand Ingredients",
    description: "Learn about the superfoods powering your wellness"
  },
  {
    icon: Zap,
    title: "Track Your Goals",
    description: "Monitor nutrition and stay aligned with your health journey"
  }
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#FAF0E6] via-[#FAFAF8] to-[#D4A5D4]/10 paper-texture overflow-hidden relative">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.03, 0.05, 0.03],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#E85D75] to-[#F4A261] blur-3xl"
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-[#E85D75]/20 text-[#E85D75] px-4 py-2 rounded-full mb-6 font-semibold text-sm border border-[#E85D75]/30 shadow-3d"
              whileHover={{ scale: 1.05 }}
              style={{ fontFamily: "var(--font-accent)" }}
            >
              <Sparkles className="w-4 h-4" />
              Wellness Tools
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-[#2C2C2E] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Interactive <span className="text-[#E85D75]">Health Tools</span>
            </h1>
            
            <p className="text-xl text-[#5D4037]/80 mb-8 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Free calculators, guides, and comparison tools to help you make informed decisions 
              about your nutrition and wellness journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-24 bg-[#FAFAF8] paper-texture">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Our <span className="text-[#E85D75]">Free Tools</span>
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Empowering you with knowledge and insights for better health decisions
            </p>
          </motion.div>
          
          <div className="space-y-16 max-w-6xl mx-auto">
            {tools.map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className={`overflow-hidden border-2 hover:border-[#E85D75] transition-all duration-500 shadow-3d rounded-3xl ${
                  idx % 2 === 0 ? "" : ""
                }`}>
                  <div className={`grid lg:grid-cols-2 gap-0 ${idx % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                    {/* Image */}
                    <motion.div 
                      className={`relative h-80 lg:h-auto overflow-hidden perspective-container ${
                        idx % 2 === 1 ? "lg:col-start-2" : ""
                      }`}
                      whileHover={{ scale: 1.02 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <img 
                        src={tool.image}
                        alt={tool.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-20`} />
                      
                      {/* Floating Icon Badge */}
                      <motion.div
                        className="absolute top-6 right-6"
                        whileHover={{ scale: 1.1, rotateZ: 10 }}
                      >
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-3d`}>
                          <tool.icon className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>
                    </motion.div>
                    
                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 bg-[#E85D75]/10 text-[#E85D75] px-3 py-1.5 rounded-full mb-4 font-semibold text-xs w-fit" style={{ fontFamily: "var(--font-accent)" }}>
                        <Sparkles className="w-3 h-3" />
                        {tool.subtitle}
                      </div>
                      
                      <h3 className="text-3xl sm:text-4xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                        {tool.title}
                      </h3>
                      
                      <p className="text-lg text-[#5D4037]/80 mb-6 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                        {tool.description}
                      </p>
                      
                      {/* Features */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {tool.features.map((feature, fidx) => (
                          <motion.div
                            key={fidx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: fidx * 0.1 }}
                            className="flex items-center gap-2 text-sm text-[#5D4037]/80"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#88A85D]" />
                            <span style={{ fontFamily: "var(--font-body)" }}>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                      
                      <Button 
                        asChild
                        className="bg-[#E85D75] hover:bg-[#E85D75]/90 text-white font-bold w-fit btn-3d"
                        style={{ fontFamily: "var(--font-accent)" }}
                      >
                        <Link href={tool.href}>
                          Try It Now
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Why Use Our <span className="text-[#E85D75]">Tools?</span>
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Backed by nutritional science and designed for your wellness success
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotateY: 10 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#E85D75] via-[#F4A261] to-[#A67C52] flex items-center justify-center shadow-3d"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <benefit.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                  {benefit.title}
                </h3>
                <p className="text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#E85D75] via-[#F4A261] to-[#A67C52] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-repeat" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Ready to Start Your <span className="text-[#FAFAF8]">Wellness Journey?</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Explore our products designed with ancient grains and modern nutrition science
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                asChild
                className="bg-white text-[#E85D75] hover:bg-white/90 font-bold rounded-full shadow-3d btn-3d"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Link href="/products">
                  Shop Products
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white text-white hover:bg-white hover:text-[#E85D75] font-bold rounded-full btn-3d"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Link href="/quiz">
                  Take Wellness Quiz
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
