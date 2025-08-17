import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string; locale: string }> 
}): Promise<Metadata> {
  const { slug, locale } = await params;
  
  try {
    const city = await prisma.cityPage.findUnique({
      where: { slug }
    });

    if (!city) {
      return {
        title: 'Ville non trouvée',
        description: 'La ville demandée n\'existe pas.'
      };
    }

    const baseUrl = 'https://www.zoobeauvale.fr';
    // URL canonique avec toujours le préfixe de locale
    const canonicalUrl = `${baseUrl}/${locale}/villes/${slug}`;
    
    // Mappings pour les locales OpenGraph
    const localeMappings = {
      fr: 'fr_FR',
      en: 'en_US',
      es: 'es_ES',
      de: 'de_DE'
    };

    // Construire l'URL de l'image avec la locale correcte
    const imageUrl = city.backgroundImage.startsWith('http') 
      ? city.backgroundImage 
      : `${baseUrl}${city.backgroundImage}`;

    return {
      title: `Zoo Beauval - ${city.cityName} - Le Clos des Rossignols`,
      description: `Découvrez ${city.cityName} avec Val de Loire France. Activités touristiques, visites guidées et expériences uniques.`,
      keywords: `${city.cityName}, activités touristiques, Vallée de la Loire, châteaux, hébergement, Le Clos des Rossignols`,
      authors: [{ name: 'Val de Loire France' }],
      creator: 'Val de Loire France',
      publisher: 'Val de Loire France',
      metadataBase: new URL(baseUrl),
      alternates: {
        canonical: canonicalUrl,
        // Désactiver les balises hreflang automatiques pour éviter l'URL sans locale
        languages: undefined,
      },
      openGraph: {
        title: `Zoo Beauval - ${city.cityName} - Le Clos des Rossignols`,
        description: `Découvrez ${city.cityName} avec Val de Loire France. Activités touristiques, visites guidées et expériences uniques.`,
        url: canonicalUrl,
        siteName: 'Val de Loire France',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${city.cityName} - Le Clos des Rossignols`,
          },
        ],
        locale: localeMappings[locale as keyof typeof localeMappings] || 'fr_FR',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `Zoo Beauval - ${city.cityName} - Le Clos des Rossignols`,
        description: `Découvrez ${city.cityName} avec Val de Loire France. Activités touristiques, visites guidées et expériences uniques.`,
        images: [imageUrl],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata for city:', error);
    return {
      title: 'Erreur - Zoo Beauval',
      description: 'Une erreur est survenue lors du chargement de la page.'
    };
  }
}

export default function CityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 