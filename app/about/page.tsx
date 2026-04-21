import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { CustomMDX } from 'app/components/mdx'
import { baseUrl } from 'app/sitemap'

export let metadata: Metadata = {
  title: 'About',
  description:
    'Manoj Bajaj — Co-founder at Ruzo.ai. From mechanical engineering at IIT Delhi to building AI/ML infrastructure.',
  alternates: {
    canonical: '/about',
  },
}

function getAboutContent() {
  return fs.readFileSync(
    path.join(process.cwd(), 'content', 'about.md'),
    'utf-8'
  )
}

export default function AboutPage() {
  let content = getAboutContent()
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            '@id': `${baseUrl}/about/#profilepage`,
            url: `${baseUrl}/about`,
            name: 'About Manoj Bajaj',
            dateCreated: '2025-01-01T00:00:00.000Z',
            dateModified: new Date().toISOString(),
            mainEntity: {
              '@type': 'Person',
              '@id': `${baseUrl}/#person`,
              name: 'Manoj Bajaj',
            },
            isPartOf: {
              '@type': 'WebSite',
              '@id': `${baseUrl}/#website`,
            },
          }),
        }}
      />
      <article className="prose">
        <CustomMDX source={content} />
      </article>
    </section>
  )
}
