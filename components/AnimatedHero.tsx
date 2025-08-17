"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function BackgroundPaths({
    title,
}: {
    title?: string;
}) {
    const t = useTranslations();
    const finalTitle = title || "Le Clos des Rossignols, Proche du Zoo de Beauval";

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Vidéo en background */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/HeroVideo2.mp4" type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
                
                {/* Overlay sombre pour améliorer la lisibilité du texte */}
                <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Contenu central */}
            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Titre principal */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight text-white"
                        style={{ fontFamily: 'Neucha, sans-serif' }}
                    >
                        {finalTitle}
                    </motion.h1>

                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                        className="flex justify-center mb-8"
                    >
                        <div className="w-24 h-24 bg-white rounded-full border-4 border-custom-color-2 flex items-center justify-center overflow-hidden shadow-2xl">
                            <Image
                                src="/logo.png"
                                alt="Le Clos des Rossignols"
                                width={64}
                                height={64}
                                className="object-contain w-16 h-16"
                            />
                        </div>
                    </motion.div>

                    {/* Bouton de réservation */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
                        className="inline-block group relative"
                    >
                        <button
                            onClick={() => window.open('https://leclosdesrossignols.fr/fr', '_blank')}
                            className="inline-flex items-center justify-center rounded-lg bg-custom-color-2 text-white px-8 py-4 text-lg font-semibold hover:bg-custom-color-2/90 focus:outline-none focus:ring-2 focus:ring-custom-color-2/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                            style={{ fontFamily: 'Neucha, sans-serif' }}
                        >
                            <span className="opacity-90 group-hover:opacity-100 transition-opacity">
                                {t('hero.reserve')}
                            </span>
                            <span
                                className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                transition-all duration-300"
                            >
                                →
                            </span>
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
