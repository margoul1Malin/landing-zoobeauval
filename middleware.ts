import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Liste des locales supportées
  locales: ['fr', 'en', 'es', 'de'],
  
  // Locale par défaut
  defaultLocale: 'fr',
  
  // Toujours afficher le préfixe de locale
  localePrefix: 'always'
});

export const config = {
  // Matcher pour les routes qui doivent être traitées par le middleware
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}; 