import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const secret = request.headers.get('x-contentful-secret');

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const contentType = body?.sys?.contentType?.sys?.id;
    const slug = body?.fields?.slug?.['fr-FR'] || body?.fields?.slug?.['en-US'];

    if (contentType === 'blogPost' && slug) {
      revalidatePath('/blog');
      revalidatePath(`/blog/${slug}`);
      revalidatePath('/en/blog');
      revalidatePath(`/en/blog/${slug}`);
    } else {
      // Revalidate everything on unknown content type changes
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
  } catch (err) {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
