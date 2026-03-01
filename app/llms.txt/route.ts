import { getBlogPosts } from 'app/blog/utils'
import { baseUrl } from 'app/sitemap'

export async function GET() {
  let posts = await getBlogPosts()

  let sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  )

  let postLinks = sortedPosts
    .map(
      (p) =>
        `- [${p.metadata.title}](${baseUrl}/blog/${p.slug}): ${p.metadata.summary}`
    )
    .join('\n')

  let content = `# Manoj Bajaj

> Co-founder at Ruzo.ai. Building AI/ML infrastructure for B2B teams.
> From mechanical engineering at IIT Delhi to building systems that think.

## Pages

- [Home](${baseUrl}): Portfolio and recent writing
- [About](${baseUrl}/about): Full background — mech eng to AI founder, career journey, what I write about
- [Now](${baseUrl}/now): What I'm currently working on and learning

## Blog Posts

${postLinks}

## Social

- [GitHub](https://github.com/manojbajaj95)
- [LinkedIn](https://linkedin.com/in/manojbajaj95)
- [Twitter](https://twitter.com/senor_bajaj)
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  })
}
