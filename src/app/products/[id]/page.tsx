"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ArrowLeft, Heart, Share2, Star, Check, Leaf, Zap, Shield, MessageCircle, ZoomIn, ThumbsUp, TrendingUp, Award, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Link from "next/link"
import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import SignupDialog from "@/components/SignupDialog"

// Type definitions
interface ProductImage {
  id: number
  productId: number
  imageUrl: string
  altText: string | null
  displayOrder: number
  isPrimary: boolean
}

interface ProductNutrition {
  id: number
  productId: number
  servingSize: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
}

interface ProductIngredient {
  id: number
  productId: number
  ingredientName: string
  displayOrder: number
}

interface ProductHighlight {
  id: number
  productId: number
  highlightText: string
  displayOrder: number
}

interface FullProduct {
  id: number
  name: string
  slug: string
  category: string
  subCategory: string
  description: string
  badge: string | null
  featured: boolean
  rating: number
  reviews: number
  images: ProductImage[]
  nutrition: ProductNutrition | null
  ingredients: ProductIngredient[]
  highlights: ProductHighlight[]
}

const customerReviews = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    date: "2 weeks ago",
    verified: true,
    comment: "Absolutely delicious! The taste is incredible and I love that it's made with natural ingredients. Perfect for my morning routine.",
    helpful: 45
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    date: "1 month ago",
    verified: true,
    comment: "Great product! Tastes authentic and the nutritional profile is exactly what I was looking for. Highly recommend for health-conscious snackers.",
    helpful: 32
  },
  {
    id: 3,
    name: "Ananya Reddy",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 4,
    date: "1 month ago",
    verified: true,
    comment: "Really good! The texture is perfect and flavor is on point. Will definitely order again.",
    helpful: 28
  }
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id)
  const [product, setProduct] = useState<FullProduct | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<FullProduct[]>([])
  const [isLoadingProduct, setIsLoadingProduct] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showImageZoom, setShowImageZoom] = useState(false)
  const [isInterested, setIsInterested] = useState(false)
  const [showSignupDialog, setShowSignupDialog] = useState(false)
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)
  
  const { data: session } = useSession()
  const router = useRouter()

  // Fetch product details from database
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoadingProduct(true)
      try {
        const res = await fetch(`/api/products-new/${productId}`)
        if (res.ok) {
          const productData = await res.json()
          setProduct(productData)
          
          // Fetch related products
          if (productData.category) {
            const relatedRes = await fetch(`/api/products-new?category=${encodeURIComponent(productData.category)}`)
            if (relatedRes.ok) {
              const allRelated = await relatedRes.json()
              const filtered = allRelated.filter((p: FullProduct) => p.id !== productId).slice(0, 3)
              
              // Fetch images for related products
              const relatedWithImages = await Promise.all(
                filtered.map(async (p: FullProduct) => {
                  try {
                    const imgRes = await fetch(`/api/product-images?productId=${p.id}`)
                    if (imgRes.ok) {
                      const images = await imgRes.json()
                      return { ...p, images }
                    }
                  } catch (err) {
                    console.error(`Error fetching images for product ${p.id}:`, err)
                  }
                  return p
                })
              )
              setRelatedProducts(relatedWithImages)
            }
          }
        } else {
          toast.error("Product not found")
          router.push("/products")
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        toast.error("Failed to load product")
      } finally {
        setIsLoadingProduct(false)
      }
    }

    fetchProduct()
  }, [productId, router])

  const handleExpressInterest = async () => {
    if (!product) return
    
    // Check if user is logged in
    if (!session?.user) {
      setShowSignupDialog(true)
      return
    }

    // User is logged in, add to wishlist
    setIsAddingToWishlist(true)
    setIsInterested(true)
    
    try {
      const token = localStorage.getItem("bearer_token")
      const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0]
      
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          productImage: primaryImage?.imageUrl || "",
        }),
      })

      if (res.ok) {
        toast.success(`${product.name} added to your wishlist!`)
      } else {
        const error = await res.json()
        if (error.code === "ALREADY_EXISTS") {
          toast.info("This product is already in your wishlist")
        } else {
          toast.error("Failed to add to wishlist")
          setIsInterested(false)
        }
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error)
      toast.error("Failed to add to wishlist")
      setIsInterested(false)
    } finally {
      setIsAddingToWishlist(false)
    }
  }

  const handleSignupSuccess = async () => {
    await handleExpressInterest()
  }

  const getPrimaryImage = (prod: FullProduct) => {
    const primaryImg = prod.images?.find(img => img.isPrimary)
    return primaryImg?.imageUrl || prod.images?.[0]?.imageUrl || ""
  }

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <Navigation />
        <div className="flex items-center justify-center" style={{ minHeight: "calc(100vh - 80px)", paddingTop: "80px" }}>
          <div className="text-center">
            <Loader2 className="w-16 h-16 animate-spin text-[#E85D75] mx-auto mb-4" />
            <p className="text-xl text-[#5D4037]/70 font-semibold" style={{ fontFamily: "var(--font-body)" }}>
              Loading product details...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <Navigation />
        <div className="flex items-center justify-center" style={{ minHeight: "calc(100vh - 80px)", paddingTop: "80px" }}>
          <div className="text-center">
            <p className="text-xl text-[#5D4037]/70 font-semibold" style={{ fontFamily: "var(--font-body)" }}>
              Product not found
            </p>
          </div>
        </div>
      </div>
    )
  }

  const ratingDistribution = [
    { stars: 5, count: Math.floor(product.reviews * 0.85), percentage: 85 },
    { stars: 4, count: Math.floor(product.reviews * 0.12), percentage: 12 },
    { stars: 3, count: Math.floor(product.reviews * 0.02), percentage: 2 },
    { stars: 2, count: Math.floor(product.reviews * 0.008), percentage: 0.8 },
    { stars: 1, count: Math.floor(product.reviews * 0.002), percentage: 0.2 }
  ]

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navigation />
      
      <div className="pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 flex items-center gap-2 text-sm"
          >
            <Link href="/products" className="text-[#5D4037]/60 hover:text-[#E85D75] transition-colors cursor-pointer">
              Products
            </Link>
            <span className="text-[#5D4037]/40">/</span>
            <Link href="/products" className="text-[#5D4037]/60 hover:text-[#E85D75] transition-colors cursor-pointer">
              {product.category}
            </Link>
            <span className="text-[#5D4037]/40">/</span>
            <span className="text-[#5D4037] font-semibold">{product.name}</span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images with Zoom */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="sticky top-28">
                {/* Main Image */}
                <div className="relative aspect-square rounded-3xl overflow-hidden mb-4 bg-white shadow-3d border-4 border-white group cursor-pointer">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={product.images[selectedImage]?.imageUrl || ""}
                    alt={product.images[selectedImage]?.altText || product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <Badge className="absolute top-6 right-6 bg-[#F4A261] text-[#2C2C2E] font-bold border-0 text-sm shadow-3d" style={{ fontFamily: "var(--font-accent)" }}>
                      {product.badge}
                    </Badge>
                  )}
                  
                  {/* Zoom Button */}
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => setShowImageZoom(true)}
                    className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm hover:bg-white shadow-3d rounded-full cursor-pointer"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </Button>
                </div>

                {/* Thumbnail Images */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-4">
                    {product.images.map((image, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage(idx)}
                        className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all shadow-3d cursor-pointer ${
                          selectedImage === idx
                            ? "border-[#E85D75] ring-4 ring-[#E85D75]/20"
                            : "border-white hover:border-[#F4A261]"
                        }`}
                      >
                        <img
                          src={image.imageUrl}
                          alt={image.altText || `${product.name} view ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="mb-6">
                <p className="text-[#88A85D] font-bold mb-2 uppercase tracking-wide text-sm" style={{ fontFamily: "var(--font-accent)" }}>{product.category}</p>
                <h1 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? "fill-[#F4A261] text-[#F4A261]"
                              : "text-[#E8E5E1]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-black text-lg text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>{product.rating}</span>
                  </div>
                  <div className="text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>({product.reviews} reviews)</div>
                </div>

                <p className="text-lg text-[#5D4037]/80 leading-relaxed mb-6" style={{ fontFamily: "var(--font-body)" }}>
                  {product.description}
                </p>

                {/* Highlights */}
                {product.highlights.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {product.highlights.map((highlight, idx) => (
                      <motion.div 
                        key={highlight.id} 
                        className="flex items-center gap-2 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div className="w-5 h-5 rounded-full bg-[#88A85D]/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-[#88A85D]" />
                        </div>
                        <span className="text-[#5D4037]/80 font-medium" style={{ fontFamily: "var(--font-body)" }}>{highlight.highlightText}</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Interest Card */}
              <Card className="p-6 mb-6 border-2 border-[#E85D75]/20 rounded-3xl shadow-3d bg-white">
                <div className="mb-6">
                  <h3 className="text-xl font-black text-[#2C2C2E] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    Interested in this product?
                  </h3>
                  <p className="text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                    Express your interest and we'll reach out with availability, pricing, and ordering details.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    onClick={handleExpressInterest}
                    disabled={isInterested || isAddingToWishlist}
                    className={`flex-1 ${
                      isInterested 
                        ? "bg-[#88A85D] hover:bg-[#88A85D]" 
                        : "bg-[#E85D75] hover:bg-[#E85D75]/90"
                    } text-white font-bold h-14 text-lg btn-3d rounded-full shadow-3d group cursor-pointer`}
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    {isAddingToWishlist ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : isInterested ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Interest Submitted
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                        I'm Interested
                      </>
                    )}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`h-14 w-14 border-2 rounded-full cursor-pointer ${
                      isWishlisted
                        ? "border-red-500 bg-red-50 hover:bg-red-100"
                        : "border-[#E85D75]/20 hover:border-[#E85D75]"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 w-14 border-2 border-[#E85D75]/20 hover:border-[#E85D75] rounded-full cursor-pointer"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>

                {isInterested && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-[#88A85D]/10 rounded-2xl"
                  >
                    <p className="text-sm text-[#5D4037] font-semibold flex items-center gap-2" style={{ fontFamily: "var(--font-accent)" }}>
                      <Check className="w-4 h-4 text-[#88A85D]" />
                      Thank you! We'll contact you shortly with more details.
                    </p>
                  </motion.div>
                )}
              </Card>

              {/* Contact Card */}
              <Card className="p-6 mb-6 border-2 border-[#F4A261]/20 rounded-3xl shadow-3d bg-gradient-to-br from-[#FAF0E6] to-white">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F4A261] flex items-center justify-center flex-shrink-0 shadow-3d">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-[#2C2C2E] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                      Have questions?
                    </h4>
                    <p className="text-sm text-[#5D4037]/70 mb-3" style={{ fontFamily: "var(--font-body)" }}>
                      Contact us to learn more about this product, pricing, bulk orders, and availability.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-2 border-[#F4A261] text-[#A67C52] hover:bg-[#F4A261] hover:text-white font-bold rounded-full cursor-pointer"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      <Link href="/contact">
                        Contact Us
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <motion.div 
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="text-center p-4 rounded-2xl bg-[#88A85D]/10 card-3d cursor-pointer"
                >
                  <Leaf className="w-8 h-8 mx-auto mb-2 text-[#88A85D]" />
                  <div className="text-xs font-bold text-[#5D4037]" style={{ fontFamily: "var(--font-accent)" }}>100% Natural</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="text-center p-4 rounded-2xl bg-[#F4A261]/10 card-3d cursor-pointer"
                >
                  <Zap className="w-8 h-8 mx-auto mb-2 text-[#F4A261]" />
                  <div className="text-xs font-bold text-[#5D4037]" style={{ fontFamily: "var(--font-accent)" }}>High Energy</div>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="text-center p-4 rounded-2xl bg-[#E85D75]/10 card-3d cursor-pointer"
                >
                  <Shield className="w-8 h-8 mx-auto mb-2 text-[#E85D75]" />
                  <div className="text-xs font-bold text-[#5D4037]" style={{ fontFamily: "var(--font-accent)" }}>Quality Tested</div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Detailed Information Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <Tabs defaultValue="nutrition" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-8">
                <TabsTrigger
                  value="nutrition"
                  className="data-[state=active]:border-b-4 data-[state=active]:border-[#E85D75] data-[state=active]:text-[#E85D75] rounded-none px-6 py-4 font-bold text-base"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Nutrition Facts
                </TabsTrigger>
                <TabsTrigger
                  value="ingredients"
                  className="data-[state=active]:border-b-4 data-[state=active]:border-[#E85D75] data-[state=active]:text-[#E85D75] rounded-none px-6 py-4 font-bold text-base"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Ingredients
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:border-b-4 data-[state=active]:border-[#E85D75] data-[state=active]:text-[#E85D75] rounded-none px-6 py-4 font-bold text-base"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  Reviews ({product.reviews})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="nutrition" className="mt-8">
                <Card className="p-8 rounded-3xl border-2 border-[#E85D75]/20 shadow-3d bg-white">
                  <h3 className="text-2xl font-black mb-6 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>Nutrition Information</h3>
                  {product.nutrition ? (
                    <>
                      <p className="text-[#5D4037]/60 mb-8 font-medium" style={{ fontFamily: "var(--font-body)" }}>Per serving ({product.nutrition.servingSize})</p>
                      
                      <div className="space-y-4">
                        {[
                          { label: "Calories", value: `${product.nutrition.calories} kcal`, color: "#E85D75", icon: TrendingUp },
                          { label: "Protein", value: `${product.nutrition.protein}g`, color: "#88A85D", icon: Award },
                          { label: "Carbohydrates", value: `${product.nutrition.carbs}g`, color: "#F4A261", icon: Zap },
                          { label: "Fat", value: `${product.nutrition.fat}g`, color: "#A67C52", icon: Heart },
                          { label: "Fiber", value: `${product.nutrition.fiber}g`, color: "#88A85D", icon: Leaf },
                          { label: "Sugar", value: `${product.nutrition.sugar}g`, color: "#E85D75", icon: Star }
                        ].map((item, idx) => (
                          <motion.div 
                            key={item.label} 
                            className="flex items-center justify-between py-4 border-b border-[#E8E5E1]"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                                <item.icon className="w-5 h-5" style={{ color: item.color }} />
                              </div>
                              <span className="font-bold text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>{item.label}</span>
                            </div>
                            <span className="font-black text-lg" style={{ color: item.color, fontFamily: "var(--font-heading)" }}>{item.value}</span>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
                      Nutrition information not available for this product.
                    </p>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="ingredients" className="mt-8">
                <Card className="p-8 rounded-3xl border-2 border-[#E85D75]/20 shadow-3d bg-white">
                  <h3 className="text-2xl font-black mb-6 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>Premium Ingredients</h3>
                  {product.ingredients.length > 0 ? (
                    <>
                      <p className="text-[#5D4037]/70 mb-8" style={{ fontFamily: "var(--font-body)" }}>
                        Every ingredient is carefully selected for quality, nutrition, and authentic flavor.
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {product.ingredients.map((ingredient, idx) => (
                          <motion.div
                            key={ingredient.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ scale: 1.02, x: 4 }}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-[#FAF0E6] card-3d"
                          >
                            <div className="w-10 h-10 rounded-xl bg-[#88A85D]/20 flex items-center justify-center flex-shrink-0">
                              <Leaf className="w-5 h-5 text-[#88A85D]" />
                            </div>
                            <span className="font-semibold text-[#2C2C2E]" style={{ fontFamily: "var(--font-body)" }}>{ingredient.ingredientName}</span>
                          </motion.div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
                      Ingredient information not available for this product.
                    </p>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Rating Summary */}
                  <Card className="lg:col-span-1 p-8 rounded-3xl border-2 border-[#E85D75]/20 shadow-3d bg-white h-fit sticky top-28">
                    <div className="text-center mb-6">
                      <div className="text-6xl font-black text-[#E85D75] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        {product.rating}
                      </div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 ${
                              i < Math.floor(product.rating)
                                ? "fill-[#F4A261] text-[#F4A261]"
                                : "text-[#E8E5E1]"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[#5D4037]/60 font-medium" style={{ fontFamily: "var(--font-body)" }}>
                        Based on {product.reviews} reviews
                      </p>
                    </div>

                    <div className="space-y-3">
                      {ratingDistribution.map((dist) => (
                        <div key={dist.stars} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-12">
                            <span className="text-sm font-bold" style={{ fontFamily: "var(--font-heading)" }}>{dist.stars}</span>
                            <Star className="w-3 h-3 fill-[#F4A261] text-[#F4A261]" />
                          </div>
                          <Progress value={dist.percentage} className="flex-1 h-2" />
                          <span className="text-sm text-[#5D4037]/60 w-12 text-right" style={{ fontFamily: "var(--font-body)" }}>{dist.count}</span>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Customer Reviews */}
                  <div className="lg:col-span-2 space-y-6">
                    {customerReviews.map((review, idx) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Card className="p-6 rounded-3xl border-2 border-[#E85D75]/10 hover:border-[#E85D75]/30 transition-all shadow-3d bg-white">
                          <div className="flex items-start gap-4 mb-4">
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="w-12 h-12 rounded-full object-cover border-2 border-[#E85D75]"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>{review.name}</h4>
                                {review.verified && (
                                  <Badge className="bg-[#88A85D]/10 text-[#88A85D] border-0 text-xs font-bold">
                                    ✓ Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? "fill-[#F4A261] text-[#F4A261]"
                                          : "text-[#E8E5E1]"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-[#5D4037]/80 leading-relaxed mb-4" style={{ fontFamily: "var(--font-body)" }}>
                            {review.comment}
                          </p>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-[#5D4037]/60 hover:text-[#E85D75]">
                              <ThumbsUp className="w-4 h-4 mr-2" />
                              Helpful ({review.helpful})
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-black mb-8 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                You May Also Like
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct, idx) => {
                  const primaryImage = getPrimaryImage(relatedProduct)
                  
                  return (
                    <motion.div
                      key={relatedProduct.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Link href={`/products/${relatedProduct.id}`} className="cursor-pointer">
                        <Card className="group overflow-hidden border-2 border-transparent hover:border-[#E85D75] transition-all duration-300 hover:shadow-3d bg-white rounded-3xl card-3d">
                          <div className="relative h-64 overflow-hidden">
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                              src={primaryImage}
                              alt={relatedProduct.name}
                              className="w-full h-full object-cover"
                            />
                            {relatedProduct.badge && (
                              <Badge className="absolute top-4 right-4 bg-[#F4A261] text-[#2C2C2E] font-bold border-0 text-xs shadow-3d">
                                {relatedProduct.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="p-6">
                            <p className="text-sm text-[#88A85D] font-semibold mb-2 uppercase tracking-wide" style={{ fontFamily: "var(--font-accent)" }}>
                              {relatedProduct.category}
                            </p>
                            <h3 className="text-lg font-bold mb-2 group-hover:text-[#E85D75] transition-colors text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                              {relatedProduct.name}
                            </h3>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(relatedProduct.rating)
                                        ? "fill-[#F4A261] text-[#F4A261]"
                                        : "text-[#E8E5E1]"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
                                {relatedProduct.rating}
                              </span>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {showImageZoom && product && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowImageZoom(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 cursor-zoom-out"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="relative max-w-6xl w-full pointer-events-auto">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setShowImageZoom(false)}
                  className="absolute -top-12 right-0 bg-white/90 hover:bg-white rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </Button>
                <img
                  src={product.images[selectedImage]?.imageUrl || ""}
                  alt={product.images[selectedImage]?.altText || product.name}
                  className="w-full h-auto rounded-3xl shadow-3d"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Signup Dialog */}
      <SignupDialog
        open={showSignupDialog}
        onOpenChange={setShowSignupDialog}
        onSuccess={handleSignupSuccess}
        productName={product?.name}
      />

      <Footer />
    </div>
  )
}