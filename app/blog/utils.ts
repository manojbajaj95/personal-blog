import { getDatabasePages, getPageMarkdown, getPageProperties } from 'app/lib/notion'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
  author: string
  updatedAt: string
  tags: string[]
}


function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function getBlogPosts() {

  const pages = await getDatabasePages()

  const posts = await Promise.all(
    pages.map(async (page: any) => {
      const pageId = page.id
      const properties = await getPageProperties(page)
      const content = await getPageMarkdown(pageId)

      const slug = slugify(properties.title)

      return {
        slug,
        metadata: {
          title: properties.title,
          publishedAt: properties.publishedAt,
          summary: properties.summary,
          image: properties.image ?? undefined,
          author: properties.author,
          updatedAt: properties.updatedAt,
          tags: properties.tags,
        },
        content,
      }
    })
  )

  return posts.filter(post => !post.metadata.tags.includes('draft'))
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ''

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
