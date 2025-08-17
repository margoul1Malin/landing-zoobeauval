"use client";

import Image from "next/image";
import { AnimatedText } from "@/components/ui/cta";
import { HeroCollage } from "@/components/ui/hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkPreview } from "@/components/ui/link-preview";
import ReactMarkdown from 'react-markdown';
import { useTranslations } from 'next-intl';

// Fonction pour valider une URL
function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

interface CityPreviewProps {
  formData: {
    cityName: string;
    backgroundImage: string;
    citySectionTitle: string;
    citySectionSubtitle: string;
    citySectionParagraphs: string[];
  };
}

export default function CityPreview({ formData }: CityPreviewProps) {
  const t = useTranslations();
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section GetYourGuide Ville */}
      <section className="relative h-[60vh] text-white overflow-hidden group">
        <div className="absolute inset-0 transition-transform duration-[3000ms] ease-in-out group-hover:scale-125">
          {formData.backgroundImage ? (
            <Image
              src={formData.backgroundImage}
              alt={`GetYourGuide ${formData.cityName || 'Ville'} - Activités touristiques`}
              fill
              className="object-cover"
              onError={(e) => {
                // En cas d'erreur de chargement, on cache l'image
                e.currentTarget.style.display = 'none';
              }}
              unoptimized={!isValidUrl(formData.backgroundImage)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600"></div>
          )}
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/30"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-5xl">
            <div className="mb-6">
              <AnimatedText 
                texts={[
                  t('cities.dynamic.hero.title', { cityName: formData.cityName || 'Ville' }),
                  `Découvrez ${formData.cityName || 'cette ville'}`,
                  "Vivez l'expérience",
                  "Le Clos des Rossignols"
                ]}
                className="text-5xl md:text-6xl font-bold text-white mb-4"
              />
            </div>
            <p className="text-xl md:text-2xl mb-8 text-white max-w-4xl">
              {t('cities.dynamic.hero.subtitle', { cityName: formData.cityName || 'cette ville' })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <LinkPreview 
                url="https://www.leclosdesrossignols.fr/fr"
                className="inline-flex items-center justify-center rounded-md bg-white text-lg px-8 py-4 text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 font-medium transition-colors"
              >
                {t('cities.dynamic.hero.cta1')}
              </LinkPreview>
              <LinkPreview 
                url="https://www.leclosdesrossignols.fr/"
                className="inline-flex items-center justify-center rounded-md border border-white bg-transparent text-lg px-8 py-4 text-white hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 font-medium transition-colors"
              >
                {t('cities.dynamic.hero.cta2', { cityName: formData.cityName || 'cette ville' })}
              </LinkPreview>
            </div>
          </div>
        </div>
      </section>

      {/* Section Activités GetYourGuide */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Activités <strong>GetYourGuide</strong> à {formData.cityName || 'cette ville'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Réservez vos activités touristiques, visites guidées et expériences authentiques 
              dans la Vallée de la Loire avec <strong>GetYourGuide</strong>. Découvrez des circuits touristiques exclusifs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">🏰</div>
                <CardTitle className="text-xl">Visites de Châteaux Privés</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Accédez à des châteaux privés fermés au public et découvrez l&apos;histoire de la Renaissance française de manière exclusive.
                </p>
                <LinkPreview 
                  url="https://www.leclosdesrossignols.fr/fr"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Réserver sur GetYourGuide →
                </LinkPreview>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">🍷</div>
                <CardTitle className="text-xl">Dégustations de Vins Locaux</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Découvrez les meilleurs vins de la région avec des vignerons passionnés dans des caves historiques authentiques.
                </p>
                <LinkPreview 
                  url="https://www.leclosdesrossignols.fr/fr"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Réserver sur GetYourGuide →
                </LinkPreview>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">🚴</div>
                <CardTitle className="text-xl">Balades à Vélo Guidées</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Explorez les plus beaux villages de la Loire à vélo avec nos guides locaux qui partagent leurs secrets et anecdotes.
                </p>
                <LinkPreview 
                  url="https://www.leclosdesrossignols.fr/fr"
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Réserver sur GetYourGuide →
                </LinkPreview>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <LinkPreview 
              url="https://www.leclosdesrossignols.fr/fr"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 text-lg px-8 py-4 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors"
            >
              Voir Toutes les Activités GetYourGuide
            </LinkPreview>
          </div>
        </div>
      </section>

      {/* Section Avantages GetYourGuide */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir <strong>GetYourGuide</strong> ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez les avantages exclusifs de réserver vos activités touristiques avec GetYourGuide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <CardHeader>
                <div className="text-4xl mb-4">🎫</div>
                <CardTitle className="text-xl">Billets Coupe-File</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Évitez les files d&apos;attente et profitez de votre temps au maximum.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <CardHeader>
                <div className="text-4xl mb-4">💰</div>
                <CardTitle className="text-xl">Prix Garantis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Les meilleurs prix garantis, sans frais cachés.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <CardHeader>
                <div className="text-4xl mb-4">🚌</div>
                <CardTitle className="text-xl">Transport Inclus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Transport aller-retour inclus depuis votre hébergement.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
              <CardHeader>
                <div className="text-4xl mb-4">👨‍🏫</div>
                <CardTitle className="text-xl">Guides Experts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Guides locaux passionnés et experts de la région.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Nos Maisons Thématiques - HeroCollage */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Maisons Thématiques
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos hébergements uniques dans la Vallée de la Loire
            </p>
          </div>

          <HeroCollage
            title=""
            subtitle=""
            images={[
              "/rossignolsimg/maisondeselephants/maisondeselephants.webp",
              "/rossignolsimg/maisondesgiraffes/maisondesgirafes.webp",
              "/rossignolsimg/maisondeskoalas/maisondeskoalas.webp",
              "/rossignolsimg/maisondeslions/maisondeslions.jpg",
              "/rossignolsimg/maisondesotaries/maisondesotaries.webp",
              "/rossignolsimg/maisondesours/maisondesours.webp",
              "/rossignolsimg/maisondespandas/maisondespandas.webp",
              "/chambord.jpg",
              "/chenonceau.webp",
              "/cheverny.webp",
              "/zoodebeauval.webp"
            ]}
            hideHeader={true}
          />
        </div>
      </section>

      {/* Section CTA GetYourGuide */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Prêt pour l&apos;aventure avec <strong>GetYourGuide</strong> ?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Réservez dès maintenant vos activités touristiques sur <strong>GetYourGuide</strong> et bénéficiez de nos offres spéciales. 
            Nos partenariats exclusifs vous garantissent les meilleurs prix et expériences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LinkPreview 
              url="https://www.leclosdesrossignols.fr/fr"
              className="inline-flex items-center justify-center rounded-md bg-white text-lg px-8 py-4 text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 font-medium transition-colors"
            >
              Réserver sur GetYourGuide
            </LinkPreview>
            <LinkPreview 
              url="https://www.leclosdesrossignols.fr/"
              className="inline-flex items-center justify-center rounded-md border border-white bg-transparent text-lg px-8 py-4 text-white hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 font-medium transition-colors"
            >
              Hébergement à {formData.cityName || 'cette ville'}
            </LinkPreview>
          </div>
        </div>
      </section>

      {/* Section Spécifique à la Ville */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {formData.citySectionTitle || 'Découvrez cette ville unique'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {formData.citySectionSubtitle || 'Une expérience authentique vous attend'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {formData.citySectionParagraphs.map((paragraph, index) => (
              <div key={index} className="group h-full">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
                  <div className="text-gray-700 leading-relaxed flex-1">
                    <ReactMarkdown 
                      components={{
                        p: ({children}) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
                        strong: ({children}) => <strong className="font-bold text-gray-900">{children}</strong>,
                        em: ({children}) => <em className="italic text-gray-700">{children}</em>,
                        h1: ({children}) => <h1 className="text-2xl font-bold text-gray-900 mb-4">{children}</h1>,
                        h2: ({children}) => <h2 className="text-xl font-bold text-gray-900 mb-3">{children}</h2>,
                        h3: ({children}) => <h3 className="text-lg font-semibold text-gray-900 mb-2">{children}</h3>,
                        ul: ({children}) => <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">{children}</ol>,
                        li: ({children}) => <li className="text-gray-700">{children}</li>,
                        blockquote: ({children}) => <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 mb-4">{children}</blockquote>,
                        code: ({children}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">{children}</code>,
                        pre: ({children}) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                      }}
                    >
                      {paragraph || `Contenu du paragraphe ${index + 1}`}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 