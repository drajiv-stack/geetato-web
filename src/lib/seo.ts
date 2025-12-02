// SEO utilities and schema generators
import { Metadata } from 'next'

export const siteConfig = {
  name: 'Geetato',
  description: 'Premium health-first Indian snacks made with ancient grains, ragi, millet, and quinoa. 100% natural, FSSAI certified, and delicious.',
  url: 'https://geetato.com',
  ogImage: 'https://geetato.com/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/geetato',
    instagram: 'https://instagram.com/geetato',
    facebook: 'https://facebook.com/geetato',
  }
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  return {
    title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
    description: description || siteConfig.description,
    keywords: [
      'healthy snacks',
      'ancient grains',
      'ragi',
      'millet',
      'quinoa',
      'protein cookies',
      'gluten-free',
      'vegan snacks',
      'Indian healthy snacks',
      'natural snacks',
      'FSSAI certified'
    ],
    authors: [{ name: 'Geetato' }],
    creator: 'Geetato',
    publisher: 'Geetato',
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: siteConfig.url,
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: image || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [image || siteConfig.ogImage],
      creator: '@geetato',
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
  }
}

// Organization Schema
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Geetato",
  "url": "https://geetato.com",
  "logo": "https://geetato.com/logo.png",
  "description": "Premium health-first Indian snacks made with ancient grains",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "Maharashtra"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-98765-43210",
    "contactType": "customer service",
    "email": "hello@geetato.com",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://twitter.com/geetato",
    "https://instagram.com/geetato",
    "https://facebook.com/geetato",
    "https://linkedin.com/company/geetato"
  ],
  "foundingDate": "2019",
  "founders": [
    {
      "@type": "Person",
      "name": "Priya Sharma",
      "jobTitle": "Founder & CEO"
    }
  ]
}

// Product Schema Generator
export function generateProductSchema(product: {
  id: number | string
  name: string
  description: string
  image: string
  price: string
  rating: number
  reviews: number
  category: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": "Geetato"
    },
    "category": product.category,
    "offers": {
      "@type": "Offer",
      "price": product.price.replace('₹', ''),
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `https://geetato.com/products/${product.id}`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating,
      "reviewCount": product.reviews,
      "bestRating": "5",
      "worstRating": "1"
    }
  }
}

// Breadcrumb Schema Generator
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

// Review Schema Generator
export function generateReviewSchema(reviews: {
  author: string
  rating: number
  text: string
  date: string
}[]) {
  return reviews.map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": review.text,
    "datePublished": review.date
  }))
}

// FAQ Schema Generator
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

// Local Business Schema (for physical locations)
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "name": "Geetato",
  "description": "Premium health-first Indian snacks",
  "url": "https://geetato.com",
  "telephone": "+91-98765-43210",
  "email": "hello@geetato.com",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "Maharashtra"
  },
  "servesCuisine": "Healthy Indian Snacks",
  "priceRange": "₹₹",
  "paymentAccepted": "Cash, Credit Card, Debit Card, UPI",
  "openingHours": "Mo-Sa 09:00-18:00"
}
