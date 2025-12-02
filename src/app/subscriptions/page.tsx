"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check, Sparkles, Package, Truck, Calendar, Gift, Heart, Star, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Link from "next/link"
import { useState } from "react"

const subscriptionPlans = [
  {
    id: "snack-box-monthly",
    name: "Snack Box",
    subtitle: "Perfect for individuals",
    price: "₹999",
    originalPrice: "₹1,299",
    period: "/month",
    savings: "Save ₹300/month",
    image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&q=80",
    color: "#88A85D",
    features: [
      "8-10 assorted healthy snacks",
      "Mix of sweet & savory options",
      "Free home delivery",
      "Flexible delivery dates",
      "Cancel anytime",
      "Exclusive member pricing"
    ],
    idealFor: "Solo snackers, office desks, personal wellness",
    popular: false
  },
  {
    id: "family-box-monthly",
    name: "Family Box",
    subtitle: "Great for families",
    price: "₹2,499",
    originalPrice: "₹3,499",
    period: "/month",
    savings: "Save ₹1,000/month",
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&q=80",
    color: "#E85D75",
    features: [
      "20-25 variety snacks (family-size)",
      "Kid-friendly & adult options",
      "Priority delivery",
      "Customizable preferences",
      "Birthday special surprise",
      "Exclusive member pricing",
      "Nutrition consultation call (1/quarter)",
      "Access to members-only products"
    ],
    idealFor: "Families of 3-5, weekly snacking needs",
    popular: true
  },
  {
    id: "wellness-box-monthly",
    name: "Wellness Box",
    subtitle: "Premium health-focused",
    price: "₹3,999",
    originalPrice: "₹5,499",
    period: "/month",
    savings: "Save ₹1,500/month",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80",
    color: "#F4A261",
    features: [
      "30+ curated wellness snacks",
      "Protein-rich & low-sugar focus",
      "Personalized nutrition guide",
      "Same-day delivery option",
      "White-glove service",
      "Exclusive member pricing",
      "Monthly nutrition consultation",
      "Early access to new products",
      "Complimentary wellness journal"
    ],
    idealFor: "Fitness enthusiasts, health-conscious individuals",
    popular: false
  }
]

const frequencies = [
  { id: "monthly", label: "Monthly", discount: "0%" },
  { id: "quarterly", label: "Quarterly", discount: "Save 10%" },
  { id: "annual", label: "Annual", discount: "Save 20%" }
]

const benefits = [
  {
    icon: Package,
    title: "Curated Selection",
    description: "Hand-picked healthy snacks delivered to your door"
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Never pay for shipping on subscription orders"
  },
  {
    icon: Calendar,
    title: "Flexible Schedule",
    description: "Pause, skip, or cancel anytime with one click"
  },
  {
    icon: Gift,
    title: "Exclusive Perks",
    description: "Member-only products, early access & special pricing"
  }
]

const faqs = [
  {
    question: "How does the subscription work?",
    answer: "Choose your plan and frequency. We'll deliver fresh, healthy snacks to your doorstep automatically. You can customize your box preferences, pause, or cancel anytime from your account dashboard."
  },
  {
    question: "Can I customize what's in my box?",
    answer: "Yes! After subscribing, you can set dietary preferences (vegan, gluten-free, low-sugar, etc.) and we'll tailor your selection accordingly. You can also swap out specific products each month."
  },
  {
    question: "What if I'm traveling or want to skip a month?",
    answer: "No problem! Log into your account and pause or skip any delivery up to 5 days before your scheduled delivery date. Your subscription will resume automatically the following month."
  },
  {
    question: "Do you offer gift subscriptions?",
    answer: "Absolutely! Gift subscriptions are available for 1, 3, 6, or 12 months. The recipient will receive a beautiful welcome card and can manage their own preferences and delivery schedule."
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel anytime from your account settings with just one click. There are no cancellation fees, and you'll continue to receive boxes until the end of your current billing cycle."
  },
  {
    question: "What's your refund policy?",
    answer: "If you're not satisfied with your box, contact us within 7 days of delivery for a full refund or replacement. We stand behind our products 100%."
  }
]

export default function SubscriptionsPage() {
  const [selectedFrequency, setSelectedFrequency] = useState("monthly")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

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
              Save up to 20% with Subscriptions
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-[#2C2C2E] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Never Run Out of <span className="text-[#E85D75]">Healthy Snacks</span>
            </h1>
            
            <p className="text-xl text-[#5D4037]/80 mb-8 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Subscribe and save on your favorite ancient grain snacks. Flexible plans, free delivery, 
              cancel anytime. Join 5,000+ happy subscribers enjoying guilt-free snacking!
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-[#5D4037]/70">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#88A85D]" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#88A85D]" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#88A85D]" />
                <span>Exclusive Perks</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Frequency Selector */}
      <section className="py-12 bg-white border-b border-[#E8E5E1]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <p className="text-center text-[#5D4037]/70 mb-6 font-semibold" style={{ fontFamily: "var(--font-accent)" }}>
              Choose your delivery frequency
            </p>
            <div className="grid grid-cols-3 gap-4">
              {frequencies.map((freq) => (
                <motion.button
                  key={freq.id}
                  onClick={() => setSelectedFrequency(freq.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-2xl border-2 transition-all font-semibold text-center ${
                    selectedFrequency === freq.id
                      ? "border-[#E85D75] bg-[#E85D75]/10 shadow-3d"
                      : "border-[#E8E5E1] hover:border-[#E85D75]/50 hover:bg-[#FAF0E6]"
                  }`}
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  <div className="text-lg mb-1">{freq.label}</div>
                  {freq.discount !== "0%" && (
                    <div className="text-xs text-[#88A85D] font-bold">{freq.discount}</div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-24 bg-[#FAFAF8] paper-texture">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Choose Your <span className="text-[#E85D75]">Perfect Plan</span>
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              All plans include free delivery, flexible scheduling, and our happiness guarantee
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 perspective-container max-w-7xl mx-auto">
            {subscriptionPlans.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -12 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                    <span className="bg-[#E85D75] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-3d flex items-center gap-1" style={{ fontFamily: "var(--font-accent)" }}>
                      <Star className="w-3 h-3 fill-current" />
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <Card className={`overflow-hidden border-2 transition-all shadow-3d rounded-3xl card-3d h-full flex flex-col ${
                  plan.popular 
                    ? "border-[#E85D75] bg-gradient-to-br from-white to-[#FAF0E6]" 
                    : "border-transparent hover:border-[#E85D75] bg-white"
                }`}>
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={plan.image}
                      alt={plan.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-black text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                        {plan.name}
                      </h3>
                      <p className="text-sm text-white/90" style={{ fontFamily: "var(--font-body)" }}>
                        {plan.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    {/* Pricing */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-black" style={{ fontFamily: "var(--font-heading)", color: plan.color }}>
                          {plan.price}
                        </span>
                        <span className="text-[#5D4037]/60 line-through" style={{ fontFamily: "var(--font-body)" }}>
                          {plan.originalPrice}
                        </span>
                        <span className="text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
                          {plan.period}
                        </span>
                      </div>
                      <p className="text-sm text-[#88A85D] font-bold" style={{ fontFamily: "var(--font-accent)" }}>
                        {plan.savings}
                      </p>
                    </div>
                    
                    {/* Ideal For */}
                    <div className="mb-6 p-3 bg-[#FAF0E6] rounded-xl">
                      <p className="text-xs text-[#5D4037]/70 mb-1 font-semibold" style={{ fontFamily: "var(--font-accent)" }}>
                        IDEAL FOR:
                      </p>
                      <p className="text-sm text-[#5D4037]" style={{ fontFamily: "var(--font-body)" }}>
                        {plan.idealFor}
                      </p>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                          <span className="text-sm text-[#5D4037]/80" style={{ fontFamily: "var(--font-body)" }}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA */}
                    <Button 
                      asChild
                      className={`w-full font-bold btn-3d ${
                        plan.popular
                          ? "bg-[#E85D75] hover:bg-[#E85D75]/90 text-white"
                          : "bg-white border-2 border-[#E85D75] text-[#E85D75] hover:bg-[#E85D75] hover:text-white"
                      }`}
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      <Link href="/contact">
                        Subscribe Now
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
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
              Subscription <span className="text-[#E85D75]">Benefits</span>
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              More than just snacks—experience the Geetato difference
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
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

      {/* FAQ Section */}
      <section className="py-24 bg-[#FAFAF8] paper-texture">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Frequently Asked <span className="text-[#E85D75]">Questions</span>
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Everything you need to know about Geetato subscriptions
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card 
                  className="overflow-hidden border-2 border-transparent hover:border-[#E85D75] transition-all rounded-2xl cursor-pointer"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-bold text-[#2C2C2E] flex-1" style={{ fontFamily: "var(--font-heading)" }}>
                        {faq.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: expandedFaq === idx ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Info className="w-5 h-5 text-[#E85D75]" />
                      </motion.div>
                    </div>
                    
                    <AnimatePresence>
                      {expandedFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-[#5D4037]/80 mt-4 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
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
              Start Your <span className="text-[#FAFAF8]">Wellness Journey</span> Today
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Join thousands of happy subscribers enjoying healthy, delicious snacks delivered monthly
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                asChild
                className="bg-white text-[#E85D75] hover:bg-white/90 font-bold rounded-full shadow-3d btn-3d"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Link href="#plans">
                  <Heart className="mr-2 w-5 h-5" />
                  Choose Your Plan
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white text-white hover:bg-white hover:text-[#E85D75] font-bold rounded-full btn-3d"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Link href="/contact">
                  Need Help? Contact Us
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