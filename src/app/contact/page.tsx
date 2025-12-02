"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@snackveda.com", "support@snackveda.com"],
    color: "teal"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 98765 43210", "+91 98765 43211"],
    color: "orange"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["SnackVeda HQ", "Mumbai, Maharashtra, India"],
    color: "green"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
    color: "yellow"
  }
]

const faqs = [
  {
    question: "What is your shipping policy?",
    answer: "We offer free shipping on orders above ₹500. Standard delivery takes 3-5 business days."
  },
  {
    question: "Are your products suitable for vegans?",
    answer: "Most of our products are vegan-friendly. Check individual product labels for specific dietary information."
  },
  {
    question: "Do you offer bulk discounts?",
    answer: "Yes! Check our B2B Solutions page for bulk order pricing and custom packaging options."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 7 days of delivery if the product is unopened and in original condition."
  }
]

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[var(--teal-light)] to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-[var(--teal)]/10 text-[var(--teal-dark)] px-4 py-2 rounded-full mb-6 font-semibold text-sm">
              <MessageCircle className="w-4 h-4" />
              We're Here to Help
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black mb-6">
              Get in <span className="text-[var(--teal)]">Touch</span>
            </h1>
            
            <p className="text-xl text-foreground/70">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 text-center hover:shadow-xl transition-all border-2 hover:border-[var(--teal)] h-full">
                  <div className={`w-14 h-14 mx-auto rounded-2xl bg-[var(--${info.color})]/10 flex items-center justify-center mb-4`}>
                    <info.icon className={`w-7 h-7 text-[var(--${info.color})]`} />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{info.title}</h3>
                  {info.details.map((detail, didx) => (
                    <p key={didx} className="text-foreground/70 text-sm">
                      {detail}
                    </p>
                  ))}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h2 className="text-4xl font-black mb-4">
                  Send Us a <span className="text-[var(--teal)]">Message</span>
                </h2>
                <p className="text-lg text-foreground/70">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>
              </div>

              <Card className="p-8 border-2">
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName"
                        placeholder="John"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName"
                        placeholder="Doe"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input 
                      id="subject"
                      placeholder="How can we help you?"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <Button 
                    size="lg"
                    className="w-full bg-[var(--orange)] hover:bg-[var(--orange-dark)] text-white font-bold h-14 group"
                  >
                    Send Message
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <Card className="overflow-hidden border-2">
                <div className="relative h-[400px] bg-muted">
                  <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                    alt="Office location"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <div className="text-white">
                      <h3 className="text-2xl font-black mb-2">Visit Our Office</h3>
                      <p className="text-white/90">Mumbai, Maharashtra, India</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Info */}
              <Card className="p-8 border-2 bg-gradient-to-br from-[var(--teal)]/5 to-[var(--orange)]/5">
                <h3 className="text-2xl font-black mb-6">Why Choose SnackVeda?</h3>
                <ul className="space-y-4">
                  {[
                    "24/7 Customer Support",
                    "100% Quality Guarantee",
                    "Fast & Reliable Delivery",
                    "Easy Returns & Refunds",
                    "Secure Payment Options"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[var(--teal)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="text-foreground/80 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              Frequently Asked <span className="text-[var(--teal)]">Questions</span>
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 border-2 hover:border-[var(--teal)] transition-all">
                  <h3 className="text-lg font-bold mb-3 text-[var(--teal)]">
                    {faq.question}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--charcoal)] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl font-black mb-6">
              Ready to Start Your <span className="text-[var(--teal-light)]">Wellness Journey?</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Explore our range of delicious, nutritious snacks and experience the SnackVeda difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-[var(--orange)] hover:bg-[var(--orange-dark)] text-white font-bold h-14 px-8"
              >
                Shop Now
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[var(--charcoal)] font-bold h-14 px-8"
              >
                View Products
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
