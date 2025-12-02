"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Check, Sparkles, Heart, Zap, Leaf, Shield, Target, TrendingUp, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Link from "next/link"

const quizQuestions = [
  {
    id: 1,
    question: "What's your primary health goal?",
    subtitle: "Help us understand what you're working towards",
    options: [
      { 
        id: "weight-loss", 
        label: "Weight Management", 
        icon: TrendingUp,
        description: "Looking to maintain or reduce weight healthily"
      },
      { 
        id: "muscle-gain", 
        label: "Build Muscle", 
        icon: Zap,
        description: "Increase protein intake for muscle growth"
      },
      { 
        id: "energy", 
        label: "More Energy", 
        icon: Sparkles,
        description: "Boost daily energy and reduce fatigue"
      },
      { 
        id: "gut-health", 
        label: "Digestive Health", 
        icon: Heart,
        description: "Improve digestion with fiber-rich foods"
      }
    ]
  },
  {
    id: 2,
    question: "What dietary preferences do you follow?",
    subtitle: "Select all that apply to you",
    multiple: true,
    options: [
      { 
        id: "vegan", 
        label: "Vegan", 
        icon: Leaf,
        description: "100% plant-based diet"
      },
      { 
        id: "vegetarian", 
        label: "Vegetarian", 
        icon: Leaf,
        description: "Plant-based with dairy/eggs"
      },
      { 
        id: "gluten-free", 
        label: "Gluten-Free", 
        icon: Shield,
        description: "Avoid wheat and gluten"
      },
      { 
        id: "low-sugar", 
        label: "Low Sugar", 
        icon: Target,
        description: "Minimize sugar intake"
      },
      { 
        id: "none", 
        label: "No Restrictions", 
        icon: Package,
        description: "Open to all options"
      }
    ]
  },
  {
    id: 3,
    question: "How often do you snack during the day?",
    subtitle: "This helps us recommend the right quantities",
    options: [
      { 
        id: "rarely", 
        label: "Rarely (0-1 times)", 
        icon: Package,
        description: "Occasional treat seeker"
      },
      { 
        id: "sometimes", 
        label: "Sometimes (2-3 times)", 
        icon: Package,
        description: "Regular snacker"
      },
      { 
        id: "often", 
        label: "Often (4+ times)", 
        icon: Package,
        description: "Frequent grazer"
      }
    ]
  },
  {
    id: 4,
    question: "What time do you usually snack?",
    subtitle: "Select all that apply",
    multiple: true,
    options: [
      { 
        id: "morning", 
        label: "Morning (6am-11am)", 
        icon: Sparkles,
        description: "Breakfast boost"
      },
      { 
        id: "afternoon", 
        label: "Afternoon (12pm-4pm)", 
        icon: Zap,
        description: "Midday pick-me-up"
      },
      { 
        id: "evening", 
        label: "Evening (5pm-9pm)", 
        icon: Heart,
        description: "Post-work treat"
      },
      { 
        id: "night", 
        label: "Late Night (9pm+)", 
        icon: Target,
        description: "Midnight munchies"
      }
    ]
  },
  {
    id: 5,
    question: "What flavors do you prefer?",
    subtitle: "Select your top preferences",
    multiple: true,
    options: [
      { 
        id: "sweet", 
        label: "Sweet", 
        icon: Heart,
        description: "Dates, honey, naturally sweet"
      },
      { 
        id: "savory", 
        label: "Savory", 
        icon: Zap,
        description: "Herbs, spices, umami"
      },
      { 
        id: "nutty", 
        label: "Nutty", 
        icon: Package,
        description: "Almonds, cashews, seeds"
      },
      { 
        id: "chocolate", 
        label: "Chocolate", 
        icon: Heart,
        description: "Dark chocolate, cocoa"
      }
    ]
  }
]

const productRecommendations = {
  "weight-loss": {
    products: [
      {
        id: 5,
        name: "Coconut Macaroons",
        category: "Low Sugar",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-coconut-f54603d1-20251024085552.jpg",
        price: "₹279",
        badge: "Low Cal"
      },
      {
        id: 3,
        name: "Millet Energy Bars",
        category: "Vegan",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-millet--9a9f4bb1-20251024085553.jpg",
        price: "₹299",
        badge: "High Fiber"
      }
    ],
    tips: [
      "Choose low-sugar, high-fiber snacks",
      "Portion control is key - our packs are pre-portioned",
      "Snack between meals to maintain metabolism"
    ]
  },
  "muscle-gain": {
    products: [
      {
        id: 1,
        name: "Protein Almond Cookies",
        category: "Gluten-Free",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-protein-4d7c2e20-20251024085551.jpg",
        price: "₹349",
        badge: "12g Protein"
      },
      {
        id: 6,
        name: "Oat Protein Bites",
        category: "High Protein",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-oat-pro-0a822990-20251024085553.jpg",
        price: "₹359",
        badge: "15g Protein"
      }
    ],
    tips: [
      "Aim for 20-30g protein per snack",
      "Best consumed within 30 mins post-workout",
      "Pair with fruits for complete nutrition"
    ]
  },
  "energy": {
    products: [
      {
        id: 3,
        name: "Millet Energy Bars",
        category: "Vegan",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-millet--9a9f4bb1-20251024085553.jpg",
        price: "₹299",
        badge: "Energy Boost"
      },
      {
        id: 4,
        name: "Quinoa Date Cookies",
        category: "Gluten-Free",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-quinoa--e372851b-20251024085554.jpg",
        price: "₹329",
        badge: "Sustained Energy"
      }
    ],
    tips: [
      "Complex carbs provide steady energy",
      "Ancient grains prevent energy crashes",
      "Snack every 3-4 hours for optimal energy"
    ]
  },
  "gut-health": {
    products: [
      {
        id: 2,
        name: "Ragi Chocolate Brownies",
        category: "Low Sugar",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-ragi-ch-9805a154-20251024085554.jpg",
        price: "₹399",
        badge: "High Fiber"
      },
      {
        id: 3,
        name: "Millet Energy Bars",
        category: "Vegan",
        image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-millet--9a9f4bb1-20251024085553.jpg",
        price: "₹299",
        badge: "Probiotic-Friendly"
      }
    ],
    tips: [
      "Fiber-rich ancient grains support digestion",
      "Fermented ingredients promote gut bacteria",
      "Stay hydrated for optimal fiber benefits"
    ]
  }
}

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({})
  const [showResults, setShowResults] = useState(false)
  const [direction, setDirection] = useState<"forward" | "backward">("forward")

  const question = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const handleAnswer = (optionId: string) => {
    if (question.multiple) {
      const currentAnswers = (answers[question.id] as string[]) || []
      const newAnswers = currentAnswers.includes(optionId)
        ? currentAnswers.filter(id => id !== optionId)
        : [...currentAnswers, optionId]
      setAnswers({ ...answers, [question.id]: newAnswers })
    } else {
      setAnswers({ ...answers, [question.id]: optionId })
    }
  }

  const isAnswered = () => {
    const answer = answers[question.id]
    if (question.multiple) {
      return Array.isArray(answer) && answer.length > 0
    }
    return !!answer
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setDirection("forward")
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection("backward")
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const getRecommendations = () => {
    const primaryGoal = answers[1] as string
    return productRecommendations[primaryGoal as keyof typeof productRecommendations] || productRecommendations["energy"]
  }

  if (showResults) {
    const recommendations = getRecommendations()
    
    return (
      <div className="min-h-screen">
        <Navigation />
        
        <section className="pt-32 pb-20 bg-gradient-to-br from-[#FAF0E6] via-[#FAFAF8] to-[#D4A5D4]/10 paper-texture min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              {/* Success Header */}
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#E85D75] to-[#F4A261] mb-6 shadow-3d"
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>
                
                <h1 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                  Your Personalized <span className="text-[#E85D75]">Recommendations</span>
                </h1>
                <p className="text-xl text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                  Based on your preferences, we've curated the perfect snacks for you
                </p>
              </div>

              {/* Recommended Products */}
              <div className="mb-12">
                <h2 className="text-2xl font-black mb-6 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                  Perfect Products for You
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {recommendations.products.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      <Card className="overflow-hidden border-2 border-transparent hover:border-[#E85D75] transition-all shadow-3d rounded-3xl group">
                        <Link href={`/products/${product.id}`}>
                          <div className="relative h-64 overflow-hidden">
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.4 }}
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4">
                              <span className="bg-[#F4A261] text-[#2C2C2E] text-xs font-bold px-3 py-1.5 rounded-full shadow-3d">
                                {product.badge}
                              </span>
                            </div>
                          </div>
                        </Link>
                        <div className="p-6">
                          <p className="text-sm text-[#88A85D] font-semibold mb-2 uppercase tracking-wide" style={{ fontFamily: "var(--font-accent)" }}>
                            {product.category}
                          </p>
                          <Link href={`/products/${product.id}`}>
                            <h3 className="text-xl font-bold mb-3 text-[#2C2C2E] group-hover:text-[#E85D75] transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                              {product.name}
                            </h3>
                          </Link>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-black text-[#E85D75]" style={{ fontFamily: "var(--font-heading)" }}>
                              {product.price}
                            </span>
                            <Button
                              asChild
                              size="sm"
                              className="bg-[#E85D75] hover:bg-[#E85D75]/90 text-white rounded-full btn-3d"
                            >
                              <Link href={`/products/${product.id}`}>
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Personalized Tips */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="p-8 bg-gradient-to-br from-white to-[#FAF0E6] border-2 border-[#E85D75]/20 rounded-3xl shadow-3d">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E85D75] to-[#F4A261] flex items-center justify-center shadow-3d">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                      Your Personalized Tips
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {recommendations.tips.map((tip, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-5 h-5 text-[#88A85D] flex-shrink-0 mt-0.5" />
                        <span className="text-[#5D4037]/80 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                          {tip}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <Button
                  size="lg"
                  asChild
                  className="bg-[#E85D75] hover:bg-[#E85D75]/90 text-white font-bold shadow-3d btn-3d"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  <Link href="/products">
                    <Package className="mr-2 w-5 h-5" />
                    Shop All Products
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    setShowResults(false)
                    setCurrentQuestion(0)
                    setAnswers({})
                  }}
                  className="border-2 border-[#88A85D] text-[#88A85D] hover:bg-[#88A85D] hover:text-white font-bold btn-3d"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  Retake Quiz
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#FAF0E6] via-[#FAFAF8] to-[#FAF0E6] paper-texture min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div 
                className="inline-flex items-center gap-2 bg-[#E85D75]/20 text-[#E85D75] px-4 py-2 rounded-full mb-6 font-semibold text-sm border border-[#E85D75]/30 shadow-3d"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Sparkles className="w-4 h-4" />
                Personalized for You
              </motion.div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" 
                style={{ fontFamily: "var(--font-heading)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Find Your Perfect <span className="text-[#E85D75]">Healthy Snacks</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-[#5D4037]/70" 
                style={{ fontFamily: "var(--font-body)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Answer 5 quick questions to get personalized product recommendations
              </motion.p>
            </div>

            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-[#5D4037]/70" style={{ fontFamily: "var(--font-accent)" }}>
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <span className="text-sm font-semibold text-[#E85D75]" style={{ fontFamily: "var(--font-accent)" }}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-3 bg-[#E8E5E1] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#E85D75] to-[#F4A261] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: direction === "forward" ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === "forward" ? -50 : 50 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8 md:p-12 border-2 border-[#E85D75]/20 rounded-3xl shadow-3d bg-white">
                  <h2 className="text-2xl sm:text-3xl font-black mb-3 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                    {question.question}
                  </h2>
                  <p className="text-[#5D4037]/70 mb-8" style={{ fontFamily: "var(--font-body)" }}>
                    {question.subtitle}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {question.options.map((option, idx) => {
                      const isSelected = question.multiple
                        ? (answers[question.id] as string[] || []).includes(option.id)
                        : answers[question.id] === option.id

                      return (
                        <motion.button
                          key={option.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          onClick={() => handleAnswer(option.id)}
                          className={`p-6 rounded-2xl border-2 transition-all text-left group ${
                            isSelected
                              ? "border-[#E85D75] bg-[#E85D75]/10 shadow-3d"
                              : "border-[#E8E5E1] hover:border-[#E85D75]/50 hover:bg-[#FAF0E6]"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? "bg-[#E85D75] text-white"
                                  : "bg-[#FAF0E6] text-[#E85D75] group-hover:bg-[#E85D75] group-hover:text-white"
                              } transition-colors`}
                            >
                              <option.icon className="w-6 h-6" />
                            </motion.div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                                  {option.label}
                                </h3>
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-6 h-6 rounded-full bg-[#E85D75] flex items-center justify-center"
                                  >
                                    <Check className="w-4 h-4 text-white" />
                                  </motion.div>
                                )}
                              </div>
                              <p className="text-sm text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                                {option.description}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className="border-2 border-[#E85D75]/20 hover:bg-[#FAF0E6] disabled:opacity-50 rounded-full"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      <ChevronLeft className="w-5 h-5 mr-2" />
                      Previous
                    </Button>
                    <Button
                      size="lg"
                      onClick={handleNext}
                      disabled={!isAnswered()}
                      className="bg-[#E85D75] hover:bg-[#E85D75]/90 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-3d btn-3d rounded-full"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      {currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next"}
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
