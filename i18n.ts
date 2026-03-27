import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  return {
    locale, // Return the locale here
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
