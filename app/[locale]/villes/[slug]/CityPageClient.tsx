"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { FeatureSteps } from "@/components/ui/features-component";
import { CityHeroPolygon } from "@/components/CityHeroPolygon";
import { CityMap } from "@/components/CityMap";
import { TestimonialsHorizontal } from "@/components/TestimonialsHorizontal";
import ReactMarkdown from 'react-markdown';
import { translateContent } from '@/lib/translations';
import { getCityCoordinates } from '@/lib/cityCoordinates';
import Link from "next/link";

interface CityPageClientProps {
  city: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  locale: string;
}

export function CityPageClient({ city, locale }: CityPageClientProps) {
  const t = useTranslations();

  // Obtenir les coordonnées de la ville actuelle
  const cityCoordinates = getCityCoordinates(city.cityName);



  // Questions FAQ avec disposition aléatoire basée sur le nom de la ville
  const faqQuestions = [
    {
      question: t('cities.dynamic.faq.q1.question', { cityName: city.cityName }),
      answer: t('cities.dynamic.faq.q1.answer', { cityName: city.cityName }),
      icon: "🏰",
      category: "location"
    },
    {
      question: t('cities.dynamic.faq.q2.question', { cityName: city.cityName }),
      answer: t('cities.dynamic.faq.q2.answer', { cityName: city.cityName }),
      icon: "📅",
      category: "planning"
    },
    {
      question: t('cities.dynamic.faq.q3.question', { cityName: city.cityName }),
      answer: t('cities.dynamic.faq.q3.answer', { cityName: city.cityName }),
      icon: "🚗",
      category: "transport"
    },
    {
      question: t('cities.dynamic.faq.q4.question', { cityName: city.cityName }),
      answer: t('cities.dynamic.faq.q4.answer', { cityName: city.cityName }),
      icon: "🍽️",
      category: "food"
    },
    {
      question: t('cities.dynamic.faq.q5.question', { cityName: city.cityName }),
      answer: t('cities.dynamic.faq.q5.answer', { cityName: city.cityName }),
      icon: "👨‍👩‍👧‍👦",
      category: "family"
    },
    {
      question: t('cities.dynamic.faq.q6.question', { cityName: city.cityName }),
      answer: t('cities.dynamic.faq.q6.answer', { cityName: city.cityName }),
      icon: "❄️",
      category: "season"
    },
    {
      question: t('cities.dynamic.faq.q7.question', { cityName: city.cityName }),
      answer: t('cities.dynamic.faq.q7.answer', { cityName: city.cityName }),
      icon: "🏠",
      category: "accommodation"
    },
    {
      question: t('cities.dynamic.faq.q8.question', { cityName: city.cityName }),
      answer: t('cities.dynamic.faq.q8.answer', { cityName: city.cityName }),
      icon: "🎫",
      category: "booking"
    },
    {
      question: t('cities.dynamic.faq.q9.question', { cityName: city.cityName }),
      answer: t('cities.dynamic.faq.q9.answer', { cityName: city.cityName }),
      icon: "🎉",
      category: "events"
    },
    {
      question: t('cities.dynamic.faq.q10.question', { cityName: city.cityName }),
      answer: t('cities.dynamic.faq.q10.answer', { cityName: city.cityName }),
      icon: "🛍️",
      category: "shopping"
    },
    {
      question: t('cities.dynamic.faq.q11.question', { cityName: city.cityName }),
      answer: t('cities.dynamic.faq.q11.answer', { cityName: city.cityName }),
      icon: "💕",
      category: "romance"
    },
    {
      question: t('cities.dynamic.faq.q12.question', { cityName: city.cityName }),
      answer: t('cities.dynamic.faq.q12.answer', { cityName: city.cityName }),
      icon: "🥾",
      category: "outdoor"
    },
    {
      question: t('cities.dynamic.faq.q13.question', { cityName: city.cityName }),
      answer: t('cities.dynamic.faq.q13.answer', { cityName: city.cityName }),
      icon: "🌿",
      category: "nature"
    },
    {
      question: t('cities.dynamic.faq.q14.question', { cityName: city.cityName }),
      answer: t('cities.dynamic.faq.q14.answer', { cityName: city.cityName }),
      icon: "🎨",
      category: "culture"
    },
    {
      question: t('cities.dynamic.faq.q15.question', { cityName: city.cityName }),
      answer: t('cities.dynamic.faq.q15.answer', { cityName: city.cityName }),
      icon: "💡",
      category: "tips"
    }
  ];

  // Mélanger les questions de manière déterministe basée sur le nom de la ville
  const shuffledFaqQuestions = useMemo(() => {
    const seed = city.cityName.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    const seededShuffle = (array: typeof faqQuestions) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = (seed + i) % (i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    return seededShuffle(faqQuestions);
  }, [city.cityName]); // eslint-disable-line react-hooks/exhaustive-deps

  // Données des maisons thématiques pour le composant FeatureSteps
  const thematicHouses = [
    {
      step: "Maison des Éléphants",
      title: "Maison des Éléphants",
      content: "Plongez dans l'univers majestueux des éléphants avec cette maison thématique unique. Découvrez un hébergement où chaque détail évoque la grandeur et la sagesse de ces géants de la savane.",
      image: "/rossignolsimg/maisondeselephants/maisondeselephants.webp"
    },
    {
      step: "Maison des Girafes",
      title: "Maison des Girafes",
      content: "Élevez-vous vers de nouveaux sommets dans cette maison inspirée des girafes. Avec ses hauts plafonds et son design élégant, elle offre une expérience d'hébergement hors du commun.",
      image: "/rossignolsimg/maisondesgiraffes/maisondesgirafes.webp"
    },
    {
      step: "Maison des Koalas",
      title: "Maison des Koalas",
      content: "Détendez-vous dans cette maison apaisante inspirée des koalas. Un havre de paix où la sérénité et le confort se rencontrent pour créer une expérience de détente inoubliable.",
      image: "/rossignolsimg/maisondeskoalas/maisondeskoalas.webp"
    },
    {
      step: "Maison des Lions",
      title: "Maison des Lions",
      content: "Régnez en maître dans cette maison royale inspirée des lions. Un hébergement de luxe où le raffinement et la puissance se conjuguent pour une expérience exceptionnelle.",
      image: "/rossignolsimg/maisondeslions/maisondeslions.jpg"
    },
    {
      step: "Maison des Otaries",
      title: "Maison des Otaries",
      content: "Plongez dans l'univers marin avec cette maison inspirée des otaries. Un espace dynamique et accueillant qui évoque la joie de vivre et la convivialité de ces animaux marins.",
      image: "/rossignolsimg/maisondesotaries/maisondesotaries.webp"
    },
    {
      step: "Maison des Ours",
      title: "Maison des Ours",
      content: "Câlinez-vous dans cette maison chaleureuse inspirée des ours. Un refuge douillet où le confort et la chaleur humaine créent une atmosphère familiale et réconfortante.",
      image: "/rossignolsimg/maisondesours/maisondesours.webp"
    },
    {
      step: "Maison des Pandas",
      title: "Maison des Pandas",
      content: "Découvrez l'harmonie parfaite dans cette maison zen inspirée des pandas. Un équilibre entre tradition et modernité pour une expérience d'hébergement unique et apaisante.",
      image: "/rossignolsimg/maisondespandas/maisondespandas.webp"
    },
    {
      step: "Maison des Perroquets",
      title: "Maison des Perroquets",
      content: "Ajoutez de la couleur à votre séjour dans cette maison vibrante inspirée des perroquets. Un espace joyeux et coloré qui transforme chaque moment en une aventure colorée.",
      image: "/rossignolsimg/maisondesperroquets/maisondesperroquets.webp"
    },
    {
      step: "Maison des Singes",
      title: "Maison des Singes",
      content: "Amusez-vous dans cette maison ludique inspirée des singes. Un espace dynamique et amusant où la créativité et le jeu sont au cœur de l'expérience d'hébergement.",
      image: "/rossignolsimg/maisondessinges/maisondessinges.webp"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section avec design polygon */}
      <CityHeroPolygon 
        cityName={city.cityName}
        backgroundImage={city.backgroundImage}
      />

      {/* Section Carte Interactive de la Ville */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-custom-color mb-4">
              {t('cities.dynamic.map.title', { cityName: city.cityName })}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('cities.dynamic.map.subtitle', { cityName: city.cityName })}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Informations sur la ville */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-custom-color mb-4">
                  {t('cities.dynamic.map.location.title')}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-custom-color rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{city.cityName}</p>
                      <p className="text-gray-600">Val de Loire, France</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-custom-color rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t('cities.dynamic.map.location.region')}</p>
                      <p className="text-gray-600">{t('cities.dynamic.map.location.regionDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-custom-color rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t('cities.dynamic.map.location.distance')}</p>
                      <p className="text-gray-600">{t('cities.dynamic.map.location.distanceDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="https://www.leclosdesrossignols.fr/fr"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-custom-color text-white font-semibold hover:bg-custom-color/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {t('cities.dynamic.map.cta1')}
                </Link>
                <Link 
                  href="https://www.leclosdesrossignols.fr/fr"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 border-2 border-custom-color text-custom-color font-semibold hover:bg-custom-color transition-all duration-300"
                >
                  {t('cities.dynamic.map.cta2')}
                </Link>
              </div>
            </div>

            {/* Carte interactive */}
            <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
              <CityMap 
                cityName={city.cityName}
                coordinates={cityCoordinates}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Nos Maisons Thématiques - FeatureSteps */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-custom-color mb-4">
              {t('cities.dynamic.houses.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('cities.dynamic.houses.subtitle')}
            </p>
          </div>

          <FeatureSteps
            features={thematicHouses}
            autoPlayInterval={4000}
            imageHeight="h-[500px]"
            className="bg-transparent"
          />
        </div>
      </section>

      {/* Section Témoignages Clients */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-custom-color mb-4">
              {t('cities.dynamic.testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('cities.dynamic.testimonials.subtitle')}
            </p>
          </div>
          
          <TestimonialsHorizontal />
        </div>
      </section>

      {/* Section CTA Val de Loire France */}
      <section className="py-20 px-4 bg-custom-color text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            {t('cities.dynamic.finalCta2.title', { cityName: city.cityName })}
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t('cities.dynamic.finalCta2.subtitle', { cityName: city.cityName })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://www.leclosdesrossignols.fr/fr"
              className="inline-flex items-center justify-center rounded-md bg-white text-lg px-8 py-4 text-custom-color hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 font-medium transition-colors"
            >
              {t('cities.dynamic.finalCta2.cta1')}
            </Link>
            <Link 
              href="https://www.leclosdesrossignols.fr/fr"
              className="inline-flex items-center justify-center rounded-md border border-white bg-transparent text-lg px-8 py-4 text-white hover:bg-white hover:text-custom-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 font-medium transition-colors"
            >
              {t('cities.dynamic.finalCta2.cta2', { cityName: city.cityName })}
            </Link>
          </div>
        </div>
      </section>

      {/* Section Spécifique à la Ville - Redesign */}
      <section className="py-24 px-4 bg-custom-color relative overflow-hidden">
        {/* Éléments décoratifs de fond */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-custom-color rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-custom-color-2 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-custom-color rounded-full blur-2xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-custom-color-2 rounded-full"></div>
              <div className="w-3 h-3 bg-custom-color-2 rounded-full"></div>
              <div className="w-2 h-2 bg-custom-color-2 rounded-full"></div>
            </div>
            <h2 className="text-5xl font-bold bg-custom-color-2 bg-clip-text text-transparent mb-6">
              {translateContent(city.citySectionTitle || t('cities.dynamic.citySection.defaultTitle'), locale)}
            </h2>
            <p className="text-xl text-custom-color-2 max-w-4xl mx-auto leading-relaxed">
              {translateContent(city.citySectionSubtitle || t('cities.dynamic.citySection.defaultSubtitle'), locale)}
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            {city.citySectionParagraphs.map((paragraph: string, index: number) => (
              <div key={index} className="group relative">
                {/* Carte principale avec design asymétrique */}
                <div className={`
                  relative bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl 
                  hover:shadow-3xl transition-all duration-700 transform hover:scale-105 
                  border border-custom-color h-full flex flex-col
                  ${index % 2 === 0 ? 'hover:-rotate-1' : 'hover:rotate-1'}
                  ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'}
                `}>
                  {/* Indicateur de numéro avec style moderne */}
                  <div className={`
                    absolute -top-4 -left-4 w-16 h-16 rounded-2xl flex items-center justify-center
                    text-2xl font-bold shadow-lg
                    ${index % 2 === 0 ? 'bg-custom-color-2 text-custom-color' : 'bg-custom-color text-custom-color-2'}
                  `}>
                    {index + 1}
                  </div>
                  
                  {/* Contenu avec typographie améliorée */}
                  <div className="text-custom-color-2 leading-relaxed flex-1 mt-6">
                    <ReactMarkdown 
                      components={{
                        p: ({children}) => <p className="text-custom-color leading-relaxed mb-6 text-lg">{children}</p>,
                        strong: ({children}) => <strong className="font-bold text-custom-color">{children}</strong>,
                        em: ({children}) => <em className="italic text-custom-color font-medium">{children}</em>,
                        h1: ({children}) => <h1 className="text-3xl font-bold text-custom-color mb-6">{children}</h1>,
                        h2: ({children}) => <h2 className="text-2xl font-bold text-custom-color mb-4">{children}</h2>,
                        h3: ({children}) => <h3 className="text-xl font-semibold text-custom-color mb-3">{children}</h3>,
                        ul: ({children}) => <ul className="list-none space-y-3 mb-6">{children}</ul>,
                        ol: ({children}) => <ol className="list-decimal list-inside space-y-3 mb-6 text-custom-color">{children}</ol>,
                        li: ({children}) => (
                          <li className="text-custom-color flex items-start gap-3">
                            <div className="w-2 h-2 bg-custom-color rounded-full mt-3 flex-shrink-0"></div>
                            <span>{children}</span>
                          </li>
                        ),
                        blockquote: ({children}) => (
                          <blockquote className="border-l-4 border-custom-color pl-6 italic text-custom-color mb-6 bg-custom-color/5 p-4 rounded-r-xl">
                            {children}
                          </blockquote>
                        ),
                        code: ({children}) => <code className="bg-custom-color px-3 py-1 rounded-lg text-sm font-mono text-custom-color-2 border border-custom-color">{children}</code>,
                        pre: ({children}) => <pre className="bg-custom-color p-6 rounded-xl overflow-x-auto mb-6 border border-custom-color">{children}</pre>,
                      }}
                    >
                      {translateContent(paragraph, locale)}
                    </ReactMarkdown>
                  </div>
                </div>
                
                {/* Effet de brillance au survol */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section FAQ - Redesign */}
      <section className="py-24 px-4 bg-custom-color-2 relative overflow-hidden">
        {/* Éléments décoratifs de fond */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-32 h-32 bg-custom-color rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-40 h-40 bg-custom-color-2 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-custom-color rounded-full"></div>
              <div className="w-3 h-3 bg-custom-color rounded-full"></div>
              <div className="w-2 h-2 bg-custom-color rounded-full"></div>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-custom-color via-custom-color-2 to-custom-color bg-clip-text text-transparent mb-6">
            {t('cities.dynamic.faq.title', { cityName: city.cityName })}
            </h2>
            <p className="text-xl text-custom-color/80 max-w-4xl mx-auto leading-relaxed">
              {t('cities.dynamic.faq.subtitle', { cityName: city.cityName })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full mx-auto">
            {shuffledFaqQuestions.map((faq, index) => (
              <div key={index} className="group relative">
                <div className="bg-custom-color p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-custom-color-2/20 h-full flex flex-col">
                  {/* En-tête avec catégorie */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-custom-color-2 mb-2 leading-tight">
                      {faq.question}
                    </h3>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-custom-color-2/20 rounded-full">
                      <span className="w-2 h-2 bg-custom-color-2 rounded-full"></span>
                      <span className="text-xs font-medium text-custom-color-2 uppercase tracking-wide">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Réponse */}
                  <div className="flex-1">
                    <p className="text-custom-color-2 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                  
                  {/* Ligne décorative en bas */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-custom-color-2 rounded-b-2xl"></div>
                  
                  {/* Effet de brillance au survol */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-custom-color-2/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            ))}


          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-custom-color text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            {t('cities.dynamic.finalCta1.title', { cityName: city.cityName })}
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t('cities.dynamic.finalCta1.subtitle', { cityName: city.cityName })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="https://www.leclosdesrossignols.fr/fr"
              className="inline-flex items-center justify-center rounded-md bg-white text-lg px-8 py-4 text-custom-color hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 font-medium transition-colors"
            >
              {t('cities.dynamic.finalCta1.cta1')}
            </Link>
            <Link 
              href="https://www.leclosdesrossignols.fr/fr"
              className="inline-flex items-center justify-center rounded-md border border-white bg-transparent text-lg px-8 py-4 text-white hover:bg-white hover:text-custom-color focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 font-medium transition-colors"
            >
              {t('cities.dynamic.finalCta1.cta2', { cityName: city.cityName })}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 