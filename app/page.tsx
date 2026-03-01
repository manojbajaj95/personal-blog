import fs from 'fs'
import path from 'path'
import { CustomMDX } from 'app/components/mdx'
import { BlogPosts } from 'app/components/posts'

function getAboutContent() {
  return fs.readFileSync(path.join(process.cwd(), 'content', 'about.md'), 'utf-8')
}

export default function Page() {
  let about = getAboutContent()
  return (
    <section>
      <div className="prose mb-8">
        <CustomMDX source={about} />
      </div>
      <h2 className="font-semibold text-xl mb-4 tracking-tighter">Writing</h2>
      <BlogPosts />
    </section>
  )
}
