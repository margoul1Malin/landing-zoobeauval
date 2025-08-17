import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { CityPageClient } from './CityPageClient';

interface CityPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

// Fonction pour récupérer les données de la ville côté serveur
async function getCityData(slug: string) {
  try {
    const city = await prisma.cityPage.findUnique({
      where: { slug }
    });
    return city;
  } catch (error) {
    console.error('Error fetching city:', error);
    return null;
  }
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug, locale } = await params;
  const city = await getCityData(slug);

  // Si la ville n'existe pas, rediriger vers 404
  if (!city) {
    notFound();
  }

  return <CityPageClient city={city} locale={locale} />;
} 