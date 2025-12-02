"use client"

import { motion } from "framer-motion"
import { Heart, ShoppingCart, X, Sparkles, Package, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Link from "next/link"
import { useWishlist } from "@/hooks/use-wishlist"

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navigation />
        
        <section className="pt-32 pb-20 bg-gradient-to-br from-[#FAF0E6] via-[#FAFAF8] to-[#FAF0E6] paper-texture min-h-[80vh] flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#E85D75]/10 to-[#F4A261]/10 mb-8"
              >
                <Heart className="w-12 h-12 text-[#E85D75]" />
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                Your Wishlist is Empty
              </h1>
              
              <p className="text-xl text-[#5D4037]/70 mb-8" style={{ fontFamily: "var(--font-body)" }}>
                Save your favorite products here so you can easily find them later
              </p>
              
              <Button
                size="lg"
                asChild
                className="bg-[#E85D75] hover:bg-[#E85D75]/90 text-white font-bold shadow-3d btn-3d"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Link href="/products">
                  <Package className="mr-2 w-5 h-5" />
                  Browse Products
                </Link>
              </Button>
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
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#FAF0E6] via-[#FAFAF8] to-[#D4A5D4]/10 paper-texture">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="mb-12">
              <motion.div 
                className="inline-flex items-center gap-2 bg-[#E85D75]/20 text-[#E85D75] px-4 py-2 rounded-full mb-6 font-semibold text-sm border border-[#E85D75]/30 shadow-3d"
                whileHover={{ scale: 1.05 }}
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Heart className="w-4 h-4 fill-current" />
                My Wishlist
              </motion.div>
              
              <h1 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                Your Saved <span className="text-[#E85D75]">Favorites</span>
              </h1>
              
              <p className="text-xl text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                {items.length} {items.length === 1 ? "product" : "products"} saved for later
              </p>
            </div>

            {/* Wishlist Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 perspective-container">
              {items.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  layout
                >
                  <Card className="group overflow-hidden border-2 border-transparent hover:border-[#E85D75] transition-all duration-300 hover:shadow-3d cursor-pointer bg-white rounded-3xl card-3d relative">
                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(product.id)}
                      className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center shadow-3d transition-all hover:scale-110 group/btn"
                    >
                      <X className="w-5 h-5 text-[#E85D75] group-hover/btn:rotate-90 transition-transform" />
                    </button>

                    <Link href={`/products/${product.id}`}>
                      <div className="relative h-80 overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.15, rotateZ: 2 }}
                          transition={{ duration: 0.5 }}
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          style={{ transformStyle: "preserve-3d" }}
                        />
                        <motion.div 
                          className="absolute top-4 left-4"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <span className="bg-[#F4A261] text-[#2C2C2E] text-xs font-bold px-3 py-1.5 rounded-full shadow-3d" style={{ fontFamily: "var(--font-accent)" }}>
                            {product.badge}
                          </span>
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                    
                    <div className="p-6">
                      <p className="text-sm text-[#88A85D] font-semibold mb-2 uppercase tracking-wide" style={{ fontFamily: "var(--font-accent)" }}>
                        {product.category}
                      </p>
                      
                      <Link href={`/products/${product.id}`}>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-[#E85D75] transition-colors text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-2xl font-black text-[#E85D75]" style={{ fontFamily: "var(--font-heading)" }}>
                          {product.price}
                        </span>
                        
                        <Button 
                          size="sm"
                          className="bg-[#E85D75] hover:bg-[#E85D75]/90 text-white rounded-full btn-3d"
                          style={{ fontFamily: "var(--font-accent)" }}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                asChild
                className="bg-[#E85D75] hover:bg-[#E85D75]/90 text-white font-bold shadow-3d btn-3d"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Link href="/products">
                  Continue Shopping
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-[#88A85D] text-[#88A85D] hover:bg-[#88A85D] hover:text-white font-bold btn-3d"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Link href="/subscriptions">
                  <Sparkles className="mr-2 w-5 h-5" />
                  Explore Subscriptions
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
