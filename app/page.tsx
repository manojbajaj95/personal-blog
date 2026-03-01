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
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1>
      <div className="prose">
        <CustomMDX source={about} />
      </div>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
