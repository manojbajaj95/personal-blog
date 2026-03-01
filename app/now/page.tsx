import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import { CustomMDX } from 'app/components/mdx'

export let metadata: Metadata = {
  title: 'Now',
  description:
    'What Manoj Bajaj is currently working on — building AI/ML infrastructure at Ruzo.ai.',
  alternates: {
    canonical: '/now',
  },
}

function getNowContent() {
  return fs.readFileSync(
    path.join(process.cwd(), 'content', 'now.md'),
    'utf-8'
  )
}

export default function NowPage() {
  let content = getNowContent()
  return (
    <section>
      <article className="prose">
        <CustomMDX source={content} />
      </article>
    </section>
  )
}
