import 'dotenv/config'

const NOTION_API_KEY = process.env.NOTION_API_KEY!
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!
const NOTION_API_VERSION = '2025-09-03'

async function notionFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`https://api.notion.com/v1${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': NOTION_API_VERSION,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Notion API error: ${response.status} ${response.statusText} - ${errorText}`)
  }

  return response.json()
}

function blockToMarkdown(block: any): string {
  const type = block.type
  const content = block[type]?.rich_text || []
  
  const text = content.map((t: any) => {
    let s = t.plain_text
    if (t.annotations?.bold) s = `**${s}**`
    if (t.annotations?.italic) s = `*${s}*`
    if (t.annotations?.strikethrough) s = `~~${s}~~`
    if (t.annotations?.code) s = `\`${s}\``
    if (t.href) s = `[${s}](${t.href})`
    return s
  }).join('')

  switch (type) {
    case 'paragraph':
      return text + '\n'
    case 'heading_1':
      return `# ${text}\n`
    case 'heading_2':
      return `## ${text}\n`
    case 'heading_3':
      return `### ${text}\n`
    case 'bulleted_list_item':
      return `- ${text}\n`
    case 'numbered_list_item':
      return `1. ${text}\n`
    case 'quote':
      return `> ${text}\n`
    case 'code':
      const lang = block.code?.language || ''
      return `\`\`\`${lang}\n${text}\n\`\`\`\n`
    case 'callout':
      const icon = block.callout?.icon?.emoji || '💡'
      return `> ${icon} ${text}\n`
    case 'divider':
      return `---\n`
    case 'image':
      const imgUrl = block.image?.file?.url || block.image?.external?.url || ''
      const imgCaption = block.image?.caption?.[0]?.plain_text || ''
      return `![${imgCaption}](${imgUrl})\n`
    case 'to_do':
      const checked = block.to_do?.checked ? '[x]' : '[ ]'
      return `${checked} ${text}\n`
    default:
      return text ? `${text}\n` : ''
  }
}

async function getPageBlocks(pageId: string): Promise<string> {
  let allBlocks: any[] = []
  let cursor: string | undefined = undefined

  do {
    const params = new URLSearchParams({ page_size: '100' })
    if (cursor) params.set('start_cursor', cursor)

    const response: any = await notionFetch(`/blocks/${pageId}/children?${params}`)
    allBlocks = [...allBlocks, ...response.results]
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined
  } while (cursor)

  return allBlocks.map(blockToMarkdown).join('\n')
}

let dataSourceIdCache: string | null = null

async function getDataSourceId(): Promise<string> {
  if (dataSourceIdCache) return dataSourceIdCache

  const dbResponse: any = await notionFetch(`/databases/${NOTION_DATABASE_ID}`)
  const dataSourceId = dbResponse.data_sources?.[0]?.id
  if (!dataSourceId) {
    throw new Error('No data source found in database')
  }
  dataSourceIdCache = dataSourceId
  return dataSourceId
}

export async function getDatabasePages() {
  if (!NOTION_DATABASE_ID) {
    throw new Error('NOTION_DATABASE_ID is not set')
  }

  const dataSourceId = await getDataSourceId()

  let allPages: any[] = []
  let cursor: string | undefined = undefined

  do {
    const body: any = { page_size: 100 }
    if (cursor) body.start_cursor = cursor

    const response: any = await notionFetch(`/data_sources/${dataSourceId}/query`, {
      method: 'POST',
      body: JSON.stringify(body),
    })

    allPages = [...allPages, ...response.results]
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined
  } while (cursor)

  return allPages
}

export async function getPageMarkdown(pageId: string) {
  return getPageBlocks(pageId)
}

export async function getPageProperties(page: any) {
  const properties = page.properties

  const title = properties.Name?.title?.[0]?.plain_text ?? 'Untitled'
  const summary = properties.Summary?.rich_text?.[0]?.plain_text ?? ''
  const publishedAt = properties.Date?.date?.start ?? page.created_time
  const image = properties.Image?.url ?? null

  return {
    title,
    summary,
    publishedAt,
    image,
  }
}
