"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calculator, TrendingUp, Activity, Target, Zap, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very-active"
type Goal = "lose" | "maintain" | "gain"
type Gender = "male" | "female"

const activityLevels = [
  { id: "sedentary" as ActivityLevel, label: "Sedentary", description: "Little or no exercise", multiplier: 1.2 },
  { id: "light" as ActivityLevel, label: "Lightly Active", description: "Exercise 1-3 days/week", multiplier: 1.375 },
  { id: "moderate" as ActivityLevel, label: "Moderately Active", description: "Exercise 3-5 days/week", multiplier: 1.55 },
  { id: "active" as ActivityLevel, label: "Very Active", description: "Exercise 6-7 days/week", multiplier: 1.725 },
  { id: "very-active" as ActivityLevel, label: "Extra Active", description: "Physical job + exercise", multiplier: 1.9 }
]

const goals = [
  { id: "lose" as Goal, label: "Lose Weight", description: "Calorie deficit", adjustment: -500, icon: TrendingUp },
  { id: "maintain" as Goal, label: "Maintain Weight", description: "Maintenance calories", adjustment: 0, icon: Target },
  { id: "gain" as Goal, label: "Gain Muscle", description: "Calorie surplus", adjustment: 300, icon: Zap }
]

export default function NutritionCalculatorPage() {
  const [gender, setGender] = useState<Gender>("male")
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate")
  const [goal, setGoal] = useState<Goal>("maintain")
  const [results, setResults] = useState<any>(null)

  const calculateNutrition = () => {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    const a = parseInt(age)

    if (!w || !h || !a) return

    // BMR calculation (Mifflin-St Jeor Equation)
    let bmr: number
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161
    }

    // TDEE (Total Daily Energy Expenditure)
    const activityMultiplier = activityLevels.find(l => l.id === activityLevel)?.multiplier || 1.55
    const tdee = bmr * activityMultiplier

    // Goal adjusted calories
    const goalAdjustment = goals.find(g => g.id === goal)?.adjustment || 0
    const targetCalories = Math.round(tdee + goalAdjustment)

    // BMI calculation
    const heightInMeters = h / 100
    const bmi = w / (heightInMeters * heightInMeters)

    // Macro distribution (40/30/30 for balanced)
    const protein = Math.round((targetCalories * 0.30) / 4) // 4 cal per gram
    const carbs = Math.round((targetCalories * 0.40) / 4)
    const fats = Math.round((targetCalories * 0.30) / 9) // 9 cal per gram

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories,
      bmi: bmi.toFixed(1),
      protein,
      carbs,
      fats
    })
  }

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "#F4A261" }
    if (bmi < 25) return { label: "Normal", color: "#88A85D" }
    if (bmi < 30) return { label: "Overweight", color: "#F4A261" }
    return { label: "Obese", color: "#E85D75" }
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
            className="max-w-5xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div 
                className="inline-flex items-center gap-2 bg-[#E85D75]/20 text-[#E85D75] px-4 py-2 rounded-full mb-6 font-semibold text-sm border border-[#E85D75]/30 shadow-3d"
                whileHover={{ scale: 1.05 }}
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Calculator className="w-4 h-4" />
                Free Nutrition Calculator
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                Calculate Your Daily <span className="text-[#E85D75]">Nutrition Needs</span>
              </h1>
              
              <p className="text-xl text-[#5D4037]/80 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
                Get personalized recommendations for calories, protein, carbs, and fats based on your goals
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card className="p-8 border-2 border-[#E85D75]/20 rounded-3xl shadow-3d bg-white">
                <h2 className="text-2xl font-black mb-6 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                  Your Information
                </h2>

                <div className="space-y-6">
                  {/* Gender */}
                  <div>
                    <Label className="text-sm font-bold mb-3 block text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                      Gender
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {["male", "female"].map((g) => (
                        <button
                          key={g}
                          onClick={() => setGender(g as Gender)}
                          className={`p-4 rounded-2xl border-2 transition-all font-semibold capitalize ${
                            gender === g
                              ? "border-[#E85D75] bg-[#E85D75]/10"
                              : "border-[#E8E5E1] hover:border-[#E85D75]/50"
                          }`}
                          style={{ fontFamily: "var(--font-accent)" }}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Age */}
                  <div>
                    <Label htmlFor="age" className="text-sm font-bold mb-2 block text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                      Age (years)
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g., 30"
                      className="rounded-2xl border-2 border-[#E85D75]/20 focus:border-[#E85D75]"
                    />
                  </div>

                  {/* Weight */}
                  <div>
                    <Label htmlFor="weight" className="text-sm font-bold mb-2 block text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g., 70"
                      className="rounded-2xl border-2 border-[#E85D75]/20 focus:border-[#E85D75]"
                    />
                  </div>

                  {/* Height */}
                  <div>
                    <Label htmlFor="height" className="text-sm font-bold mb-2 block text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                      Height (cm)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g., 170"
                      className="rounded-2xl border-2 border-[#E85D75]/20 focus:border-[#E85D75]"
                    />
                  </div>

                  {/* Activity Level */}
                  <div>
                    <Label className="text-sm font-bold mb-3 block text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                      Activity Level
                    </Label>
                    <div className="space-y-2">
                      {activityLevels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => setActivityLevel(level.id)}
                          className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                            activityLevel === level.id
                              ? "border-[#E85D75] bg-[#E85D75]/10"
                              : "border-[#E8E5E1] hover:border-[#E85D75]/50"
                          }`}
                        >
                          <div className="font-bold text-[#2C2C2E] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                            {level.label}
                          </div>
                          <div className="text-sm text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                            {level.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Goal */}
                  <div>
                    <Label className="text-sm font-bold mb-3 block text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                      Your Goal
                    </Label>
                    <div className="grid grid-cols-3 gap-3">
                      {goals.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setGoal(g.id)}
                          className={`p-4 rounded-2xl border-2 transition-all ${
                            goal === g.id
                              ? "border-[#E85D75] bg-[#E85D75]/10"
                              : "border-[#E8E5E1] hover:border-[#E85D75]/50"
                          }`}
                        >
                          <g.icon className="w-6 h-6 mx-auto mb-2 text-[#E85D75]" />
                          <div className="font-bold text-xs text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                            {g.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={calculateNutrition}
                    disabled={!age || !weight || !height}
                    className="w-full bg-[#E85D75] hover:bg-[#E85D75]/90 text-white font-bold btn-3d"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate My Nutrition
                  </Button>
                </div>
              </Card>

              {/* Results */}
              <div>
                {results ? (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    {/* BMI Card */}
                    <Card className="p-6 border-2 border-[#E85D75]/20 rounded-3xl shadow-3d bg-white">
                      <h3 className="text-xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                        Body Mass Index (BMI)
                      </h3>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-4xl font-black" style={{ fontFamily: "var(--font-heading)", color: getBMICategory(parseFloat(results.bmi)).color }}>
                          {results.bmi}
                        </span>
                        <span className="text-lg font-bold px-4 py-2 rounded-full" style={{ fontFamily: "var(--font-accent)", backgroundColor: `${getBMICategory(parseFloat(results.bmi)).color}20`, color: getBMICategory(parseFloat(results.bmi)).color }}>
                          {getBMICategory(parseFloat(results.bmi)).label}
                        </span>
                      </div>
                      <div className="h-2 bg-[#E8E5E1] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#88A85D] via-[#F4A261] to-[#E85D75]"
                          style={{ width: `${Math.min((parseFloat(results.bmi) / 40) * 100, 100)}%` }}
                        />
                      </div>
                    </Card>

                    {/* Calorie Targets */}
                    <Card className="p-6 border-2 border-[#E85D75]/20 rounded-3xl shadow-3d bg-gradient-to-br from-white to-[#FAF0E6]">
                      <h3 className="text-xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                        Daily Calorie Targets
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-[#5D4037]/70" style={{ fontFamily: "var(--font-accent)" }}>
                              BMR (Base Metabolic Rate)
                            </span>
                            <span className="text-2xl font-black text-[#88A85D]" style={{ fontFamily: "var(--font-heading)" }}>
                              {results.bmr}
                            </span>
                          </div>
                          <p className="text-xs text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
                            Calories burned at rest
                          </p>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-[#5D4037]/70" style={{ fontFamily: "var(--font-accent)" }}>
                              TDEE (Maintenance)
                            </span>
                            <span className="text-2xl font-black text-[#F4A261]" style={{ fontFamily: "var(--font-heading)" }}>
                              {results.tdee}
                            </span>
                          </div>
                          <p className="text-xs text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
                            Total daily energy expenditure
                          </p>
                        </div>

                        <div className="p-4 bg-[#E85D75]/10 rounded-2xl border-2 border-[#E85D75]">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-[#E85D75]" style={{ fontFamily: "var(--font-accent)" }}>
                              Your Target Calories
                            </span>
                            <span className="text-3xl font-black text-[#E85D75]" style={{ fontFamily: "var(--font-heading)" }}>
                              {results.targetCalories}
                            </span>
                          </div>
                          <p className="text-xs text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                            Based on your {goals.find(g => g.id === goal)?.label.toLowerCase()} goal
                          </p>
                        </div>
                      </div>
                    </Card>

                    {/* Macros */}
                    <Card className="p-6 border-2 border-[#E85D75]/20 rounded-3xl shadow-3d bg-white">
                      <h3 className="text-xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                        Daily Macro Targets
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-[#E85D75]/10 rounded-2xl">
                          <div className="text-2xl font-black text-[#E85D75] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                            {results.protein}g
                          </div>
                          <div className="text-xs font-bold text-[#5D4037]/70" style={{ fontFamily: "var(--font-accent)" }}>
                            Protein
                          </div>
                        </div>
                        <div className="text-center p-4 bg-[#88A85D]/10 rounded-2xl">
                          <div className="text-2xl font-black text-[#88A85D] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                            {results.carbs}g
                          </div>
                          <div className="text-xs font-bold text-[#5D4037]/70" style={{ fontFamily: "var(--font-accent)" }}>
                            Carbs
                          </div>
                        </div>
                        <div className="text-center p-4 bg-[#F4A261]/10 rounded-2xl">
                          <div className="text-2xl font-black text-[#F4A261] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                            {results.fats}g
                          </div>
                          <div className="text-xs font-bold text-[#5D4037]/70" style={{ fontFamily: "var(--font-accent)" }}>
                            Fats
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-[#89CFF0]/10 rounded-xl">
                        <div className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-[#89CFF0] flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                            Based on 40% carbs, 30% protein, 30% fats - ideal for balanced nutrition
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ) : (
                  <Card className="p-12 border-2 border-dashed border-[#E85D75]/30 rounded-3xl bg-[#FAF0E6]/50 text-center h-full flex items-center justify-center">
                    <div>
                      <Activity className="w-16 h-16 text-[#E85D75]/30 mx-auto mb-4" />
                      <p className="text-[#5D4037]/60 font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                        Fill in your information and click calculate to see your personalized nutrition plan
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
