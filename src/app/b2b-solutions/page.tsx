"use client"

import { motion } from "framer-motion"
import { Users, Package, Store, Truck, Calendar, Heart, Leaf, Building2, Gift, ShoppingBag, Coffee, Award, CheckCircle, ArrowRight, Sparkles, Target, TrendingUp, Globe, Shield, DollarSign, FileText, Clock, Check, Download, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"

// Corporate Solutions Categories
const solutions = [
  {
    id: 1,
    icon: Package,
    title: "Food & Snack Boxes",
    subtitle: "Curated ready-to-gift assortments",
    description: "Premium curated boxes for employees, clients, and partners with customizable branding options.",
    types: [
      { name: "Wellness Snack Box", desc: "High-protein, sugar-free, healthy options" },
      { name: "Festive Box", desc: "Diwali, Holi, and corporate celebrations" },
      { name: "Travel Snack Kit", desc: "Durable, easy-to-carry assortments" }
    ],
    features: ["Branding sleeves", "Personalized notes", "Logo packaging"],
    color: "from-[#E85D75] to-[#F4A261]",
    image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&q=80"
  },
  {
    id: 2,
    icon: Gift,
    title: "Corporate Gifting Solutions",
    subtitle: "Tailored gifting for organizations",
    description: "Authentic Indian flavors in export-quality presentation, perfect for festivals and milestones.",
    types: [
      { name: "Diwali & New Year Boxes", desc: "Pre-curated festive collections" },
      { name: "Custom Brand Boxes", desc: "Employee onboarding, thank-you gifts" },
      { name: "Premium Add-ons", desc: "Copper mugs, branded stationery, eco-packaging" }
    ],
    features: ["Premium packaging", "Authentic flavors", "Export-quality"],
    color: "from-[#F4A261] to-[#88A85D]",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80"
  },
  {
    id: 3,
    icon: Store,
    title: "Tuk Shops",
    subtitle: "On-site snack stores & counters",
    description: "Pop-up or permanent snack counters for office cafeterias and industrial canteens.",
    types: [
      { name: "Self-Serve Kiosks", desc: "Automated snack stations" },
      { name: "Managed Counters", desc: "Full-service snack shops" },
      { name: "Smart QR Ordering", desc: "Cashless payment support" }
    ],
    features: ["Rotating menu", "QR ordering", "Ideal for IT parks"],
    color: "from-[#88A85D] to-[#89CFF0]",
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80"
  },
  {
    id: 4,
    icon: Truck,
    title: "Bulk Orders & Wholesale",
    subtitle: "Direct bulk procurement",
    description: "Enable bulk procurement for cafeterias, events, or retail distribution with flexible MOQ.",
    types: [
      { name: "Makhana Range", desc: "Flavored and plain varieties" },
      { name: "Baked Specialties", desc: "Mathri, Khakhra, Millet Cookies" },
      { name: "Protein Mixes", desc: "High-protein healthy blends" }
    ],
    features: ["FSSAI compliant", "OEM options", "White-label partnerships"],
    color: "from-[#89CFF0] to-[#D4A5D4]",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80"
  },
  {
    id: 5,
    icon: Calendar,
    title: "Specialized Corporate Programs",
    subtitle: "Ongoing wellness initiatives",
    description: "Subscription plans, CSR drives, and employee engagement programs for long-term partnerships.",
    types: [
      { name: "Monthly Subscriptions", desc: "Office pantry refills & deliveries" },
      { name: "CSR & Health Drives", desc: "Wellness campaigns & initiatives" },
      { name: "Engagement Add-ons", desc: "Workshops on healthy snacking" }
    ],
    features: ["Flexible billing", "Health campaigns", "Sustainability focus"],
    color: "from-[#D4A5D4] to-[#E85D75]",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
  }
]

// Pricing Tiers - NEW
const pricingTiers = [
  {
    name: "Starter",
    subtitle: "For small teams & startups",
    price: "₹15K",
    period: "/month",
    minOrder: "100 units",
    features: [
      "Monthly snack box deliveries",
      "5 product varieties",
      "Standard packaging",
      "Quarterly menu refresh",
      "Email support",
      "Flexible delivery schedule"
    ],
    color: "#88A85D",
    recommended: false
  },
  {
    name: "Professional",
    subtitle: "For growing companies",
    price: "₹45K",
    period: "/month",
    minOrder: "500 units",
    features: [
      "All Starter features",
      "15 product varieties",
      "Custom branded packaging",
      "Monthly menu refresh",
      "Dedicated account manager",
      "Priority support (24/7)",
      "Quarterly wellness workshops",
      "Volume discounts up to 20%"
    ],
    color: "#E85D75",
    recommended: true
  },
  {
    name: "Enterprise",
    subtitle: "For large organizations",
    price: "Custom",
    period: "pricing",
    minOrder: "2000+ units",
    features: [
      "All Professional features",
      "Unlimited product varieties",
      "White-label options",
      "On-site Tuk Shop setup",
      "CSR wellness programs",
      "Nutrition consultation",
      "Export & multi-location delivery",
      "Custom SLA & billing terms"
    ],
    color: "#F4A261",
    recommended: false
  }
]

// Case Studies - NEW
const caseStudies = [
  {
    company: "TechCorp India",
    industry: "IT Services",
    employees: "2,500+",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80",
    challenge: "Improving employee wellness and reducing unhealthy snacking in office cafeterias across 3 locations.",
    solution: "Implemented on-site Tuk Shops with rotating menu of protein-rich snacks and monthly wellness workshops.",
    results: [
      { metric: "85%", label: "Employee Satisfaction" },
      { metric: "40%", label: "Reduction in unhealthy snacking" },
      { metric: "12 months", label: "Partnership duration" }
    ],
    testimonial: "Geetato transformed our office pantry. Employees love the variety and quality. Productivity has noticeably improved!",
    author: "Priya Malhotra, HR Director"
  },
  {
    company: "Global Manufacturing Co.",
    industry: "Manufacturing",
    employees: "5,000+",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80",
    challenge: "Providing nutritious snacks to shift workers across multiple factory locations with diverse dietary preferences.",
    solution: "Bulk wholesale supply with customized product mix for different shifts, including vegan and gluten-free options.",
    results: [
      { metric: "₹2M+", label: "Annual contract value" },
      { metric: "95%", label: "On-time delivery rate" },
      { metric: "8 locations", label: "Served nationwide" }
    ],
    testimonial: "Reliable supply chain, consistent quality, and excellent customer service. Geetato is our trusted partner.",
    author: "Rajesh Kumar, Operations Head"
  },
  {
    company: "Premium Retail Chain",
    industry: "Retail",
    employees: "1,200+",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80",
    challenge: "Sourcing unique, healthy Indian snacks for retail shelves with strong brand story and shelf appeal.",
    solution: "White-label partnership with custom packaging design and exclusive product variants for retail distribution.",
    results: [
      { metric: "150+", label: "Retail stores" },
      { metric: "35%", label: "Sales growth YoY" },
      { metric: "4.8★", label: "Customer rating" }
    ],
    testimonial: "The perfect blend of health, taste, and authenticity. Our customers keep coming back for more.",
    author: "Ananya Sharma, Category Manager"
  }
]

// Export Certifications - NEW
const exportCerts = [
  {
    icon: Shield,
    name: "FSSAI",
    description: "Food Safety & Standards Authority of India certified",
    number: "Lic. No. 10012043000513"
  },
  {
    icon: Award,
    name: "HACCP",
    description: "Hazard Analysis Critical Control Point certified",
    number: "Cert. No. HACCP-2024-0156"
  },
  {
    icon: Globe,
    name: "ISO 22000",
    description: "International food safety management",
    number: "ISO 22000:2018 Certified"
  },
  {
    icon: CheckCircle,
    name: "Export Ready",
    description: "Customs & international shipping compliant",
    number: "IEC Code: 0512345678"
  }
]

// Export Countries - NEW
const exportCountries = [
  { region: "Middle East", countries: "UAE, Saudi Arabia, Qatar, Oman", flag: "🇦🇪" },
  { region: "Southeast Asia", countries: "Singapore, Malaysia, Thailand", flag: "🇸🇬" },
  { region: "Europe", countries: "UK, Germany, Netherlands", flag: "🇬🇧" },
  { region: "North America", countries: "USA, Canada", flag: "🇺🇸" },
  { region: "Australia & NZ", countries: "Australia, New Zealand", flag: "🇦🇺" }
]

// Onboarding Process - NEW
const onboardingSteps = [
  {
    step: "1",
    title: "Consultation",
    description: "Free discovery call to understand your requirements, timeline, and budget",
    duration: "30 min",
    icon: Phone
  },
  {
    step: "2",
    title: "Proposal",
    description: "Custom proposal with product selection, pricing, and delivery terms",
    duration: "2-3 days",
    icon: FileText
  },
  {
    step: "3",
    title: "Sampling",
    description: "Complimentary product samples for your team to taste and approve",
    duration: "3-5 days",
    icon: Package
  },
  {
    step: "4",
    title: "Contract",
    description: "Finalize agreement with flexible terms and SLA commitments",
    duration: "1-2 days",
    icon: CheckCircle
  },
  {
    step: "5",
    title: "Launch",
    description: "First delivery with dedicated account manager and onboarding support",
    duration: "1 week",
    icon: TrendingUp
  }
]

const benefits = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Same high standards across all B2B orders"
  },
  {
    icon: Target,
    title: "Custom Solutions",
    description: "Tailored to your specific business needs"
  },
  {
    icon: TrendingUp,
    title: "Volume Discounts",
    description: "Competitive pricing for bulk purchases"
  },
  {
    icon: Globe,
    title: "Export Ready",
    description: "International quality certifications"
  }
]

const useCases = [
  {
    title: "IT Parks & Coworking Spaces",
    companies: "Google, Microsoft, WeWork",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
  },
  {
    title: "Manufacturing & Industrial",
    companies: "Tata, Mahindra, L&T",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
  },
  {
    title: "Retail Chains & Distributors",
    companies: "Reliance, Future Group, D-Mart",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80"
  }
]

const stats = [
  { value: "500+", label: "Corporate Clients", color: "#E85D75" },
  { value: "10M+", label: "Units Delivered", color: "#F4A261" },
  { value: "25+", label: "Cities Served", color: "#88A85D" },
  { value: "98%", label: "Satisfaction Rate", color: "#89CFF0" }
]

export default function B2BSolutionsPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    solutionType: "",
    orderQuantity: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone || !formData.solutionType || !formData.orderQuantity) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const token = localStorage.getItem("bearer_token")
      const headers: HeadersInit = {
        "Content-Type": "application/json"
      }
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }

      const response = await fetch("/api/corporate-enquiry", {
        method: "POST",
        headers,
        body: JSON.stringify({
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          solutionType: formData.solutionType,
          requirements: formData.orderQuantity,
          message: formData.message || null
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Request submitted successfully! We'll get back to you within 24 hours.")
        // Reset form
        setFormData({
          companyName: "",
          contactPerson: "",
          email: "",
          phone: "",
          solutionType: "",
          orderQuantity: "",
          message: ""
        })
      } else {
        toast.error(data.error || "Failed to submit request. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting corporate enquiry:", error)
      toast.error("Failed to submit request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section - 3D Enhanced */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#FAF0E6] via-[#FAFAF8] to-[#FAF0E6] overflow-hidden relative paper-texture">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-[#E85D75]/10 text-[#E85D75] px-4 py-2 rounded-full mb-6 font-semibold text-sm border border-[#E85D75]/30 shadow-3d"
                whileHover={{ scale: 1.05 }}
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Building2 className="w-4 h-4" />
                Corporate Solutions
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 leading-tight text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                Elevate Your{" "}
                <span className="text-[#E85D75] relative inline-block">
                  Corporate Wellness
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    xmlns="http://www.w3.org/2000/svg"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  >
                    <motion.path
                      d="M5,7 Q150,2 295,7"
                      stroke="#E85D75"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-[#5D4037]/80 mb-8 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                From curated snack boxes to on-site Tuk Shops, wholesale supply to CSR wellness programs — 
                Geetato delivers premium health-first solutions at scale for your business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 perspective-container">
                <Button 
                  size="lg"
                  asChild
                  className="bg-[#F4A261] hover:bg-[#E27D60] text-[#2C2C2E] font-bold text-lg h-14 px-8 group shadow-3d btn-3d"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  <a href="#contact">
                    Request Quote
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#E85D75] text-[#E85D75] hover:bg-[#E85D75] hover:text-white font-bold text-lg h-14 px-8 btn-3d"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  <Download className="mr-2 w-5 h-5" />
                  Download Catalog
                </Button>
              </div>
              
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    className="card-3d text-center"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="text-2xl sm:text-3xl font-black" style={{ fontFamily: "var(--font-heading)", color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative perspective-container hidden lg:block"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div 
                className="relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-3d border-4 border-white"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
                  alt="Corporate Solutions"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#E85D75]/30 via-transparent to-[#F4A261]/10" />
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* 3D Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.03, 0.05, 0.03],
              rotateZ: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] rounded-full blur-3xl"
            style={{ 
              transformStyle: "preserve-3d",
              background: "linear-gradient(135deg, #E85D75, #F4A261)"
            }}
          />
        </div>
      </section>

      {/* Corporate Solutions Categories - 3D Cards */}
      <section className="py-24 bg-[#FAFAF8] paper-texture">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Our <span className="text-[#E85D75]">Corporate Solutions</span>
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-3xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Comprehensive B2B offerings designed for modern businesses — from gifting to wholesale, 
              from on-site stores to wellness programs
            </p>
          </motion.div>
          
          <div className="space-y-16">
            {solutions.map((solution, idx) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
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
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-20`} />
                      
                      {/* Floating Icon Badge */}
                      <motion.div
                        className="absolute top-6 right-6"
                        whileHover={{ scale: 1.1, rotateZ: 10 }}
                      >
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center shadow-3d`}>
                          <solution.icon className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>
                    </motion.div>
                    
                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 bg-[#E85D75]/10 text-[#E85D75] px-3 py-1.5 rounded-full mb-4 font-semibold text-xs w-fit" style={{ fontFamily: "var(--font-accent)" }}>
                        <Sparkles className="w-3 h-3" />
                        {solution.subtitle}
                      </div>
                      
                      <h3 className="text-3xl sm:text-4xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                        {solution.title}
                      </h3>
                      
                      <p className="text-lg text-[#5D4037]/80 mb-6 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                        {solution.description}
                      </p>
                      
                      {/* Types */}
                      <div className="space-y-3 mb-6">
                        {solution.types.map((type, tidx) => (
                          <motion.div
                            key={tidx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: tidx * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="w-5 h-5 text-[#88A85D] flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                                {type.name}
                              </span>
                              <span className="text-[#5D4037]/70"> — {type.desc}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {solution.features.map((feature, fidx) => (
                          <span 
                            key={fidx}
                            className="px-3 py-1.5 bg-[#FAF0E6] text-[#5D4037] rounded-full text-sm font-semibold border border-[#E85D75]/20"
                            style={{ fontFamily: "var(--font-accent)" }}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <Button 
                        asChild
                        className="bg-[#E85D75] hover:bg-[#E85D75]/90 text-white font-bold w-fit btn-3d"
                        style={{ fontFamily: "var(--font-accent)" }}
                      >
                        <a href="#contact">
                          Learn More
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers - NEW */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Flexible <span className="text-[#E85D75]">Pricing Plans</span>
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Transparent pricing with volume discounts for every business size
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 perspective-container max-w-6xl mx-auto">
            {pricingTiers.map((tier, idx) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -12 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative"
              >
                {tier.recommended && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                    <span className="bg-[#E85D75] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-3d" style={{ fontFamily: "var(--font-accent)" }}>
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <Card className={`p-8 h-full border-2 transition-all shadow-3d rounded-3xl card-3d ${
                  tier.recommended 
                    ? "border-[#E85D75] bg-gradient-to-br from-white to-[#FAF0E6]" 
                    : "border-transparent hover:border-[#E85D75] bg-white"
                }`}>
                  <div className="mb-6">
                    <h3 className="text-2xl font-black mb-1 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                      {tier.name}
                    </h3>
                    <p className="text-sm text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
                      {tier.subtitle}
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black" style={{ fontFamily: "var(--font-heading)", color: tier.color }}>
                        {tier.price}
                      </span>
                      <span className="text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
                        {tier.period}
                      </span>
                    </div>
                    <p className="text-sm text-[#5D4037]/60 mt-2" style={{ fontFamily: "var(--font-body)" }}>
                      Min. order: {tier.minOrder}
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    {tier.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: tier.color }} />
                        <span className="text-sm text-[#5D4037]/80" style={{ fontFamily: "var(--font-body)" }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    asChild
                    className={`w-full font-bold btn-3d ${
                      tier.recommended
                        ? "bg-[#E85D75] hover:bg-[#E85D75]/90 text-white"
                        : "bg-white border-2 border-[#E85D75] text-[#E85D75] hover:bg-[#E85D75] hover:text-white"
                    }`}
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    <a href="#contact">
                      Get Started
                    </a>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-[#5D4037]/70 text-lg mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Need a custom plan? We offer flexible pricing for unique requirements
            </p>
            <Button 
              variant="outline"
              size="lg"
              asChild
              className="border-2 border-[#88A85D] text-[#88A85D] hover:bg-[#88A85D] hover:text-white font-bold btn-3d"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              <a href="#contact">
                <Mail className="mr-2 w-5 h-5" />
                Contact Sales
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Case Studies - NEW */}
      <section className="py-24 bg-[#FAFAF8] paper-texture">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Success <span className="text-[#E85D75]">Stories</span>
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Real results from real partnerships with leading organizations
            </p>
          </motion.div>
          
          <div className="space-y-16 max-w-6xl mx-auto">
            {caseStudies.map((study, idx) => (
              <motion.div
                key={study.company}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden border-2 border-transparent hover:border-[#E85D75] transition-all shadow-3d rounded-3xl">
                  <div className="p-8 lg:p-12">
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-[#E8E5E1]">
                      <div className="flex-1">
                        <h3 className="text-3xl font-black mb-2 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                          {study.company}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                          <span className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            {study.industry}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {study.employees} employees
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Challenge & Solution */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="text-lg font-bold mb-3 text-[#E85D75]" style={{ fontFamily: "var(--font-heading)" }}>
                          Challenge
                        </h4>
                        <p className="text-[#5D4037]/80 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                          {study.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-3 text-[#88A85D]" style={{ fontFamily: "var(--font-heading)" }}>
                          Solution
                        </h4>
                        <p className="text-[#5D4037]/80 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                          {study.solution}
                        </p>
                      </div>
                    </div>
                    
                    {/* Results */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                        Results
                      </h4>
                      <div className="grid sm:grid-cols-3 gap-6">
                        {study.results.map((result, ridx) => (
                          <motion.div
                            key={ridx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: ridx * 0.1 }}
                            className="text-center p-4 bg-gradient-to-br from-[#FAF0E6] to-white rounded-2xl border border-[#E85D75]/20"
                          >
                            <div className="text-4xl font-black text-[#E85D75] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                              {result.metric}
                            </div>
                            <div className="text-sm text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                              {result.label}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Testimonial */}
                    <div className="bg-white p-6 rounded-2xl border-l-4 border-[#E85D75]">
                      <p className="text-lg text-[#5D4037]/80 italic mb-4 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                        "{study.testimonial}"
                      </p>
                      <p className="font-bold text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                        — {study.author}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Capabilities - NEW */}
      <section className="py-24 bg-gradient-to-br from-[#5D4037] to-[#2C2C2E] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-repeat" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Global <span className="text-[#F4A261]">Export Capabilities</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Certified for international markets with proven track record across 5 continents
            </p>
          </motion.div>
          
          {/* Certifications */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {exportCerts.map((cert, idx) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm rounded-3xl hover:bg-white/10 transition-all h-full">
                  <cert.icon className="w-12 h-12 text-[#F4A261] mb-4" />
                  <h4 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    {cert.name}
                  </h4>
                  <p className="text-sm text-white/70 mb-3 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {cert.description}
                  </p>
                  <p className="text-xs text-[#F4A261] font-mono">
                    {cert.number}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Export Countries */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-black mb-8 text-center" style={{ fontFamily: "var(--font-heading)" }}>
              We Export to <span className="text-[#F4A261]">15+ Countries</span>
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {exportCountries.map((region, idx) => (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm rounded-3xl text-center hover:bg-white/10 transition-all">
                    <div className="text-4xl mb-3">{region.flag}</div>
                    <h4 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      {region.region}
                    </h4>
                    <p className="text-sm text-white/70" style={{ fontFamily: "var(--font-body)" }}>
                      {region.countries}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Process - NEW */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Simple <span className="text-[#E85D75]">Onboarding Process</span>
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              From first call to first delivery in just 2 weeks
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            <div className="space-y-8">
              {onboardingSteps.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-start gap-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E85D75] to-[#F4A261] flex items-center justify-center text-2xl font-black text-white shadow-3d"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {step.step}
                    </motion.div>
                    
                    <Card className="flex-1 p-6 border-2 border-transparent hover:border-[#E85D75] transition-all rounded-3xl shadow-3d">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                        <div className="flex items-center gap-3">
                          <step.icon className="w-6 h-6 text-[#E85D75]" />
                          <h3 className="text-2xl font-bold text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                            {step.title}
                          </h3>
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm text-[#5D4037]/70 bg-[#FAF0E6] px-3 py-1.5 rounded-full font-semibold" style={{ fontFamily: "var(--font-accent)" }}>
                          <Clock className="w-4 h-4" />
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-[#5D4037]/80 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                        {step.description}
                      </p>
                    </Card>
                  </div>
                  
                  {idx < onboardingSteps.length - 1 && (
                    <div className="ml-8 h-8 border-l-2 border-dashed border-[#E85D75]/30" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button 
              size="lg"
              asChild
              className="bg-[#E85D75] hover:bg-[#E85D75]/90 text-white font-bold shadow-3d btn-3d"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              <a href="#contact">
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - 3D Icons */}
      <section className="py-24 bg-gradient-to-br from-[#5D4037] to-[#2C2C2E] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-repeat" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Why Partner with <span className="text-[#F4A261]">Geetato?</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Trusted by leading corporations across India and globally
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-container">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotateY: 10, rotateZ: 5 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#E85D75] via-[#F4A261] to-[#A67C52] flex items-center justify-center shadow-3d"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <benefit.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>{benefit.title}</h3>
                <p className="text-white/80" style={{ fontFamily: "var(--font-body)" }}>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases - 3D Cards */}
      <section className="py-24 bg-[#FAF0E6] paper-texture">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Trusted by <span className="text-[#E85D75]">Industry Leaders</span>
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Serving diverse sectors with tailored corporate solutions
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 perspective-container">
            {useCases.map((useCase, idx) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -12, rotateX: 5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className="overflow-hidden border-2 border-transparent hover:border-[#E85D75] transition-all duration-300 shadow-3d rounded-3xl group card-3d bg-white">
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.5 }}
                      src={useCase.image}
                      alt={useCase.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-xs text-white/80 mb-1" style={{ fontFamily: "var(--font-accent)" }}>
                        Clients include
                      </p>
                      <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-accent)" }}>
                        {useCase.companies}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#2C2C2E] group-hover:text-[#E85D75] transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                      {useCase.title}
                    </h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form - 3D Enhanced */}
      <section id="contact" className="py-24 bg-gradient-to-br from-[#2C2C2E] to-[#5D4037] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-repeat" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Request a <span className="text-[#F4A261]">Custom Quote</span>
              </h2>
              <p className="text-xl text-white/70" style={{ fontFamily: "var(--font-body)" }}>
                Fill out the form and our team will get back to you within 24 hours
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 bg-white/5 border-white/10 backdrop-blur-sm rounded-3xl shadow-3d">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ fontFamily: "var(--font-accent)" }}>
                        Company Name *
                      </label>
                      <Input 
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Your company name"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#F4A261] h-12 rounded-xl"
                        style={{ fontFamily: "var(--font-body)" }}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ fontFamily: "var(--font-accent)" }}>
                        Contact Person *
                      </label>
                      <Input 
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#F4A261] h-12 rounded-xl"
                        style={{ fontFamily: "var(--font-body)" }}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ fontFamily: "var(--font-accent)" }}>
                        Email *
                      </label>
                      <Input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@company.com"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#F4A261] h-12 rounded-xl"
                        style={{ fontFamily: "var(--font-body)" }}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ fontFamily: "var(--font-accent)" }}>
                        Phone *
                      </label>
                      <Input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#F4A261] h-12 rounded-xl"
                        style={{ fontFamily: "var(--font-body)" }}
                        disabled={isSubmitting}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: "var(--font-accent)" }}>
                      Solution Interest *
                    </label>
                    <select 
                      name="solutionType"
                      value={formData.solutionType}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 text-white h-12 rounded-xl px-4 focus:border-[#F4A261] focus:outline-none focus:ring-2 focus:ring-[#F4A261]/50"
                      style={{ fontFamily: "var(--font-body)" }}
                      disabled={isSubmitting}
                      required
                    >
                      <option value="" className="text-[#2C2C2E]">Select a solution...</option>
                      <option value="snack-boxes" className="text-[#2C2C2E]">Food & Snack Boxes</option>
                      <option value="gifting" className="text-[#2C2C2E]">Corporate Gifting</option>
                      <option value="tuk-shops" className="text-[#2C2C2E]">Tuk Shops</option>
                      <option value="bulk" className="text-[#2C2C2E]">Bulk Orders & Wholesale</option>
                      <option value="programs" className="text-[#2C2C2E]">Corporate Programs</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: "var(--font-accent)" }}>
                      Order Quantity / Requirements *
                    </label>
                    <Input 
                      name="orderQuantity"
                      value={formData.orderQuantity}
                      onChange={handleChange}
                      placeholder="e.g., 500 units monthly"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#F4A261] h-12 rounded-xl"
                      style={{ fontFamily: "var(--font-body)" }}
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ fontFamily: "var(--font-accent)" }}>
                      Message
                    </label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements, timeline, and any specific customization needs..."
                      rows={5}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-[#F4A261] rounded-xl"
                      style={{ fontFamily: "var(--font-body)" }}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-[#F4A261] hover:bg-[#E27D60] text-[#2C2C2E] font-bold h-14 shadow-3d btn-3d rounded-xl"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <p className="text-center text-white/60 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                    We'll respond within 24 hours with a customized quote
                  </p>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}