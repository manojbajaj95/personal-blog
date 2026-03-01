# SEO & Personal Brand Checklist — Manoj Bajaj

## Day 1: Profile Setup [2 hours]

### LinkedIn [45 min]
- [ ] Update headline: "Building AI/ML Infrastructure & Sharing the Journey | Co-founder @ Ruzo.ai | IIT Delhi"
- [ ] Update About section: positioning statement starting with "Manoj Bajaj is..."
- [ ] Add Featured section: link to `mbajaj.me`, best projects
- [ ] Set profile to "Open to: Providing services"
- [ ] Turn on Creator Mode
- [ ] Website field → `https://mbajaj.me`

### Website [45 min]
- [ ] Point `mbajaj.me` to Vercel deployment
- [ ] Upload headshot to `public/photo.jpg`, update Person schema `image` in `layout.tsx` and `page.tsx`
- [ ] Review /about page content — edit `content/about-full.md` if needed
- [ ] Review /now page content — edit `content/now.md` if needed

### Twitter [30 min]
- [ ] Update bio: "AI/ML infra | B2B SaaS founder | Writing about systems, startups & code | IIT Delhi → FalconX → Ruzo"
- [ ] Update profile picture (same as LinkedIn)
- [ ] Pin a tweet introducing yourself
- [ ] Follow 20-30 people in your space (AI/ML founders, eng leaders)

## Day 2: First Content + GSC [2 hours]

### Google Search Console
- [ ] Verify `mbajaj.me` via DNS TXT record
- [ ] Submit sitemap: `https://mbajaj.me/sitemap.xml`
- [ ] Request indexing: URL Inspection on homepage, `/about`, `/blog`

### Write 3 LinkedIn Posts [90 min]
- [ ] Post 1: Introduction/reintroduction (publish Day 2)
- [ ] Post 2: Technical insight from Ruzo (publish Day 4)
- [ ] Post 3: Founder journey story (publish Day 6)

### Engagement [20 min]
- [ ] Comment meaningfully on 10 posts
- [ ] Respond to everyone who comments

## Day 3: First Article [2 hours]

### Choose topic:
- "From Mechanical Engineering to AI: Why an Unconventional Path Made Me a Better Founder"
- "5 Infrastructure Mistakes We Made at Ruzo (And How You Can Avoid Them)"
- "The Real Cost of AI/ML in Production: Beyond the API Pricing Page"

### Draft
- [ ] Create outline (15 min)
- [ ] Write rough draft (90 min)
- [ ] Save for editing on Day 5

## Day 4: Twitter Launch [1 hour]

- [ ] Tweet 1: Pinned reintroduction
- [ ] Tweet 2: AI infrastructure insight
- [ ] Tweet 3: Ask audience a question
- [ ] Tweet 4: Share what you're building today
- [ ] Tweet 5: Quote tweet someone with your perspective
- [ ] Reply to 10-15 tweets in your feed

## Day 5: Article Publish [2 hours]

- [ ] Edit draft (60 min)
- [ ] Add images/code snippets (20 min)
- [ ] Publish on `mbajaj.me/blog` (10 min)
- [ ] Share on LinkedIn with context (10 min)
- [ ] Share on Twitter as a thread (10 min)

## Day 6-7: Momentum + Review [2 hours]

- [ ] Post scheduled LinkedIn content (Post #3)
- [ ] Write 3 new tweets
- [ ] DM 3 people with genuine compliments/questions
- [ ] Review: which post got most engagement? Why?
- [ ] Plan Week 2: list 5 content ideas, schedule 3 LinkedIn posts

## Week 2: Entity Building

- [ ] **Create Wikidata entry**: [wikidata.org/wiki/Special:NewItem](https://www.wikidata.org/wiki/Special:NewItem)
  - Label: `Manoj Bajaj` | Description: `Indian software engineer and AI startup founder`
  - Properties: `P31` → human, `P106` → software engineer, `P856` → `https://mbajaj.me`, `P2002` → `senor_bajaj`, `P2037` → `manojbajaj95`, `P6634` → `manojbajaj95`
  - Add references from LinkedIn and GitHub for each claim
- [ ] **Update Person schema**: Add Wikidata Q-number to `sameAs` in `layout.tsx` and `page.tsx`
- [ ] **Create YouTube channel**: "Manoj Bajaj", blog URL in About
- [ ] **Consistent photo**: Same headshot on LinkedIn, GitHub, Twitter, YouTube, blog
- [ ] **Validate schema**: Run `https://mbajaj.me` through [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] **Validate JSON-LD**: Run blog posts through [Schema Validator](https://validator.schema.org)

## Week 3: Authority Signals

- [ ] **Crunchbase**: Create person profile with name, role, website, socials
- [ ] **About.me**: Full bio, link to blog + all socials
- [ ] **Dev.to**: Set up profile, cross-post 2-3 blog posts with canonical URL → `mbajaj.me`
- [ ] **Google Scholar**: Real name, blog as homepage, add employer
- [ ] **Stack Overflow**: Update profile with real name, bio, blog URL
- [ ] **GitHub audit**: Bio → "Co-founder @ Ruzo.ai | Writing at mbajaj.me", website → `https://mbajaj.me`

## Week 4: Verify & Monitor

- [ ] Check Knowledge Graph: `kgsearch.googleapis.com/v1/entities:search?query=Manoj+Bajaj`
- [ ] Test Gemini: "Who is Manoj Bajaj?"
- [ ] Test ChatGPT: "Who is Manoj Bajaj?"
- [ ] Test Perplexity: "Who is Manoj Bajaj?"
- [ ] Check GSC coverage: all pages indexed
- [ ] Verify `https://mbajaj.me/llms.txt` renders correctly
- [ ] Run all pages through [PageSpeed Insights](https://pagespeed.web.dev/)

## Month 2-3: Content & Authority

- [ ] Guest post on 1-2 publications (dev.to, CSS-Tricks, LogRocket) with author bio → `mbajaj.me`
- [ ] Build in public: share progress on Twitter, reference blog posts
- [ ] Participate in podcasts, Twitter spaces, community discussions
- [ ] Update existing posts with `dateModified` + visible "Last updated" text
- [ ] Ensure About page answers "Who is Manoj Bajaj?" definitively

## Month 3-6: Knowledge Panel

- [ ] Monitor for Knowledge Panel (search your name weekly)
- [ ] Claim panel when it appears → verify via Search Console
- [ ] Expand Wikidata: add properties as presence grows
- [ ] Add Crunchbase, Speaker Deck URLs to Person schema `sameAs`
- [ ] Monthly re-test: ask Gemini/ChatGPT/Perplexity about yourself

## Ongoing: Daily Habits

### Morning [15 min]
- Check notifications, respond to comments, engage with 5 posts

### Midday [5 min]
- Post 1-2 tweets

### Evening [10 min]
- Engage with 5 more posts, share interesting thoughts

### Weekly
- Publish 2-4 blog posts per month
- Monitor GSC for indexing issues
- Keep `dateModified` current in BlogPosting schema
- Track AI search citations
- Keep all profiles consistent (name, job, links)

## Week 1 Success Metrics

- [ ] 3 LinkedIn posts published
- [ ] 1 long-form article published on blog
- [ ] 15+ tweets sent
- [ ] Engaged with 50+ posts
- [ ] All profiles updated and cross-linked
- [ ] 50-100 new followers gained
- [ ] 5+ meaningful conversations started
