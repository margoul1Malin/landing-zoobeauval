"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

interface CityHeroPolygonProps {
  cityName: string;
  backgroundImage: string;
}

export function CityHeroPolygon({ cityName, backgroundImage }: CityHeroPolygonProps) {
  const t = useTranslations();

  return (
    <section className="relative h-[400px] w-full overflow-hidden bg-white dark:bg-black text-black dark:text-white group">
      {/* Zone vidéo/image - Responsive avec adaptation mobile */}
      <motion.div
        className="absolute top-0 right-0 h-full w-full overflow-hidden"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Image avec zoom */}
        <div className="relative h-full w-full overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-[8000ms] ease-in-out group-hover:scale-125">
            <Image
              src={backgroundImage}
              alt={`${cityName} - Val de Loire`}
              fill
              className="object-cover"
            />
          </div>
          {/* Overlay noir léger sur toute l'image */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
      </motion.div>

      {/* Contenu côté gauche - Responsive */}
      <div className="relative z-10 flex h-full items-center">
        <motion.div
          className="w-full sm:max-w-xl md:max-w-5xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-start py-10"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
         <div className="flex flex-col items-start justify-start gap-2">
         <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-1 sm:mb-2 text-custom-color-2 break-words leading-tight">
            {cityName}
          </h1>
          <p className="text-xs sm:text-sm md:text-lg text-custom-color-2 mb-2 sm:mb-3 leading-relaxed max-w-[280px] sm:max-w-sm md:max-w-lg lg:max-w-none whitespace-pre-line font-medium">
            {t('cities.dynamic.hero.subtitle', { cityName })}
          </p>
         </div>

          <div className="flex flex-col items-end mt-auto gap-1.5 sm:gap-2 w-full h-full">
            <Link
              href="https://www.leclosdesrossignols.fr/fr"
              className="inline-flex items-center justify-center rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold w-full
                         bg-custom-color text-white hover:bg-custom-color/90
                         border border-custom-color/20
                         transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('cities.dynamic.hero.cta1')} <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="https://www.leclosdesrossignols.fr/fr"
              className="inline-flex items-center justify-center rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold w-full
                         border-2 border-custom-color-2 text-custom-color-2 hover:bg-custom-color-2 hover:text-white
                         transition-all duration-300 backdrop-blur-sm"
            >
              {t('cities.dynamic.hero.cta2', { cityName })} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Indicateur de scroll */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
        <div className="h-4 w-[1px] bg-custom-color-2 animate-pulse" />
      </div>
    </section>
  );
} 