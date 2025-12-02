"use client"

import { motion } from "framer-motion"
import { Package, ArrowRight, Clock, Home, ChevronRight, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Link from "next/link"
import Image from "next/image"

// Product Categories with all 63+ products - 2026 Trend Organization
const productCategories = [
  {
    id: "artisan-sourdough",
    name: "Artisan Sourdough Collection",
    icon: "🥖",
    trending: true,
    description: "Hand-crafted sourdough varieties - 2026's hottest bakery trend",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-photography-of-a-6fac158d-20251117130642.jpg",
    products: [
      { name: "Classic Sourdough", moq: "25 loaves", shelfLife: "5 days", packaging: "Paper bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-78855ffa-20251117132530.jpg" },
      { name: "Whole Wheat Sourdough", moq: "25 loaves", shelfLife: "5 days", packaging: "Paper bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-9327c574-20251117132527.jpg" },
      { name: "Rye Sourdough", moq: "25 loaves", shelfLife: "7 days", packaging: "Paper bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-949b8b98-20251117132530.jpg" },
      { name: "Jalapeño & Cheddar Sourdough", moq: "20 loaves", shelfLife: "4 days", packaging: "Paper bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-f1d5cbfb-20251117132530.jpg" }
    ]
  },
  {
    id: "premium-focaccia",
    name: "Gourmet Focaccia Range",
    icon: "🫓",
    trending: true,
    description: "Instagram-worthy focaccia art breads",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-gourmet-4e1ea738-20251117130642.jpg",
    products: [
      { name: "High Hydration Focaccia", moq: "30 pcs", shelfLife: "48 hours", packaging: "Food trays", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-8aad938f-20251117132530.jpg" },
      { name: "Olive & Italian Herbs Focaccia", moq: "30 pcs", shelfLife: "48 hours", packaging: "Food trays", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-282d4fe7-20251117132530.jpg" },
      { name: "Cherry Tomato & Rosemary Focaccia", moq: "30 pcs", shelfLife: "48 hours", packaging: "Food trays", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-df19ccd0-20251117132530.jpg" },
      { name: "Sun-Dried Tomato & Pesto Focaccia", moq: "25 pcs", shelfLife: "48 hours", packaging: "Food trays", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-f9a0f6ab-20251117132530.jpg" },
      { name: "Jalapeño & Cheddar Cheese Focaccia", moq: "25 pcs", shelfLife: "48 hours", packaging: "Food trays", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-aaaf50db-20251117132530.jpg" },
      { name: "Three Pepper Focaccia", moq: "30 pcs", shelfLife: "48 hours", packaging: "Food trays", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-ed2a2122-20251117132528.jpg" }
    ]
  },
  {
    id: "brioche-collection",
    name: "Premium Brioche Collection",
    icon: "🥐",
    trending: true,
    description: "French-style enriched breads for upscale menus",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-photography-of-p-56848cc2-20251117130642.jpg",
    products: [
      { name: "Brioche Loaf", moq: "20 loaves", shelfLife: "3 days", packaging: "Plastic wrap", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-860a3fb0-20251117132601.jpg" },
      { name: "Brioche Burger Bun", moq: "150 pcs", shelfLife: "3 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-ba4da57f-20251117132600.jpg" },
      { name: "Sweet Buns", moq: "100 pcs", shelfLife: "3 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-41867872-20251117132601.jpg" }
    ]
  },
  {
    id: "qsr-buns",
    name: "QSR Burger & Hot Dog Buns",
    icon: "🍔",
    description: "Restaurant-grade buns for high-volume operations",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-qsr-bur-6ba17a3b-20251117130642.jpg",
    products: [
      { name: "Sesame Burger Bun (White)", moq: "200 pcs", shelfLife: "3 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-ad6d7a77-20251117132600.jpg" },
      { name: "Sesame Burger Bun (Black)", moq: "200 pcs", shelfLife: "3 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-94ba1f38-20251117132600.jpg" },
      { name: "Multigrain Burger Bun", moq: "200 pcs", shelfLife: "4 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-cedf8b8b-20251117132600.jpg" },
      { name: "100% Wholewheat Burger Bun", moq: "200 pcs", shelfLife: "5 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-07b0b915-20251117132601.jpg" },
      { name: "Hot Dog Buns", moq: "150 pcs", shelfLife: "3 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-d85f09a5-20251117132601.jpg" },
      { name: "Ladi Pav", moq: "200 pcs", shelfLife: "2 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-882f4ff1-20251117132600.jpg" },
      { name: "Atta Pav", moq: "200 pcs", shelfLife: "3 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-28b56992-20251117132601.jpg" }
    ]
  },
  {
    id: "european-classics",
    name: "European Bakery Classics",
    icon: "🥖",
    description: "Traditional French & Italian favorites",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-photography-of-european-bre-8a8695c8-20251117130642.jpg",
    products: [
      { name: "French Baguette", moq: "50 pcs", shelfLife: "24 hours", packaging: "Food-grade paper", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-3991be67-20251117132631.jpg" },
      { name: "Ciabatta", moq: "30 pcs", shelfLife: "48 hours", packaging: "Breathable bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-3190a79e-20251117132631.jpg" }
    ]
  },
  {
    id: "panini-wraps",
    name: "Panini & Sandwich Breads",
    icon: "🥪",
    description: "Cafe and quick-service essentials",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-panini--2855745f-20251117130641.jpg",
    products: [
      { name: "Plain Panini", moq: "100 pcs", shelfLife: "3 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-6d37ee22-20251117132632.jpg" },
      { name: "Multigrain Panini", moq: "100 pcs", shelfLife: "4 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-2790ffc6-20251117132631.jpg" },
      { name: "Multigrain Wholewheat Panini", moq: "100 pcs", shelfLife: "5 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-b4bd1bbc-20251117132632.jpg" },
      { name: "Italian Herb Panini", moq: "80 pcs", shelfLife: "3 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-d2ae195a-20251117132632.jpg" },
      { name: "Olive & Herb Panini", moq: "80 pcs", shelfLife: "3 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-a9668097-20251117132632.jpg" },
      { name: "Cheddar Cheese Panini", moq: "80 pcs", shelfLife: "3 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-0f468c5b-20251117132632.jpg" },
      { name: "Parmesan Oregano Panini", moq: "80 pcs", shelfLife: "3 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-a2b4d368-20251117132632.jpg" }
    ]
  },
  {
    id: "pizza-bases",
    name: "Pizza & Flatbread Bases",
    icon: "🍕",
    description: "Professional pizza bases for pizzerias",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-photography-of-p-abee9677-20251117130641.jpg",
    products: [
      { name: "Pizza Base (Thick)", moq: "100 pcs", shelfLife: "7 days", packaging: "Sealed packs", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-a3774e3c-20251117132632.jpg" },
      { name: "Pizza Base (Thin)", moq: "100 pcs", shelfLife: "7 days", packaging: "Sealed packs", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-28e71c90-20251117132659.jpg" },
      { name: "100% Whole Wheat Pizza Base", moq: "80 pcs", shelfLife: "7 days", packaging: "Sealed packs", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-f831030a-20251117132700.jpg" },
      { name: "100% Ragi Pizza Base", moq: "60 pcs", shelfLife: "7 days", packaging: "Sealed packs", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-fc3cd976-20251117132700.jpg" },
      { name: "Neapolitan Style Pizza Base", moq: "80 pcs", shelfLife: "7 days", packaging: "Sealed packs", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-7e7b6d8a-20251117132700.jpg" },
      { name: "Gluten Free Pizza Base", moq: "50 pcs", shelfLife: "7 days", packaging: "Sealed packs", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-07aae011-20251117132659.jpg" }
    ]
  },
  {
    id: "middle-eastern",
    name: "Pita & Middle Eastern",
    icon: "🫔",
    description: "Authentic Middle Eastern breads",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-middle--ef1b762c-20251117130641.jpg",
    products: [
      { name: "Pita Bread", moq: "150 pcs", shelfLife: "5 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-c008db0d-20251117132702.jpg" },
      { name: "Pita Wrap", moq: "150 pcs", shelfLife: "5 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-3dfbb81e-20251117132700.jpg" },
      { name: "Wholewheat Pita Wrap", moq: "150 pcs", shelfLife: "6 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-ac498d36-20251117132700.jpg" },
      { name: "Pita Pockets", moq: "150 pcs", shelfLife: "5 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-e664b7bb-20251117132700.jpg" },
      { name: "Wholewheat Pita Bread", moq: "150 pcs", shelfLife: "6 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-ed8b262a-20251117132700.jpg" },
      { name: "Kuboos", moq: "150 pcs", shelfLife: "4 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-7399d619-20251117132735.jpg" },
      { name: "Doner Bread", moq: "100 pcs", shelfLife: "5 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-5436ba95-20251117132735.jpg" }
    ]
  },
  {
    id: "sliced-breads",
    name: "Sliced Sandwich Breads",
    icon: "🍞",
    description: "Pre-sliced convenience breads",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-photography-of-p-dfac8065-20251117130644.jpg",
    products: [
      { name: "100% Wholewheat Sliced", moq: "50 loaves", shelfLife: "5 days", packaging: "Plastic wrap", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-5b05ff9f-20251117132735.jpg" },
      { name: "Multigrain Sliced", moq: "50 loaves", shelfLife: "5 days", packaging: "Plastic wrap", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-2287f1b6-20251117132735.jpg" },
      { name: "Honey & Oat Sliced", moq: "40 loaves", shelfLife: "5 days", packaging: "Plastic wrap", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-7a79b902-20251117132735.jpg" },
      { name: "Garlic & Herbs Sliced", moq: "40 loaves", shelfLife: "4 days", packaging: "Plastic wrap", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-c221d846-20251117132735.jpg" },
      { name: "White Jumbo Sliced", moq: "40 loaves", shelfLife: "4 days", packaging: "Plastic wrap", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-b27cd46c-20251117132735.jpg" },
      { name: "Brown Jumbo Sliced", moq: "40 loaves", shelfLife: "5 days", packaging: "Plastic wrap", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-140b5719-20251117132735.jpg" },
      { name: "100% Wholewheat Jumbo", moq: "40 loaves", shelfLife: "6 days", packaging: "Plastic wrap", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-68d62536-20251117132735.jpg" },
      { name: "Multigrain Jumbo", moq: "40 loaves", shelfLife: "6 days", packaging: "Plastic wrap", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-90a3ff92-20251117132735.jpg" },
      { name: "Honey & Oat Jumbo", moq: "30 loaves", shelfLife: "5 days", packaging: "Plastic wrap", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-c35889e7-20251117132806.jpg" },
      { name: "Garlic & Herbs Jumbo", moq: "30 loaves", shelfLife: "5 days", packaging: "Plastic wrap", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-976283a9-20251117132806.jpg" }
    ]
  },
  {
    id: "indian-breads",
    name: "Indian Specialty Breads",
    icon: "🫓",
    description: "Traditional Indian flatbreads",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-indian--61e50b8c-20251117130641.jpg",
    products: [
      { name: "Atta Kulcha", moq: "100 pcs", shelfLife: "3 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-cc428c07-20251117132807.jpg" },
      { name: "Methi Kulcha", moq: "100 pcs", shelfLife: "3 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-9a65ac78-20251117132806.jpg" }
    ]
  },
  {
    id: "specialty-loaves",
    name: "Gourmet Loaves",
    icon: "🍞",
    description: "Premium specialty loaves",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-photography-of-g-ce235ade-20251117130643.jpg",
    products: [
      { name: "Plain Footlong", moq: "30 loaves", shelfLife: "3 days", packaging: "Paper bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-51d269c1-20251117132806.jpg" },
      { name: "Garlic Loaf", moq: "30 loaves", shelfLife: "48 hours", packaging: "Foil wrap", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-f2c4ff78-20251117132806.jpg" },
      { name: "Multigrain Loaf", moq: "25 loaves", shelfLife: "5 days", packaging: "Paper bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-006432ab-20251117132806.jpg" },
      { name: "Parmesan & Oregano Loaf", moq: "25 loaves", shelfLife: "3 days", packaging: "Paper bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-1a3792c9-20251117132806.jpg" },
      { name: "Honey & Oats Loaf", moq: "25 loaves", shelfLife: "5 days", packaging: "Paper bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-45cd4655-20251117132807.jpg" },
      { name: "Italian Herbs & Olives Loaf", moq: "20 loaves", shelfLife: "4 days", packaging: "Paper bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-24fb8a7c-20251117132806.jpg" },
      { name: "Gluten Free Loaf", moq: "20 loaves", shelfLife: "5 days", packaging: "Sealed wrap", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-04c8cb7e-20251117132832.jpg" },
      { name: "Cheese Bread", moq: "40 loaves", shelfLife: "3 days", packaging: "Paper bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-15f7dc1b-20251117132835.jpg" }
    ]
  },
  {
    id: "bagels",
    name: "New York Style Bagels",
    icon: "🥯",
    trending: true,
    description: "Boiled & baked authentic bagels",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-new-yor-d27967a3-20251117130645.jpg",
    products: [
      { name: "Plain Bagel", moq: "100 pcs", shelfLife: "4 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-9291224e-20251117132836.jpg" },
      { name: "Multigrain Bagel", moq: "100 pcs", shelfLife: "5 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-cf53989c-20251117132838.jpg" },
      { name: "Sesame Bagel", moq: "100 pcs", shelfLife: "4 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-0595490a-20251117132836.jpg" },
      { name: "Pumpkin Seed Bagel", moq: "80 pcs", shelfLife: "4 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-216b8fd4-20251117132837.jpg" },
      { name: "Garlic Bagel", moq: "80 pcs", shelfLife: "4 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-38b86c19-20251117132836.jpg" },
      { name: "Poppy Seed Bagel", moq: "80 pcs", shelfLife: "4 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-8b6b40c9-20251117132836.jpg" }
    ]
  },
  {
    id: "dinner-rolls",
    name: "Dinner Rolls & Bites",
    icon: "🥐",
    description: "Perfect for catering and events",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-photography-of-d-00996128-20251117130641.jpg",
    products: [
      { name: "Herb Dinner Rolls", moq: "150 pcs", shelfLife: "3 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-d85beaca-20251117132836.jpg" },
      { name: "Garlic Knots", moq: "100 pcs", shelfLife: "48 hours", packaging: "Food trays", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-8c4f4b38-20251117132836.jpg" },
      { name: "Bread Rolls", moq: "100 pcs", shelfLife: "3 days", packaging: "Plastic bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-b74de9df-20251117132906.jpg" },
      { name: "Sausage Rolls", moq: "50 pcs", shelfLife: "48 hours", packaging: "Food trays", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-1c407b66-20251117132907.jpg" },
      { name: "Kebab Rolls", moq: "50 pcs", shelfLife: "48 hours", packaging: "Food trays", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-b2af23ad-20251117132906.jpg" }
    ]
  },
  {
    id: "crackers-crostini",
    name: "Crackers & Crostini",
    icon: "🥨",
    description: "Crispy accompaniments",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-artisan-a13e008c-20251117130642.jpg",
    products: [
      { name: "Pesto Crostini", moq: "100 pcs", shelfLife: "30 days", packaging: "Sealed bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-ea2c1141-20251117132908.jpg" },
      { name: "Garlic & Herb Crostini", moq: "100 pcs", shelfLife: "30 days", packaging: "Sealed bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-c830e24e-20251117132907.jpg" },
      { name: "Piri Piri Crostini", moq: "100 pcs", shelfLife: "30 days", packaging: "Sealed bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-a35ebd41-20251117132903.jpg" },
      { name: "Tomato Crostini", moq: "100 pcs", shelfLife: "30 days", packaging: "Sealed bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-a3732bd5-20251117132907.jpg" },
      { name: "Soup Sticks", moq: "200 pcs", shelfLife: "30 days", packaging: "Sealed bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-d8ac16fd-20251117132907.jpg" },
      { name: "Marinara Crackers", moq: "150 pcs", shelfLife: "30 days", packaging: "Sealed bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-62b17f89-20251117132906.jpg" },
      { name: "Pepper Crackers", moq: "150 pcs", shelfLife: "30 days", packaging: "Sealed bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-e45ec980-20251117132907.jpg" },
      { name: "Piri Piri Lavaash", moq: "100 pcs", shelfLife: "30 days", packaging: "Sealed bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-059b2db4-20251117132927.jpg" },
      { name: "Sesame Lavaash", moq: "100 pcs", shelfLife: "30 days", packaging: "Sealed bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-a896ef5e-20251117132927.jpg" },
      { name: "Italian Herb Lavaash", moq: "100 pcs", shelfLife: "30 days", packaging: "Sealed bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-31e51754-20251117132925.jpg" },
      { name: "Ragi Crackers", moq: "100 pcs", shelfLife: "30 days", packaging: "Sealed bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-b67b4619-20251117132928.jpg" },
      { name: "Beetroot Lavaash", moq: "100 pcs", shelfLife: "30 days", packaging: "Sealed bags", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-commercial-product-photogra-c2b4c0b2-20251117132925.jpg" }
    ]
  }
]

export default function BreadWholesalePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Breadcrumb Navigation */}
      <section className="pt-32 pb-8 bg-[#FAFAF8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
            <Link href="/" className="hover:text-[#E85D75] transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/b2b-solutions" className="hover:text-[#E85D75] transition-colors">
              B2B Solutions
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#E85D75] font-semibold">Bread Wholesale</span>
          </div>
        </div>
      </section>

      {/* Page Title */}
      <section className="py-12 bg-[#FAFAF8]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-[#E85D75]/10 text-[#E85D75] px-4 py-2 rounded-full mb-4 font-semibold text-sm border border-[#E85D75]/30">
              <Package className="w-4 h-4" />
              Wholesale Catalog 2026
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Premium Bread Wholesale
            </h1>
            <p className="text-xl text-[#5D4037]/70 mb-4" style={{ fontFamily: "var(--font-body)" }}>
              Professional bread solutions for restaurants, cafes, hotels & food service businesses
            </p>
            <p className="text-lg text-[#5D4037]/60" style={{ fontFamily: "var(--font-body)" }}>
              <strong className="text-[#E85D75]">85+ Premium Varieties</strong> • FSSAI Certified • Daily Fresh Production
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Catalog - All Categories Open */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 max-w-7xl mx-auto">
            {productCategories.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-[#E8E5E1] pb-16 last:border-0"
              >
                {/* Category Header with Image */}
                <div className="mb-8">
                  <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center mb-6">
                    {/* Category Image */}
                    <div className="w-full lg:w-80 h-64 relative rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 320px"
                      />
                    </div>
                    
                    {/* Category Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-4xl">{category.icon}</div>
                        <h2 className="text-3xl sm:text-4xl font-black text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                          {category.name}
                        </h2>
                        {category.trending && (
                          <span className="bg-[#E85D75] text-white text-xs font-bold px-3 py-1 rounded-full">
                            TRENDING 2026
                          </span>
                        )}
                      </div>
                      <p className="text-lg text-[#5D4037]/70 mb-4" style={{ fontFamily: "var(--font-body)" }}>
                        {category.description}
                      </p>
                      <div className="inline-flex items-center gap-2 bg-[#88A85D]/10 text-[#88A85D] px-4 py-2 rounded-full text-sm font-semibold">
                        <Package className="w-4 h-4" />
                        {category.products.length} Products Available
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.products.map((product, pidx) => (
                    <motion.div
                      key={pidx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: pidx * 0.03 }}
                      className="group"
                    >
                      <Card className="p-6 bg-white border border-[#E8E5E1] hover:border-[#E85D75] hover:shadow-lg transition-all rounded-2xl h-full">
                        {/* Product Image - Now using unique image per product */}
                        <div className="aspect-square bg-[#FAFAF8] rounded-xl mb-4 flex items-center justify-center border border-[#E8E5E1] group-hover:border-[#E85D75] transition-colors relative overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          />
                        </div>
                        
                        <h3 className="font-bold text-[#2C2C2E] mb-3 text-lg group-hover:text-[#E85D75] transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                          {product.name}
                        </h3>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2 text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                            <Package className="w-4 h-4 text-[#88A85D] flex-shrink-0 mt-0.5" />
                            <span><strong>MOQ:</strong> {product.moq}</span>
                          </div>
                          <div className="flex items-start gap-2 text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                            <Clock className="w-4 h-4 text-[#F4A261] flex-shrink-0 mt-0.5" />
                            <span><strong>Shelf Life:</strong> {product.shelfLife}</span>
                          </div>
                          <div className="text-xs text-[#5D4037]/60 mt-2 pt-2 border-t border-[#E8E5E1]">
                            {product.packaging}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information Bar */}
      <section className="py-8 bg-[#FAF0E6] border-y border-[#E8E5E1]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-[#5D4037]">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#E85D75]" />
              <span className="font-semibold" style={{ fontFamily: "var(--font-body)" }}>+91 98765 43210</span>
            </div>
            <div className="w-px h-6 bg-[#E8E5E1]" />
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#E85D75]" />
              <span className="font-semibold" style={{ fontFamily: "var(--font-body)" }}>wholesale@geetato.com</span>
            </div>
            <div className="w-px h-6 bg-[#E8E5E1]" />
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#E85D75]" />
              <span className="font-semibold" style={{ fontFamily: "var(--font-body)" }}>Mumbai, India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Request Form */}
      <section id="quote" className="py-24 bg-gradient-to-br from-[#FAFAF8] to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                Request a <span className="text-[#E85D75]">Quote</span>
              </h2>
              <p className="text-xl text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                Fill out the form below and our B2B team will respond within 24 hours
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 lg:p-12 bg-white border-2 border-[#E8E5E1] rounded-3xl shadow-lg">
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                        Business Name <span className="text-[#E85D75]">*</span>
                      </label>
                      <Input 
                        placeholder="Your restaurant/hotel name"
                        className="h-12 rounded-xl border-[#E8E5E1] focus:border-[#E85D75]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                        Contact Person <span className="text-[#E85D75]">*</span>
                      </label>
                      <Input 
                        placeholder="Your name"
                        className="h-12 rounded-xl border-[#E8E5E1] focus:border-[#E85D75]"
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                        Email <span className="text-[#E85D75]">*</span>
                      </label>
                      <Input 
                        type="email"
                        placeholder="business@email.com"
                        className="h-12 rounded-xl border-[#E8E5E1] focus:border-[#E85D75]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                        Phone <span className="text-[#E85D75]">*</span>
                      </label>
                      <Input 
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="h-12 rounded-xl border-[#E8E5E1] focus:border-[#E85D75]"
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                        Business Type <span className="text-[#E85D75]">*</span>
                      </label>
                      <select className="w-full h-12 rounded-xl border border-[#E8E5E1] px-4 focus:border-[#E85D75] focus:outline-none focus:ring-2 focus:ring-[#E85D75]/20">
                        <option value="">Select...</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="hotel">Hotel</option>
                        <option value="cafe">Cafe/Bakery</option>
                        <option value="qsr">QSR Chain</option>
                        <option value="catering">Catering</option>
                        <option value="distributor">Distributor</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                        Monthly Volume <span className="text-[#E85D75]">*</span>
                      </label>
                      <Input 
                        placeholder="e.g., 5000 units"
                        className="h-12 rounded-xl border-[#E8E5E1] focus:border-[#E85D75]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                      Products of Interest <span className="text-[#E85D75]">*</span>
                    </label>
                    <Textarea 
                      placeholder="Which bread products are you interested in? e.g., Burger buns, Pizza bases, Baguettes..."
                      rows={3}
                      className="rounded-xl border-[#E8E5E1] focus:border-[#E85D75]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[#2C2C2E]" style={{ fontFamily: "var(--font-accent)" }}>
                      Additional Requirements
                    </label>
                    <Textarea 
                      placeholder="Custom packaging, delivery schedule, special dietary needs, etc..."
                      rows={4}
                      className="rounded-xl border-[#E8E5E1] focus:border-[#E85D75]"
                    />
                  </div>
                  
                  <Button 
                    size="lg"
                    className="w-full bg-[#E85D75] hover:bg-[#E85D75]/90 text-white font-bold h-14 shadow-lg rounded-xl group"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    Submit Quote Request
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <div className="flex items-center justify-center gap-6 pt-4 text-sm text-[#5D4037]/60">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#88A85D]" />
                      Free samples available
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#F4A261]" />
                      24-hour response time
                    </div>
                  </div>
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