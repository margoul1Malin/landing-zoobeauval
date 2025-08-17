"use client";

import { useState } from "react";
import Image from "next/image";
import { ReservationModal } from "@/components/ReservationModal";
import { LinkPreview } from "@/components/ui/link-preview";
import { AnimatedText } from "@/components/ui/cta";
import { PhotoGallery } from "@/components/activitiescards";
import { BackgroundPaths } from "@/components/AnimatedHero";

import { InfiniteSlider } from "@/components/testimonials-doublelinecarousel";
import { useTranslations } from 'next-intl';
import { Carousel as AnimalCarousel } from "@/components/subHeroCarousel";
import { AnimalScrollExperience } from "@/components/AnimalScrollExperience";
import { ParallaxImage } from "@/components/ParallaxImage";



export default function Home() {
  const t = useTranslations();
  const [selectedMaison, setSelectedMaison] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMaison(null);
  };

  return (
    <div className="min-h-screen bg-custom-color-2">
      {/* Header */}
     

      {/* Hero Section */}
      <BackgroundPaths title={t('heroSection.heroTitle')} />

      {/* Nouvelle Section - Maisons d'animaux et Zoo de Beauval */}
      <section className="bg-gradient-to-b from-custom-color-3 to-custom-color py-20 px-4">
        <div className="container mx-auto">
          {/* Titre principal */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Neucha, sans-serif' }}>
              {t('heroSection.title')}<br />
              <span className="text-custom-color-2">{t('heroSection.titleHighlight')}</span>
            </h2>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              {t('heroSection.subtitle')}
            </p>
          </div>

          {/* Carousel des maisons d'animaux */}
          <div className="mb-16">
            <AnimalCarousel 
              slides={t.raw('animalCarousel.slides')} 
            />
          </div>

          {/* Section de conversion Zoo de Beauval */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contenu à gauche */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Neucha, sans-serif' }}>
                {t('conversionSection.title')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">📍</div>
                  <div>
                    <h4 className="text-lg font-semibold text-custom-color mb-2">{t('conversionSection.proximity.title')}</h4>
                    <p className="text-white">{t('conversionSection.proximity.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🏠</div>
                  <div>
                    <h4 className="text-lg font-semibold text-custom-color mb-2">{t('conversionSection.thematic.title')}</h4>
                    <p className="text-white">{t('conversionSection.thematic.description')}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">💤</div>
                  <div>
                    <h4 className="text-lg font-semibold text-custom-color mb-2">{t('conversionSection.rest.title')}</h4>
                    <p className="text-white">{t('conversionSection.rest.description')}</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => window.open('https://www.leclosdesrossignols.fr/fr', '_blank')}
                  className="inline-flex items-center justify-center rounded-lg bg-custom-color cursor-pointer text-white px-8 py-4 text-lg font-semibold hover:bg-custom-color-2/90 focus:outline-none focus:ring-2 focus:ring-custom-color-2/50 focus:ring-offset-2 focus:ring-offset-custom-color-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  style={{ fontFamily: 'Neucha, sans-serif' }}
                >
                  {t('conversionSection.cta')} 
                  <span className="ml-3">→</span>
                </button>
              </div>
            </div>

            {/* Image à droite */}
            <div className="relative">
              <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl absolute -bottom-100 hidden md:block">
                <Image
                  src="/animals/cougar.jpg"
                  alt="ZooParc de Beauval"
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h4 className="text-xl font-bold mb-2">ZooParc de Beauval</h4>
                  <p className="text-sm opacity-90">L&apos;un des plus beaux zoos du monde</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-custom-color py-20 px-4">
        <div className="container mr-auto text-left">
            <div className="mb-4">
              <AnimatedText 
                texts={t.raw('animatedText.cta2')}
                className="text-4xl font-bold text-white text-left"
              />
            </div>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            {t('cta2.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LinkPreview 
              url="https://www.leclosdesrossignols.fr/"
              className="inline-flex items-center justify-center rounded-md bg-white text-lg px-8 py-4 text-custom-color hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 font-bold"
            >
              {t('cta2.reserve')}
            </LinkPreview>
            <LinkPreview 
              url="https://www.leclosdesrossignols.fr/"
              className="inline-flex items-center justify-center rounded-md border border-white bg-transparent text-lg px-8 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 font-bold"
            >
              {t('cta2.contact')}
            </LinkPreview>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-custom-color-2">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Première ligne - direction normale */}
            <InfiniteSlider
              direction="horizontal"
              duration={20}
              className="py-4"
            >
              <div className="bg-custom-color p-6 rounded-xl shadow-lg min-w-[350px] max-w-[400px]">
                <div className="flex items-center mb-4">
                  <img src="/celineroussette.jpg" alt="Céline ROUSSETTE" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-white">Céline ROUSSETTE</h4>
                    <p className="text-sm text-white">Maison des Éléphants</p>
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed line-clamp-4">
                  &quot;Super séjour entre amis. Tout était parfait. Le gîte est vraiment bien équipé, on ne manque de rien. Le lieu est agréable avec un bel extérieur pour profiter d&apos;un dîner au soleil. Rien à dire sur la propreté c&apos;était parfait. Concernant la propriétaire, elle nous a réservé un accueil chaleureux et donné de très bons conseils. Elle est toujours disponible en cas de besoin. Nous recommandons à 100% ce lieu pour profiter du zoo de Beauval, des châteaux ou simplement pour changer d&apos;air.&quot;
                </p>
              </div>

              <div className="bg-custom-color p-6 rounded-xl shadow-lg min-w-[350px] max-w-[400px]">
                <div className="flex items-center mb-4">
                  <img src="/phuong.avif" alt="Phuong Mai Vo Thi" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-white">Phuong Mai Vo Thi</h4>
                    <p className="text-sm text-white">Maison des Pandas</p>
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed line-clamp-4">
                  &quot;Bon emplacement. Logement idéal pour familles qui veulent visiter le zoo qui se situe pas loin. Nous apprécions la propreté et l&apos;entretien des lieux.&quot;
                </p>
              </div>

              <div className="bg-custom-color p-6 rounded-xl shadow-lg min-w-[350px] max-w-[400px]">
                <div className="flex items-center mb-4">
                  <img src="/anneferrari.avif" alt="Anne Ferrari" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-white">Anne Ferrari</h4>
                    <p className="text-sm text-white">Maison des Lions</p>
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed line-clamp-4">
                  &quot;Exceptionnel.&quot;
                </p>
              </div>

              {/* Deuxième set pour l'effet infini */}
              <div className="bg-custom-color p-6 rounded-xl shadow-lg min-w-[350px] max-w-[400px]">
                <div className="flex items-center mb-4">
                  <img src="/celineroussette.jpg" alt="Céline ROUSSETTE" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-white">Céline ROUSSETTE</h4>
                    <p className="text-sm text-white">Maison des Éléphants</p>
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed line-clamp-4">
                  &quot;Super séjour entre amis. Tout était parfait. Le gîte est vraiment bien équipé, on ne manque de rien. Le lieu est agréable avec un bel extérieur pour profiter d&apos;un dîner au soleil. Rien à dire sur la propreté c&apos;était parfait. Concernant la propriétaire, elle nous a réservé un accueil chaleureux et donné de très bons conseils. Elle est toujours disponible en cas de besoin. Nous recommandons à 100% ce lieu pour profiter du zoo de Beauval, des châteaux ou simplement pour changer d&apos;air.&quot;
                </p>
              </div>

              <div className="bg-custom-color p-6 rounded-xl shadow-lg min-w-[350px] max-w-[400px]">
                <div className="flex items-center mb-4">
                  <img src="/phuong.avif" alt="Phuong Mai Vo Thi" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-white">Phuong Mai Vo Thi</h4>
                    <p className="text-sm text-white">Maison des Pandas</p>
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed line-clamp-4">
                  &quot;Bon emplacement. Logement idéal pour familles qui veulent visiter le zoo qui se situe pas loin. Nous apprécions la propreté et l&apos;entretien des lieux.&quot;
                </p>
              </div>

              <div className="bg-custom-color p-6 rounded-xl shadow-lg min-w-[350px] max-w-[400px]">
                <div className="flex items-center mb-4">
                  <img src="/anneferrari.avif" alt="Anne Ferrari" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-white">Anne Ferrari</h4>
                    <p className="text-sm text-white">Maison des Lions</p>
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed line-clamp-4">
                  &quot;Exceptionnel.&quot;
                </p>
              </div>
            </InfiniteSlider>

            {/* Deuxième ligne - direction inverse */}
            <InfiniteSlider
              direction="horizontal"
              duration={18}
              reverse={true}
              className="py-4"
            >
              <div className="bg-custom-color p-6 rounded-xl shadow-lg min-w-[350px] max-w-[400px]">
                <div className="flex items-center mb-4">
                  <img src="/ivan.png" alt="Ivan Diaz" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-white">Ivan Diaz</h4>
                    <p className="text-sm text-white">Maison des Lions</p>
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed line-clamp-4">
                  &quot;Je les remercie pour leur accueil chaleureux. Tout était vraiment propre et sécurisé. J&apos;apprécie vraiment mon temps en famille là-bas. Merci encore à Jean-Pierre et Marie-Christine, les meilleurs hôtes de tous les temps !!&quot;
                </p>
              </div>

              <div className="bg-custom-color p-6 rounded-xl shadow-lg min-w-[350px] max-w-[400px]">
                <div className="flex items-center mb-4">
                  <img src="/julie.avif" alt="Julie Canadas" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-white">Julie Canadas</h4>
                    <p className="text-sm text-white">Maison des Koalas</p>
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed line-clamp-4">
                  &quot;Maison super bien placée pour allez au zoo de beauval, la maison est grande et super bien équipée tout est à disposition et les propriétaires d&apos;une très grande gentillesse. Je recommande à 100%&quot;
                </p>
              </div>

              <div className="bg-custom-color p-6 rounded-xl shadow-lg min-w-[350px] max-w-[400px]">
                <div className="flex items-center mb-4">
                  <img src="/marina.png" alt="Marina" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-white">Marina</h4>
                    <p className="text-sm text-white">Maison des Perroquets</p>
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed line-clamp-4">
                  &quot;Nous avons passé un merveilleux séjour au Clos des Rossignols, le logement était très propre et confortable, beaucoup de charme et il dispose de toutes les commodités dont nous avons besoin. L&apos;hôte était vraiment adorable, elle a un grand souci du détail dans l&apos;hébergement et est toujours disponible en cas de besoin, elle nous a également donné de bons conseils sur la région et les choses à faire. L&apos;emplacement est parfait si vous venez visiter le zoo et les châteaux de la région (et quelques vignobles aussi). Petite ville très calme qui était parfaite pour un séjour en famille et de belles balades. Je ne saurais trop recommander cet airbnb, nous prévoyons déjà de revenir lors de notre prochain voyage en France avec quelques amis pour leur faire découvrir cette belle région. Merci Marie-Christine!&quot;
                </p>
              </div>

              {/* Deuxième set pour l'effet infini */}
              <div className="bg-custom-color p-6 rounded-xl shadow-lg min-w-[350px] max-w-[400px]">
                <div className="flex items-center mb-4">
                  <img src="/ivan.png" alt="Ivan Diaz" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-white">Ivan Diaz</h4>
                    <p className="text-sm text-white">Maison des Lions</p>
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed line-clamp-4">
                  &quot;Je les remercie pour leur accueil chaleureux. Tout était vraiment propre et sécurisé. J&apos;apprécie vraiment mon temps en famille là-bas. Merci encore à Jean-Pierre et Marie-Christine, les meilleurs hôtes de tous les temps !!&quot;
                </p>
              </div>

              <div className="bg-custom-color p-6 rounded-xl shadow-lg min-w-[350px] max-w-[400px]">
                <div className="flex items-center mb-4">
                  <img src="/julie.avif" alt="Julie Canadas" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-white">Julie Canadas</h4>
                    <p className="text-sm text-white">Maison des Koalas</p>
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed line-clamp-4">
                  &quot;Maison super bien placée pour allez au zoo de beauval, la maison est grande et super bien équipée tout est à disposition et les propriétaires d&apos;une très grande gentillesse. Je recommande à 100%&quot;
                </p>
              </div>

              <div className="bg-custom-color p-6 rounded-xl shadow-lg min-w-[350px] max-w-[400px]">
                <div className="flex items-center mb-4">
                  <img src="/marina.png" alt="Marina" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-white">Marina</h4>
                    <p className="text-sm text-white">Maison des Perroquets</p>
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed line-clamp-4">
                  &quot;Nous avons passé un merveilleux séjour au Clos des Rossignols, le logement était très propre et confortable, beaucoup de charme et il dispose de toutes les commodités dont nous avons besoin. L&apos;hôte était vraiment adorable, elle a un grand souci du détail dans l&apos;hébergement et est toujours disponible en cas de besoin, elle nous a également donné de bons conseils sur la région et les choses à faire. L&apos;emplacement est parfait si vous venez visiter le zoo et les châteaux de la région (et quelques vignobles aussi). Petite ville très calme qui était parfaite pour un séjour en famille et de belles balades. Je ne saurais trop recommander cet airbnb, nous prévoyons déjà de revenir lors de notre prochain voyage en France avec quelques amis pour leur faire découvrir cette belle région. Merci Marie-Christine!&quot;
                </p>
              </div>
            </InfiniteSlider>
          </div>
        </div>
      </section>



      {/* Section Expériences Locales */}
      <AnimalScrollExperience />

      <section className="px-4 bg-custom-color-2 overflow-hidden h-[600px]">
      <PhotoGallery animationDelay={0.3} />
      </section>

      {/* Section SEO - Zoo de Beauval & Le Clos des Rossignols */}
      <section className="py-20 px-4 bg-custom-color text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Images avec effet de parallaxe au scroll */}
            <div className="relative flex items-center justify-center">
              <ParallaxImage 
                imageSrc="/animals/fungorilla.jpg"
                imageAlt="Gorilla du Zoo de Beauval"
                shadowColor="bg-custom-color-3"
              />
            </div>

            {/* Tout le contenu à droite */}
            <div className="space-y-8">
              {/* Titre et sous-titre */}
              <div className="text-left">
                <h2 className="text-4xl font-bold mb-4">
                  {t('parallaxSection.title')}
                </h2>
                <p className="text-xl text-teal-50 leading-relaxed">
                  {t('parallaxSection.subtitle')}
                </p>
              </div>

              {/* Cartes plus petites */}
              <div className="space-y-4">
                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">🦁</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{t('parallaxSection.thematicHouses.title')}</h3>
                      <p className="text-teal-50 text-sm leading-relaxed mb-3">
                        {t('parallaxSection.thematicHouses.description')}
                      </p>
                      <LinkPreview 
                        url="https://www.leclosdesrossignols.fr/"
                        className="inline-flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-semibold py-2 px-3 transition-all duration-300 border border-white/30"
                      >
                        {t('parallaxSection.thematicHouses.cta')}
                      </LinkPreview>
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">🐘</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{t('parallaxSection.beauvalZoo.title')}</h3>
                      <p className="text-teal-50 text-sm leading-relaxed mb-3">
                        {t('parallaxSection.beauvalZoo.description')}
                      </p>
                      <LinkPreview 
                        url="https://www.zoobeauval.com/"
                        className="inline-flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-semibold py-2 px-3 transition-all duration-300 border border-white/30"
                      >
                        {t('parallaxSection.beauvalZoo.cta')}
                      </LinkPreview>
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/30 hover:bg-white/30 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">🏰</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2">{t('parallaxSection.castles.title')}</h3>
                      <p className="text-teal-50 text-sm leading-relaxed mb-3">
                        {t('parallaxSection.castles.description')}
                      </p>
                      <LinkPreview 
                        url="https://www.leclosdesrossignols.fr/"
                        className="inline-flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-semibold py-2 px-3 transition-all duration-300 border border-white/30"
                      >
                        {t('parallaxSection.castles.cta')}
                      </LinkPreview>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section SEO - Mots-clés Zoo de Beauval & Clos des Rossignols */}
      <section className="py-20 px-4 bg-custom-color text-white">
        <div className="container mx-auto">
          {/* Titre principal */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Neucha, sans-serif' }}>
              {t('seoSection.title')}
            </h2>
            <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              {t('seoSection.subtitle')}
            </p>
          </div>

          {/* Grille de mots-clés SEO */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Hébergements */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-2xl font-bold mb-4">{t('seoSection.categories.accommodations.title')}</h3>
                <div className="space-y-3 text-left">
                  {t.raw('seoSection.categories.accommodations.features').map((feature: string, index: number) => (
                    <p key={index} className="text-white/80">• {feature}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Zoo de Beauval */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-4">🐘</div>
                <h3 className="text-2xl font-bold mb-4">{t('seoSection.categories.beauval.title')}</h3>
                <div className="space-y-3 text-left">
                  {t.raw('seoSection.categories.beauval.features').map((feature: string, index: number) => (
                    <p key={index} className="text-white/80">• {feature}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Châteaux de la Loire */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-4">🏰</div>
                <h3 className="text-2xl font-bold mb-4">{t('seoSection.categories.castles.title')}</h3>
                <div className="space-y-3 text-left">
                  {t.raw('seoSection.categories.castles.features').map((feature: string, index: number) => (
                    <p key={index} className="text-white/80">• {feature}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Activités et expériences */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-4">{t('seoSection.categories.activities.title')}</h3>
                <div className="space-y-3 text-left">
                  {t.raw('seoSection.categories.activities.features').map((feature: string, index: number) => (
                    <p key={index} className="text-white/80">• {feature}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Localisation et accès */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-2xl font-bold mb-4">{t('seoSection.categories.location.title')}</h3>
                <div className="space-y-3 text-left">
                  {t.raw('seoSection.categories.location.features').map((feature: string, index: number) => (
                    <p key={index} className="text-white/80">• {feature}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Réservation et services */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="text-center">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-2xl font-bold mb-4">{t('seoSection.categories.services.title')}</h3>
                <div className="space-y-3 text-left">
                  {t.raw('seoSection.categories.services.features').map((feature: string, index: number) => (
                    <p key={index} className="text-white/80">• {feature}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Call-to-action */}
          <div className="text-center">
            <p className="text-xl mb-8 text-white/80">
              {t('seoSection.cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LinkPreview 
                url="https://www.leclosdesrossignols.fr/"
                className="inline-flex items-center justify-center rounded-lg bg-custom-color-2 text-lg px-8 py-4 text-white hover:bg-custom-color-2/90 font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('seoSection.cta.reserve')}
              </LinkPreview>
              <LinkPreview 
                url="https://www.zoobeauval.com/"
                className="inline-flex items-center justify-center rounded-lg border-2 border-custom-color-2 bg-transparent text-lg px-8 py-4 text-custom-color-2 hover:bg-custom-color-2 hover:text-white font-bold transition-all duration-300"
              >
                {t('seoSection.cta.visitZoo')}
              </LinkPreview>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de réservation */}
      {selectedMaison && (
        <ReservationModal
          maison={selectedMaison}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

