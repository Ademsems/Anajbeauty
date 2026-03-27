import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getContentfulClient } from '@/lib/contentful';
import type { BlogPost } from '@/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

async function getPost(slug: string, locale: string): Promise<BlogPost | null> {
  try {
    const client = getContentfulClient();
    const entries = await client.getEntries({
      content_type: 'blogPost',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'fields.slug': slug as any,
      locale: locale === 'fr' ? 'fr-FR' : 'en-US',
      limit: 1,
    });
    if (!entries.items.length) return null;
    return entries.items[0] as unknown as BlogPost;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug, params.locale);
  if (!post) return {};

  const imageUrl = post.fields.coverImage
    ? `https:${post.fields.coverImage.fields.file.url}`
    : undefined;

  return {
    title: post.fields.title,
    description: post.fields.excerpt,
    openGraph: {
      title: post.fields.title,
      description: post.fields.excerpt,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const post = await getPost(params.slug, params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' });

  if (!post) notFound();

  const publishedDate = new Date(
    post.fields.publishedAt || post.sys.createdAt
  ).toLocaleDateString(params.locale === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imageUrl = post.fields.coverImage
    ? `https:${post.fields.coverImage.fields.file.url}`
    : null;

  const blogBase =
    params.locale === 'fr' ? '/blog' : `/${params.locale}/blog`;

  return (
    <main>
      <Header locale={params.locale} />

      {/* Article Hero */}
      <section className="pt-32 pb-16 section-px border-b border-sand">
        <div className="max-w-3xl mx-auto">
          <Link
            href={blogBase}
            className="text-label text-sage hover:text-charcoal transition-colors inline-flex items-center gap-2 mb-10"
          >
            ← {t('back')}
          </Link>
          <p className="text-label text-charcoal/50 mb-4">
            {t('published')} {publishedDate}
          </p>
          <h1 className="font-display text-display-lg text-charcoal mb-6">
            {post.fields.title}
          </h1>
          {post.fields.excerpt && (
            <p className="text-lg text-charcoal/70 leading-relaxed font-light">
              {post.fields.excerpt}
            </p>
          )}
        </div>
      </section>

      {/* Cover Image */}
      {imageUrl && (
        <div className="section-px py-12">
          <div className="max-w-4xl mx-auto relative aspect-video overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.fields.coverImage?.fields.title || post.fields.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Body */}
      <article className="section-px pb-24">
        <div className="max-w-3xl mx-auto rich-text">
          {post.fields.body
            ? documentToReactComponents(post.fields.body as Parameters<typeof documentToReactComponents>[0])
            : null}
        </div>
      </article>

      <Footer locale={params.locale} />
    </main>
  );
}
