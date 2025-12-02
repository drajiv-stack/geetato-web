"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, Share2, Bookmark, ArrowLeft, ArrowRight, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Link from "next/link"
import { notFound } from "next/navigation"

// This would typically come from a CMS or API
const blogPosts = {
  "ancient-grains-modern-nutrition": {
    title: "Ancient Grains for Modern Nutrition: Why Ragi and Millet Matter",
    excerpt: "Discover how traditional Indian superfoods like ragi, millet, and quinoa are revolutionizing modern nutrition with their incredible health benefits.",
    category: "nutrition",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=1200&q=80",
    author: "Dr. Ananya Desai",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    authorBio: "Registered dietitian and nutritionist with 10+ years specializing in plant-based nutrition and ancient grains.",
    date: "2025-01-15",
    readTime: "8 min read",
    content: `
      <p class="lead">In a world dominated by processed foods and refined grains, ancient grains are making a powerful comeback. These nutritional powerhouses—cultivated for thousands of years—offer a treasure trove of health benefits that modern science is only beginning to fully appreciate.</p>

      <h2>What Are Ancient Grains?</h2>
      <p>Ancient grains refer to grains and pseudocereals that have remained largely unchanged over the last several hundred years. Unlike modern wheat, which has been heavily modified through selective breeding, ancient grains maintain their original nutritional profiles.</p>

      <p>Popular ancient grains include:</p>
      <ul>
        <li><strong>Ragi (Finger Millet)</strong> - Rich in calcium and iron</li>
        <li><strong>Foxtail Millet</strong> - High in protein and fiber</li>
        <li><strong>Quinoa</strong> - Complete protein with all 9 essential amino acids</li>
        <li><strong>Amaranth</strong> - Packed with lysine and minerals</li>
        <li><strong>Sorghum (Jowar)</strong> - Gluten-free with antioxidants</li>
      </ul>

      <h2>The Nutritional Superiority of Ancient Grains</h2>
      
      <h3>1. Higher Protein Content</h3>
      <p>Ancient grains typically contain 10-15% more protein than modern wheat. Quinoa, for instance, is a complete protein containing all nine essential amino acids—rare for plant-based foods. This makes ancient grains invaluable for vegetarians, vegans, and anyone looking to increase protein intake naturally.</p>

      <h3>2. Rich in Dietary Fiber</h3>
      <p>With 5-8 grams of fiber per serving, ancient grains support digestive health, regulate blood sugar, and promote satiety. Ragi is particularly impressive with its high fiber content that aids in weight management and diabetes prevention.</p>

      <h3>3. Packed with Minerals</h3>
      <p>Ragi stands out with calcium levels 5-30 times higher than most cereals—making it exceptional for bone health. Ancient grains also provide iron, magnesium, zinc, and phosphorus in bioavailable forms.</p>

      <h3>4. Gluten-Free Options</h3>
      <p>Many ancient grains like millet, quinoa, and amaranth are naturally gluten-free, offering safe alternatives for those with celiac disease or gluten sensitivity without compromising nutrition or taste.</p>

      <h2>Health Benefits Backed by Science</h2>

      <h3>Blood Sugar Control</h3>
      <p>The low glycemic index (GI) of ancient grains helps maintain stable blood sugar levels. Studies show that regular consumption of millets can reduce fasting blood glucose by 12-15% in diabetic individuals.</p>

      <h3>Heart Health</h3>
      <p>Ancient grains contain heart-healthy compounds including:</p>
      <ul>
        <li>Soluble fiber that reduces LDL cholesterol</li>
        <li>Plant sterols and stanols</li>
        <li>Antioxidants like phenolic compounds</li>
        <li>Magnesium for blood pressure regulation</li>
      </ul>

      <h3>Weight Management</h3>
      <p>The combination of protein, fiber, and complex carbohydrates in ancient grains promotes fullness and reduces overall calorie intake. Research indicates that replacing refined grains with ancient grains can lead to 2-3 kg weight loss over 12 weeks without calorie restriction.</p>

      <h2>Incorporating Ancient Grains into Your Diet</h2>

      <h3>Start with Familiar Formats</h3>
      <p>Don't feel overwhelmed! Begin by swapping refined flour products with ancient grain alternatives:</p>
      <ul>
        <li>Replace regular cookies with ragi cookies</li>
        <li>Try quinoa salad instead of pasta salad</li>
        <li>Use millet flour in rotis and pancakes</li>
        <li>Snack on amaranth energy bars</li>
      </ul>

      <h3>Cooking Tips</h3>
      <p>Most ancient grains are simple to prepare:</p>
      <ul>
        <li><strong>Quinoa:</strong> Rinse well, cook in 2:1 water ratio for 15 minutes</li>
        <li><strong>Millet:</strong> Toast dry for 3 minutes, then cook in 2.5:1 water ratio for 20 minutes</li>
        <li><strong>Amaranth:</strong> Combine with 3:1 water ratio, simmer for 20 minutes</li>
      </ul>

      <h2>The Geetato Approach</h2>
      <p>At Geetato, we've made it our mission to bring ancient grains into your daily routine without compromise on taste or convenience. Our products combine traditional grains with modern nutritional science to create snacks that are:</p>
      <ul>
        <li>Nutrient-dense with high protein and fiber</li>
        <li>Naturally sweetened with dates and honey</li>
        <li>Free from artificial preservatives and additives</li>
        <li>Crafted in FSSAI-certified facilities</li>
      </ul>

      <h2>The Bottom Line</h2>
      <p>Ancient grains aren't just a food trend—they're a return to nutritional wisdom that sustained civilizations for millennia. By incorporating these powerhouse grains into your diet, you're investing in sustained energy, better health outcomes, and supporting sustainable agriculture.</p>

      <p>Whether you're managing diabetes, looking to boost protein intake, or simply seeking healthier snacking options, ancient grains offer a delicious, scientifically-backed solution.</p>

      <div class="cta-box">
        <h3>Ready to Experience Ancient Grain Nutrition?</h3>
        <p>Explore our range of ancient grain-based snacks crafted with care and expertise. Your wellness journey starts here.</p>
      </div>
    `,
    relatedPosts: [2, 5, 7]
  },
  "protein-packed-breakfast-recipes": {
    title: "5 Protein-Packed Breakfast Recipes for Busy Mornings",
    excerpt: "Start your day right with these quick, delicious, high-protein breakfast ideas using Geetato products and wholesome ingredients.",
    category: "recipes",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200&q=80",
    author: "Chef Rahul Mehta",
    authorAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    authorBio: "Culinary innovator specializing in healthy Indian fusion cuisine and traditional recipes reimagined.",
    date: "2025-01-12",
    readTime: "6 min read",
    content: `
      <p class="lead">Breakfast sets the tone for your entire day. These five protein-packed recipes take less than 10 minutes to prepare and will keep you energized until lunch—no mid-morning crashes or cravings!</p>

      <h2>Why Protein at Breakfast?</h2>
      <p>Starting your day with 20-30g of protein helps:</p>
      <ul>
        <li>Stabilize blood sugar levels</li>
        <li>Reduce cravings throughout the day</li>
        <li>Support muscle maintenance and growth</li>
        <li>Boost metabolism and fat burning</li>
        <li>Improve focus and cognitive function</li>
      </ul>

      <h2>Recipe 1: Ragi Protein Pancakes</h2>
      <p><strong>Protein: 24g | Prep Time: 8 minutes</strong></p>
      
      <h3>Ingredients:</h3>
      <ul>
        <li>1 cup ragi flour</li>
        <li>1 scoop vanilla protein powder</li>
        <li>2 eggs (or 2 flax eggs for vegan)</li>
        <li>1 cup almond milk</li>
        <li>1 mashed banana</li>
        <li>1 tsp baking powder</li>
        <li>Pinch of cinnamon</li>
      </ul>

      <h3>Instructions:</h3>
      <ol>
        <li>Mix all dry ingredients in a bowl</li>
        <li>Whisk eggs, banana, and almond milk separately</li>
        <li>Combine wet and dry ingredients until just mixed</li>
        <li>Cook on medium heat griddle for 2-3 minutes per side</li>
        <li>Top with Geetato Protein Almond Cookies, crumbled</li>
      </ol>

      <h2>Recipe 2: Quinoa Breakfast Bowl</h2>
      <p><strong>Protein: 22g | Prep Time: 5 minutes (using pre-cooked quinoa)</strong></p>
      
      <h3>Ingredients:</h3>
      <ul>
        <li>1 cup cooked quinoa (prepare night before)</li>
        <li>1/2 cup Greek yogurt</li>
        <li>2 tbsp almond butter</li>
        <li>1/4 cup mixed berries</li>
        <li>2 Geetato Oat Protein Bites, crumbled</li>
        <li>Drizzle of honey</li>
        <li>Chia seeds for topping</li>
      </ul>

      <h3>Instructions:</h3>
      <ol>
        <li>Warm quinoa in microwave for 1 minute</li>
        <li>Mix in Greek yogurt and almond butter</li>
        <li>Top with berries, crumbled protein bites, and chia seeds</li>
        <li>Drizzle with honey</li>
      </ol>

      <h2>Recipe 3: Savory Millet Upma</h2>
      <p><strong>Protein: 18g | Prep Time: 10 minutes</strong></p>
      
      <h3>Ingredients:</h3>
      <ul>
        <li>1 cup foxtail millet</li>
        <li>1/2 cup paneer cubes</li>
        <li>Mixed vegetables (peas, carrots, beans)</li>
        <li>1 tsp mustard seeds</li>
        <li>Curry leaves</li>
        <li>Green chilies</li>
        <li>1 tbsp ghee or coconut oil</li>
      </ul>

      <h3>Instructions:</h3>
      <ol>
        <li>Toast millet in dry pan for 2 minutes</li>
        <li>Boil in 2 cups water for 8 minutes</li>
        <li>Heat ghee, add mustard seeds and curry leaves</li>
        <li>Add vegetables and paneer, sauté 2 minutes</li>
        <li>Mix in cooked millet, season with salt and lemon</li>
      </ol>

      <h2>Recipe 4: Chocolate Protein Smoothie Bowl</h2>
      <p><strong>Protein: 26g | Prep Time: 5 minutes</strong></p>
      
      <h3>Ingredients:</h3>
      <ul>
        <li>1 frozen banana</li>
        <li>1 scoop chocolate protein powder</li>
        <li>1 cup almond milk</li>
        <li>2 tbsp cacao powder</li>
        <li>1 tbsp peanut butter</li>
        <li>Ice cubes</li>
        <li>Toppings: Geetato Ragi Brownies (crumbled), sliced almonds, coconut flakes</li>
      </ul>

      <h3>Instructions:</h3>
      <ol>
        <li>Blend all ingredients until thick and creamy</li>
        <li>Pour into bowl</li>
        <li>Top with crumbled brownies, almonds, and coconut</li>
        <li>Eat with a spoon like ice cream!</li>
      </ol>

      <h2>Recipe 5: Egg & Ancient Grain Toast</h2>
      <p><strong>Protein: 20g | Prep Time: 7 minutes</strong></p>
      
      <h3>Ingredients:</h3>
      <ul>
        <li>2 slices whole grain/ancient grain bread</li>
        <li>2 eggs</li>
        <li>1/2 avocado, mashed</li>
        <li>Cherry tomatoes</li>
        <li>Microgreens or spinach</li>
        <li>2 Geetato Millet Energy Bars on the side</li>
        <li>Salt, pepper, red chili flakes</li>
      </ul>

      <h3>Instructions:</h3>
      <ol>
        <li>Toast bread slices</li>
        <li>Fry or poach eggs to preference</li>
        <li>Spread mashed avocado on toast</li>
        <li>Top with eggs, tomatoes, and greens</li>
        <li>Season and serve with energy bars</li>
      </ol>

      <h2>Meal Prep Tips</h2>
      <p>Make mornings easier with these prep-ahead strategies:</p>
      <ul>
        <li><strong>Sunday Cook:</strong> Prepare quinoa, millet, or oats in bulk</li>
        <li><strong>Portion Control:</strong> Divide into individual containers</li>
        <li><strong>Smoothie Packs:</strong> Pre-portion frozen fruits and greens in bags</li>
        <li><strong>Hard Boil Eggs:</strong> Make 6-8 eggs for the week</li>
        <li><strong>Stock Geetato Products:</strong> Keep protein cookies and bars handy</li>
      </ul>

      <h2>Nutrition Note</h2>
      <p>Each recipe provides 18-26g of high-quality protein along with complex carbohydrates, healthy fats, and fiber. This macronutrient balance ensures sustained energy, stable blood sugar, and optimal nutrition to power your morning.</p>

      <div class="cta-box">
        <h3>Enhance Your Breakfast Routine</h3>
        <p>Stock up on Geetato's protein-rich snacks to add nutritious crunch and flavor to any breakfast recipe. Shop our collection now!</p>
      </div>
    `,
    relatedPosts: [1, 4, 9]
  }
}

const allBlogPostsList = [
  { id: 1, slug: "ancient-grains-modern-nutrition", title: "Ancient Grains for Modern Nutrition: Why Ragi and Millet Matter", category: "nutrition" },
  { id: 2, slug: "protein-packed-breakfast-recipes", title: "5 Protein-Packed Breakfast Recipes for Busy Mornings", category: "recipes" },
  { id: 3, slug: "managing-sugar-cravings-naturally", title: "Managing Sugar Cravings: Natural Strategies That Work", category: "wellness" },
  { id: 4, slug: "gluten-free-baking-tips", title: "Gluten-Free Baking: Essential Tips for Perfect Results", category: "recipes" },
  { id: 5, slug: "benefits-of-plant-based-protein", title: "Plant-Based Protein: Complete Guide to Meeting Your Needs", category: "nutrition" },
  { id: 7, slug: "gut-health-fiber-rich-foods", title: "Gut Health Revolution: The Power of Fiber-Rich Ancient Grains", category: "nutrition" },
  { id: 9, slug: "energy-boosting-snack-recipes", title: "10 Energy-Boosting Snack Recipes for Athletes", category: "recipes" }
]

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  const relatedPosts = post.relatedPosts.map(id => allBlogPostsList.find(p => p.id === id)!).filter(Boolean)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = post.title

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Image */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <Link href="/blog">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20 mb-4 rounded-full"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Blog
                </Button>
              </Link>
              
              <span className="inline-block bg-[#F4A261] text-[#2C2C2E] text-sm font-bold px-4 py-2 rounded-full mb-4 capitalize shadow-3d" style={{ fontFamily: "var(--font-accent)" }}>
                {post.category}
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-3d"
                  />
                  <div>
                    <p className="font-bold" style={{ fontFamily: "var(--font-accent)" }}>{post.author}</p>
                    <p className="text-sm text-white/80">{post.authorBio}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_250px] gap-12">
              {/* Main Content */}
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="prose prose-lg max-w-none"
                style={{ fontFamily: "var(--font-body)" }}
              >
                <div 
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="article-content"
                />
              </motion.article>
              
              {/* Sidebar */}
              <motion.aside
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:sticky lg:top-24 h-fit"
              >
                {/* Share Buttons */}
                <Card className="p-6 mb-6 rounded-3xl shadow-3d border-2 border-[#E85D75]/20">
                  <h3 className="font-bold text-[#2C2C2E] mb-4 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                    <Share2 className="w-5 h-5 text-[#E85D75]" />
                    Share Article
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 rounded-full hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]"
                      onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}
                    >
                      <Facebook className="w-4 h-4" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 rounded-full hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]"
                      onClick={() => window.open(`https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`, '_blank')}
                    >
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 rounded-full hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
                      onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')}
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 rounded-full hover:bg-[#E85D75] hover:text-white hover:border-[#E85D75]"
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl)
                        alert('Link copied to clipboard!')
                      }}
                    >
                      <LinkIcon className="w-4 h-4" />
                      Copy Link
                    </Button>
                  </div>
                </Card>
                
                {/* Save for Later */}
                <Button
                  variant="outline"
                  className="w-full justify-center gap-2 rounded-full border-2 border-[#E85D75] text-[#E85D75] hover:bg-[#E85D75] hover:text-white"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  <Bookmark className="w-4 h-4" />
                  Save for Later
                </Button>
              </motion.aside>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-[#FAFAF8] paper-texture">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-black mb-2 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                Related <span className="text-[#E85D75]">Articles</span>
              </h2>
              <p className="text-lg text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                Continue your learning journey
              </p>
            </motion.div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((related, idx) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Link href={`/blog/${related.slug}`}>
                    <Card className="overflow-hidden border-2 border-transparent hover:border-[#E85D75] transition-all shadow-3d rounded-3xl card-3d bg-white h-full">
                      <div className="p-6">
                        <span className="inline-block bg-[#F4A261]/20 text-[#A67C52] text-xs font-bold px-3 py-1.5 rounded-full mb-3 capitalize" style={{ fontFamily: "var(--font-accent)" }}>
                          {related.category}
                        </span>
                        <h3 className="text-lg font-bold text-[#2C2C2E] hover:text-[#E85D75] transition-colors line-clamp-2 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                          {related.title}
                        </h3>
                        <Button
                          variant="ghost"
                          className="text-[#E85D75] hover:bg-[#E85D75]/10 group p-0"
                          style={{ fontFamily: "var(--font-accent)" }}
                        >
                          Read Article
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
              Ready to Transform <span className="text-[#FAFAF8]">Your Health?</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Discover our range of ancient grain-based snacks crafted for your wellness
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                asChild
                className="bg-white text-[#E85D75] hover:bg-white/90 font-bold rounded-full shadow-3d btn-3d"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Link href="/products">
                  Shop Products
                </Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white text-white hover:bg-white hover:text-[#E85D75] font-bold rounded-full btn-3d"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                <Link href="/blog">
                  More Articles
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        .article-content {
          color: #5D4037;
        }
        
        .article-content .lead {
          font-size: 1.25rem;
          line-height: 1.75;
          color: #5D4037;
          margin-bottom: 2rem;
          font-weight: 500;
        }
        
        .article-content h2 {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 800;
          color: #2C2C2E;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
        }
        
        .article-content h3 {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 700;
          color: #2C2C2E;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .article-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
        }
        
        .article-content ul, .article-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .article-content li {
          margin-bottom: 0.75rem;
          line-height: 1.8;
        }
        
        .article-content strong {
          color: #2C2C2E;
          font-weight: 700;
        }
        
        .article-content .cta-box {
          background: linear-gradient(135deg, #FAF0E6, #FAFAF8);
          border: 2px solid #E85D75;
          border-radius: 1.5rem;
          padding: 2rem;
          margin-top: 3rem;
          text-align: center;
        }
        
        .article-content .cta-box h3 {
          font-family: var(--font-heading);
          color: #E85D75;
          margin-top: 0;
          margin-bottom: 1rem;
        }
        
        .article-content .cta-box p {
          margin-bottom: 0;
          font-size: 1.125rem;
        }
      `}</style>
    </div>
  )
}
