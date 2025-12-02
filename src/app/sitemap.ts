import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://geetato.com'
  
  // Static pages
  const routes = [
    '',
    '/products',
    '/about',
    '/b2b-solutions',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic product pages (example - you can fetch from your data source)
  const productIds = [1, 2, 3, 4, 5, 6]
  const products = productIds.map((id) => ({
    url: `${baseUrl}/products/${id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...routes, ...products]
}
