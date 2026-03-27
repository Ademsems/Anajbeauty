import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getContentfulClient } from '@/lib/contentful';
import type { BlogPost } from '@/types';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogGrid from '@/components/blog/BlogGrid';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'metadata' });
  return {
    title: t('blog_title'),
    description: t('blog_description'),
  };
}

async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  try {
    const client = getContentfulClient();
    const entries = await client.getEntries({
      content_type: 'blogPost',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      order: ['-sys.createdAt'] as any,
      locale: locale === 'fr' ? 'fr-FR' : 'en-US',
    });
    return entries.items as unknown as BlogPost[];
  } catch {
    return [];
  }
}

export default async function BlogPage({
  params,
}: {
  params: { locale: string };
}) {
  const posts = await getBlogPosts(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' });

  return (
    <main>
      <Header locale={params.locale} />

      {/* Page Hero */}
      <section className="section-px pt-40 pb-20 border-b border-sand">
        <div className="max-w-8xl mx-auto">
          <p className="text-label text-sage mb-6">{t('label')}</p>
          <h1 className="font-display text-display-lg text-charcoal whitespace-pre-line">
            {t('heading')}
          </h1>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-px section-py">
        <div className="max-w-8xl mx-auto">
          {posts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-display-md text-charcoal/40 italic">
                {t('empty')}
              </p>
            </div>
          ) : (
            <BlogGrid posts={posts} locale={params.locale} />
          )}
        </div>
      </section>

      <Footer locale={params.locale} />
    </main>
  );
}
