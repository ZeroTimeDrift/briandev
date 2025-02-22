import { NextSeo } from 'next-seo';
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles } from '@/lib/getAllArticles'
import { formatDate } from '@/lib/formatDate'
import siteMeta from '@/data/siteMeta'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function ArticlesIndex({ articles }) {
  const headline = 'I write about things I’m learning and things I’m building.'
  const intro = "All of my long-form thoughts on programming, leadership, infrastructure, and more, collected in chronological order."

  return (
    <>
      <NextSeo
        title="FABS"
        description="FABS is a Solana token. It's a story of how a bunch of curious Solana founders in a Villa with redbull created a token. Playbook is publicly available."
        canonical="https://fabs.fun/"
        openGraph={{
          url: 'https://fabs.fun',
          images: [
            {
              url: 'https://fabs.fun/fabs.jpg',
              width: 1200,
              height: 630,
              alt: 'FABS',
            }],
          siteName: 'fabs.fun',
        }}
      />
      <SimpleLayout
        title={headline}
        intro={intro}
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  }
}
