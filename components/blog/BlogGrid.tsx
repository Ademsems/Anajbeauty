import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { BlogPost } from '@/types';
import { truncate } from '@/lib/utils';

type Props = {
  posts: BlogPost[];
  locale: string;
};

const prefix = (locale: string) => (locale === 'fr' ? '' : `/${locale}`);

export default function BlogGrid({ posts, locale }: Props) {
  const t = useTranslations('blog');
  const p = prefix(locale);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-sand">
      {posts.map((post) => {
        const imageUrl = post.fields.coverImage
          ? `https:${post.fields.coverImage.fields.file.url}`
          : null;

        const date = new Date(
          post.fields.publishedAt || post.sys.createdAt
        ).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });

        return (
          <article key={post.sys.id} className="bg-cream group">
            <Link href={`${p}/blog/${post.fields.slug}`} className="block">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-100">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={post.fields.coverImage?.fields.title || post.fields.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display text-4xl text-charcoal/10">✦</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                <p className="text-label text-charcoal/40 mb-3">
                  {t('published')} {date}
                </p>
                <h3 className="font-display text-2xl text-charcoal mb-3 group-hover:text-sage transition-colors duration-300 leading-snug">
                  {post.fields.title}
                </h3>
                {post.fields.excerpt && (
                  <p className="text-sm text-charcoal/60 leading-relaxed font-light mb-6">
                    {truncate(post.fields.excerpt, 110)}
                  </p>
                )}
                <span className="text-label text-sage inline-flex items-center gap-2 transition-all duration-300 group-hover:gap-4">
                  {t('read_more')} <span>→</span>
                </span>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
