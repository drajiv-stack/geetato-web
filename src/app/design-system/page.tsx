"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Heart, Star, Zap, Check, AlertCircle } from "lucide-react"

const colors = [
  { name: "Teal", var: "--teal", desc: "Primary brand color" },
  { name: "Teal Dark", var: "--teal-dark", desc: "Darker teal variant" },
  { name: "Teal Light", var: "--teal-light", desc: "Lighter teal variant" },
  { name: "Orange", var: "--orange", desc: "Secondary accent" },
  { name: "Orange Dark", var: "--orange-dark", desc: "Darker orange" },
  { name: "Orange Light", var: "--orange-light", desc: "Lighter orange" },
  { name: "Charcoal", var: "--charcoal", desc: "Dark neutral" },
  { name: "Slate", var: "--slate", desc: "Mid-tone neutral" },
  { name: "Green", var: "--green", desc: "Success/health" },
  { name: "Yellow", var: "--yellow", desc: "Energy/attention" }
]

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--teal-light)] to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl sm:text-6xl font-black mb-6">
              Design <span className="text-[var(--teal)]">System</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              A comprehensive guide to SnackVeda's visual language, components, and design principles
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Color Palette */}
        <section>
          <h2 className="text-4xl font-black mb-4">Color Palette</h2>
          <p className="text-foreground/70 mb-8 text-lg">
            Bold, vibrant colors that evoke energy, health, and authenticity
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {colors.map((color) => (
              <Card key={color.name} className="overflow-hidden border-2">
                <div 
                  className="h-32"
                  style={{ backgroundColor: `var(${color.var})` }}
                />
                <div className="p-4">
                  <h3 className="font-bold mb-1">{color.name}</h3>
                  <p className="text-xs text-foreground/60">{color.desc}</p>
                  <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
                    var({color.var})
                  </code>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-4xl font-black mb-4">Typography</h2>
          <p className="text-foreground/70 mb-8 text-lg">
            Poppins for headings (bold, impactful) and Inter for body text (clean, readable)
          </p>
          
          <Card className="p-8 border-2 space-y-6">
            <div>
              <p className="text-sm text-foreground/60 mb-2">Heading 1 / Display</p>
              <h1 className="text-6xl font-black">Healthy Snacking Redefined</h1>
            </div>
            <div>
              <p className="text-sm text-foreground/60 mb-2">Heading 2</p>
              <h2 className="text-5xl font-black">Premium Indian Snacks</h2>
            </div>
            <div>
              <p className="text-sm text-foreground/60 mb-2">Heading 3</p>
              <h3 className="text-4xl font-bold">Authentic Flavors</h3>
            </div>
            <div>
              <p className="text-sm text-foreground/60 mb-2">Body Large</p>
              <p className="text-xl">
                Experience authentic Indian flavors with every bite. Premium ingredients, zero guilt.
              </p>
            </div>
            <div>
              <p className="text-sm text-foreground/60 mb-2">Body Regular</p>
              <p className="text-base">
                SnackVeda blends traditional recipes with modern nutritional science to create snacks that fuel your wellness journey.
              </p>
            </div>
            <div>
              <p className="text-sm text-foreground/60 mb-2">Body Small</p>
              <p className="text-sm">
                100% natural ingredients • No artificial preservatives • Gluten-free options available
              </p>
            </div>
          </Card>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-4xl font-black mb-4">Buttons</h2>
          <p className="text-foreground/70 mb-8 text-lg">
            Clear, actionable buttons with hover states and micro-interactions
          </p>
          
          <div className="space-y-8">
            <Card className="p-8 border-2">
              <h3 className="font-bold mb-6">Primary Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-[var(--orange)] hover:bg-[var(--orange-dark)] text-white">
                  Shop Now
                </Button>
                <Button size="default" className="bg-[var(--teal)] hover:bg-[var(--teal-dark)] text-white">
                  Add to Cart
                </Button>
                <Button size="sm" className="bg-[var(--green)] hover:bg-[var(--green)]/80 text-white">
                  Small Button
                </Button>
              </div>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="font-bold mb-6">Secondary Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" variant="outline" className="border-2 border-[var(--teal)] text-[var(--teal)] hover:bg-[var(--teal)] hover:text-white">
                  Learn More
                </Button>
                <Button size="default" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="ghost">
                  Cancel
                </Button>
              </div>
            </Card>

            <Card className="p-8 border-2">
              <h3 className="font-bold mb-6">Icon Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <Button size="icon" className="bg-[var(--orange)] hover:bg-[var(--orange-dark)]">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="outline">
                  <Star className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Zap className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-4xl font-black mb-4">Cards</h2>
          <p className="text-foreground/70 mb-8 text-lg">
            Flexible containers for content with hover states and depth
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-2 hover:border-[var(--teal)] transition-all hover:shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[var(--teal)]/10 flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-[var(--teal)]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Feature Card</h3>
              <p className="text-foreground/70">
                Showcase key features with icons and descriptions
              </p>
            </Card>

            <Card className="overflow-hidden border-2">
              <div className="h-40 bg-gradient-to-br from-[var(--teal)] to-[var(--orange)]"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Product Card</h3>
                <p className="text-foreground/70">
                  Display products with images and key info
                </p>
              </div>
            </Card>

            <Card className="p-6 border-2 bg-gradient-to-br from-[var(--teal)]/5 to-[var(--orange)]/5">
              <h3 className="text-xl font-bold mb-2">Gradient Card</h3>
              <p className="text-foreground/70 mb-4">
                Subtle gradient backgrounds for emphasis
              </p>
              <Badge className="bg-[var(--orange)] text-white">Featured</Badge>
            </Card>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-4xl font-black mb-4">Badges & Labels</h2>
          <p className="text-foreground/70 mb-8 text-lg">
            Small elements for status, categories, and highlights
          </p>
          
          <Card className="p-8 border-2">
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-[var(--teal)] text-white">Best Seller</Badge>
              <Badge className="bg-[var(--orange)] text-white">New</Badge>
              <Badge className="bg-[var(--green)] text-white">Organic</Badge>
              <Badge className="bg-[var(--yellow)] text-[var(--charcoal)]">High Protein</Badge>
              <Badge variant="outline" className="border-[var(--teal)] text-[var(--teal)]">
                Gluten Free
              </Badge>
              <Badge variant="secondary">In Stock</Badge>
            </div>
          </Card>
        </section>

        {/* Form Elements */}
        <section>
          <h2 className="text-4xl font-black mb-4">Form Elements</h2>
          <p className="text-foreground/70 mb-8 text-lg">
            Accessible, user-friendly input components
          </p>
          
          <Card className="p-8 border-2 space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-semibold mb-2">Input Field</label>
              <Input placeholder="Enter your email..." className="h-12" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Text Area</label>
              <Textarea placeholder="Enter your message..." rows={4} />
            </div>
            
            <div className="flex items-center gap-3">
              <input type="checkbox" id="terms" className="w-5 h-5" />
              <label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions
              </label>
            </div>
          </Card>
        </section>

        {/* Icons & Illustrations */}
        <section>
          <h2 className="text-4xl font-black mb-4">Icons</h2>
          <p className="text-foreground/70 mb-8 text-lg">
            Lucide icons for consistent, clean visual communication
          </p>
          
          <Card className="p-8 border-2">
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-10 gap-6">
              {[Heart, Star, Zap, Check, AlertCircle].map((Icon, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-xl bg-muted group-hover:bg-[var(--teal)]/10 flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6 text-foreground/70 group-hover:text-[var(--teal)] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Spacing & Layout */}
        <section>
          <h2 className="text-4xl font-black mb-4">Spacing & Grid</h2>
          <p className="text-foreground/70 mb-8 text-lg">
            Consistent 8px base unit with responsive grid system
          </p>
          
          <Card className="p-8 border-2">
            <div className="space-y-4">
              <div className="h-8 bg-[var(--teal)]/20 rounded flex items-center px-4 text-sm font-semibold">
                8px - Base unit
              </div>
              <div className="h-12 bg-[var(--teal)]/20 rounded flex items-center px-4 text-sm font-semibold">
                16px - Small spacing
              </div>
              <div className="h-16 bg-[var(--teal)]/20 rounded flex items-center px-4 text-sm font-semibold">
                24px - Medium spacing
              </div>
              <div className="h-24 bg-[var(--teal)]/20 rounded flex items-center px-4 text-sm font-semibold">
                32px - Large spacing
              </div>
            </div>
          </Card>
        </section>

        {/* Animation Principles */}
        <section>
          <h2 className="text-4xl font-black mb-4">Animation Principles</h2>
          <p className="text-foreground/70 mb-8 text-lg">
            Smooth, purposeful animations that enhance user experience
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-full h-32 bg-gradient-to-br from-[var(--teal)] to-[var(--orange)] rounded-xl mb-4"
              />
              <h3 className="font-bold mb-2">Scale on Hover</h3>
              <p className="text-sm text-foreground/70">
                Subtle scale transforms for interactive elements
              </p>
            </Card>

            <Card className="p-6 border-2">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-full h-32 bg-gradient-to-br from-[var(--orange)] to-[var(--yellow)] rounded-xl mb-4"
              />
              <h3 className="font-bold mb-2">Float Animation</h3>
              <p className="text-sm text-foreground/70">
                Gentle floating motion for attention
              </p>
            </Card>

            <Card className="p-6 border-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-32 bg-gradient-to-br from-[var(--green)] to-[var(--teal)] rounded-xl mb-4"
              />
              <h3 className="font-bold mb-2">Fade In Up</h3>
              <p className="text-sm text-foreground/70">
                Content reveals with fade and slide
              </p>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
