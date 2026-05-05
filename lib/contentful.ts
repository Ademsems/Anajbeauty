import { createClient } from 'contentful';

export function getContentfulClient() {
  if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
    throw new Error('Contentful environment variables are not configured.');
  }
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });
}

export function getContentfulPreviewClient() {
  if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
    throw new Error('Contentful preview environment variables are not configured.');
  }
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    host: 'preview.contentful.com',
  });
}
