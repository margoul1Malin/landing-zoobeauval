import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.zoobeauvale.fr'
  
  // Liste des locales supportées
  const locales = ['fr', 'en', 'es', 'de']
  
  // Liste des villes (normalisées pour les URLs)
  const cities = [
    'st-aignan-sur-cher',
    'thesee',
    'noyer-sur-cher',
    'selles-sur-cher',
    'seigy',
    'chemery',
    'contres',
    'cheverny',
    'chambord',
    'chenonceaux',
    'bracieux',
    'soings-en-sologne',
    'fontaine-en-sologne',
    'romorantin',
    'mareuil-sur-cher',
    'blois',
    'celettes',
    'cormeray',
    'st-romain-sur-cher',
    'couddes'
  ]

  const sitemap: MetadataRoute.Sitemap = []

  // Page d'accueil pour chaque locale (toujours avec préfixe)
  locales.forEach(locale => {
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    })
  })

  // Pages des villes pour chaque locale
  cities.forEach(city => {
    locales.forEach(locale => {
      sitemap.push({
        url: `${baseUrl}/${locale}/villes/${city}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })
  })

  return sitemap
} 
