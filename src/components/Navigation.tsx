"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, User, ChevronDown, Leaf, Heart, Shield, Zap, Calculator, BookOpen, GitCompare, Sparkles, Package, Cookie, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const navLinks = [
{ href: "/products", label: "Products", hasMegaMenu: true },
{ href: "/about", label: "About" },
{ href: "/blog", label: "Blog" },
{ href: "/tools", label: "Tools", hasDropdown: true },
{ href: "/b2b-solutions", label: "Bulk Orders", hasDropdown: true },
{ href: "/contact", label: "Contact" }];

const productCategories = [
{
  name: "Gluten-Free",
  icon: Leaf,
  href: "/products?category=gluten-free",
  description: "Naturally gluten-free snacks",
  image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-protein-4d7c2e20-20251024085551.jpg"
},
{
  name: "High Protein",
  icon: Zap,
  href: "/products?category=protein-rich",
  description: "Power-packed protein snacks",
  image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-oat-pro-0a822990-20251024085553.jpg"
},
{
  name: "Vegan",
  icon: Heart,
  href: "/products?category=vegan",
  description: "100% plant-based delights",
  image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-millet--9a9f4bb1-20251024085553.jpg"
},
{
  name: "Low Sugar",
  icon: Shield,
  href: "/products?category=low-sugar",
  description: "Guilt-free sweetness",
  image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/9d2d2ddf-ef37-4248-823b-3b54ced81af7/generated_images/professional-food-photography-of-coconut-f54603d1-20251024085552.jpg"
}];


const toolsDropdown = [
{
  name: "Nutrition Calculator",
  icon: Calculator,
  href: "/tools/nutrition-calculator",
  description: "Calculate your daily needs"
},
{
  name: "Ingredient Glossary",
  icon: BookOpen,
  href: "/tools/ingredient-glossary",
  description: "Learn about superfoods"
},
{
  name: "Product Comparison",
  icon: GitCompare,
  href: "/tools/product-comparison",
  description: "Compare products side-by-side"
}];

const b2bDropdown = [
{
  name: "Corporate Solutions",
  icon: Package,
  href: "/b2b-solutions",
  description: "Gifting, pantries & wellness programs"
},
{
  name: "Bread Wholesale",
  icon: Cookie,
  href: "/b2b-solutions/bread-wholesale",
  description: "63+ premium breads for B2B clients",
  badge: "NEW"
},
{
  name: "Export Partner - Desi",
  icon: Package,
  href: "/export-partner",
  description: "Global export partnership opportunities",
  badge: "NEW"
}];


const searchSuggestions = [
"Protein Almond Cookies",
"Ragi Chocolate Brownies",
"Millet Energy Bars",
"Quinoa Date Cookies",
"Coconut Macaroons",
"Oat Protein Bites"];


export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const [showB2BDropdown, setShowB2BDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const { data: session, isPending, refetch } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    const token = localStorage.getItem("bearer_token");
    const { error } = await authClient.signOut({
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    
    if (error?.code) {
      toast.error(error.code);
    } else {
      localStorage.removeItem("bearer_token");
      refetch();
      toast.success("Signed out successfully");
      router.push("/");
    }
  };

  const filteredSuggestions = searchQuery ?
  searchSuggestions.filter((item) =>
  item.toLowerCase().includes(searchQuery.toLowerCase())
  ) :
  [];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ?
      "bg-white/95 backdrop-blur-md shadow-3d py-2" :
      "bg-white/90 backdrop-blur-sm py-3"}`
      }>

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with 3D effect */}
          <Link href="/" className="flex items-center gap-3 group perspective-container z-50">
            <motion.img
              src="https://geetato.com/wp-content/uploads/2025/09/logo-file1.png"
              alt="Geetato Logo"
              className="h-8 sm:h-10 w-auto transition-transform duration-300"
              whileHover={{ rotateY: 10, scale: 1.1 }}
              style={{ transformStyle: "preserve-3d" }} />

          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
            <div
              key={link.href}
              onMouseEnter={() => {
                if (link.hasMegaMenu) setShowMegaMenu(true);
                if (link.hasDropdown && link.href === "/tools") setShowToolsDropdown(true);
                if (link.hasDropdown && link.href === "/b2b-solutions") setShowB2BDropdown(true);
              }}
              onMouseLeave={() => {
                if (link.hasMegaMenu) setShowMegaMenu(false);
                if (link.hasDropdown && link.href === "/tools") setShowToolsDropdown(false);
                if (link.hasDropdown && link.href === "/b2b-solutions") setShowB2BDropdown(false);
              }}
              className="relative">

                <Link
                href={link.href}
                className={`relative font-bold text-sm transition-colors flex items-center gap-1 ${
                pathname === link.href ?
                "text-[#E85D75]" :
                "text-[#2C2C2E] hover:text-[#E85D75]"}`
                }
                style={{ fontFamily: "var(--font-accent)" }}>

                  {link.label}
                  {(link.hasMegaMenu || link.hasDropdown) && <ChevronDown className="w-3 h-3" />}
                  {pathname === link.href &&
                <motion.div
                  layoutId="activeLink"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E85D75]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }} />

                }
                </Link>

                {/* Tools Dropdown */}
                {link.hasDropdown && link.href === "/tools" && showToolsDropdown &&
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-2 w-72 bg-white shadow-3d rounded-2xl border-2 border-[#E85D75]/10 p-4 z-50"
                onMouseEnter={() => setShowToolsDropdown(true)}
                onMouseLeave={() => setShowToolsDropdown(false)}>

                    {toolsDropdown.map((tool, idx) =>
                <Link
                  key={tool.href}
                  href={tool.href}
                  onClick={() => setShowToolsDropdown(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF0E6] transition-colors group/item">

                        <div className="w-10 h-10 rounded-xl bg-[#E85D75]/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#E85D75] transition-colors">
                          <tool.icon className="w-5 h-5 text-[#E85D75] group-hover/item:text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#2C2C2E] mb-0.5" style={{ fontFamily: "var(--font-heading)" }}>
                            {tool.name}
                          </div>
                          <div className="text-xs text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                            {tool.description}
                          </div>
                        </div>
                      </Link>
                )}
                  </motion.div>
              }

                {/* B2B Dropdown */}
                {link.hasDropdown && link.href === "/b2b-solutions" && showB2BDropdown &&
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-2 w-80 bg-white shadow-3d rounded-2xl border-2 border-[#E85D75]/10 p-4 z-50"
                onMouseEnter={() => setShowB2BDropdown(true)}
                onMouseLeave={() => setShowB2BDropdown(false)}>

                    {b2bDropdown.map((item, idx) =>
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setShowB2BDropdown(false)}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#FAF0E6] transition-colors group/item relative">

                        <div className="w-10 h-10 rounded-xl bg-[#F4A261]/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#F4A261] transition-colors">
                          <item.icon className="w-5 h-5 text-[#F4A261] group-hover/item:text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <div className="font-bold text-sm text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                              {item.name}
                            </div>
                            {item.badge && (
                              <span className="bg-[#E85D75] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                            {item.description}
                          </div>
                        </div>
                      </Link>
                )}
                  </motion.div>
              }
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Quiz Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-[#88A85D] hover:bg-[#88A85D]/10 rounded-full"
                style={{ fontFamily: "var(--font-accent)" }}>

                <Link href="/quiz">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Quiz
                </Link>
              </Button>
            </motion.div>

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-[#FAF0E6] rounded-full transition-colors"
              aria-label="Search">

              <Search className="w-5 h-5 text-[#2C2C2E]" />
            </motion.button>

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              asChild
              className="p-2 hover:bg-[#FAF0E6] rounded-full transition-colors"
              aria-label="Wishlist">

              <Link href="/wishlist">
                <Heart className="w-5 h-5 text-[#2C2C2E]" />
              </Link>
            </motion.button>

            {/* Account Button - Updated with auth */}
            {!isPending && session?.user ? (
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 p-2 hover:bg-[#FAF0E6] rounded-full transition-colors"
                  aria-label="Account">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E85D75] to-[#F4A261] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{session.user.name?.charAt(0) || "U"}</span>
                  </div>
                </motion.button>
                
                {/* User Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-3d rounded-2xl border-2 border-[#E85D75]/10 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-3 py-2 border-b border-[#E85D75]/10">
                    <p className="font-bold text-sm text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                      {session.user.name}
                    </p>
                    <p className="text-xs text-[#5D4037]/60">{session.user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FAF0E6] transition-colors mt-1">
                    <LayoutDashboard className="w-4 h-4 text-[#E85D75]" />
                    <span className="text-sm font-semibold">Dashboard</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FAF0E6] transition-colors text-left">
                    <LogOut className="w-4 h-4 text-[#E85D75]" />
                    <span className="text-sm font-semibold">Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-[#FAF0E6] rounded-full transition-colors"
                  aria-label="Account">
                  <User className="w-5 h-5 text-[#2C2C2E]" />
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#2C2C2E] z-50 relative"
            aria-label="Toggle menu">

            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5D4037]/40" />
                <Input
                type="text"
                placeholder="Search products, ingredients, dietary preferences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-2xl border-2 border-[#E85D75]/20 focus:border-[#E85D75] bg-white" />

              </div>
              
              {/* Search Suggestions */}
              {filteredSuggestions.length > 0 &&
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-3d border-2 border-[#E85D75]/10 p-2 z-50">

                  {filteredSuggestions.map((suggestion) =>
              <Link
                key={suggestion}
                href={`/products?search=${suggestion}`}
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
                className="block px-4 py-3 hover:bg-[#FAF0E6] rounded-xl transition-colors text-[#2C2C2E] font-medium">

                      {suggestion}
                    </Link>
              )}
                </motion.div>
            }
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation - Fixed Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-white z-40 lg:hidden"
              style={{ top: isScrolled ? '60px' : '72px' }}>

              <div className="h-full overflow-y-auto pb-20 px-4 sm:px-6 pt-6">
                {/* Mobile Search */}
                <div className="mb-6 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5D4037]/40" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 w-full rounded-2xl" />
                </div>

                <div className="flex flex-col gap-4">
                  {navLinks.map((link) =>
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`font-bold text-lg transition-colors ${
                        pathname === link.href ?
                        "text-[#E85D75]" :
                        "text-[#2C2C2E]"}`
                      }
                      style={{ fontFamily: "var(--font-accent)" }}>
                      {link.label}
                    </Link>
                  )}

                  {/* Mobile B2B Links */}
                  <Link
                    href="/b2b-solutions/bread-wholesale"
                    onClick={() => setIsOpen(false)}
                    className="font-bold text-base text-[#F4A261] flex items-center gap-2"
                    style={{ fontFamily: "var(--font-accent)" }}>
                    <Cookie className="w-4 h-4" />
                    Bread Wholesale
                    <span className="bg-[#E85D75] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
                  </Link>

                  <Link
                    href="/export-partner"
                    onClick={() => setIsOpen(false)}
                    className="font-bold text-base text-[#F4A261] flex items-center gap-2"
                    style={{ fontFamily: "var(--font-accent)" }}>
                    <Package className="w-4 h-4" />
                    Export Partner
                    <span className="bg-[#E85D75] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
                  </Link>

                  {/* Mobile-specific links */}
                  <Link
                    href="/quiz"
                    onClick={() => setIsOpen(false)}
                    className="font-bold text-base text-[#88A85D]"
                    style={{ fontFamily: "var(--font-accent)" }}>
                    Take Quiz
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setIsOpen(false)}
                    className="font-bold text-base text-[#E85D75]"
                    style={{ fontFamily: "var(--font-accent)" }}>
                    Wishlist
                  </Link>
                  
                  <div className="flex gap-2 pt-4 border-t border-[#E85D75]/20">
                    {!isPending && session?.user ? (
                      <>
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1 rounded-full border-2 border-[#E85D75] text-[#E85D75]">
                          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Dashboard
                          </Link>
                        </Button>
                        <Button
                          onClick={() => {
                            handleSignOut();
                            setIsOpen(false);
                          }}
                          variant="outline"
                          className="flex-1 rounded-full border-2 border-[#E85D75] text-[#E85D75]">
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          asChild
                          variant="outline"
                          className="flex-1 rounded-full border-2 border-[#E85D75] text-[#E85D75]">
                          <Link href="/login" onClick={() => setIsOpen(false)}>
                            <User className="w-4 h-4 mr-2" />
                            Login
                          </Link>
                        </Button>
                        <Button
                          asChild
                          className="flex-1 bg-[#F4A261] text-[#2C2C2E] font-bold rounded-full"
                          style={{ fontFamily: "var(--font-accent)" }}>
                          <Link href="/register" onClick={() => setIsOpen(false)}>
                            Sign Up
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mega Menu */}
      <AnimatePresence>
        {showMegaMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
            className="absolute top-full left-0 right-0 bg-white shadow-3d border-t border-[#E85D75]/10 hidden lg:block">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {productCategories.map((category, idx) =>
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}>

                    <Link
                  href={category.href}
                  className="group block"
                  onClick={() => setShowMegaMenu(false)}>

                      <div className="relative h-40 rounded-2xl overflow-hidden mb-3 border-2 border-transparent group-hover:border-[#E85D75] transition-all">
                        <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="flex items-center gap-2 text-white mb-1">
                            <category.icon className="w-4 h-4" />
                            <h3 className="font-bold text-sm" style={{ fontFamily: "var(--font-heading)" }}>
                              {category.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-[#5D4037]/60 px-1">
                        {category.description}
                      </p>
                    </Link>
                  </motion.div>
              )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-[#E85D75]/10 text-center">
                <Link
                href="/products"
                className="inline-flex items-center gap-2 text-[#E85D75] font-bold hover:gap-3 transition-all"
                onClick={() => setShowMegaMenu(false)}>

                  View All Products
                  <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}>

                    →
                  </motion.span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>);

}