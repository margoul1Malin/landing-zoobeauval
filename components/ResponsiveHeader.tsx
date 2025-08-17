"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle, FaPhone, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import LanguageSelector from '@/components/LanguageSelector';
import { useTranslations } from 'next-intl';

export function ResponsiveHeader() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-custom-color-3 backdrop-blur-md border-b border-white/10 fixed top-0 left-0 right-0 z-[9999] shadow-xl">
      <div className="w-full px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between relative">
          {/* Section gauche - Logo et Titre */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-white rounded-full border-4 border-custom-color flex items-center justify-center overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Le Clos des Rossignols"
                  width={32}
                  height={32}
                  className="object-contain w-8 h-8"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-custom-color-2 group-hover:text-white transition-colors duration-300">
                Le Clos des Rossignols - ZooParc de Beauval
              </h1>
            </div>
          </Link>


          {/* Section droite - Contacts et actions */}
          <div className="flex items-center space-x-3">
            {/* Boutons de contact */}
            <div className="hidden md:flex items-center space-x-2">
              <Link 
                href="https://share.google.com/9wMszJlRmJ6omN6la"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
                title={t('header.googleTooltip')}
              >
                <FaGoogle size={14} />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  {t('header.googleTooltip')}
                </span>
              </Link>
              <Link 
                href="tel:0611034652"
                className="group relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
                title={t('header.phoneTooltip')}
              >
                <FaPhone size={14} />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  {t('header.phone')}
                </span>
              </Link>
              <Link 
                href="mailto:mcherve.37@gmail.com"
                className="group relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-sm"
                title={t('header.emailTooltip')}
              >
                <FaEnvelope size={14} />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  {t('header.email')}
                </span>
              </Link>
            </div>

            {/* Sélecteur de langue */}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            {/* Bouton de réservation unique */}
            <div className="hidden lg:block">
              <Link 
                href="https://www.leclosdesrossignols.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-custom-color-2 text-white px-4 py-2 text-sm font-semibold hover:bg-custom-color-2/90 focus:outline-none focus:ring-2 focus:ring-custom-color-2/50 focus:ring-offset-2 focus:ring-offset-custom-color-3 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {t('header.reserve')}
              </Link>
            </div>

            {/* Bouton menu mobile */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-custom-color-3"
              >
                {isMenuOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col space-y-4 pt-4">
              {/* Image banner mobile */}
             
              {/* Boutons de contact mobile */}
              <div className="flex justify-center space-x-4">
                <Link 
                  href="https://share.google.com/9wMszJlRmJ6omN6la"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                  title="Voir sur Google"
                >
                  <FaGoogle size={16} />
                </Link>
                <Link 
                  href="tel:0611034652"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                  title="Appeler"
                >
                  <FaPhone size={16} />
                </Link>
                <Link 
                  href="mailto:mcherve.37@gmail.com"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                  title="Envoyer un email"
                >
                  <FaEnvelope size={16} />
                </Link>
              </div>

              {/* Sélecteur de langue mobile */}
              <div className="flex justify-center">
                <LanguageSelector />
              </div>

              {/* Bouton de réservation mobile */}
              <div className="flex justify-center">
                <Link 
                  href="https://www.leclosdesrossignols.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-custom-color-2 text-white px-6 py-3 text-sm font-semibold hover:bg-custom-color-2/90 transition-all duration-300 w-full max-w-xs"
                >
                  {t('header.reserve')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 