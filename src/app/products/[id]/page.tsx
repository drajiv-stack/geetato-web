"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ArrowLeft, Heart, Share2, Star, Check, Leaf, Zap, Shield, MessageCircle, ZoomIn, ThumbsUp, TrendingUp, Award, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Link from "next/link"

const allProducts = [
  // Health-Focused Bakery - Sugar-Free Treats (1-15)
  { id: 1, name: "Stevia Cookie Pack", category: "Health-Focused Bakery", subCategory: "Sugar-Free Treats", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-sugar-f-a067a36f-20251104162057.jpg", badge: "Sugar-Free", featured: true, rating: 4.8, reviews: 234, description: "Delicious sugar-free cookies sweetened with stevia. Perfect for health-conscious snackers who don't want to compromise on taste.", nutrition: { servingSize: "3 cookies (45g)", calories: 180, protein: 6, carbs: 22, fat: 7, fiber: 3, sugar: 0 }, ingredients: ["Whole Wheat Flour", "Stevia Extract", "Butter", "Eggs", "Baking Powder", "Vanilla Extract", "Salt"], highlights: ["Zero Added Sugar", "Stevia Sweetened", "High in Fiber", "No Artificial Flavors", "Freshly Baked", "Diabetic-Friendly"], images: ["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-sugar-f-a067a36f-20251104162057.jpg", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },
  
  { id: 2, name: "Jaggery Energy Bites", category: "Health-Focused Bakery", subCategory: "Sugar-Free Treats", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-jaggery-3349bbdc-20251104162056.jpg", badge: "Natural", rating: 4.6, reviews: 189, description: "Power-packed energy bites made with jaggery and nuts. A natural source of energy that's both delicious and nutritious.", nutrition: { servingSize: "3 bites (40g)", calories: 190, protein: 5, carbs: 25, fat: 8, fiber: 4, sugar: 12 }, ingredients: ["Jaggery", "Almonds", "Cashews", "Dates", "Sesame Seeds", "Cardamom", "Ghee"], highlights: ["Natural Sweetener", "High Energy", "Rich in Iron", "Traditional Recipe", "No Refined Sugar", "Power-Packed"], images: ["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-jaggery-3349bbdc-20251104162056.jpg", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },
  
  { id: 3, name: "Sugar-Free Brownies", category: "Health-Focused Bakery", subCategory: "Sugar-Free Treats", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-sugar-f-003ad916-20251104162056.jpg", badge: "Best Seller", rating: 4.9, reviews: 567, description: "Rich, fudgy brownies without the guilt. Made with cocoa and natural sweeteners for a decadent treat.", nutrition: { servingSize: "1 brownie (50g)", calories: 210, protein: 8, carbs: 28, fat: 9, fiber: 5, sugar: 2 }, ingredients: ["Cocoa Powder", "Almond Flour", "Erythritol", "Eggs", "Coconut Oil", "Vanilla Extract", "Baking Powder"], highlights: ["Sugar-Free", "Rich Chocolate Flavor", "High Protein", "Keto-Friendly", "Gluten-Free Option", "Fudgy Texture"], images: ["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-sugar-f-003ad916-20251104162056.jpg", "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80"] },

  { id: 4, name: "Oat & Millet Cookies", category: "Health-Focused Bakery", subCategory: "High-Fiber Options", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-oat-and-b38ff104-20251104162058.jpg", badge: "High Fiber", rating: 4.7, reviews: 342, description: "Wholesome cookies packed with oats and millet. A crunchy, fiber-rich snack that keeps you satisfied.", nutrition: { servingSize: "3 cookies (45g)", calories: 200, protein: 7, carbs: 30, fat: 6, fiber: 6, sugar: 8 }, ingredients: ["Rolled Oats", "Millet Flour", "Whole Wheat Flour", "Honey", "Butter", "Eggs", "Cinnamon", "Baking Soda"], highlights: ["High Fiber", "Whole Grains", "Heart Healthy", "Natural Sweetness", "Crunchy Texture", "Ancient Grains"], images: ["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-oat-and-b38ff104-20251104162058.jpg", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },
  
  { id: 5, name: "Flax Seed Crackers", category: "Health-Focused Bakery", subCategory: "High-Fiber Options", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-flax-se-76663e90-20251104162137.jpg", badge: "Fiber Rich", featured: true, rating: 4.5, reviews: 278, description: "Crispy crackers loaded with flax seeds. Rich in omega-3 and perfect for healthy snacking.", nutrition: { servingSize: "10 crackers (30g)", calories: 150, protein: 6, carbs: 18, fat: 7, fiber: 5, sugar: 1 }, ingredients: ["Flax Seeds", "Whole Wheat Flour", "Sesame Seeds", "Olive Oil", "Sea Salt", "Herbs"], highlights: ["Omega-3 Rich", "High Fiber", "Vegan", "No Preservatives", "Crispy Texture", "Heart Healthy"], images: ["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-flax-se-76663e90-20251104162137.jpg", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80"] },

  { id: 6, name: "Oat Protein Bites", category: "Health-Focused Bakery", subCategory: "Protein-Rich Snacks", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-oat-pro-4f3ce1bc-20251104162056.jpg", badge: "New", rating: 5.0, reviews: 234, description: "Protein-rich oat bites perfect for post-workout recovery.", nutrition: { servingSize: "2 bites (40g)", calories: 220, protein: 15, carbs: 18, fat: 7, fiber: 4, sugar: 5 }, ingredients: ["Rolled Oats", "Whey Protein", "Peanut Butter", "Honey", "Chia Seeds", "Dark Chocolate Chips"], highlights: ["15g Protein", "Post-Workout", "Natural Energy", "No Artificial Sweeteners", "Satisfying", "Muscle Recovery"], images: ["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-oat-pro-4f3ce1bc-20251104162056.jpg", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  // Additional Products (7-63)
  { id: 7, name: "Almond Flour Muffins", category: "Health-Focused Bakery", subCategory: "Sugar-Free Treats", image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", badge: "Gluten-Free", rating: 4.7, reviews: 198, description: "Soft, fluffy muffins made with almond flour. Perfect for a guilt-free breakfast or snack.", nutrition: { servingSize: "1 muffin (60g)", calories: 195, protein: 7, carbs: 15, fat: 12, fiber: 4, sugar: 3 }, ingredients: ["Almond Flour", "Eggs", "Coconut Oil", "Stevia", "Baking Powder", "Vanilla", "Cinnamon"], highlights: ["Gluten-Free", "Low Carb", "High Protein", "Keto-Friendly", "Moist Texture", "No Refined Sugar"], images: ["https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 8, name: "Coconut Macaroons", category: "Health-Focused Bakery", subCategory: "Sugar-Free Treats", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80", badge: "Vegan", rating: 4.6, reviews: 156, description: "Chewy coconut macaroons sweetened naturally. A tropical treat that's both healthy and delicious.", nutrition: { servingSize: "2 macaroons (35g)", calories: 170, protein: 3, carbs: 20, fat: 9, fiber: 3, sugar: 8 }, ingredients: ["Shredded Coconut", "Coconut Oil", "Maple Syrup", "Vanilla Extract", "Sea Salt"], highlights: ["Vegan", "Gluten-Free", "Natural Sweetener", "Chewy Texture", "Tropical Flavor", "No Dairy"], images: ["https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 9, name: "Chia Seed Pudding Cups", category: "Health-Focused Bakery", subCategory: "High-Fiber Options", image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&q=80", badge: "Superfood", rating: 4.8, reviews: 289, description: "Creamy chia pudding packed with omega-3s. A perfect breakfast or dessert option.", nutrition: { servingSize: "1 cup (150g)", calories: 185, protein: 8, carbs: 24, fat: 8, fiber: 11, sugar: 10 }, ingredients: ["Chia Seeds", "Almond Milk", "Honey", "Vanilla", "Fresh Berries"], highlights: ["Omega-3 Rich", "High Fiber", "11g Fiber", "Vegan Option", "Superfood", "Creamy Texture"], images: ["https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 10, name: "Quinoa Breakfast Bars", category: "Ancient Grains Collection", subCategory: "Energy Bars", image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80", badge: "Complete Protein", rating: 4.9, reviews: 412, description: "Nutrient-dense breakfast bars with quinoa and nuts. Start your day with complete protein.", nutrition: { servingSize: "1 bar (55g)", calories: 225, protein: 9, carbs: 28, fat: 9, fiber: 5, sugar: 12 }, ingredients: ["Quinoa", "Almonds", "Dates", "Honey", "Pumpkin Seeds", "Coconut", "Vanilla"], highlights: ["Complete Protein", "Ancient Grain", "Energy Boost", "High Fiber", "Natural Sweetener", "Grab-and-Go"], images: ["https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 11, name: "Ragi Cookies", category: "Ancient Grains Collection", subCategory: "Traditional Snacks", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-rich-ra-a9b6abe8-20251104163351.jpg", badge: "Calcium Rich", rating: 4.7, reviews: 324, description: "Traditional ragi cookies rich in calcium. A healthy twist on classic cookies.", nutrition: { servingSize: "3 cookies (45g)", calories: 190, protein: 6, carbs: 26, fat: 7, fiber: 4, sugar: 9 }, ingredients: ["Ragi Flour", "Whole Wheat Flour", "Jaggery", "Ghee", "Cardamom", "Cashews"], highlights: ["High Calcium", "Traditional Recipe", "Finger Millet", "Natural Sweetener", "Iron Rich", "Ancient Grain"], images: ["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-rich-ra-a9b6abe8-20251104163351.jpg", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 12, name: "Amaranth Energy Balls", category: "Ancient Grains Collection", subCategory: "Energy Boosters", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-freshly-94dc6b3d-20251104165350.jpg", badge: "Superfood", rating: 4.8, reviews: 267, description: "Power-packed amaranth balls for sustained energy. Perfect pre or post-workout snack.", nutrition: { servingSize: "3 balls (40g)", calories: 205, protein: 8, carbs: 23, fat: 9, fiber: 5, sugar: 11 }, ingredients: ["Puffed Amaranth", "Dates", "Almond Butter", "Chia Seeds", "Honey", "Dark Chocolate"], highlights: ["Superfood", "High Protein", "Energy Boost", "Ancient Grain", "Pre-Workout", "No Refined Sugar"], images: ["https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-freshly-94dc6b3d-20251104165350.jpg", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

// Continue with products 13-63...
  { id: 13, name: "Buckwheat Pancake Mix", category: "Ancient Grains Collection", subCategory: "Breakfast Options", image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80", badge: "Gluten-Free", rating: 4.6, reviews: 198, description: "Easy-to-make buckwheat pancake mix. Fluffy, nutritious, and naturally gluten-free.", nutrition: { servingSize: "2 pancakes (80g)", calories: 240, protein: 9, carbs: 35, fat: 7, fiber: 6, sugar: 8 }, ingredients: ["Buckwheat Flour", "Almond Flour", "Baking Powder", "Cinnamon", "Sea Salt"], highlights: ["Gluten-Free", "Ancient Grain", "High Fiber", "Quick Breakfast", "No Additives", "Family Favorite"], images: ["https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 14, name: "Spelt Flour Bread", category: "Ancient Grains Collection", subCategory: "Artisan Breads", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80", badge: "Artisan", rating: 4.9, reviews: 445, description: "Handcrafted spelt bread with a nutty flavor. Ancient grain goodness in every slice.", nutrition: { servingSize: "2 slices (60g)", calories: 180, protein: 7, carbs: 32, fat: 3, fiber: 5, sugar: 2 }, ingredients: ["Spelt Flour", "Whole Wheat Flour", "Yeast", "Honey", "Olive Oil", "Sea Salt"], highlights: ["Ancient Grain", "Artisan Baked", "High Fiber", "Nutty Flavor", "Fresh Daily", "Traditional Method"], images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 15, name: "Sorghum Crackers", category: "Ancient Grains Collection", subCategory: "Savory Snacks", image: "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", badge: "Gluten-Free", rating: 4.5, reviews: 178, description: "Crunchy sorghum crackers with herbs. A gluten-free ancient grain snack.", nutrition: { servingSize: "10 crackers (30g)", calories: 145, protein: 5, carbs: 22, fat: 5, fiber: 4, sugar: 1 }, ingredients: ["Sorghum Flour", "Olive Oil", "Rosemary", "Thyme", "Sea Salt", "Garlic Powder"], highlights: ["Gluten-Free", "Ancient Grain", "Herb Seasoned", "Crunchy", "Savory", "Perfect for Dips"], images: ["https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 16, name: "Peanut Butter Protein Cookies", category: "Health-Focused Bakery", subCategory: "Protein-Rich Snacks", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80", badge: "12g Protein", rating: 4.8, reviews: 356, description: "Delicious peanut butter cookies packed with protein. Perfect post-workout treat.", nutrition: { servingSize: "2 cookies (50g)", calories: 230, protein: 12, carbs: 20, fat: 11, fiber: 3, sugar: 6 }, ingredients: ["Peanut Butter", "Whey Protein", "Oats", "Honey", "Eggs", "Dark Chocolate Chips"], highlights: ["12g Protein", "Post-Workout", "Peanut Butter", "Energy Boost", "No Refined Sugar", "Satisfying"], images: ["https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 17, name: "Cashew Butter Bars", category: "Health-Focused Bakery", subCategory: "Protein-Rich Snacks", image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", badge: "High Protein", rating: 4.7, reviews: 289, description: "Creamy cashew butter bars with a protein boost. A luxurious healthy snack.", nutrition: { servingSize: "1 bar (45g)", calories: 215, protein: 10, carbs: 18, fat: 12, fiber: 4, sugar: 7 }, ingredients: ["Cashew Butter", "Protein Powder", "Oats", "Honey", "Coconut", "Vanilla"], highlights: ["High Protein", "Creamy Texture", "Energy Boost", "Natural Ingredients", "Satisfying", "No Additives"], images: ["https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 18, name: "Hemp Seed Energy Bites", category: "Health-Focused Bakery", subCategory: "Protein-Rich Snacks", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80", badge: "Complete Protein", rating: 4.9, reviews: 423, description: "Nutrient-dense energy bites with hemp seeds. Complete protein in every bite.", nutrition: { servingSize: "3 bites (40g)", calories: 200, protein: 11, carbs: 17, fat: 10, fiber: 5, sugar: 8 }, ingredients: ["Hemp Seeds", "Dates", "Almond Butter", "Cacao Nibs", "Chia Seeds", "Maple Syrup"], highlights: ["Complete Protein", "Omega-3", "Energy Boost", "Superfood", "Vegan", "No Refined Sugar"], images: ["https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 19, name: "Spirulina Power Balls", category: "Health-Focused Bakery", subCategory: "Protein-Rich Snacks", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80", badge: "Superfood", rating: 4.6, reviews: 234, description: "Green superfood power balls with spirulina. Maximum nutrition in minimum calories.", nutrition: { servingSize: "3 balls (35g)", calories: 175, protein: 10, carbs: 19, fat: 7, fiber: 4, sugar: 9 }, ingredients: ["Spirulina", "Dates", "Cashews", "Coconut", "Chia Seeds", "Vanilla"], highlights: ["Superfood", "High Protein", "Nutrient Dense", "Energy Boost", "Vegan", "Iron Rich"], images: ["https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 20, name: "Chickpea Flour Crackers", category: "Health-Focused Bakery", subCategory: "Protein-Rich Snacks", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", badge: "High Protein", rating: 4.7, reviews: 267, description: "Savory chickpea crackers rich in protein. A crunchy, satisfying snack.", nutrition: { servingSize: "8 crackers (30g)", calories: 155, protein: 9, carbs: 18, fat: 6, fiber: 5, sugar: 1 }, ingredients: ["Chickpea Flour", "Olive Oil", "Cumin", "Turmeric", "Sea Salt", "Black Pepper"], highlights: ["High Protein", "9g Protein", "Savory", "Indian Spices", "Gluten-Free", "Crunchy"], images: ["https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  // Continue with more products...
  { id: 21, name: "Date & Walnut Energy Bars", category: "Energy Boosters", subCategory: "On-the-Go", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80", badge: "Energy", rating: 4.8, reviews: 389, description: "Natural energy bars with dates and walnuts. Perfect for active lifestyles.", nutrition: { servingSize: "1 bar (50g)", calories: 220, protein: 6, carbs: 28, fat: 10, fiber: 5, sugar: 18 }, ingredients: ["Dates", "Walnuts", "Almonds", "Oats", "Cinnamon", "Sea Salt"], highlights: ["Natural Energy", "No Added Sugar", "Omega-3", "High Fiber", "Quick Energy", "Portable"], images: ["https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 22, name: "Banana Oat Breakfast Cookies", category: "Energy Boosters", subCategory: "Morning Fuel", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80", badge: "Breakfast", rating: 4.9, reviews: 512, description: "Soft breakfast cookies with banana and oats. Start your day right.", nutrition: { servingSize: "2 cookies (60g)", calories: 210, protein: 6, carbs: 32, fat: 7, fiber: 5, sugar: 14 }, ingredients: ["Ripe Bananas", "Rolled Oats", "Almond Butter", "Honey", "Cinnamon", "Raisins"], highlights: ["Breakfast Ready", "Natural Sweetener", "Quick Fuel", "Kid-Friendly", "No Refined Sugar", "Soft Texture"], images: ["https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 23, name: "Trail Mix Energy Bites", category: "Energy Boosters", subCategory: "Pre-Workout", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80", badge: "Pre-Workout", rating: 4.7, reviews: 334, description: "Portable energy bites packed with trail mix goodness. Fuel your adventures.", nutrition: { servingSize: "3 bites (40g)", calories: 195, protein: 7, carbs: 22, fat: 9, fiber: 4, sugar: 12 }, ingredients: ["Mixed Nuts", "Dried Cranberries", "Sunflower Seeds", "Honey", "Oats", "Dark Chocolate"], highlights: ["Pre-Workout", "Trail Mix", "Energy Boost", "Portable", "Natural Ingredients", "Adventure Fuel"], images: ["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 24, name: "Matcha Energy Cookies", category: "Energy Boosters", subCategory: "Focus Snacks", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", badge: "Focus", rating: 4.6, reviews: 267, description: "Green tea matcha cookies for sustained energy and focus. Natural caffeine boost.", nutrition: { servingSize: "2 cookies (45g)", calories: 185, protein: 5, carbs: 24, fat: 8, fiber: 3, sugar: 10 }, ingredients: ["Matcha Powder", "Almond Flour", "Coconut Sugar", "Coconut Oil", "Vanilla", "White Chocolate"], highlights: ["Natural Caffeine", "Focus Boost", "Antioxidants", "Sustained Energy", "Green Tea", "Unique Flavor"], images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 25, name: "Coffee Protein Bars", category: "Energy Boosters", subCategory: "Morning Fuel", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80", badge: "Caffeine", rating: 4.8, reviews: 401, description: "Protein bars infused with coffee. Your morning coffee and protein in one.", nutrition: { servingSize: "1 bar (50g)", calories: 225, protein: 13, carbs: 22, fat: 9, fiber: 4, sugar: 8 }, ingredients: ["Whey Protein", "Coffee Extract", "Oats", "Almond Butter", "Dark Chocolate", "Honey"], highlights: ["Caffeine Boost", "13g Protein", "Coffee Flavor", "Morning Fuel", "Energy & Protein", "Convenient"], images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  // Vegan Options (26-35)
  { id: 26, name: "Vegan Chocolate Chip Cookies", category: "Vegan Options", subCategory: "Plant-Based Treats", image: "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", badge: "Vegan", rating: 4.9, reviews: 478, description: "Classic chocolate chip cookies, completely plant-based. Indulgence without compromise.", nutrition: { servingSize: "3 cookies (45g)", calories: 200, protein: 4, carbs: 26, fat: 9, fiber: 3, sugar: 12 }, ingredients: ["Whole Wheat Flour", "Coconut Oil", "Coconut Sugar", "Flax Eggs", "Vegan Chocolate Chips", "Vanilla"], highlights: ["100% Vegan", "Plant-Based", "Dairy-Free", "Classic Flavor", "No Eggs", "Delicious"], images: ["https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 27, name: "Raw Cacao Bliss Balls", category: "Vegan Options", subCategory: "Plant-Based Treats", image: "https://images.unsplash.com/photo-1581894158358-5ecd2c518883?w=800&q=80", badge: "Raw", rating: 4.7, reviews: 356, description: "Raw cacao energy balls. Pure plant power with rich chocolate flavor.", nutrition: { servingSize: "3 balls (40g)", calories: 190, protein: 6, carbs: 21, fat: 9, fiber: 5, sugar: 13 }, ingredients: ["Raw Cacao", "Medjool Dates", "Cashews", "Coconut", "Cacao Nibs", "Maple Syrup"], highlights: ["Raw Vegan", "Antioxidant Rich", "No Baking", "Energy Boost", "Plant-Based", "Rich Chocolate"], images: ["https://images.unsplash.com/photo-1581894158358-5ecd2c518883?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 28, name: "Almond Flour Vegan Muffins", category: "Vegan Options", subCategory: "Plant-Based Treats", image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", badge: "Gluten-Free Vegan", rating: 4.8, reviews: 389, description: "Light and fluffy vegan muffins. Perfect for breakfast or snack time.", nutrition: { servingSize: "1 muffin (65g)", calories: 205, protein: 6, carbs: 24, fat: 10, fiber: 4, sugar: 11 }, ingredients: ["Almond Flour", "Coconut Milk", "Flax Eggs", "Coconut Sugar", "Baking Powder", "Vanilla"], highlights: ["Vegan", "Gluten-Free", "Fluffy Texture", "Plant-Based", "No Dairy", "Breakfast Ready"], images: ["https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 29, name: "Tahini Date Cookies", category: "Vegan Options", subCategory: "Plant-Based Treats", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80", badge: "Middle Eastern", rating: 4.6, reviews: 234, description: "Exotic tahini cookies sweetened with dates. A unique Middle Eastern treat.", nutrition: { servingSize: "3 cookies (45g)", calories: 195, protein: 5, carbs: 23, fat: 10, fiber: 4, sugar: 14 }, ingredients: ["Tahini", "Dates", "Whole Wheat Flour", "Coconut Oil", "Cardamom", "Pistachios"], highlights: ["Vegan", "Middle Eastern", "Tahini", "Date Sweetened", "Unique Flavor", "Plant-Based"], images: ["https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 30, name: "Coconut Flour Pancake Mix", category: "Vegan Options", subCategory: "Plant-Based Breakfast", image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80", badge: "Vegan & Paleo", rating: 4.9, reviews: 467, description: "Easy vegan pancake mix with coconut flour. Fluffy pancakes in minutes.", nutrition: { servingSize: "3 pancakes (90g)", calories: 215, protein: 7, carbs: 28, fat: 9, fiber: 7, sugar: 8 }, ingredients: ["Coconut Flour", "Flax Seeds", "Baking Powder", "Coconut Sugar", "Cinnamon", "Sea Salt"], highlights: ["Vegan", "Paleo-Friendly", "High Fiber", "Gluten-Free", "Quick Prep", "Fluffy"], images: ["https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 31, name: "Sunflower Seed Butter Bars", category: "Vegan Options", subCategory: "Plant-Based Treats", image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", badge: "Nut-Free Vegan", rating: 4.7, reviews: 312, description: "Creamy sunflower seed butter bars. Nut-free and completely plant-based.", nutrition: { servingSize: "1 bar (50g)", calories: 210, protein: 8, carbs: 24, fat: 10, fiber: 4, sugar: 10 }, ingredients: ["Sunflower Seed Butter", "Oats", "Maple Syrup", "Coconut Oil", "Vanilla", "Sea Salt"], highlights: ["Vegan", "Nut-Free", "Allergy-Friendly", "Plant Protein", "Creamy", "School-Safe"], images: ["https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 32, name: "Chickpea Blondies", category: "Vegan Options", subCategory: "Plant-Based Treats", image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", badge: "High Protein Vegan", rating: 4.8, reviews: 389, description: "Fudgy blondies made with chickpeas. Secret ingredient, amazing taste.", nutrition: { servingSize: "1 blondie (55g)", calories: 195, protein: 9, carbs: 26, fat: 7, fiber: 5, sugar: 12 }, ingredients: ["Chickpeas", "Almond Butter", "Maple Syrup", "Vanilla", "Baking Powder", "Vegan Chocolate Chips"], highlights: ["Vegan", "High Protein", "Gluten-Free", "Secret Ingredient", "Fudgy", "Plant-Based"], images: ["https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 33, name: "Pumpkin Spice Energy Bites", category: "Vegan Options", subCategory: "Plant-Based Treats", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80", badge: "Seasonal", rating: 4.9, reviews: 423, description: "Autumn-inspired pumpkin spice bites. Warm spices and natural sweetness.", nutrition: { servingSize: "3 bites (40g)", calories: 185, protein: 5, carbs: 23, fat: 8, fiber: 4, sugar: 13 }, ingredients: ["Pumpkin Puree", "Dates", "Oats", "Pumpkin Spice", "Maple Syrup", "Pecans"], highlights: ["Vegan", "Seasonal Flavor", "Pumpkin Spice", "Cozy Treat", "Plant-Based", "Fall Favorite"], images: ["https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 34, name: "Lemon Poppy Seed Muffins", category: "Vegan Options", subCategory: "Plant-Based Breakfast", image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", badge: "Citrus Fresh", rating: 4.7, reviews: 298, description: "Bright and zesty vegan muffins. Perfect morning pick-me-up.", nutrition: { servingSize: "1 muffin (60g)", calories: 190, protein: 4, carbs: 28, fat: 7, fiber: 3, sugar: 13 }, ingredients: ["Whole Wheat Flour", "Almond Milk", "Lemon Juice", "Poppy Seeds", "Coconut Oil", "Maple Syrup"], highlights: ["Vegan", "Citrus Fresh", "Morning Boost", "Plant-Based", "Zesty", "Refreshing"], images: ["https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 35, name: "Black Bean Brownies", category: "Vegan Options", subCategory: "Plant-Based Treats", image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", badge: "Fudgy Vegan", rating: 4.8, reviews: 445, description: "Ultra-fudgy brownies with a secret: black beans! You'll never guess.", nutrition: { servingSize: "1 brownie (55g)", calories: 175, protein: 7, carbs: 24, fat: 6, fiber: 6, sugar: 12 }, ingredients: ["Black Beans", "Cocoa Powder", "Maple Syrup", "Coconut Oil", "Vanilla", "Baking Powder"], highlights: ["Vegan", "High Protein", "High Fiber", "Fudgy", "Secret Ingredient", "Plant-Based"], images: ["https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  // Gluten-Free Range (36-45)
  { id: 36, name: "Almond Flour Sandwich Bread", category: "Gluten-Free Range", subCategory: "Daily Essentials", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80", badge: "Gluten-Free", rating: 4.9, reviews: 589, description: "Soft sandwich bread made with almond flour. Perfect for daily use.", nutrition: { servingSize: "2 slices (70g)", calories: 210, protein: 9, carbs: 12, fat: 14, fiber: 5, sugar: 2 }, ingredients: ["Almond Flour", "Eggs", "Psyllium Husk", "Baking Powder", "Apple Cider Vinegar", "Sea Salt"], highlights: ["Gluten-Free", "Low Carb", "High Protein", "Soft Texture", "Sandwich Ready", "Daily Essential"], images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 37, name: "Coconut Flour Brownies", category: "Gluten-Free Range", subCategory: "Sweet Treats", image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", badge: "Paleo", rating: 4.8, reviews: 467, description: "Rich, fudgy brownies with coconut flour. Paleo and gluten-free.", nutrition: { servingSize: "1 brownie (50g)", calories: 185, protein: 6, carbs: 18, fat: 11, fiber: 6, sugar: 10 }, ingredients: ["Coconut Flour", "Cocoa Powder", "Eggs", "Coconut Oil", "Honey", "Vanilla"], highlights: ["Gluten-Free", "Paleo", "High Fiber", "Fudgy", "Natural Sweetener", "Rich Chocolate"], images: ["https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 38, name: "Rice Flour Pizza Base", category: "Gluten-Free Range", subCategory: "Meal Bases", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80", badge: "Versatile", rating: 4.7, reviews: 378, description: "Crispy pizza base made with rice flour. Your gluten-free pizza dreams come true.", nutrition: { servingSize: "1 base (120g)", calories: 280, protein: 6, carbs: 52, fat: 5, fiber: 3, sugar: 2 }, ingredients: ["Rice Flour", "Tapioca Starch", "Psyllium Husk", "Olive Oil", "Yeast", "Sea Salt"], highlights: ["Gluten-Free", "Crispy", "Pizza Ready", "Versatile", "Easy to Top", "Family Favorite"], images: ["https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 39, name: "Cassava Flour Tortillas", category: "Gluten-Free Range", subCategory: "Meal Bases", image: "https://images.unsplash.com/photo-1614777735430-7e562d1e7774?w=800&q=80", badge: "Grain-Free", rating: 4.9, reviews: 512, description: "Soft, pliable tortillas from cassava flour. Perfect for tacos and wraps.", nutrition: { servingSize: "2 tortillas (60g)", calories: 195, protein: 2, carbs: 38, fat: 4, fiber: 2, sugar: 1 }, ingredients: ["Cassava Flour", "Water", "Olive Oil", "Sea Salt"], highlights: ["Gluten-Free", "Grain-Free", "Paleo", "Soft & Pliable", "Taco Ready", "Simple Ingredients"], images: ["https://images.unsplash.com/photo-1614777735430-7e562d1e7774?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 40, name: "Oat Flour Banana Bread", category: "Gluten-Free Range", subCategory: "Sweet Breads", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80", badge: "Naturally Sweet", rating: 4.8, reviews: 445, description: "Moist banana bread with oat flour. Naturally sweetened and delicious.", nutrition: { servingSize: "1 slice (75g)", calories: 220, protein: 6, carbs: 35, fat: 7, fiber: 5, sugar: 15 }, ingredients: ["Oat Flour", "Ripe Bananas", "Eggs", "Honey", "Coconut Oil", "Baking Soda"], highlights: ["Gluten-Free", "Naturally Sweet", "Moist", "High Fiber", "Banana Bread", "Comfort Food"], images: ["https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 41, name: "Quinoa Flour Muffins", category: "Gluten-Free Range", subCategory: "Breakfast Options", image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", badge: "Complete Protein", rating: 4.7, reviews: 356, description: "Protein-packed muffins with quinoa flour. A nutritious breakfast option.", nutrition: { servingSize: "1 muffin (65g)", calories: 205, protein: 8, carbs: 28, fat: 7, fiber: 4, sugar: 11 }, ingredients: ["Quinoa Flour", "Eggs", "Maple Syrup", "Coconut Oil", "Blueberries", "Baking Powder"], highlights: ["Gluten-Free", "Complete Protein", "Ancient Grain", "High Protein", "Breakfast Ready", "Nutritious"], images: ["https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 42, name: "Teff Flour Pancakes", category: "Gluten-Free Range", subCategory: "Breakfast Options", image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80", badge: "Ethiopian Superfood", rating: 4.9, reviews: 423, description: "Nutrient-dense pancakes with teff flour. An ancient Ethiopian superfood.", nutrition: { servingSize: "3 pancakes (90g)", calories: 235, protein: 9, carbs: 38, fat: 6, fiber: 7, sugar: 9 }, ingredients: ["Teff Flour", "Eggs", "Milk", "Honey", "Baking Powder", "Vanilla"], highlights: ["Gluten-Free", "Ancient Grain", "High Fiber", "Iron Rich", "Superfood", "Nutritious"], images: ["https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 43, name: "Chickpea Flour Flatbread", category: "Gluten-Free Range", subCategory: "Meal Bases", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80", badge: "High Protein", rating: 4.8, reviews: 389, description: "Savory flatbread rich in protein. Perfect with curries and dips.", nutrition: { servingSize: "1 flatbread (80g)", calories: 220, protein: 12, carbs: 28, fat: 7, fiber: 6, sugar: 2 }, ingredients: ["Chickpea Flour", "Water", "Olive Oil", "Cumin", "Turmeric", "Sea Salt"], highlights: ["Gluten-Free", "High Protein", "Indian Inspired", "Savory", "Versatile", "Curry Ready"], images: ["https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 44, name: "Hazelnut Flour Cake", category: "Gluten-Free Range", subCategory: "Sweet Treats", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80", badge: "Luxurious", rating: 4.9, reviews: 501, description: "Decadent cake made with hazelnut flour. A luxurious gluten-free treat.", nutrition: { servingSize: "1 slice (70g)", calories: 245, protein: 7, carbs: 20, fat: 16, fiber: 4, sugar: 14 }, ingredients: ["Hazelnut Flour", "Eggs", "Dark Chocolate", "Honey", "Butter", "Vanilla"], highlights: ["Gluten-Free", "Luxurious", "Rich Flavor", "Decadent", "Special Occasion", "Nut-Based"], images: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 45, name: "Millet Flour Cookies", category: "Gluten-Free Range", subCategory: "Sweet Treats", image: "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", badge: "Ancient Grain", rating: 4.7, reviews: 334, description: "Crunchy cookies with millet flour. Traditional and gluten-free.", nutrition: { servingSize: "3 cookies (45g)", calories: 195, protein: 5, carbs: 27, fat: 8, fiber: 4, sugar: 10 }, ingredients: ["Millet Flour", "Coconut Sugar", "Butter", "Eggs", "Vanilla", "Baking Soda"], highlights: ["Gluten-Free", "Ancient Grain", "Crunchy", "Traditional", "Nutritious", "Simple Ingredients"], images: ["https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  // Kids' Healthy Treats (46-55)
  { id: 46, name: "Mini Banana Muffins", category: "Kids' Healthy Treats", subCategory: "Lunchbox Favorites", image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", badge: "Kid-Approved", rating: 5.0, reviews: 678, description: "Bite-sized banana muffins kids love. Perfect for lunchboxes.", nutrition: { servingSize: "3 mini muffins (45g)", calories: 165, protein: 4, carbs: 28, fat: 5, fiber: 3, sugar: 13 }, ingredients: ["Ripe Bananas", "Whole Wheat Flour", "Eggs", "Honey", "Coconut Oil", "Cinnamon"], highlights: ["Kid-Friendly", "No Refined Sugar", "Mini Size", "Lunchbox Perfect", "Naturally Sweet", "School-Safe"], images: ["https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 47, name: "Apple Cinnamon Oat Bars", category: "Kids' Healthy Treats", subCategory: "Lunchbox Favorites", image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", badge: "No Added Sugar", rating: 4.9, reviews: 589, description: "Soft oat bars with real apple chunks. Naturally sweetened and delicious.", nutrition: { servingSize: "1 bar (50g)", calories: 185, protein: 4, carbs: 30, fat: 6, fiber: 4, sugar: 14 }, ingredients: ["Rolled Oats", "Fresh Apples", "Applesauce", "Cinnamon", "Honey", "Raisins"], highlights: ["Kid-Friendly", "Real Fruit", "No Added Sugar", "Soft Texture", "Apple Cinnamon", "Wholesome"], images: ["https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 48, name: "Peanut Butter Banana Bites", category: "Kids' Healthy Treats", subCategory: "After-School Snacks", image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80", badge: "Protein Power", rating: 4.8, reviews: 501, description: "Fun bite-sized snacks with peanut butter and banana. Kids go crazy for these!", nutrition: { servingSize: "4 bites (40g)", calories: 175, protein: 6, carbs: 20, fat: 8, fiber: 3, sugar: 11 }, ingredients: ["Peanut Butter", "Bananas", "Oats", "Honey", "Mini Chocolate Chips"], highlights: ["Kid-Favorite", "High Protein", "Fun Size", "Energy Boost", "After-School", "Satisfying"], images: ["https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 49, name: "Carrot Cake Muffins", category: "Kids' Healthy Treats", subCategory: "Lunchbox Favorites", image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", badge: "Hidden Veggies", rating: 4.9, reviews: 623, description: "Moist carrot muffins that make eating veggies fun. Kids won't even know!", nutrition: { servingSize: "1 muffin (60g)", calories: 195, protein: 5, carbs: 28, fat: 7, fiber: 3, sugar: 14 }, ingredients: ["Fresh Carrots", "Whole Wheat Flour", "Eggs", "Honey", "Walnuts", "Cinnamon"], highlights: ["Hidden Veggies", "Kid-Approved", "Moist", "Nutritious", "Carrot Cake", "Lunchbox"], images: ["https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 50, name: "Chocolate Zucchini Brownies", category: "Kids' Healthy Treats", subCategory: "Sweet Treats", image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", badge: "Veggie Power", rating: 5.0, reviews: 712, description: "Fudgy brownies with hidden zucchini. The ultimate stealth health treat!", nutrition: { servingSize: "1 brownie (55g)", calories: 180, protein: 4, carbs: 24, fat: 8, fiber: 3, sugar: 13 }, ingredients: ["Zucchini", "Cocoa Powder", "Whole Wheat Flour", "Eggs", "Honey", "Dark Chocolate"], highlights: ["Hidden Veggies", "Kid-Favorite", "Fudgy", "Chocolate", "Stealth Health", "Moist"], images: ["https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 51, name: "Strawberry Oat Cookies", category: "Kids' Healthy Treats", subCategory: "Lunchbox Favorites", image: "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", badge: "Real Fruit", rating: 4.8, reviews: 456, description: "Soft cookies with real strawberry pieces. Fruity and fun!", nutrition: { servingSize: "3 cookies (45g)", calories: 175, protein: 4, carbs: 27, fat: 6, fiber: 3, sugar: 12 }, ingredients: ["Rolled Oats", "Fresh Strawberries", "Honey", "Coconut Oil", "Vanilla", "Baking Soda"], highlights: ["Real Fruit", "Kid-Friendly", "Soft Cookies", "Natural Pink", "Lunchbox", "No Artificial Colors"], images: ["https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 52, name: "Pumpkin Spice Mini Loaves", category: "Kids' Healthy Treats", subCategory: "Sweet Treats", image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80", badge: "Seasonal", rating: 4.9, reviews: 534, description: "Mini loaves packed with pumpkin goodness. Perfect for fall lunchboxes.", nutrition: { servingSize: "1 mini loaf (65g)", calories: 200, protein: 5, carbs: 32, fat: 6, fiber: 4, sugar: 15 }, ingredients: ["Pumpkin Puree", "Whole Wheat Flour", "Eggs", "Maple Syrup", "Pumpkin Spice", "Walnuts"], highlights: ["Kid-Favorite", "Hidden Veggie", "Mini Size", "Seasonal", "Moist", "Vitamin A"], images: ["https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 53, name: "Blueberry Yogurt Muffins", category: "Kids' Healthy Treats", subCategory: "Breakfast Options", image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", badge: "Probiotic", rating: 4.7, reviews: 423, description: "Fluffy muffins with yogurt and fresh blueberries. A probiotic breakfast treat.", nutrition: { servingSize: "1 muffin (60g)", calories: 185, protein: 6, carbs: 28, fat: 6, fiber: 2, sugar: 13 }, ingredients: ["Greek Yogurt", "Whole Wheat Flour", "Fresh Blueberries", "Honey", "Eggs", "Vanilla"], highlights: ["Kid-Friendly", "Probiotic", "Real Berries", "Protein Boost", "Breakfast", "Fluffy"], images: ["https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 54, name: "Sweet Potato Cookies", category: "Kids' Healthy Treats", subCategory: "After-School Snacks", image: "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", badge: "Vitamin-Rich", rating: 4.8, reviews: 478, description: "Soft cookies made with sweet potato. Naturally orange and nutritious!", nutrition: { servingSize: "3 cookies (45g)", calories: 170, protein: 4, carbs: 26, fat: 6, fiber: 3, sugar: 11 }, ingredients: ["Sweet Potato", "Oat Flour", "Almond Butter", "Maple Syrup", "Cinnamon", "Raisins"], highlights: ["Hidden Veggie", "Vitamin A", "Naturally Sweet", "Soft", "Kid-Approved", "Orange Color"], images: ["https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 55, name: "Honey Graham Crackers", category: "Kids' Healthy Treats", subCategory: "Snack Time", image: "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", badge: "Classic", rating: 4.9, reviews: 656, description: "Homemade graham crackers with honey. A healthier classic favorite.", nutrition: { servingSize: "4 crackers (30g)", calories: 140, protein: 3, carbs: 22, fat: 5, fiber: 2, sugar: 8 }, ingredients: ["Whole Wheat Flour", "Honey", "Butter", "Vanilla", "Cinnamon", "Baking Soda"], highlights: ["Kid-Classic", "Honey Sweetened", "Homemade", "Crunchy", "Versatile", "Wholesome"], images: ["https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  // Specialty & Seasonal (56-63)
  { id: 56, name: "Masala Chai Cookies", category: "Specialty & Seasonal", subCategory: "Indian Fusion", image: "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", badge: "Chai Spiced", rating: 4.9, reviews: 445, description: "Aromatic cookies infused with masala chai spices. An Indian tea-time delight.", nutrition: { servingSize: "3 cookies (45g)", calories: 190, protein: 5, carbs: 25, fat: 8, fiber: 3, sugar: 11 }, ingredients: ["Whole Wheat Flour", "Chai Spices", "Jaggery", "Ghee", "Cardamom", "Ginger"], highlights: ["Indian Fusion", "Chai Spiced", "Aromatic", "Traditional", "Tea-Time", "Unique Flavor"], images: ["https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 57, name: "Turmeric Golden Milk Bars", category: "Specialty & Seasonal", subCategory: "Wellness", image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", badge: "Anti-Inflammatory", rating: 4.8, reviews: 389, description: "Wellness bars with turmeric and warming spices. Golden milk in bar form.", nutrition: { servingSize: "1 bar (50g)", calories: 205, protein: 6, carbs: 24, fat: 10, fiber: 4, sugar: 12 }, ingredients: ["Turmeric", "Cashews", "Dates", "Coconut", "Ginger", "Black Pepper"], highlights: ["Wellness", "Anti-Inflammatory", "Golden Milk", "Turmeric", "Warming Spices", "Ayurvedic"], images: ["https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 58, name: "Rose Pistachio Cookies", category: "Specialty & Seasonal", subCategory: "Premium Collection", image: "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", badge: "Luxury", rating: 4.9, reviews: 512, description: "Elegant cookies with rose water and pistachios. A premium Middle Eastern treat.", nutrition: { servingSize: "3 cookies (45g)", calories: 200, protein: 6, carbs: 22, fat: 10, fiber: 3, sugar: 10 }, ingredients: ["Pistachios", "Almond Flour", "Rose Water", "Honey", "Butter", "Cardamom"], highlights: ["Premium", "Rose Flavored", "Pistachio", "Elegant", "Middle Eastern", "Special Occasion"], images: ["https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 59, name: "Saffron Almond Biscotti", category: "Specialty & Seasonal", subCategory: "Premium Collection", image: "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", badge: "Artisan", rating: 4.8, reviews: 356, description: "Twice-baked biscotti with saffron and almonds. Perfect with chai or coffee.", nutrition: { servingSize: "2 biscotti (40g)", calories: 175, protein: 6, carbs: 23, fat: 7, fiber: 3, sugar: 9 }, ingredients: ["Almonds", "Saffron", "Whole Wheat Flour", "Honey", "Eggs", "Vanilla"], highlights: ["Artisan", "Saffron", "Twice-Baked", "Crunchy", "Coffee Pairing", "Premium"], images: ["https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 60, name: "Gingerbread Spice Cookies", category: "Specialty & Seasonal", subCategory: "Holiday Specials", image: "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", badge: "Holiday", rating: 5.0, reviews: 623, description: "Classic gingerbread cookies with warm spices. A holiday tradition.", nutrition: { servingSize: "3 cookies (45g)", calories: 180, protein: 4, carbs: 28, fat: 6, fiber: 2, sugar: 13 }, ingredients: ["Whole Wheat Flour", "Molasses", "Ginger", "Cinnamon", "Cloves", "Butter"], highlights: ["Holiday", "Gingerbread", "Warm Spices", "Traditional", "Festive", "Classic"], images: ["https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 61, name: "Cranberry Orange Scones", category: "Specialty & Seasonal", subCategory: "Holiday Specials", image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", badge: "Festive", rating: 4.9, reviews: 467, description: "Buttery scones with cranberries and orange zest. A festive breakfast treat.", nutrition: { servingSize: "1 scone (70g)", calories: 235, protein: 5, carbs: 32, fat: 10, fiber: 3, sugar: 14 }, ingredients: ["Whole Wheat Flour", "Fresh Cranberries", "Orange Zest", "Butter", "Honey", "Cream"], highlights: ["Holiday", "Cranberry Orange", "Buttery", "Scones", "Festive", "Breakfast"], images: ["https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 62, name: "Peppermint Bark Brownies", category: "Specialty & Seasonal", subCategory: "Holiday Specials", image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", badge: "Winter Special", rating: 4.8, reviews: 534, description: "Fudgy brownies topped with peppermint bark. A winter wonderland treat.", nutrition: { servingSize: "1 brownie (60g)", calories: 220, protein: 5, carbs: 28, fat: 11, fiber: 3, sugar: 18 }, ingredients: ["Cocoa Powder", "Peppermint Extract", "Dark Chocolate", "White Chocolate", "Butter", "Sugar"], highlights: ["Winter Special", "Peppermint", "Fudgy", "Holiday", "Chocolate", "Festive"], images: ["https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] },

  { id: 63, name: "Mango Cardamom Squares", category: "Specialty & Seasonal", subCategory: "Summer Collection", image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", badge: "Summer Special", rating: 4.9, reviews: 445, description: "Tropical mango bars with aromatic cardamom. A summer escape in every bite.", nutrition: { servingSize: "1 square (55g)", calories: 195, protein: 4, carbs: 30, fat: 7, fiber: 3, sugar: 18 }, ingredients: ["Fresh Mango", "Cardamom", "Coconut", "Almond Flour", "Honey", "Lime"], highlights: ["Summer Special", "Tropical", "Mango", "Cardamom", "Refreshing", "Indian Fusion"], images: ["https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", "https://images.unsplash.com/photo-1590080876876-5ca5c3c7e69e?w=800&q=80"] }
]

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
  const product = allProducts.find(p => p.id === productId) || allProducts[0]
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showImageZoom, setShowImageZoom] = useState(false)
  const [isInterested, setIsInterested] = useState(false)

  const handleExpressInterest = () => {
    setIsInterested(true)
    console.log(`Expressed interest in ${product.name}`)
  }

  const relatedProducts = allProducts.filter(p => 
    p.id !== product.id && p.category === product.category
  ).slice(0, 3)

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
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-6 right-6 bg-[#F4A261] text-[#2C2C2E] font-bold border-0 text-sm shadow-3d" style={{ fontFamily: "var(--font-accent)" }}>
                    {product.badge}
                  </Badge>
                  
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
                        src={image}
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
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
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {product.highlights.map((highlight, idx) => (
                    <motion.div 
                      key={idx} 
                      className="flex items-center gap-2 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="w-5 h-5 rounded-full bg-[#88A85D]/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#88A85D]" />
                      </div>
                      <span className="text-[#5D4037]/80 font-medium" style={{ fontFamily: "var(--font-body)" }}>{highlight}</span>
                    </motion.div>
                  ))}
                </div>
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
                    disabled={isInterested}
                    className={`flex-1 ${
                      isInterested 
                        ? "bg-[#88A85D] hover:bg-[#88A85D]" 
                        : "bg-[#E85D75] hover:bg-[#E85D75]/90"
                    } text-white font-bold h-14 text-lg btn-3d rounded-full shadow-3d group cursor-pointer`}
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    {isInterested ? (
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
                </Card>
              </TabsContent>

              <TabsContent value="ingredients" className="mt-8">
                <Card className="p-8 rounded-3xl border-2 border-[#E85D75]/20 shadow-3d bg-white">
                  <h3 className="text-2xl font-black mb-6 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>Premium Ingredients</h3>
                  <p className="text-[#5D4037]/70 mb-8" style={{ fontFamily: "var(--font-body)" }}>
                    Every ingredient is carefully selected for quality, nutrition, and authentic flavor.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {product.ingredients.map((ingredient, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-[#FAF0E6] card-3d"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#88A85D]/20 flex items-center justify-center flex-shrink-0">
                          <Leaf className="w-5 h-5 text-[#88A85D]" />
                        </div>
                        <span className="font-semibold text-[#2C2C2E]" style={{ fontFamily: "var(--font-body)" }}>{ingredient}</span>
                      </motion.div>
                    ))}
                  </div>
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
                {relatedProducts.map((relatedProduct, idx) => (
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
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-4 right-4 bg-[#F4A261] text-[#2C2C2E] font-bold border-0 text-xs shadow-3d">
                            {relatedProduct.badge}
                          </Badge>
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
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {showImageZoom && (
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
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-auto rounded-3xl shadow-3d"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}