import { getBlogPosts } from 'app/blog/utils'

export const baseUrl = 'https://mbajaj.me'

export default async function sitemap() {
  let blogs = (await getBlogPosts()).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  let routes = ['', '/blog', '/about', '/now'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  return [...routes, ...blogs]
}
