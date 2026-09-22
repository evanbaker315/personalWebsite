import Link from 'next/link'
import About from '@/components/About'
import CompanyEntry from '@/components/CompanyEntry'
import Contact from '@/components/Contact'
import Hero from '@/components/Hero'
import MethodLine from '@/components/MethodLine'
import Section from '@/components/Section'
import SiteFooter from '@/components/SiteFooter'
import WorkEntry from '@/components/WorkEntry'
import WritingList from '@/components/WritingList'
import { getAllArticles } from '@/lib/articles'
import workStyles from '@/components/WorkEntry.module.css'

const APP_STORE_URL = 'https://apps.apple.com/us/app/edgebet/id6759763418'

export default function HomePage() {
  const articles = getAllArticles()

  return (
    <>
      <Hero />
      <main id="main">
        <MethodLine />

        <Section id="building" title="What I'm building">
          <CompanyEntry
            name="Demarly"
            deck="AI agents for small teams"
            screenshot={{
              src: '/images/demarly-agent-hierarchy.png',
              width: 2191,
              height: 1309,
              alt: 'Demarly agent hierarchy with a CEO above CMO and CFO leads, connected to specialist workers.',
              caption: 'The CEO, department leads, and specialist workers in Demarly.',
            }}
            link={{ href: 'https://www.demarly.ai', label: 'Live at demarly.ai' }}
          >
            <p>
              Demarly gives founders and small teams AI agents that research,
              draft, and run scheduled workflows. You manage them through a CEO
              agent, with department leads and specialist workers underneath. I
              built it end to end, product to infrastructure.
            </p>
            <p>
              Each agent has its own model and monthly budget, with an automatic
              pause at the cap. You can also bring your own API key and pay me
              nothing for compute. I gave up the markup to make the cost of an
              agent something a founder can actually predict.
            </p>
          </CompanyEntry>

          <CompanyEntry
            name="EdgeBet"
            deck="The math behind the price"
            screenshot={{
              src: '/images/edgebet-market-comparison.png',
              width: 1179,
              height: 2556,
              alt: "EdgeBet's Arbs screen showing an arbitrage opportunity between BetUS and BetOpenly on a baseball game.",
              caption: "EdgeBet's Arbs screen, showing an arbitrage opportunity between BetUS and BetOpenly on a baseball game.",
              portrait: true,
            }}
            link={{ href: APP_STORE_URL, label: 'On the App Store' }}
          >
            <p>
              An iOS app for people who bet across several sportsbooks and want
              the math instead of opinions. It compares prices across books,
              peer-to-peer exchanges, and a prediction market, accounting for
              margin and fees, and turns that into three things: arbitrage,
              positive EV, and bonus bet conversion. I built the mobile app and
              the backend.
            </p>
            <p>
              EdgeBet sells tools, not picks. That means there is no pick record
              to point at, but it is also the only version of this product I would
              put my name on.
            </p>
          </CompanyEntry>
        </Section>

        <Section id="work" title="Selected work" reveal>
          <p>
            The part I actually care about is usually below the interface.
          </p>
          <div className={workStyles.entries}>
            <WorkEntry
              title="A ledger that can't count twice"
              source="Demarly"
            >
              The API and a background worker debit the same prepaid wallet,
              while Stripe can report the same payment twice. I put the rules in
              the database: an append-only ledger, row locks, and unique
              constraints keep concurrent writes and duplicate events from
              counting twice. <Link href="/writing/never-bill-twice/">Never bill twice</Link>.
            </WorkEntry>

            <WorkEntry
              title="A fair-price engine for betting markets"
              source="EdgeBet"
            >
              The engine removes bookmaker margin, estimates fair probability
              from a weighted consensus of books and exchanges, and scores prices
              after each venue&apos;s fees. It also distrusts its own outliers:
              unusually high player-prop edges get re-scored conservatively, and
              the lower number wins.
            </WorkEntry>

            <WorkEntry
              title="Cloud commitments as an optimization problem"
              source="Nucli8, my product, built, not launched"
            >
              AWS commitments lock in spending against uncertain usage. Nucli8
              forecasts conservatively, then uses dynamic programming to cover
              the target with the fewest real instances. Purchases require human
              approval, with spend ceilings and a kill switch. Purchasing is off
              by default.
            </WorkEntry>

            <WorkEntry
              title="Production AI infrastructure"
              source="Tyler Technologies and Cloud303, as part of engineering teams"
            >
              Before the companies, I worked on AI systems inside other
              people&apos;s production environments. Document pipelines with
              confidence scores and human review, distributed inference, and one
              redesign that moved semantic search onto CPU with selective model
              fallback and took the serving footprint from 32 H100s to 4. These
              were team-built systems and my contribution was a piece of each,
              not the whole thing.
            </WorkEntry>
          </div>
        </Section>

        <Section id="writing" title="Writing" reveal>
          <p>
            I write about engineering, AI, probability, and what I learn
            building companies.
          </p>
          <WritingList articles={articles} />
        </Section>

        <Section id="about" title="About">
          <About />
        </Section>

        <Section id="contact" title="Contact">
          <Contact />
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
