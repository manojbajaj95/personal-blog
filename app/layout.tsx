import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Manoj Bajaj',
    template: '%s | Manoj Bajaj',
  },
  description: 'Building things that think and systems that don\'t break.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Manoj Bajaj',
    description: 'Building things that think and systems that don\'t break.',
    url: baseUrl,
    siteName: 'Manoj Bajaj',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@senor_bajaj',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <link rel="me" href="https://github.com/manojbajaj95" />
        <link rel="me" href="https://linkedin.com/in/manojbajaj95" />
        <link rel="me" href="https://twitter.com/senor_bajaj" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              '@id': `${baseUrl}/#person`,
              name: 'Manoj Bajaj',
              url: baseUrl,
              description:
                'Co-founder at Ruzo.ai. Building AI/ML infrastructure. From mechanical engineering at IIT Delhi to building systems that think.',
              jobTitle: 'Co-founder',
              worksFor: {
                '@type': 'Organization',
                name: 'Ruzo.ai',
                url: 'https://ruzo.ai',
              },
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'IIT Delhi',
              },
              knowsAbout: [
                'AI/ML Infrastructure',
                'B2B SaaS',
                'Distributed Systems',
                'Production ML Pipelines',
              ],
              sameAs: [
                'https://linkedin.com/in/manojbajaj95',
                'https://github.com/manojbajaj95',
                'https://twitter.com/senor_bajaj',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${baseUrl}/#website`,
              url: baseUrl,
              name: 'Manoj Bajaj',
              description:
                'Building things that think and systems that don\'t break.',
              author: { '@id': `${baseUrl}/#person` },
            }),
          }}
        />
      </head>
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
