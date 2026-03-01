import 'dotenv/config'
import { getDatabasePages, getPageMarkdown, getPageProperties } from '../app/lib/notion'

async function testConnection() {
  console.log('🔌 Testing Notion connection...\n')

  try {
    console.log('1. Fetching blog posts from database...')
    const pages = await getDatabasePages()
    console.log(`   ✓ Found ${pages.length} pages\n`)

    if (pages.length > 0) {
      console.log('   📝 Blog posts:')
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        const props = await getPageProperties(page)
        
        console.log(`   ${i + 1}. "${props.title}"`)
        console.log(`      Date: ${props.publishedAt}`)
        if (props.summary) console.log(`      Summary: ${props.summary}`)
        console.log(`      ID: ${page.id}`)
        console.log()

        console.log('   2. Fetching content...')
        const content = await getPageMarkdown(page.id)
        console.log(`      ✓ Got content (${content.length} chars)`)
        console.log(`      Preview: ${content.slice(0, 100).replace(/\n/g, '\\n')}...`)
        console.log()
      }
    }

    console.log('✅ Connection test complete!')
  } catch (error: any) {
    console.error('\n❌ Error:', error.message)
    if (error.message.includes('Could not find')) {
      console.log('\n→ Make sure the database is shared with your integration:')
      console.log('   In Notion: Click ... menu (top right) → Connect to → Select your integration')
    }
    process.exit(1)
  }
}

testConnection()
