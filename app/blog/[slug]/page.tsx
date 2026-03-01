import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

export const revalidate = 3600
export async function generateStaticParams() {
  let posts = await getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let posts = await getBlogPosts()
  let post = posts.find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let posts = await getBlogPosts()
  let post = posts.find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.updatedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              '@type': 'Person',
              '@id': `${baseUrl}/#person`,
              name: post.metadata.author || 'Manoj Bajaj',
              url: baseUrl,
            },
            publisher: {
              '@type': 'Person',
              '@id': `${baseUrl}/#person`,
              name: post.metadata.author || 'Manoj Bajaj',
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${baseUrl}/blog/${post.slug}`,
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: baseUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${baseUrl}/blog`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.metadata.title,
                item: `${baseUrl}/blog/${post.slug}`,
              },
            ],
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      {post.metadata.summary && (
        <p className="text-neutral-600 dark:text-neutral-400 mt-2">
          {post.metadata.summary}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 mb-2 text-sm text-neutral-600 dark:text-neutral-400">
        {post.metadata.author && (
          <span>{post.metadata.author}</span>
        )}
        <span>{formatDate(post.metadata.publishedAt)}</span>
        {post.metadata.updatedAt !== post.metadata.publishedAt && (
          <span>Updated {formatDate(post.metadata.updatedAt)}</span>
        )}
      </div>
      {post.metadata.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.metadata.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {post.metadata.tags.length === 0 && <div className="mb-8" />}
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
