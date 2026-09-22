import type { Metadata } from 'next'
import { Newsreader, Public_Sans } from 'next/font/google'
import './globals.css'

/**
 * Fonts are self-hosted by next/font at build time, not linked to
 * fonts.googleapis.com. The static export therefore makes no third-party
 * request at runtime and there is no layout shift from a fallback swap.
 * Only the weights the design actually uses are requested.
 */
const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-newsreader',
})

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-public-sans',
})

export const metadata: Metadata = {
  title: 'Evan Baker',
  description:
    'Evan Baker builds software for running businesses and making sense of markets. Building Demarly and EdgeBet in Colorado.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${publicSans.variable}`}>
      <body>
        {/* Each page owns its own header, main and footer, because the homepage
            banner is the hero and the article chrome is a back link. */}
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
