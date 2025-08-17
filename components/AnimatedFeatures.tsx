"use client";

import { FeatureCarousel } from "@/components/ui/animated-features";
import { useTranslations } from "next-intl";

export default function AnimatedFeatures() {
  const t = useTranslations();
  const images = {
    alt: "Chemery accommodations features",
    step1img1: "/villes/contres.jpeg", // Image alternative pour l'emplacement idéal
    step1img2: "/rossignolsimg/maisondeselephants/maisondeselephants.webp", // Maison pour le confort
    step2img1: "/rossignolsimg/maisondesgiraffes/maisondesgirafes.webp", // Autre maison pour le confort
    step2img2: "/rossignolsimg/maisondeskoalas/maisondeskoalas.webp", // Troisième maison
    step3img: "/jaguarbeauval.jpg", // Zoo de Beauval
    step4img: "/villes/chambord.jpg", // Château de Chambord
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-custom-color mb-4">
            {t('seo.hotels.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('seo.hotels.subtitle')}
          </p>
        </div>

        <FeatureCarousel image={images} />
      </div>
    </section>
  );
} 