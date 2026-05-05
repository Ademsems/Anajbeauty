export type InstagramPost = {
  id: string;
  media_url: string;
  thumbnail_url?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  permalink: string;
  caption?: string;
  timestamp: string;
};

export async function getInstagramFeed(limit = 9): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    console.warn('INSTAGRAM_ACCESS_TOKEN not set — returning empty feed.');
    return [];
  }

  const fields = 'id,media_url,thumbnail_url,media_type,permalink,caption,timestamp';
  const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${token}`;

  const res = await fetch(url, { next: { revalidate: 3600 } }); // cache 1 hour

  if (!res.ok) {
    console.error('Instagram API error:', res.status, await res.text());
    return [];
  }

  const data = await res.json();
  return (data.data as InstagramPost[]) || [];
}
