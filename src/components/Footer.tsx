"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"

const footerLinks = {
  Products: [
    { label: "Protein Cookies", href: "/products" },
    { label: "Energy Bars", href: "/products" },
    { label: "Gluten-Free Snacks", href: "/products" },
    { label: "Vegan Delights", href: "/products" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Story", href: "/about" },
    { label: "B2B Solutions", href: "/b2b-solutions" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "Get a Sample", href: "/contact" },
    { label: "Export Inquiry", href: "/b2b-solutions" },
    { label: "Shipping Info", href: "/contact" },
    { label: "Privacy Policy", href: "/contact" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--cocoa-brown)] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-repeat" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-black text-[var(--geetato-pink)] mb-2">
                Geetato
              </h3>
              <p className="text-xs text-[var(--golden-amber)] mb-4 italic" style={{ fontFamily: 'Pacifico, cursive' }}>
                Health-first Indian Delights
              </p>
              <p className="text-white/70 mb-6 leading-relaxed">
                Freshly Indian. Global in Taste. Premium bakery delights crafted with 
                ancient grains and modern nutrition for your wellness journey.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-white/60">
                  <Mail className="w-5 h-5 text-[var(--golden-amber)]" />
                  <span>hello@geetato.com</span>
                </div>
                <div className="flex items-center space-x-3 text-white/60">
                  <Phone className="w-5 h-5 text-[var(--golden-amber)]" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-white/60">
                  <MapPin className="w-5 h-5 text-[var(--golden-amber)]" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Link Sections */}
          {Object.entries(footerLinks).map(([title, links], idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h4 className="text-lg font-bold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-[var(--geetato-pink)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-white/50 text-sm">
              <p>© 2026 Geetato. All rights reserved.</p>
              <span className="hidden sm:inline">|</span>
              <p className="flex items-center gap-2">
                <span className="text-[var(--pistachio-green)]">✓</span> FSSAI Certified
                <span className="mx-2">•</span>
                <span className="text-[var(--pistachio-green)]">✓</span> HACCP Approved
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--geetato-pink)] flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}