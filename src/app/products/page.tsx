"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Search, Filter, ChevronDown, X, Heart, Leaf, Wheat, ChefHat, Snowflake, Package, Grid3x3, List, SlidersHorizontal, ArrowUpDown, Star, MessageCircle, Eye, ExternalLink, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Main Categories with Icons
const mainCategories = [
  { id: "all", name: "All Products", icon: Package, color: "#E85D75" },
  { id: "health-bakery", name: "Health-Focused Bakery", icon: Heart, color: "#F4A261" },
  { id: "traditional", name: "Traditional Indian", icon: ChefHat, color: "#88A85D" },
  { id: "bakery-confectionery", name: "Bakery & Confectionery", icon: Wheat, color: "#D4A5D4" },
  { id: "ready-to-cook", name: "Ready-to-Cook & Frozen", icon: Snowflake, color: "#89CFF0" },
  { id: "specialty-ingredients", name: "Specialty Ingredients", icon: Leaf, color: "#A67C52" }
]

// Sub-categories for each main category
const subCategories = {
  "health-bakery": [
    "Sugar-Free Treats",
    "High-Fiber Options",
    "Diabetic-Friendly Range",
    "Gluten-Free Selection"
  ],
  "traditional": [
    "Mathri & Khakhra",
    "Baked Namkeens",
    "Crackers & Chips",
    "Regional Specialties",
    "Festival Specials"
  ],
  "bakery-confectionery": [
    "Artisan Breads",
    "Fresh Cakes & Bakes",
    "Cookies & Rusks",
    "Snacks & Bites"
  ],
  "ready-to-cook": [
    "Parathas & Rotis",
    "Ready-to-Fry Items",
    "Meal Components",
    "Frozen Desserts"
  ],
  "specialty-ingredients": [
    "Flour Blends",
    "Spice Mixes",
    "Health Additives",
    "Recipe Bases"
  ]
}

// Comprehensive Product Data with ratings (prices removed)
const allProducts = [
  // Health-Focused Bakery
  { id: 1, name: "Stevia Cookie Pack", category: "health-bakery", subCategory: "Sugar-Free Treats", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-sugar-f-a067a36f-20251104162057.jpg", badge: "Sugar-Free", featured: true, rating: 4.8, reviews: 234 },
  { id: 2, name: "Jaggery Energy Bites", category: "health-bakery", subCategory: "Sugar-Free Treats", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-jaggery-3349bbdc-20251104162056.jpg", badge: "Natural", rating: 4.6, reviews: 189 },
  { id: 3, name: "Sugar-Free Brownies", category: "health-bakery", subCategory: "Sugar-Free Treats", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-sugar-f-003ad916-20251104162056.jpg", badge: "Best Seller", rating: 4.9, reviews: 567 },
  
  { id: 4, name: "Oat & Millet Cookies", category: "health-bakery", subCategory: "High-Fiber Options", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-oat-and-b38ff104-20251104162058.jpg", badge: "High Fiber", rating: 4.7, reviews: 342 },
  { id: 5, name: "Flax Seed Crackers", category: "health-bakery", subCategory: "High-Fiber Options", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-flax-se-76663e90-20251104162137.jpg", badge: "Fiber Rich", featured: true, rating: 4.5, reviews: 278 },
  { id: 6, name: "Baked Khakhra Variety", category: "health-bakery", subCategory: "High-Fiber Options", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-baked-k-fd4f3e33-20251104162137.jpg", badge: "Traditional", rating: 4.4, reviews: 198 },
  
  { id: 7, name: "Savory Snack Box", category: "health-bakery", subCategory: "Diabetic-Friendly Range", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-savory--859cce21-20251104162133.jpg", badge: "Low GI", rating: 4.6, reviews: 156 },
  { id: 8, name: "Multi-Grain Crackers", category: "health-bakery", subCategory: "Diabetic-Friendly Range", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-multi-g-5403314d-20251104162135.jpg", badge: "Diabetic-Safe", rating: 4.7, reviews: 223 },
  
  { id: 9, name: "Millet Flour Cookies", category: "health-bakery", subCategory: "Gluten-Free Selection", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-millet--fc2f1bd9-20251104162138.jpg", badge: "Gluten-Free", featured: true, rating: 4.8, reviews: 445 },
  { id: 10, name: "Almond Protein Bars", category: "health-bakery", subCategory: "Gluten-Free Selection", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-almond--93bc9869-20251104162136.jpg", badge: "High Protein", rating: 4.9, reviews: 612 },
  { id: 11, name: "Makhana Puffs", category: "health-bakery", subCategory: "Gluten-Free Selection", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-makhana-b625fe4d-20251104162140.jpg", badge: "Light", rating: 4.5, reviews: 289 },

  // Traditional Indian Specialties
  { id: 12, name: "Jeera Mathri Pack", category: "traditional", subCategory: "Mathri & Khakhra", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-jeera-m-ed70f869-20251104162138.jpg", badge: "Classic", featured: true, rating: 4.7, reviews: 534 },
  { id: 13, name: "Masala Khakhra Assorted", category: "traditional", subCategory: "Mathri & Khakhra", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-masala--1d4b4d51-20251104162138.jpg", badge: "Bestseller", rating: 4.8, reviews: 678 },
  { id: 14, name: "Methi Mathri", category: "traditional", subCategory: "Mathri & Khakhra", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-methi-m-edfe3221-20251104162139.jpg", badge: "Traditional", rating: 4.6, reviews: 412 },
  
  { id: 15, name: "Roasted Chivda Mix", category: "traditional", subCategory: "Baked Namkeens", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-roasted-ae1505d4-20251104162212.jpg", badge: "Crunchy", rating: 4.7, reviews: 389 },
  { id: 16, name: "Spiced Sev Variety", category: "traditional", subCategory: "Baked Namkeens", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-spiced--f918a76c-20251104162214.jpg", badge: "Spicy", featured: true, rating: 4.8, reviews: 523 },
  { id: 17, name: "Puffed Snack Mix", category: "traditional", subCategory: "Baked Namkeens", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-puffed--109a95b0-20251104162213.jpg", badge: "Light", rating: 4.5, reviews: 267 },
  
  { id: 18, name: "Baked Potato Wafers", category: "traditional", subCategory: "Crackers & Chips", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-baked-p-b8631609-20251104162214.jpg", badge: "Popular", rating: 4.6, reviews: 734 },
  { id: 19, name: "Multigrain Crisps", category: "traditional", subCategory: "Crackers & Chips", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-multigr-40dd8f81-20251104162212.jpg", badge: "Healthy", rating: 4.7, reviews: 456 },
  { id: 20, name: "Masala Makhana Chips", category: "traditional", subCategory: "Crackers & Chips", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-masala--c66e9354-20251104162214.jpg", badge: "Premium", featured: true, rating: 4.9, reviews: 891 },
  
  { id: 21, name: "Rajasthani Snack Box", category: "traditional", subCategory: "Regional Specialties", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-rajasth-58552c41-20251104162213.jpg", badge: "Regional", rating: 4.8, reviews: 345 },
  { id: 22, name: "South Indian Murukku", category: "traditional", subCategory: "Regional Specialties", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-south-i-29bfde96-20251104162212.jpg", badge: "Authentic", rating: 4.7, reviews: 467 },
  { id: 23, name: "Punjabi Mix", category: "traditional", subCategory: "Regional Specialties", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-punjabi-ab783775-20251104162213.jpg", badge: "Spicy", rating: 4.6, reviews: 398 },
  
  { id: 24, name: "Diwali Special Box", category: "traditional", subCategory: "Festival Specials", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-diwali--76e4747d-20251104162217.jpg", badge: "Festival", featured: true, rating: 4.9, reviews: 1023 },
  { id: 25, name: "Holi Gujiya Pack", category: "traditional", subCategory: "Festival Specials", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-holi-gu-3ae51d0f-20251104162255.jpg", badge: "Seasonal", rating: 4.8, reviews: 678 },
  { id: 26, name: "Festive Combo Pack", category: "traditional", subCategory: "Festival Specials", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-festive-78f96100-20251104162251.jpg", badge: "Gift Box", rating: 4.9, reviews: 834 },

  // Bakery & Confectionery
  { id: 27, name: "Multigrain Bread", category: "bakery-confectionery", subCategory: "Artisan Breads", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-multigr-64f36c2b-20251104162252.jpg", badge: "Fresh Daily", rating: 4.5, reviews: 234 },
  { id: 28, name: "Garlic Focaccia", category: "bakery-confectionery", subCategory: "Artisan Breads", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-garlic--735ae2cd-20251104162250.jpg", badge: "Artisan", featured: true, rating: 4.8, reviews: 456 },
  { id: 29, name: "Pav Buns (6 pack)", category: "bakery-confectionery", subCategory: "Artisan Breads", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-pav-bun-28fc98ec-20251104162252.jpg", badge: "Best Seller", rating: 4.7, reviews: 789 },
  
  { id: 30, name: "Whole Wheat Cake", category: "bakery-confectionery", subCategory: "Fresh Cakes & Bakes", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-whole-w-f20933b2-20251104162252.jpg", badge: "Eggless", rating: 4.4, reviews: 321 },
  { id: 31, name: "Chocolate Cupcakes", category: "bakery-confectionery", subCategory: "Fresh Cakes & Bakes", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-chocola-e69664c4-20251104162252.jpg", badge: "Popular", featured: true, rating: 4.7, reviews: 543 },
  { id: 32, name: "Vanilla Sponge Cake", category: "bakery-confectionery", subCategory: "Fresh Cakes & Bakes", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-vanilla-12240f8e-20251104162252.jpg", badge: "Premium", rating: 4.6, reviews: 412 },
  
  { id: 33, name: "Coconut Cookies", category: "bakery-confectionery", subCategory: "Cookies & Rusks", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-coconut-e8d882e6-20251104162251.jpg", badge: "Classic", rating: 4.3, reviews: 289 },
  { id: 34, name: "Butter Cookies", category: "bakery-confectionery", subCategory: "Cookies & Rusks", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-butter--f2cd4854-20251104162254.jpg", badge: "Best Seller", rating: 4.5, reviews: 456 },
  { id: 35, name: "Atta Rusks", category: "bakery-confectionery", subCategory: "Cookies & Rusks", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-atta-ru-b990a4f4-20251104162328.jpg", badge: "Traditional", featured: true, rating: 4.4, reviews: 345 },
  { id: 36, name: "Millet Cookies", category: "bakery-confectionery", subCategory: "Cookies & Rusks", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-millet--d8d50686-20251104162328.jpg", badge: "Healthy", rating: 4.2, reviews: 298 },
  
  { id: 37, name: "Blueberry Muffins", category: "bakery-confectionery", subCategory: "Snacks & Bites", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-blueber-9c5a9da3-20251104162329.jpg", badge: "Fresh", rating: 4.4, reviews: 312 },
  { id: 38, name: "Mini Tarts Assorted", category: "bakery-confectionery", subCategory: "Snacks & Bites", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-mini-ta-a6785e3b-20251104162329.jpg", badge: "Sweet", rating: 4.3, reviews: 278 },
  { id: 39, name: "Baked Samosas", category: "bakery-confectionery", subCategory: "Snacks & Bites", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-baked-s-8f7e0e89-20251104162330.jpg", badge: "Savory", featured: true, rating: 4.5, reviews: 367 },

  // Ready-to-Cook & Frozen
  { id: 40, name: "Aloo Paratha (5 pack)", category: "ready-to-cook", subCategory: "Parathas & Rotis", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-aloo-pa-1788c2df-20251104162330.jpg", badge: "Frozen", featured: true, rating: 4.6, reviews: 456 },
  { id: 41, name: "Plain Roti (10 pack)", category: "ready-to-cook", subCategory: "Parathas & Rotis", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-plain-r-4bfb729d-20251104162328.jpg", badge: "Convenient", rating: 4.4, reviews: 321 },
  { id: 42, name: "Paneer Paratha (5 pack)", category: "ready-to-cook", subCategory: "Parathas & Rotis", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-paneer--850e5a77-20251104162331.jpg", badge: "Premium", rating: 4.5, reviews: 412 },
  
  { id: 43, name: "Veg Cutlets (6 pack)", category: "ready-to-cook", subCategory: "Ready-to-Fry Items", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-veg-cut-61a28110-20251104162328.jpg", badge: "Quick Fry", rating: 4.3, reviews: 289 },
  { id: 44, name: "Frozen Samosas (10 pack)", category: "ready-to-cook", subCategory: "Ready-to-Fry Items", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-frozen--3b69c25e-20251104162327.jpg", badge: "Party Pack", featured: true, rating: 4.7, reviews: 543 },
  { id: 45, name: "Kachori Mix (8 pack)", category: "ready-to-cook", subCategory: "Ready-to-Fry Items", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-kachori-9c1e36b0-20251104162404.jpg", badge: "Traditional", rating: 4.4, reviews: 312 },
  
  { id: 46, name: "Chapati Dough (500g)", category: "ready-to-cook", subCategory: "Meal Components", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-chapati-678b7e4e-20251104162407.jpg", badge: "Fresh", rating: 4.2, reviews: 278 },
  { id: 47, name: "Curry Base Mix", category: "ready-to-cook", subCategory: "Meal Components", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-curry-b-f24e0de1-20251104162406.jpg", badge: "Easy Meal", rating: 4.3, reviews: 345 },
  { id: 48, name: "Gravy Cubes", category: "ready-to-cook", subCategory: "Meal Components", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-gravy-c-4db7026c-20251104162404.jpg", badge: "Instant", rating: 4.1, reviews: 267 },
  
  { id: 49, name: "Baked Halwa Cups", category: "ready-to-cook", subCategory: "Frozen Desserts", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-baked-h-0d4b6280-20251104162400.jpg", badge: "Sweet", featured: true, rating: 4.5, reviews: 412 },
  { id: 50, name: "Frozen Rasmalai", category: "ready-to-cook", subCategory: "Frozen Desserts", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-frozen--07b513af-20251104162402.jpg", badge: "Premium", rating: 4.6, reviews: 389 },
  { id: 51, name: "Gulab Jamun Bites", category: "ready-to-cook", subCategory: "Frozen Desserts", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-gulab-j-a57211e2-20251104162406.jpg", badge: "Classic", rating: 4.4, reviews: 321 },

  // Specialty Ingredients
  { id: 52, name: "Millet Flour Mix (1kg)", category: "specialty-ingredients", subCategory: "Flour Blends", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-millet--fef504aa-20251104162404.jpg", badge: "Organic", featured: true, rating: 4.7, reviews: 456 },
  { id: 53, name: "Almond Flour (500g)", category: "specialty-ingredients", subCategory: "Flour Blends", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-almond--c07c1453-20251104162404.jpg", badge: "Premium", rating: 4.8, reviews: 543 },
  { id: 54, name: "Multigrain Flour (1kg)", category: "specialty-ingredients", subCategory: "Flour Blends", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-multigr-e5fa00ac-20251104162405.jpg", badge: "Healthy", rating: 4.5, reviews: 321 },
  
  { id: 55, name: "Garam Masala Blend", category: "specialty-ingredients", subCategory: "Spice Mixes", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-garam-m-63425228-20251104162435.jpg", badge: "Authentic", rating: 4.6, reviews: 412 },
  { id: 56, name: "Chaat Masala", category: "specialty-ingredients", subCategory: "Spice Mixes", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-chaat-m-55ce6e57-20251104162437.jpg", badge: "Tangy", rating: 4.4, reviews: 345 },
  { id: 57, name: "Bakery Spice Mix", category: "specialty-ingredients", subCategory: "Spice Mixes", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-bakery--46b5460f-20251104162436.jpg", badge: "Special", featured: true, rating: 4.7, reviews: 456 },
  
  { id: 58, name: "Chia Seeds (250g)", category: "specialty-ingredients", subCategory: "Health Additives", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-chia-se-2a69d4f8-20251104162436.jpg", badge: "Superfood", rating: 4.8, reviews: 543 },
  { id: 59, name: "Mixed Dried Fruits", category: "specialty-ingredients", subCategory: "Health Additives", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-mixed-d-fb6a3e99-20251104162437.jpg", badge: "Premium", rating: 4.6, reviews: 412 },
  { id: 60, name: "Plant Protein Powder", category: "specialty-ingredients", subCategory: "Health Additives", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-plant-p-d2466caa-20251104162436.jpg", badge: "Fitness", featured: true, rating: 4.9, reviews: 678 },
  
  { id: 61, name: "Cookie Baking Mix", category: "specialty-ingredients", subCategory: "Recipe Bases", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-cookie--98709433-20251104162437.jpg", badge: "Easy Bake", rating: 4.5, reviews: 321 },
  { id: 62, name: "Brownie Premix", category: "specialty-ingredients", subCategory: "Recipe Bases", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-brownie-07edeb04-20251104162436.jpg", badge: "Quick", rating: 4.4, reviews: 289 },
  { id: 63, name: "Dough Starter Kit", category: "specialty-ingredients", subCategory: "Recipe Bases", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-dough-s-6f8932d6-20251104162436.jpg", badge: "Starter", rating: 4.3, reviews: 278 }
]

type SortOption = "featured" | "rating" | "newest"
type ViewMode = "grid" | "list"

export default function ProductsPage() {
  const [selectedMainCategory, setSelectedMainCategory] = useState("all")
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<typeof allProducts[0] | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>("all")

  let filteredProducts = allProducts.filter(product => {
    const matchesMainCategory = selectedMainCategory === "all" || product.category === selectedMainCategory
    const matchesSubCategory = !selectedSubCategory || product.subCategory === selectedSubCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFeatured = !showFeaturedOnly || product.featured
    return matchesMainCategory && matchesSubCategory && matchesSearch && matchesFeatured
  })

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      case "featured":
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    }
  })

  const activeCategory = mainCategories.find(cat => cat.id === selectedMainCategory)
  const availableSubCategories = selectedMainCategory !== "all" ? subCategories[selectedMainCategory as keyof typeof subCategories] : []

  const sortOptions = [
    { value: "featured" as SortOption, label: "Featured" },
    { value: "rating" as SortOption, label: "Highest Rated" },
    { value: "newest" as SortOption, label: "Newest First" }
  ]

  const handleExpressInterest = (product: typeof allProducts[0]) => {
    console.log(`Expressed interest in ${product.name}`)
    setQuickViewProduct(null)
  }

  const handleCategoryClick = (categoryId: string) => {
    setSelectedMainCategory(categoryId)
    setSelectedSubCategory(null)
    setExpandedCategory(categoryId)
    setShowMobileFilters(false)
  }

  const handleSubCategoryClick = (subCat: string) => {
    setSelectedSubCategory(subCat)
    setShowMobileFilters(false)
  }

  const clearAllFilters = () => {
    setSelectedMainCategory("all")
    setSelectedSubCategory(null)
    setSearchQuery("")
    setShowFeaturedOnly(false)
    setSortBy("featured")
    setExpandedCategory("all")
  }

  // Sidebar Filter Component
  const FilterSidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={`${isMobile ? 'p-6' : 'sticky top-24 h-[calc(100vh-7rem)]'} flex flex-col`}>
      {/* Search in Sidebar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5D4037]/60" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-10 text-sm border-2 border-[#E85D75]/20 focus:border-[#E85D75] rounded-xl bg-white"
            style={{ fontFamily: "var(--font-body)" }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5D4037]/60 hover:text-[#E85D75] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-[#E85D75]/10">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#E85D75]" />
          <h3 className="font-bold text-lg text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
            Filters
          </h3>
        </div>
        {(selectedMainCategory !== "all" || selectedSubCategory || showFeaturedOnly || searchQuery) && (
          <button
            onClick={clearAllFilters}
            className="text-xs font-semibold text-[#E85D75] hover:text-[#E85D75]/80 transition-colors"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Scrollable Filter Content */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-6 scrollbar-thin">
        {/* Featured Only Toggle */}
        <div>
          <h4 className="text-sm font-bold text-[#2C2C2E] mb-3" style={{ fontFamily: "var(--font-accent)" }}>
            Quick Filters
          </h4>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all w-full ${
              showFeaturedOnly
                ? "bg-[#88A85D] text-white shadow-3d"
                : "bg-[#FAF0E6] text-[#5D4037] border border-[#E85D75]/20 hover:bg-[#88A85D]/10"
            }`}
            style={{ fontFamily: "var(--font-accent)" }}
          >
            <Leaf className="w-4 h-4" />
            Featured Only
          </motion.button>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-sm font-bold text-[#2C2C2E] mb-3" style={{ fontFamily: "var(--font-accent)" }}>
            Categories
          </h4>
          <div className="space-y-2">
            {mainCategories.map((category) => (
              <div key={category.id}>
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                    selectedMainCategory === category.id
                      ? "bg-[#E85D75] text-white shadow-3d"
                      : "bg-white text-[#5D4037] border border-[#E85D75]/20 hover:bg-[#E85D75]/5"
                  }`}
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  <div className="flex items-center gap-2">
                    <category.icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </div>
                  {category.id !== "all" && subCategories[category.id as keyof typeof subCategories] && (
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        expandedCategory === category.id ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </motion.button>

                {/* Sub-categories */}
                <AnimatePresence>
                  {selectedMainCategory === category.id && category.id !== "all" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-2 ml-6 space-y-1 overflow-hidden"
                    >
                      <button
                        onClick={() => setSelectedSubCategory(null)}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          !selectedSubCategory
                            ? "bg-[#F4A261] text-[#2C2C2E]"
                            : "text-[#5D4037] hover:bg-[#FAF0E6]"
                        }`}
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        All {category.name}
                      </button>
                      {subCategories[category.id as keyof typeof subCategories]?.map((subCat) => (
                        <button
                          key={subCat}
                          onClick={() => handleSubCategoryClick(subCat)}
                          className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedSubCategory === subCat
                              ? "bg-[#F4A261] text-[#2C2C2E]"
                              : "text-[#5D4037] hover:bg-[#FAF0E6]"
                          }`}
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {subCat}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {(selectedSubCategory || showFeaturedOnly) && (
          <div className="pt-4 border-t border-[#E85D75]/10">
            <h4 className="text-sm font-bold text-[#2C2C2E] mb-3" style={{ fontFamily: "var(--font-accent)" }}>
              Active Filters
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedSubCategory && (
                <Badge className="bg-[#F4A261] text-[#2C2C2E] flex items-center gap-1 pr-1">
                  {selectedSubCategory}
                  <button
                    onClick={() => setSelectedSubCategory(null)}
                    className="ml-1 hover:bg-[#2C2C2E]/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {showFeaturedOnly && (
                <Badge className="bg-[#88A85D] text-white flex items-center gap-1 pr-1">
                  Featured
                  <button
                    onClick={() => setShowFeaturedOnly(false)}
                    className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <Navigation />
      
      {/* Hero Section - Reduced Height */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-[#FAF0E6] via-[#FAFAF8] to-[#D4A5D4]/10 paper-texture relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.03, 0.06, 0.03],
              rotateZ: [0, 180, 360]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] rounded-full blur-3xl"
            style={{ background: "linear-gradient(135deg, #E85D75, #F4A261)" }}
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#E85D75]/10 text-[#E85D75] px-4 py-2 rounded-full mb-4 font-semibold text-sm border border-[#E85D75]/30 shadow-3d"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              <Package className="w-4 h-4" />
              {filteredProducts.length}+ Premium Products
            </motion.div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Explore Our <span className="text-[#E85D75]">Collection</span>
            </h1>
            <p className="text-lg text-[#5D4037]/80 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
              From health-focused bakery to traditional Indian delights, discover authentic flavors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content: Sidebar + Products */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Left Sidebar - Desktop */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="bg-white rounded-3xl shadow-3d border-2 border-[#E85D75]/10 p-6">
                <FilterSidebar />
              </div>
            </aside>

            {/* Mobile Filter Button */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
              <Button
                onClick={() => setShowMobileFilters(true)}
                className="bg-[#E85D75] hover:bg-[#E85D75]/90 text-white rounded-full shadow-3d px-6 py-6 font-bold"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
                {(selectedSubCategory || showFeaturedOnly) && (
                  <Badge className="ml-2 bg-white text-[#E85D75]">
                    {(selectedSubCategory ? 1 : 0) + (showFeaturedOnly ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
              {showMobileFilters && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="lg:hidden fixed inset-0 bg-black/50 z-50"
                    onClick={() => setShowMobileFilters(false)}
                  />
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", damping: 30 }}
                    className="lg:hidden fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 overflow-y-auto shadow-3d"
                  >
                    <div className="flex items-center justify-between p-6 border-b border-[#E85D75]/10">
                      <h2 className="text-xl font-black text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                        Filters
                      </h2>
                      <button
                        onClick={() => setShowMobileFilters(false)}
                        className="p-2 hover:bg-[#FAF0E6] rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <FilterSidebar isMobile />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Products Area */}
            <div className="flex-1 min-w-0">
              {/* Toolbar: Results, Sort, View Mode */}
              <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl p-4 border-2 border-[#E85D75]/10 shadow-3d">
                <div className="flex flex-col gap-1">
                  <p className="text-[#5D4037]/70 text-sm" style={{ fontFamily: "var(--font-body)" }}>
                    Showing <span className="font-bold text-[#E85D75]">{filteredProducts.length}</span> of <span className="font-bold">{allProducts.length}</span> products
                  </p>
                  {selectedSubCategory && (
                    <p className="text-xs text-[#5D4037]/50" style={{ fontFamily: "var(--font-body)" }}>
                      in {selectedSubCategory}
                    </p>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSortMenu(!showSortMenu)}
                      className="border-2 border-[#E85D75]/20 hover:border-[#E85D75] font-semibold rounded-xl"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      {sortOptions.find(opt => opt.value === sortBy)?.label}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                    
                    <AnimatePresence>
                      {showSortMenu && (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40"
                            onClick={() => setShowSortMenu(false)}
                          />
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-3d border-2 border-[#E85D75]/10 z-50 overflow-hidden"
                          >
                            {sortOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => {
                                  setSortBy(option.value)
                                  setShowSortMenu(false)
                                }}
                                className={`w-full text-left px-4 py-3 hover:bg-[#FAF0E6] transition-colors font-semibold text-sm ${
                                  sortBy === option.value ? "bg-[#E85D75]/10 text-[#E85D75]" : "text-[#5D4037]"
                                }`}
                                style={{ fontFamily: "var(--font-accent)" }}
                              >
                                {option.label}
                              </button>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-1 bg-[#FAF0E6] rounded-xl p-1">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "grid"
                          ? "bg-[#E85D75] text-white shadow-3d"
                          : "text-[#5D4037]/60 hover:text-[#E85D75]"
                      }`}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-all ${
                        viewMode === "list"
                          ? "bg-[#E85D75] text-white shadow-3d"
                          : "text-[#5D4037]/60 hover:text-[#E85D75]"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
              
              {/* Products Grid/List */}
              <AnimatePresence mode="wait">
                {filteredProducts.length > 0 ? (
                  <motion.div
                    key={`${selectedMainCategory}-${selectedSubCategory}-${viewMode}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={viewMode === "grid" 
                      ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-6 perspective-container"
                      : "space-y-6"
                    }
                  >
                    {filteredProducts.map((product, idx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        layout
                      >
                        {viewMode === "grid" ? (
                          /* Grid View with inline buttons */
                          <Card className="group overflow-hidden border-2 border-transparent hover:border-[#E85D75] transition-all duration-300 hover:shadow-3d h-full bg-white rounded-3xl card-3d">
                            <div className="relative h-64 overflow-hidden">
                              <Link href={`/products/${product.id}`} className="cursor-pointer">
                                <motion.img
                                  whileHover={{ scale: 1.15, rotateZ: 2 }}
                                  transition={{ duration: 0.5 }}
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                  style={{ transformStyle: "preserve-3d" }}
                                />
                              </Link>
                              <motion.div 
                                className="absolute top-4 right-4"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                              >
                                <Badge className="bg-[#F4A261] text-[#2C2C2E] font-bold border-0 shadow-3d" style={{ fontFamily: "var(--font-accent)" }}>
                                  {product.badge}
                                </Badge>
                              </motion.div>
                              {product.featured && (
                                <motion.div
                                  className="absolute top-4 left-4"
                                  whileHover={{ scale: 1.1, rotate: -5 }}
                                >
                                  <Badge className="bg-[#E85D75] text-white font-bold border-0 shadow-3d" style={{ fontFamily: "var(--font-accent)" }}>
                                    Featured
                                  </Badge>
                                </motion.div>
                              )}
                            </div>
                            
                            <div className="p-6">
                              <p className="text-xs text-[#88A85D] font-semibold mb-2 uppercase tracking-wide" style={{ fontFamily: "var(--font-accent)" }}>
                                {product.subCategory}
                              </p>
                              <Link href={`/products/${product.id}`} className="cursor-pointer">
                                <h3 className="text-lg font-bold mb-2 group-hover:text-[#E85D75] transition-colors text-[#2C2C2E] line-clamp-2" style={{ fontFamily: "var(--font-heading)" }}>
                                  {product.name}
                                </h3>
                              </Link>
                              
                              {/* Rating */}
                              <div className="flex items-center gap-2 mb-4">
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < Math.floor(product.rating)
                                          ? "fill-[#F4A261] text-[#F4A261]"
                                          : "text-[#E8E5E1]"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
                                  {product.rating} ({product.reviews})
                                </span>
                              </div>
                              
                              {/* Action Buttons Row - All Inline */}
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    handleExpressInterest(product)
                                  }}
                                  className="flex-1 bg-[#E85D75] hover:bg-[#E85D75]/90 text-white rounded-full btn-3d cursor-pointer"
                                  style={{ fontFamily: "var(--font-accent)" }}
                                >
                                  <Heart className="w-4 h-4 mr-2" />
                                  Interested
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setQuickViewProduct(product)
                                  }}
                                  className="border-2 border-[#E85D75]/20 hover:border-[#E85D75] hover:bg-[#E85D75]/5 text-[#E85D75] rounded-full cursor-pointer"
                                  style={{ fontFamily: "var(--font-accent)" }}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  asChild
                                  className="border-2 border-[#E85D75]/20 hover:border-[#E85D75] hover:bg-[#E85D75]/5 text-[#E85D75] rounded-full cursor-pointer"
                                  style={{ fontFamily: "var(--font-accent)" }}
                                >
                                  <Link href={`/products/${product.id}`}>
                                    <ExternalLink className="w-4 h-4" />
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ) : (
                          /* List View with Quick View & View Details */
                          <Card className="group overflow-hidden border-2 border-transparent hover:border-[#E85D75] transition-all duration-300 hover:shadow-3d bg-white rounded-3xl card-3d">
                            <div className="flex flex-col sm:flex-row gap-6 p-6">
                              <div className="relative w-full sm:w-48 h-48 flex-shrink-0 overflow-hidden rounded-2xl">
                                <Link href={`/products/${product.id}`} className="cursor-pointer">
                                  <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </Link>
                                <motion.div 
                                  className="absolute top-3 right-3"
                                  whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                  <Badge className="bg-[#F4A261] text-[#2C2C2E] font-bold border-0 shadow-3d text-xs" style={{ fontFamily: "var(--font-accent)" }}>
                                    {product.badge}
                                  </Badge>
                                </motion.div>
                                {product.featured && (
                                  <motion.div
                                    className="absolute top-3 left-3"
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                  >
                                    <Badge className="bg-[#E85D75] text-white font-bold border-0 shadow-3d text-xs" style={{ fontFamily: "var(--font-accent)" }}>
                                      Featured
                                    </Badge>
                                  </motion.div>
                                )}
                              </div>
                              
                              <div className="flex-1 flex flex-col">
                                <p className="text-xs text-[#88A85D] font-semibold mb-2 uppercase tracking-wide" style={{ fontFamily: "var(--font-accent)" }}>
                                  {product.subCategory}
                                </p>
                                <Link href={`/products/${product.id}`} className="cursor-pointer">
                                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#E85D75] transition-colors text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                                    {product.name}
                                  </h3>
                                </Link>
                                
                                {/* Rating */}
                                <div className="flex items-center gap-2 mb-4">
                                  <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < Math.floor(product.rating)
                                            ? "fill-[#F4A261] text-[#F4A261]"
                                            : "text-[#E8E5E1]"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
                                    {product.rating} ({product.reviews} reviews)
                                  </span>
                                </div>
                                
                                <div className="mt-auto flex flex-wrap gap-2">
                                  <Button 
                                    size="sm"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      handleExpressInterest(product)
                                    }}
                                    className="flex-1 min-w-[140px] bg-[#E85D75] hover:bg-[#E85D75]/90 text-white rounded-full btn-3d cursor-pointer"
                                    style={{ fontFamily: "var(--font-accent)" }}
                                  >
                                    <Heart className="w-4 h-4 mr-2" />
                                    I'm Interested
                                  </Button>
                                  <Button 
                                    size="sm"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      setQuickViewProduct(product)
                                    }}
                                    variant="outline"
                                    className="border-2 border-[#F4A261] text-[#F4A261] hover:bg-[#F4A261] hover:text-white rounded-full cursor-pointer"
                                    style={{ fontFamily: "var(--font-accent)" }}
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Quick View
                                  </Button>
                                  <Button 
                                    size="sm"
                                    variant="outline"
                                    className="border-2 border-[#E85D75] text-[#E85D75] hover:bg-[#E85D75] hover:text-white rounded-full cursor-pointer"
                                    style={{ fontFamily: "var(--font-accent)" }}
                                    asChild
                                  >
                                    <Link href={`/products/${product.id}`}>
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      View Details
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </Card>
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#E85D75]/10 mb-6">
                      <Search className="w-10 h-10 text-[#E85D75]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#2C2C2E] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                      No products found
                    </h3>
                    <p className="text-lg text-[#5D4037]/60 mb-6" style={{ fontFamily: "var(--font-body)" }}>
                      Try adjusting your filters or search terms
                    </p>
                    <Button
                      onClick={clearAllFilters}
                      className="bg-[#F4A261] hover:bg-[#E27D60] text-[#2C2C2E] font-bold rounded-full btn-3d cursor-pointer"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      Clear All Filters
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <Dialog open={!!quickViewProduct} onOpenChange={(open) => !open && setQuickViewProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-[#E85D75]/20">
          {quickViewProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                  {quickViewProduct.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-8 mt-4">
                {/* Product Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#FAF0E6] border-2 border-[#E85D75]/10">
                  <img
                    src={quickViewProduct.image}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-[#F4A261] text-[#2C2C2E] font-bold border-0 shadow-3d">
                    {quickViewProduct.badge}
                  </Badge>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                  <p className="text-sm text-[#88A85D] font-semibold mb-2 uppercase tracking-wide" style={{ fontFamily: "var(--font-accent)" }}>
                    {quickViewProduct.subCategory}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(quickViewProduct.rating)
                              ? "fill-[#F4A261] text-[#F4A261]"
                              : "text-[#E8E5E1]"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
                      {quickViewProduct.rating} ({quickViewProduct.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex-1">
                    <p className="text-[#5D4037]/80 leading-relaxed mb-6" style={{ fontFamily: "var(--font-body)" }}>
                      Discover the authentic taste and health benefits of our carefully crafted {quickViewProduct.name}. Made with premium ingredients and traditional recipes.
                    </p>

                    <div className="bg-[#FAF0E6] rounded-2xl p-4 mb-6">
                      <p className="text-sm text-[#5D4037]/70 mb-2 font-semibold" style={{ fontFamily: "var(--font-accent)" }}>
                        Category
                      </p>
                      <p className="text-[#2C2C2E] font-bold" style={{ fontFamily: "var(--font-body)" }}>
                        {quickViewProduct.subCategory}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <Button
                      size="lg"
                      onClick={() => handleExpressInterest(quickViewProduct)}
                      className="flex-1 bg-[#E85D75] hover:bg-[#E85D75]/90 text-white rounded-full btn-3d cursor-pointer"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      I'm Interested
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="border-2 border-[#E85D75] text-[#E85D75] hover:bg-[#E85D75] hover:text-white rounded-full cursor-pointer"
                      style={{ fontFamily: "var(--font-accent)" }}
                    >
                      <Link href={`/products/${quickViewProduct.id}`}>
                        <ExternalLink className="w-5 h-5 mr-2" />
                        Full Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}