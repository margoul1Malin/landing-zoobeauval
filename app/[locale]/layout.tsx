import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.css';
import { ResponsiveHeader } from '@/components/ResponsiveHeader';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

// Fonction pour générer les métadonnées dynamiques
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = 'https://www.zoobeauvale.fr';
  // URL canonique avec toujours le préfixe de locale
  const canonicalUrl = `${baseUrl}/${locale}`;
  
  // Mappings pour les locales OpenGraph
  const localeMappings = {
    fr: 'fr_FR',
    en: 'en_US',
    es: 'es_ES',
    de: 'de_DE'
  };
  
  return {
    title: 'Zoo Beauval - Le Clos des Rossignols',
    description: 'Découvrez des expériences uniques dans nos maisons thématiques inspirées des animaux sauvages. Hébergements de luxe dans la Vallée de la Loire.',
    keywords: 'hébergement thématique, maison unique, Vallée de la Loire, expérience immersive, châteaux, activités touristiques',
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
      title: 'Zoo Beauval - Le Clos des Rossignols',
      description: 'Découvrez des expériences uniques dans nos maisons thématiques inspirées des animaux sauvages.',
      url: canonicalUrl,
      siteName: 'Val de Loire France',
      images: [
        {
          url: `${baseUrl}/rossignolsimg/maisondeselephants/maisondeselephants.webp`,
          width: 1200,
          height: 630,
          alt: 'Maison des Éléphants - Le Clos des Rossignols',
        },
      ],
      locale: localeMappings[locale as keyof typeof localeMappings] || 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Zoo Beauval - Le Clos des Rossignols',
      description: 'Découvrez des expériences uniques dans nos maisons thématiques inspirées des animaux sauvages.',
      images: [`${baseUrl}/rossignolsimg/maisondeselephants/maisondeselephants.webp`],
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
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

const locales = ['fr', 'en', 'es', 'de'];

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound(); // eslint-disable-line @typescript-eslint/no-explicit-any

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {/* Header Responsive */}
          <ResponsiveHeader />

          {/* Main Content */}
          <main className='mx-auto'>
            {children}
          </main>

          {/* Footer */}
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
