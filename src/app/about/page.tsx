"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Heart, Target, Award, Users, Leaf, Sparkles, Factory, Shield, Globe, Recycle, ChefHat, CheckCircle, TrendingUp, Package } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Link from "next/link"
import { useRef } from "react"

const values = [
  {
    icon: Heart,
    title: "Health First",
    description: "We prioritize nutrition and wellness in every product we create",
    color: "#E85D75"
  },
  {
    icon: Leaf,
    title: "Natural Ingredients",
    description: "Only the finest, natural ingredients make it into our snacks",
    color: "#88A85D"
  },
  {
    icon: Award,
    title: "Quality Standards",
    description: "Rigorous testing and quality control at every step",
    color: "#F4A261"
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your satisfaction and health drive everything we do",
    color: "#A67C52"
  }
]

const timeline = [
  {
    year: "2019",
    title: "The Beginning",
    description: "Founded with a mission to revolutionize healthy snacking in India using ancient grains and traditional recipes",
    icon: Sparkles
  },
  {
    year: "2020",
    title: "First Products",
    description: "Launched our signature line of ragi brownies and protein cookies, sourcing from local farmers",
    icon: Package
  },
  {
    year: "2022",
    title: "Rapid Growth",
    description: "Expanded to 100+ cities with 50,000+ happy customers and FSSAI certification",
    icon: TrendingUp
  },
  {
    year: "2023",
    title: "B2B Launch",
    description: "Introduced corporate solutions serving 500+ businesses with custom packaging options",
    icon: Factory
  },
  {
    year: "2025",
    title: "Global Expansion",
    description: "Leading healthy Indian snack brand with international export to 15+ countries",
    icon: Globe
  }
]

const team = [
  {
    name: "Priya Sharma",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "Nutrition scientist with 15+ years in food industry, passionate about ancient grains"
  },
  {
    name: "Rahul Mehta",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    bio: "Culinary innovator specializing in healthy Indian fusion and traditional recipes"
  },
  {
    name: "Ananya Desai",
    role: "Chief Nutritionist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    bio: "Registered dietitian focused on balanced nutrition and ancient grain benefits"
  },
  {
    name: "Vikram Singh",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    bio: "Supply chain expert ensuring quality from farm to final product delivery"
  }
]

const productionSteps = [
  {
    icon: Leaf,
    title: "Sourcing",
    description: "We partner with local farmers to source the finest ancient grains, nuts, and natural ingredients",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80"
  },
  {
    icon: ChefHat,
    title: "Crafting",
    description: "Expert bakers and nutritionists work together to perfect each recipe using traditional methods",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80"
  },
  {
    icon: Shield,
    title: "Testing",
    description: "Rigorous quality checks and nutritional testing in FSSAI & HACCP certified facilities",
    image: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?w=600&q=80"
  },
  {
    icon: Package,
    title: "Packaging",
    description: "Eco-friendly packaging that preserves freshness while minimizing environmental impact",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80"
  }
]

const sustainability = [
  {
    icon: Leaf,
    title: "Local Sourcing",
    description: "Supporting 200+ local farmers across India",
    stat: "95%"
  },
  {
    icon: Recycle,
    title: "Eco Packaging",
    description: "100% recyclable and biodegradable materials",
    stat: "100%"
  },
  {
    icon: Globe,
    title: "Carbon Neutral",
    description: "Committed to net-zero emissions by 2027",
    stat: "2027"
  },
  {
    icon: Heart,
    title: "Zero Waste",
    description: "Food waste diverted to composting programs",
    stat: "85%"
  }
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section - Enhanced with Parallax */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        {/* Background with gradient and texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF0E6] via-[#FAFAF8] to-[#D4A5D4]/10 paper-texture" />
        
        {/* Decorative elements */}
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="inline-flex items-center gap-2 bg-[#E85D75]/20 text-[#E85D75] px-4 py-2 rounded-full mb-6 font-semibold text-sm border border-[#E85D75]/30 shadow-3d"
                whileHover={{ scale: 1.05 }}
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Sparkles className="w-4 h-4" />
                Our Story
              </motion.div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-[#2C2C2E] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                Redefining <span className="text-[#E85D75]">Healthy Snacking</span> in India
              </h1>
              
              <div className="space-y-4 text-lg sm:text-xl text-[#5D4037]/80 leading-relaxed mb-8" style={{ fontFamily: "var(--font-body)" }}>
                <p>
                  <strong className="text-[#2C2C2E]">Geetato was born from a simple belief:</strong> healthy snacking shouldn't mean 
                  compromising on taste. Founded by nutrition scientist Priya Sharma in 2019, 
                  we set out to revive India's ancient grain heritage while meeting modern nutritional needs.
                </p>
                
                <p>
                  Growing up in a family of farmers in Maharashtra, Priya witnessed firsthand how 
                  traditional superfoods like ragi, millet, and quinoa were being forgotten. She combined 
                  her scientific expertise with grandmother's recipes to create snacks that fuel your 
                  body and delight your taste buds.
                </p>
                
                <p>
                  Every product is crafted with care in our FSSAI-certified facilities, tested rigorously, 
                  and made with ingredients you can trust. From our kitchen to your hands, we're committed 
                  to quality, transparency, and your wellbeing.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  asChild
                  className="bg-[#E85D75] hover:bg-[#E85D75]/90 text-white font-bold rounded-full shadow-3d btn-3d"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  <Link href="/products">
                    Shop Our Products
                  </Link>
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-[#88A85D] text-[#88A85D] hover:bg-[#88A85D] hover:text-white font-bold rounded-full btn-3d"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  <Link href="/contact">
                    Visit Our Facility
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              style={{ y: heroY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative perspective-container"
            >
              <div className="relative h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-3d border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                  alt="Geetato Founder Story"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#E85D75]/20 via-transparent to-[#A67C52]/10" />
              </div>
              
              {/* Floating stats badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-3xl shadow-3d p-6 border-4 border-[#F4A261]"
              >
                <div className="text-center">
                  <div className="text-4xl font-black text-[#E85D75] mb-1" style={{ fontFamily: "var(--font-heading)" }}>50K+</div>
                  <div className="text-sm font-bold text-[#5D4037]" style={{ fontFamily: "var(--font-accent)" }}>Happy Customers</div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute -top-6 -right-6 bg-white rounded-3xl shadow-3d p-6 border-4 border-[#88A85D]"
              >
                <div className="text-center">
                  <div className="text-4xl font-black text-[#88A85D] mb-1" style={{ fontFamily: "var(--font-heading)" }}>100%</div>
                  <div className="text-sm font-bold text-[#5D4037]" style={{ fontFamily: "var(--font-accent)" }}>Natural</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Enhanced */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto perspective-container">
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="p-8 h-full border-2 border-transparent hover:border-[#E85D75] transition-all shadow-3d rounded-3xl card-3d bg-gradient-to-br from-white to-[#FAF0E6]">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#E85D75] to-[#F4A261] flex items-center justify-center mb-6 shadow-3d"
                >
                  <Target className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>Our Mission</h2>
                <p className="text-lg text-[#5D4037]/80 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  To make healthy, flavorful Indian snacks accessible to everyone, 
                  supporting wellness journeys with products that nourish body and soul while 
                  preserving our rich culinary heritage.
                </p>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="p-8 h-full border-2 border-transparent hover:border-[#88A85D] transition-all shadow-3d rounded-3xl card-3d bg-gradient-to-br from-white to-[#FAF0E6]">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#88A85D] to-[#A67C52] flex items-center justify-center mb-6 shadow-3d"
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>Our Vision</h2>
                <p className="text-lg text-[#5D4037]/80 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  To become India's most trusted healthy snack brand globally, setting new 
                  standards for quality, taste, and nutritional value while championing sustainable practices.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#FAFAF8] paper-texture">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Our <span className="text-[#E85D75]">Core Values</span>
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              The principles that guide everything we do
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-container">
            {values.map((value, idx) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -12 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className="p-8 text-center h-full border-2 border-transparent hover:border-[#E85D75] transition-all shadow-3d rounded-3xl card-3d bg-white">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-3d"
                    style={{ background: `linear-gradient(135deg, ${value.color}, ${value.color}dd)` }}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>{value.title}</h3>
                  <p className="text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process - NEW */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Our <span className="text-[#E85D75]">Production Process</span>
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              From farm to your table: behind the scenes of Geetato
            </p>
          </motion.div>
          
          <div className="space-y-24">
            {productionSteps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-3d border-4 border-white"
                  >
                    <img 
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#E85D75]/20 to-transparent" />
                  </motion.div>
                </div>
                
                <div className={idx % 2 === 1 ? 'lg:order-1' : ''}>
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E85D75] to-[#F4A261] mb-6 shadow-3d"
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-3xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                    {idx + 1}. {step.title}
                  </h3>
                  <p className="text-xl text-[#5D4037]/80 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability - NEW */}
      <section className="py-24 bg-[#5D4037] text-white relative overflow-hidden">
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
              Our <span className="text-[#F4A261]">Sustainability Commitment</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Building a healthier planet, one snack at a time
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-container">
            {sustainability.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotateY: 10 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-3d"
                >
                  <item.icon className="w-10 h-10 text-[#F4A261]" />
                </motion.div>
                <div className="text-5xl font-black mb-2 text-[#F4A261]" style={{ fontFamily: "var(--font-heading)" }}>
                  {item.stat}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                <p className="text-white/80" style={{ fontFamily: "var(--font-body)" }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gradient-to-br from-[#FAF0E6] via-[#FAFAF8] to-[#D4A5D4]/10 paper-texture">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Our <span className="text-[#E85D75]">Journey</span>
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Milestones that shaped Geetato
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, idx) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative pl-16 pb-16 border-l-4 border-[#E85D75] last:pb-0"
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="absolute left-[-18px] top-0 w-8 h-8 rounded-full bg-[#F4A261] border-4 border-[#FAFAF8] shadow-3d flex items-center justify-center"
                >
                  <item.icon className="w-4 h-4 text-white" />
                </motion.div>
                
                <div className="mb-3">
                  <span className="inline-block bg-[#E85D75] text-white font-black px-5 py-2 rounded-full shadow-3d" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.year}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                <p className="text-lg text-[#5D4037]/80 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Enhanced */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Meet Our <span className="text-[#E85D75]">Team</span>
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Passionate individuals committed to your health and happiness
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 perspective-container">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -12 }}
                className="group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Card className="overflow-hidden border-2 border-transparent hover:border-[#E85D75] transition-all shadow-3d rounded-3xl card-3d">
                  <div className="relative overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-sm" style={{ fontFamily: "var(--font-body)" }}>{member.bio}</p>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-1 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>{member.name}</h3>
                    <p className="text-[#E85D75] font-semibold" style={{ fontFamily: "var(--font-accent)" }}>{member.role}</p>
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
              Ready to Join the <span className="text-[#FAFAF8]">Geetato Family?</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Experience the perfect blend of ancient wisdom and modern nutrition
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                asChild
                className="bg-white text-[#E85D75] hover:bg-white/90 font-bold rounded-full shadow-3d btn-3d"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Link href="/products">
                  Shop Now
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
                  Get in Touch
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