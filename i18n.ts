import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // Valider que la locale est supportée
  if (!locale || !['fr', 'en', 'de', 'es'].includes(locale)) {
    locale = 'fr';
  }
  
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    locale: locale
  };
}); 