import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getInstagramFeed } from '@/lib/instagram';

type Props = { locale: string };

// Placeholder images for when no token is configured
const PLACEHOLDER_COUNT = 9;

export default async function InstagramSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: 'instagram' });
  const posts = await getInstagramFeed(9);
  const hasLiveFeed = posts.length > 0;

  return (
    <section className="section-px section-py bg-cream border-b border-sand">
      <div className="max-w-8xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="text-label text-sage mb-4">{t('label')}</p>
            <h2 className="font-display text-display-md text-charcoal">
              {t('heading')}
            </h2>
          </div>
          <a
            href="https://www.instagram.com/anajbeauty"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-charcoal shrink-0"
          >
            {t('handle')} <span>→</span>
          </a>
        </div>

        {/* Instagram Grid */}
        {hasLiveFeed ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-sand">
            {posts.map((post) => {
              const src =
                post.media_type === 'VIDEO'
                  ? (post.thumbnail_url ?? '/images/instagram-placeholder.jpg')
                  : post.media_url;

              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-square overflow-hidden group bg-cream-100"
                >
                  <Image
                    src={src}
                    alt={post.caption?.slice(0, 80) || 'Anaj Beauty Instagram'}
                    fill
                    className="object-cover transition-transform duration-700 ease-luxury
                               group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30
                                  transition-colors duration-500 flex items-center justify-center">
                    <span className="text-label text-cream opacity-0 group-hover:opacity-100
                                     transition-opacity duration-300 translate-y-2 group-hover:translate-y-0
                                     transition-transform">
                      {post.media_type === 'VIDEO' ? '▶' : '✦'}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          /* Placeholder grid — replace with live feed once token is set */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-sand">
            {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
              <div
                key={i}
                className="relative aspect-square bg-cream-100 overflow-hidden group"
              >
                {/* Decorative placeholder with brand texture */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-px bg-sand mx-auto mb-3" />
                    <span className="text-label text-charcoal/20">@anajbeauty</span>
                    <div className="w-8 h-px bg-sand mx-auto mt-3" />
                  </div>
                </div>
                {/* Corner decoration */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-sand" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-sand" />
              </div>
            ))}
          </div>
        )}

        {!hasLiveFeed && (
          <p className="text-center text-xs text-charcoal/30 font-light mt-4">
            {/* Developer note — not shown to users */}
            {/* Add INSTAGRAM_ACCESS_TOKEN to .env.local to enable live feed */}
            Instagram live feed — add INSTAGRAM_ACCESS_TOKEN to enable
          </p>
        )}

      </div>
    </section>
  );
}
