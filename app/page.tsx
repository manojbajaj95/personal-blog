import fs from 'fs'
import path from 'path'
import { CustomMDX } from 'app/components/mdx'
import { BlogPosts } from 'app/components/posts'
import { baseUrl } from 'app/sitemap'

function getHomeContent() {
  return fs.readFileSync(path.join(process.cwd(), 'content', 'home.md'), 'utf-8')
}

export default function Page() {
  let about = getHomeContent()
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            '@id': `${baseUrl}/#profilepage`,
            url: baseUrl,
            name: 'Manoj Bajaj',
            dateCreated: '2025-01-01T00:00:00.000Z',
            dateModified: new Date().toISOString(),
            mainEntity: {
              '@type': 'Person',
              '@id': `${baseUrl}/#person`,
              name: 'Manoj Bajaj',
              description:
                'Co-founder at Ruzo.ai. Building AI/ML infrastructure. From mechanical engineering at IIT Delhi to building systems that think.',
              jobTitle: 'Co-founder',
              url: baseUrl,
              worksFor: {
                '@type': 'Organization',
                name: 'Ruzo.ai',
                url: 'https://ruzo.ai',
              },
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'IIT Delhi',
              },
              sameAs: [
                'https://linkedin.com/in/manojbajaj95',
                'https://github.com/manojbajaj95',
                'https://twitter.com/senor_bajaj',
              ],
            },
            isPartOf: {
              '@type': 'WebSite',
              '@id': `${baseUrl}/#website`,
            },
          }),
        }}
      />
      <div className="prose mb-8">
        <CustomMDX source={about} />
      </div>
      <h2 className="font-semibold text-xl mb-4 tracking-tighter">Writing</h2>
      <BlogPosts />
    </section>
  )
}
