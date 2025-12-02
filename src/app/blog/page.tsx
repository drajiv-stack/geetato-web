"use client"

import { motion } from "framer-motion"
import { Search, Calendar, Clock, ArrowRight, BookOpen, Heart, Leaf, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Link from "next/link"
import { useState } from "react"

const categories = [
  { id: "all", label: "All Articles", icon: BookOpen },
  { id: "recipes", label: "Recipes", icon: Heart },
  { id: "nutrition", label: "Nutrition", icon: Leaf },
  { id: "wellness", label: "Wellness", icon: TrendingUp }
]

const blogPosts = [
  {
    id: 1,
    slug: "ancient-grains-modern-nutrition",
    title: "Ancient Grains for Modern Nutrition: Why Ragi and Millet Matter",
    excerpt: "Discover how traditional Indian superfoods like ragi, millet, and quinoa are revolutionizing modern nutrition with their incredible health benefits.",
    category: "nutrition",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&q=80",
    author: "Dr. Ananya Desai",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    date: "2025-01-15",
    readTime: "8 min read",
    featured: true
  },
  {
    id: 2,
    slug: "protein-packed-breakfast-recipes",
    title: "5 Protein-Packed Breakfast Recipes for Busy Mornings",
    excerpt: "Start your day right with these quick, delicious, high-protein breakfast ideas using Geetato products and wholesome ingredients.",
    category: "recipes",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80",
    author: "Chef Rahul Mehta",
    authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    date: "2025-01-12",
    readTime: "6 min read",
    featured: true
  },
  {
    id: 3,
    slug: "managing-sugar-cravings-naturally",
    title: "Managing Sugar Cravings: Natural Strategies That Work",
    excerpt: "Learn evidence-based techniques to conquer sugar cravings using whole foods, mindful eating, and smart snacking choices.",
    category: "wellness",
    image: "https://images.unsplash.com/photo-1499638472582-efc00b82b4c7?w=800&q=80",
    author: "Dr. Ananya Desai",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    date: "2025-01-10",
    readTime: "7 min read",
    featured: true
  },
  {
    id: 4,
    slug: "gluten-free-baking-tips",
    title: "Gluten-Free Baking: Essential Tips for Perfect Results",
    excerpt: "Master the art of gluten-free baking with these professional techniques, ingredient substitutions, and recipe modifications.",
    category: "recipes",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    author: "Chef Rahul Mehta",
    authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    date: "2025-01-08",
    readTime: "10 min read",
    featured: false
  },
  {
    id: 5,
    slug: "benefits-of-plant-based-protein",
    title: "Plant-Based Protein: Complete Guide to Meeting Your Needs",
    excerpt: "Everything you need to know about plant-based protein sources, amino acid profiles, and optimal combinations for health.",
    category: "nutrition",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    author: "Dr. Ananya Desai",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    date: "2025-01-05",
    readTime: "9 min read",
    featured: false
  },
  {
    id: 6,
    slug: "meal-prep-healthy-snacks",
    title: "Meal Prep Sunday: Batch-Making Healthy Snacks for the Week",
    excerpt: "Save time and stay on track with these meal prep strategies for creating a week's worth of nutritious snacks in one afternoon.",
    category: "recipes",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    author: "Chef Rahul Mehta",
    authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    date: "2025-01-03",
    readTime: "11 min read",
    featured: false
  },
  {
    id: 7,
    slug: "gut-health-fiber-rich-foods",
    title: "Gut Health Revolution: The Power of Fiber-Rich Ancient Grains",
    excerpt: "Explore how fiber from ancient grains supports digestive health, immunity, and overall wellbeing with actionable dietary tips.",
    category: "nutrition",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80",
    author: "Dr. Ananya Desai",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    date: "2025-01-01",
    readTime: "8 min read",
    featured: false
  },
  {
    id: 8,
    slug: "mindful-eating-practices",
    title: "Mindful Eating: Transform Your Relationship with Food",
    excerpt: "Discover mindful eating techniques that help you enjoy food more, eat less, and improve digestion through conscious awareness.",
    category: "wellness",
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&q=80",
    author: "Dr. Ananya Desai",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    date: "2024-12-28",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 9,
    slug: "energy-boosting-snack-recipes",
    title: "10 Energy-Boosting Snack Recipes for Athletes",
    excerpt: "Fuel your workouts with these nutrient-dense, performance-enhancing snack recipes designed for active lifestyles.",
    category: "recipes",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
    author: "Chef Rahul Mehta",
    authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    date: "2024-12-25",
    readTime: "12 min read",
    featured: false
  }
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#FAF0E6] via-[#FAFAF8] to-[#D4A5D4]/10 paper-texture overflow-hidden">
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
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-[#E85D75]/20 text-[#E85D75] px-4 py-2 rounded-full mb-6 font-semibold text-sm border border-[#E85D75]/30 shadow-3d"
              whileHover={{ scale: 1.05 }}
              style={{ fontFamily: "var(--font-accent)" }}
            >
              <BookOpen className="w-4 h-4" />
              Health Hub
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 text-[#2C2C2E] leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
              Nourish Your <span className="text-[#E85D75]">Mind & Body</span>
            </h1>
            
            <p className="text-xl text-[#5D4037]/80 mb-8 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              Expert insights on nutrition, wellness, and delicious recipes to support your health journey
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5D4037]/40" />
              <Input
                type="text"
                placeholder="Search articles, recipes, nutrition tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-[#E85D75]/20 focus:border-[#E85D75] shadow-3d"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-[#E8E5E1] sticky top-[72px] z-40 backdrop-blur-lg bg-white/95">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all btn-3d flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "bg-[#E85D75] text-white shadow-3d"
                    : "bg-white text-[#5D4037] hover:bg-[#FAF0E6] border border-[#E85D75]/20"
                }`}
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {activeCategory === "all" && searchQuery === "" && (
        <section className="py-16 bg-[#FAFAF8] paper-texture">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-black mb-2 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                Featured <span className="text-[#E85D75]">Articles</span>
              </h2>
              <p className="text-lg text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                Our most popular and impactful content
              </p>
            </motion.div>
            
            <div className="grid lg:grid-cols-3 gap-8 perspective-container">
              {featuredPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -12 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Card className="overflow-hidden border-2 border-transparent hover:border-[#E85D75] transition-all shadow-3d rounded-3xl card-3d bg-white h-full">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative h-64 overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#F4A261] text-[#2C2C2E] text-xs font-bold px-3 py-1.5 rounded-full shadow-3d capitalize" style={{ fontFamily: "var(--font-accent)" }}>
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </Link>
                    
                    <div className="p-6">
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-xl font-bold mb-3 text-[#2C2C2E] hover:text-[#E85D75] transition-colors line-clamp-2" style={{ fontFamily: "var(--font-heading)" }}>
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-[#5D4037]/70 mb-4 line-clamp-2" style={{ fontFamily: "var(--font-body)" }}>
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-[#E8E5E1]">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.authorAvatar}
                            alt={post.author}
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#E85D75]"
                          />
                          <div>
                            <p className="text-sm font-bold text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>{post.author}</p>
                            <div className="flex items-center gap-2 text-xs text-[#5D4037]/60">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-2 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              {activeCategory === "all" ? "All Articles" : categories.find(c => c.id === activeCategory)?.label}
            </h2>
            <p className="text-lg text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
              {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"} found
            </p>
          </motion.div>
          
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-[#5D4037]/60 mb-4" style={{ fontFamily: "var(--font-body)" }}>
                No articles found matching your search.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("all")
                }}
                className="bg-[#E85D75] hover:bg-[#E85D75]/90 text-white rounded-full"
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 perspective-container">
              {filteredPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  layout
                >
                  <Card className="overflow-hidden border-2 border-transparent hover:border-[#E85D75] transition-all shadow-3d rounded-3xl card-3d bg-white h-full flex flex-col">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative h-56 overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#F4A261] text-[#2C2C2E] text-xs font-bold px-3 py-1.5 rounded-full shadow-3d capitalize" style={{ fontFamily: "var(--font-accent)" }}>
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </Link>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <Link href={`/blog/${post.slug}`}>
                        <h3 className="text-lg font-bold mb-3 text-[#2C2C2E] hover:text-[#E85D75] transition-colors line-clamp-2" style={{ fontFamily: "var(--font-heading)" }}>
                          {post.title}
                        </h3>
                      </Link>
                      
                      <p className="text-[#5D4037]/70 mb-4 line-clamp-3 flex-1" style={{ fontFamily: "var(--font-body)" }}>
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-[#E8E5E1] mt-auto">
                        <div className="flex items-center gap-2 text-xs text-[#5D4037]/60">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#5D4037]/60">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <Link href={`/blog/${post.slug}`}>
                        <Button
                          variant="ghost"
                          className="w-full mt-4 text-[#E85D75] hover:bg-[#E85D75]/10 group"
                          style={{ fontFamily: "var(--font-accent)" }}
                        >
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
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
              Get Weekly <span className="text-[#FAFAF8]">Wellness Tips</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Join 10,000+ readers receiving expert nutrition advice, healthy recipes, and exclusive offers
            </p>
            
            <div className="max-w-md mx-auto flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/95 border-0 text-[#2C2C2E] rounded-full px-6 py-6 text-lg shadow-3d"
                style={{ fontFamily: "var(--font-body)" }}
              />
              <Button 
                size="lg"
                className="bg-white text-[#E85D75] hover:bg-white/90 font-bold rounded-full shadow-3d btn-3d px-8"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-white/80 mt-4" style={{ fontFamily: "var(--font-body)" }}>
              No spam, unsubscribe anytime
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
