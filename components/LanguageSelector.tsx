"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export default function LanguageSelector() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'fr', name: t('languages.french'), flag: '🇫🇷' },
    { code: 'en', name: t('languages.english'), flag: '🇬🇧' },
    { code: 'es', name: t('languages.spanish'), flag: '🇪🇸' },
    { code: 'de', name: t('languages.german'), flag: '🇩🇪' }
  ];

  // Extraire la locale actuelle du pathname pour être sûr
  const currentLocaleFromPath = pathname.split('/')[1] || 'fr';
  const currentLanguage = languages.find(lang => lang.code === currentLocaleFromPath) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    // Extraire le chemin sans la locale
    const segments = pathname.split('/');
    const pathWithoutLocale = segments.length > 1 ? '/' + segments.slice(2).join('/') : '/';
    // Rediriger vers la nouvelle locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 text-sm font-medium text-white"
      >
        <FaGlobe className="text-white" size={14} />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline">{currentLanguage.code.toUpperCase()}</span>
        <FaChevronDown 
          className={`text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          size={12} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-blue-200 py-2 z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-blue-50 transition-colors duration-200 ${
                language.code === currentLocaleFromPath ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium">{language.name}</span>
              {language.code === currentLocaleFromPath && (
                <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay pour fermer le menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 