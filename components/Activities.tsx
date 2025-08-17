"use client";
import { useTranslations } from "next-intl";

export default function Activities() {
  const t = useTranslations();

  return (
    <section className="py-20 bg-custom-color">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Titre et sous-titre à gauche */}
          <div className="lg:w-1/2 text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {t('region.title')}
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed">
              {t('region.subtitle')}
            </p>
          </div>

          {/* BounceCards à droite */}
          
        </div>
      </div>
    </section>
  );
} 