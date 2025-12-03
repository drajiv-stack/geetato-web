"use client";

import { motion } from "framer-motion";
import { Globe, Package, TrendingUp, Shield, Users, Award, CheckCircle, ArrowRight, Mail, Phone, MapPin, Truck, FileText, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const exportBenefits = [
  {
    icon: Globe,
    title: "Global Reach",
    description: "Access to 50+ countries with established distribution networks"
  },
  {
    icon: Shield,
    title: "Quality Certified",
    description: "FSSAI, HACCP, ISO 22000 certified products for international standards"
  },
  {
    icon: Package,
    title: "Custom Packaging",
    description: "White-label and private label options available"
  },
  {
    icon: TrendingUp,
    title: "Growing Market",
    description: "Tap into the $200B+ global healthy snacks market"
  }
];

const exportServices = [
  {
    icon: FileText,
    title: "Documentation Support",
    description: "Complete assistance with export documentation, certifications, and compliance"
  },
  {
    icon: Truck,
    title: "Logistics Management",
    description: "End-to-end shipping and logistics coordination"
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    description: "Volume-based pricing with flexible payment terms"
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Personal account manager for seamless communication"
  }
];

const exportDestinations = [
  { region: "North America", countries: "USA, Canada, Mexico" },
  { region: "Europe", countries: "UK, Germany, France, Netherlands" },
  { region: "Middle East", countries: "UAE, Saudi Arabia, Qatar, Kuwait" },
  { region: "Asia Pacific", countries: "Singapore, Malaysia, Australia, Japan" },
  { region: "Africa", countries: "South Africa, Kenya, Nigeria" }
];

export default function ExportPartnerPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    country: "",
    targetMarkets: "",
    productInterest: "",
    estimatedVolume: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/corporate-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          contactPerson: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          enquiryType: "Export Partnership",
          quantityEstimate: formData.estimatedVolume,
          message: `Country: ${formData.country}\nTarget Markets: ${formData.targetMarkets}\nProduct Interest: ${formData.productInterest}\n\nMessage: ${formData.message}`
        })
      });

      if (response.ok) {
        toast.success("Export inquiry submitted successfully! We'll contact you within 24 hours.");
        setFormData({
          companyName: "",
          contactPerson: "",
          email: "",
          phone: "",
          country: "",
          targetMarkets: "",
          productInterest: "",
          estimatedVolume: "",
          message: ""
        });
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to submit inquiry");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#FAF0E6] via-[#FAFAF8] to-[#FAF0E6] paper-texture overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')] bg-repeat" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#E85D75]/10 text-[#E85D75] px-4 py-2 rounded-full mb-6 font-semibold text-sm border border-[#E85D75]/30 shadow-3d"
              style={{ fontFamily: "var(--font-accent)" }}>
              <Globe className="w-4 h-4" />
              Export Partnership Opportunity
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 text-[#2C2C2E]"
              style={{ fontFamily: "var(--font-heading)" }}>
              Partner with <span className="text-[#E85D75]">Export Desi</span>
              <br />
              <span className="text-[#88A85D]">Go Global with Geetato</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-[#5D4037]/80 mb-8 leading-relaxed"
              style={{ fontFamily: "var(--font-body)" }}>
              Join forces with Export Desi, India's premier healthy snacks export partner, 
              to bring authentic Indian wellness to the world. Premium quality, global standards, seamless logistics.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#E85D75] hover:bg-[#E85D75]/90 text-white font-bold shadow-3d rounded-full px-8 btn-3d"
                style={{ fontFamily: "var(--font-accent)" }}>
                <Package className="w-5 h-5 mr-2" />
                Start Exporting
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-[#E85D75] text-[#E85D75] hover:bg-[#E85D75] hover:text-white font-bold rounded-full px-8"
                style={{ fontFamily: "var(--font-accent)" }}>
                <Link href="/products">
                  View Products
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Export Benefits */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Why <span className="text-[#E85D75]">Export</span> with Us?
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Comprehensive support for your international expansion
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {exportBenefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}>
                <Card className="p-6 bg-white border-2 border-transparent hover:border-[#E85D75] transition-all duration-300 shadow-3d rounded-3xl card-3d h-full">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#E85D75] to-[#F4A261] flex items-center justify-center shadow-3d">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                    {benefit.title}
                  </h3>
                  <p className="text-[#5D4037]/70 text-center" style={{ fontFamily: "var(--font-body)" }}>
                    {benefit.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Services */}
      <section className="py-24 bg-[#FAFAF8] paper-texture">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              Comprehensive <span className="text-[#88A85D]">Export Services</span>
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              End-to-end support for hassle-free international trade
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {exportServices.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}>
                <Card className="p-6 bg-white border-2 border-transparent hover:border-[#88A85D] transition-all duration-300 shadow-3d rounded-3xl h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#88A85D]/10 flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-6 h-6 text-[#88A85D]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                        {service.title}
                      </h3>
                      <p className="text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Destinations */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-4 text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
              <span className="text-[#F4A261]">Global</span> Export Destinations
            </h2>
            <p className="text-xl text-[#5D4037]/70 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              We've successfully exported to 50+ countries across 5 continents
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {exportDestinations.map((destination, idx) => (
              <motion.div
                key={destination.region}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}>
                <Card className="p-6 bg-gradient-to-br from-white to-[#FAF0E6] border-2 border-[#E85D75]/20 hover:border-[#E85D75] transition-all duration-300 shadow-3d rounded-3xl">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-6 h-6 text-[#E85D75]" />
                    <h3 className="text-lg font-bold text-[#2C2C2E]" style={{ fontFamily: "var(--font-heading)" }}>
                      {destination.region}
                    </h3>
                  </div>
                  <p className="text-sm text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                    {destination.countries}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-24 bg-gradient-to-br from-[#5D4037] to-[#A67C52] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-black mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Start Your <span className="text-[#F4A261]">Export Journey</span>
              </h2>
              <p className="text-xl text-white/80" style={{ fontFamily: "var(--font-body)" }}>
                Fill out the form below and our export team will contact you within 24 hours
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}>
              <Card className="p-8 bg-white rounded-3xl shadow-3d">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#2C2C2E] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        Company Name *
                      </label>
                      <Input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                        className="rounded-xl"
                        placeholder="Your Company Name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#2C2C2E] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        Contact Person *
                      </label>
                      <Input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                        className="rounded-xl"
                        placeholder="Full Name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#2C2C2E] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="rounded-xl"
                        placeholder="email@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#2C2C2E] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        Phone *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="rounded-xl"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-[#2C2C2E] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        Your Country *
                      </label>
                      <Input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="rounded-xl"
                        placeholder="e.g., United States"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-[#2C2C2E] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                        Estimated Monthly Volume
                      </label>
                      <Input
                        type="text"
                        name="estimatedVolume"
                        value={formData.estimatedVolume}
                        onChange={handleChange}
                        className="rounded-xl"
                        placeholder="e.g., 1000 kg"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-[#2C2C2E] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      Target Markets
                    </label>
                    <Input
                      type="text"
                      name="targetMarkets"
                      value={formData.targetMarkets}
                      onChange={handleChange}
                      className="rounded-xl"
                      placeholder="e.g., USA, Canada, UK"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-[#2C2C2E] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      Product Interest
                    </label>
                    <Input
                      type="text"
                      name="productInterest"
                      value={formData.productInterest}
                      onChange={handleChange}
                      className="rounded-xl"
                      placeholder="e.g., Sugar-free cookies, Protein bites"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-[#2C2C2E] mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                      Additional Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="rounded-xl min-h-[120px]"
                      placeholder="Tell us about your export requirements, distribution channels, certifications needed, etc."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-[#E85D75] hover:bg-[#E85D75]/90 text-white font-bold shadow-3d rounded-full btn-3d"
                    style={{ fontFamily: "var(--font-accent)" }}>
                    {isSubmitting ? "Submitting..." : "Submit Export Inquiry"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}>
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#E85D75]/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#E85D75]" />
                </div>
                <h4 className="font-bold text-[#2C2C2E] mb-2" style={{ fontFamily: "var(--font-heading)" }}>Email Us</h4>
                <p className="text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                  export@geetato.com
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}>
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#88A85D]/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#88A85D]" />
                </div>
                <h4 className="font-bold text-[#2C2C2E] mb-2" style={{ fontFamily: "var(--font-heading)" }}>Call Us</h4>
                <p className="text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                  +91 98765 43210
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}>
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#F4A261]/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#F4A261]" />
                </div>
                <h4 className="font-bold text-[#2C2C2E] mb-2" style={{ fontFamily: "var(--font-heading)" }}>Visit Us</h4>
                <p className="text-[#5D4037]/70" style={{ fontFamily: "var(--font-body)" }}>
                  Mumbai, India
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}