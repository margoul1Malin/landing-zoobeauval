"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { CityMap } from "@/components/CityMap";
import ReactMarkdown from 'react-markdown';
import { translateContent } from '@/lib/translations';
import { getCityCoordinates } from '@/lib/cityCoordinates';
import Link from "next/link";
import { FallingLeaves } from "@/components/FallingLeaves";
import { CityParallaxHero } from "@/components/CityParallaxHero";
import { cityImages } from "@/lib/cityImages";
import { LayoutGrid } from "@/components/gridlay";

interface CityPageClientProps {
  city: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  locale: string;
}

export function CityPageClient({ city, locale }: CityPageClientProps) {
  const t = useTranslations();

  // Obtenir les coordonnées de la ville actuelle
  const cityCoordinates = getCityCoordinates(city.cityName);

  // Gestionnaire pour déployer tous les paragraphes de la même ligne
  const handleParagraphToggle = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const currentSummary = event.currentTarget;
    const currentDetails = currentSummary.closest('details');
    const currentIndex = parseInt(currentDetails?.getAttribute('data-paragraph-id') || '0');
    
    // Calculer la ligne actuelle (0 ou 1 pour 2 colonnes)
    const currentRow = Math.floor(currentIndex / 2);
    
    // Trouver tous les paragraphes de la même ligne
    const allDetails = document.querySelectorAll('.city-paragraph-3d');
    allDetails.forEach((details) => {
      const detailsIndex = parseInt(details.getAttribute('data-paragraph-id') || '0');
      const detailsRow = Math.floor(detailsIndex / 2);
      
      if (detailsRow === currentRow) {
        // Ouvrir tous les paragraphes de la même ligne
        details.setAttribute('open', '');
      } else {
        // Fermer les paragraphes des autres lignes
        details.removeAttribute('open');
      }
    });
  };



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



  // Composants Skeleton pour chaque maison thématique
  const MaisonElephants = () => (
    <div>
      <p className="font-bold md:text-4xl text-xl text-custom-color font-heading">
        {t('maisons.elephants.name')}
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-custom-color/80">
        {t('maisons.elephants.description')}
      </p>
    </div>
  );

  const MaisonGirafes = () => (
    <div>
      <p className="font-bold md:text-4xl text-xl text-custom-color font-heading">
        {t('maisons.giraffes.name')}
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-custom-color/80">
        {t('maisons.giraffes.description')}
      </p>
    </div>
  );

  const MaisonKoalas = () => (
    <div>
      <p className="font-bold md:text-4xl text-xl text-custom-color font-heading">
        {t('maisons.koalas.name')}
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-custom-color/80">
        {t('maisons.koalas.description')}
      </p>
    </div>
  );

  const MaisonLions = () => (
    <div>
      <p className="font-bold md:text-4xl text-xl text-custom-color font-heading">
        {t('maisons.lions.name')}
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-custom-color/80">
        {t('maisons.lions.description')}
      </p>
    </div>
  );

  const MaisonOtaries = () => (
    <div>
      <p className="font-bold md:text-4xl text-xl text-custom-color font-heading">
        {t('maisons.otaries.name')}
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-custom-color/80">
        {t('maisons.otaries.description')}
      </p>
    </div>
  );

  const MaisonOurs = () => (
    <div>
      <p className="font-bold md:text-4xl text-xl text-custom-color font-heading">
        {t('maisons.ours.name')}
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-custom-color/80">
        {t('maisons.ours.description')}
      </p>
    </div>
  );

  const MaisonPandas = () => (
    <div>
      <p className="font-bold md:text-4xl text-xl text-custom-color font-heading">
        {t('maisons.pandas.name')}
      </p>
      <p className="font-normal text-base my-4 max-w-lg text-custom-color/80">
        {t('maisons.pandas.description')}
      </p>
    </div>
  );

  // Cartes pour le LayoutGrid - Disposition 4x4 pour un carré parfait
  const houseCards = [
    {
      id: 1,
      content: <MaisonElephants />,
      className: "md:col-span-2 md:row-span-1",
      thumbnail: "/rossignolsimg/maisondeselephants/maisondeselephants.webp",
    },
    {
      id: 2,
      content: <MaisonGirafes />,
      className: "md:col-span-1 md:row-span-1",
      thumbnail: "/rossignolsimg/maisondesgiraffes/maisondesgirafes.webp",
    },
    {
      id: 3,
      content: <MaisonKoalas />,
      className: "md:col-span-1 md:row-span-1",
      thumbnail: "/rossignolsimg/maisondeskoalas/maisondeskoalas.webp",
    },
    {
      id: 4,
      content: <MaisonLions />,
      className: "md:col-span-2 md:row-span-1",
      thumbnail: "/rossignolsimg/maisondeslions/maisondeslions.jpg",
    },
    {
      id: 5,
      content: <MaisonOtaries />,
      className: "md:col-span-1 md:row-span-1",
      thumbnail: "/rossignolsimg/maisondesotaries/maisondesotaries.webp",
    },
    {
      id: 6,
      content: <MaisonOurs />,
      className: "md:col-span-1 md:row-span-1",
      thumbnail: "/rossignolsimg/maisondesours/maisondesours.webp",
    },
    {
      id: 7,
      content: <MaisonPandas />,
      className: "md:col-span-1 md:row-span-1",
      thumbnail: "/rossignolsimg/maisondespandas/maisondespandas.webp",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section Parallax avec images */}
      <CityParallaxHero 
        images={cityImages}
        cityName={city.cityName}
        t={t}
      />

      {/* Section Nos Maisons Thématiques - LayoutGrid */}
      

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

      <section className="py-20 px-4 bg-custom-color-2">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-custom-color mb-4 font-heading">
              {t('cities.dynamic.houses.title')}
            </h2>
            <p className="text-xl text-custom-color/80 max-w-3xl mx-auto font-heading">
              {t('cities.dynamic.houses.subtitle')}
            </p>
          </div>

          <LayoutGrid cards={houseCards} />
        </div>
      </section>

      <FallingLeaves />


      {/* Section Spécifique à la Ville - Redesign avec Grid Responsive et Effet 3D */}
      <section className="py-24 px-4 bg-custom-color relative overflow-hidden" data-section="city-paragraphs">
        {/* Feuilles qui tombent avec effet parallax */}
        
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
            <h2 className="text-5xl font-bold bg-custom-color-2 bg-clip-text text-transparent mb-6 font-heading">
              {t('cities.dynamic.citySection.defaultTitle', { cityName: city.cityName })}
            </h2>
            <p className="text-xl text-custom-color-2 max-w-4xl mx-auto leading-relaxed font-heading">
              {t('cities.dynamic.citySection.defaultSubtitle')}
            </p>
          </div>

          {/* Grid responsive pour les paragraphes de la ville - Accessible sans JavaScript avec effet 3D */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mx-auto max-w-6xl">
            {city.citySectionParagraphs.map((paragraph: string, index: number) => (
              <div key={index} className="group relative">
                {/* Version accessible avec details/summary - Chaque paragraphe est indépendant */}
                <details 
                  className="city-paragraph-3d rounded-2xl transition-all duration-500 transform hover:-translate-y-2 border border-custom-color/20 h-full z-10" 
                  data-paragraph-id={index}
                >
                  <summary 
                    className="p-8 cursor-pointer list-none bg-custom-color-2 rounded-2xl"
                    onClick={handleParagraphToggle}
                  >
                    <div className="flex items-start gap-6">
                      <div className="paragraph-number w-12 h-12 bg-custom-color text-custom-color-2 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-custom-color leading-tight">
                          {t('cities.dynamic.citySection.paragraphTitle', { cityName: city.cityName })}
                        </h3>
                      </div>
                      {/* Indicateur de déploiement accessible */}
                      <div className="paragraph-arrow flex-shrink-0 w-8 h-8 bg-custom-color text-custom-color-2 rounded-full flex items-center justify-center transition-transform duration-300 group-open:rotate-180">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  
                  {/* Contenu du paragraphe */}
                  <div className="px-8 pb-8 bg-custom-color-2 rounded-b-2xl">
                    <div className="pt-6 border-t border-custom-color/20">
                      <div className="text-custom-color leading-relaxed">
                        <ReactMarkdown 
                          components={{
                            p: ({children}) => <p className="text-custom-color leading-relaxed mb-4 text-base">{children}</p>,
                            strong: ({children}) => <strong className="font-bold text-custom-color">{children}</strong>,
                            em: ({children}) => <em className="italic text-custom-color font-medium">{children}</em>,
                            h1: ({children}) => <h1 className="text-2xl font-bold text-custom-color mb-4">{children}</h1>,
                            h2: ({children}) => <h2 className="text-xl font-bold text-custom-color mb-3">{children}</h2>,
                            h3: ({children}) => <h3 className="text-lg font-semibold text-custom-color mb-2">{children}</h3>,
                            ul: ({children}) => <ul className="list-none space-y-2 mb-4">{children}</ul>,
                            ol: ({children}) => <ol className="list-decimal list-inside space-y-2 mb-4 text-custom-color">{children}</ol>,
                            li: ({children}) => (
                              <li className="text-custom-color flex items-start gap-3">
                                <div className="w-2 h-2 bg-custom-color rounded-full mt-2 flex-shrink-0"></div>
                                <span>{children}</span>
                              </li>
                            ),
                            blockquote: ({children}) => (
                              <blockquote className="border-l-4 border-custom-color pl-4 italic text-custom-color mb-4 bg-custom-color/5 p-3 rounded-r-lg">
                                {children}
                              </blockquote>
                            ),
                            code: ({children}) => <code className="bg-custom-color px-2 py-1 rounded text-sm font-mono text-custom-color-2 border border-custom-color">{children}</code>,
                            pre: ({children}) => <pre className="bg-custom-color p-4 rounded-lg overflow-x-auto mb-4 border border-custom-color">{children}</pre>,
                          }}
                        >
                          {translateContent(paragraph, locale)}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                  
                  {/* Effet de brillance au survol */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-custom-color/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </details>
                
                {/* Fallback pour les navigateurs qui ne supportent pas details/summary */}
                <noscript>
                  <div className="city-paragraph-fallback relative bg-custom-color-2 rounded-2xl border border-custom-color/20 h-full p-8 z-10">
                    <div className="relative z-10">
                      <div className="flex items-start gap-6 mb-6">
                        <div className="w-12 h-12 bg-custom-color text-custom-color-2 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-custom-color leading-tight">
                            {t('cities.dynamic.citySection.paragraphTitle', { cityName: city.cityName })}
                          </h3>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-custom-color/20">
                        <div className="text-custom-color leading-relaxed">
                          <ReactMarkdown 
                            components={{
                              p: ({children}) => <p className="text-custom-color leading-relaxed mb-4 text-base">{children}</p>,
                              strong: ({children}) => <strong className="font-bold text-custom-color">{children}</strong>,
                              em: ({children}) => <em className="italic text-custom-color font-medium">{children}</em>,
                              h1: ({children}) => <h1 className="text-2xl font-bold text-custom-color mb-4">{children}</h1>,
                              h2: ({children}) => <h2 className="text-xl font-bold text-custom-color mb-3">{children}</h2>,
                              h3: ({children}) => <h3 className="text-lg font-semibold text-custom-color mb-2">{children}</h3>,
                              ul: ({children}) => <ul className="list-none space-y-2 mb-4">{children}</ul>,
                              ol: ({children}) => <ol className="list-decimal list-inside space-y-2 mb-4 text-custom-color">{children}</ol>,
                              li: ({children}) => (
                                <li className="text-custom-color flex items-start gap-3">
                                  <div className="w-2 h-2 bg-custom-color rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{children}</span>
                                </li>
                              ),
                              blockquote: ({children}) => (
                                <blockquote className="border-l-4 border-custom-color pl-4 italic text-custom-color mb-4 bg-custom-color/5 p-3 rounded-r-lg">
                                  {children}
                                </blockquote>
                              ),
                              code: ({children}) => <code className="bg-custom-color px-2 py-1 rounded text-sm font-mono text-custom-color-2 border border-custom-color">{children}</code>,
                              pre: ({children}) => <pre className="bg-custom-color p-4 rounded-lg overflow-x-auto mb-4 border border-custom-color">{children}</pre>,
                            }}
                          >
                            {translateContent(paragraph, locale)}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </div>
                </noscript>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Section Carte Interactive de la Ville */}
       <section className="py-20 px-4 bg-custom-color">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-custom-color-2 mb-4 font-heading">
              {t('cities.dynamic.map.title', { cityName: city.cityName })}
            </h2>
            <p className="text-xl text-custom-color-2/80 max-w-3xl mx-auto text-custom-color-2">
              {t('cities.dynamic.map.subtitle', { cityName: city.cityName })}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Informations sur la ville */}
            <div className="space-y-6">
              <div className="p-8 rounded-xl shadow-lg bg-custom-color-2">
                <h3 className="text-2xl font-bold text-custom-color mb-4 font-heading">
                  {t('cities.dynamic.map.location.title')}
                </h3>
                <div className="space-y-4 bg-custom-color-2">
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
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-custom-color-3 text-white font-semibold hover:bg-custom-color/90 transition-all duration-300 transform hover:scale-105 shadow-lg font-heading"
                >
                  {t('cities.dynamic.map.cta1')}
                </Link>
                <Link 
                  href="https://www.leclosdesrossignols.fr/fr"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 border-2 border-custom-color-2 text-custom-color-2 font-semibold hover:bg-custom-color transition-all duration-300"
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

      {/* Section FAQ - Redesign avec Grid Responsive */}
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

          {/* Grid responsive pour la FAQ - Accessible sans JavaScript avec effet 3D */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full mx-auto">
            {shuffledFaqQuestions.map((faq, index) => (
              <div key={index} className="group relative">
                {/* Version accessible avec details/summary */}
                <details className="faq-3d-shadow bg-custom-color rounded-2xl transition-all duration-500 transform hover:-translate-y-2 border border-custom-color-2/20 h-full z-10">
                  <summary className="p-6 cursor-pointer list-none bg-custom-color rounded-lg">
                    <div className="flex items-start gap-4">
                      <div className="text-2xl flex-shrink-0">{faq.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-custom-color-2 mb-2 leading-tight h-48">
                          {faq.question}
                        </h3>
                        
                      </div>
                      {/* Indicateur de déploiement accessible */}
                      <div className="flex-shrink-0 w-6 h-6 bg-custom-color-2 rounded-full flex items-center justify-center transition-transform duration-300 group-open:rotate-180">
                        <svg className="w-4 h-4 text-custom-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </summary>
                  
                  {/* Contenu de la réponse */}
                  <div className="px-6 pb-6 bg-custom-color-2 rounded-b-2xl">
                    <div className="pt-4 border-t border-custom-color">
                      <p className="leading-relaxed text-sm text-custom-color">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                  

                  
                  {/* Effet de brillance au survol */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-custom-color-2/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </details>
                
                {/* Fallback pour les navigateurs qui ne supportent pas details/summary */}
                <noscript>
                  <div className="faq-fallback relative bg-custom-color rounded-2xl border border-custom-color-2/20 h-full p-6 z-10">
                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-2xl flex-shrink-0">{faq.icon}</div>
                        <div className="flex-1">
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
                      </div>
                      <div className="pt-4 border-t border-custom-color">
                        <p className="leading-relaxed text-sm text-custom-color">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </noscript>
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