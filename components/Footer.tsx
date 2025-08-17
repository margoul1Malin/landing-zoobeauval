"use client";

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FaGoogle, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Separator } from '@/components/ui/separator';

// Liste des villes pour le footer
const cities = [
  { name: 'St Aignan Sur Cher', slug: 'st-aignan-sur-cher' },
  { name: 'Thesee', slug: 'thesee' },
  { name: 'Noyer sur Cher', slug: 'noyer-sur-cher' },
  { name: 'Selles sur Cher', slug: 'selles-sur-cher' },
  { name: 'Seigy', slug: 'seigy' },
  { name: 'Chemery', slug: 'chemery' },
  { name: 'Contres', slug: 'contres' },
  { name: 'Cheverny', slug: 'cheverny' },
  { name: 'Chambord', slug: 'chambord' },
  { name: 'Chenonceaux', slug: 'chenonceaux' },
  { name: 'Bracieux', slug: 'bracieux' },
  { name: 'Soings en sologne', slug: 'soings-en-sologne' },
  { name: 'Fontaine en sologne', slug: 'fontaine-en-sologne' },
  { name: 'Romorantin', slug: 'romorantin' },
  { name: 'Mareuil sur Cher', slug: 'mareuil-sur-cher' },
  { name: 'Blois', slug: 'blois' },
  { name: 'Celettes', slug: 'celettes' },
  { name: 'Cormeray', slug: 'cormeray' },
  { name: 'St Romain Sur Cher', slug: 'st-romain-sur-cher' },
  { name: 'Couddes', slug: 'couddes' }
];

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations();

  return (
    <footer className="bg-custom-color text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informations principales */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.title')}</h3>
            <p className="text-gray-400 mb-6">
              {t('footer.description')}
            </p>
            <Link 
              href="https://www.leclosdesrossignols.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-custom-color-2 px-6 py-3 text-sm font-medium text-custom-color hover:bg-custom-color/90 focus:outline-none focus:ring-2 focus:ring-custom-color focus:ring-offset-2 transition-colors"
            >
              {t('footer.visitOfficial')}
            </Link>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.contact')}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-blue-400" size={16} />
                <p className="text-gray-400 text-sm">{t('footer.address')}</p>
              </div>
              <Link 
                href="tel:0611034652"
                className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaPhone size={16} />
                <span className="text-sm">{t('footer.phone')}</span>
              </Link>
              <Link 
                href="mailto:mcherve.37@gmail.com"
                className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaEnvelope size={16} />
                <span className="text-sm">{t('footer.email')}</span>
              </Link>
              <Link 
                href="https://share.google/9wMszJlRmJ6omN6la"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaGoogle size={16} />
                <span className="text-sm">{t('footer.viewOnGoogle')}</span>
              </Link>
            </div>
          </div>

          {/* Liens vers les villes */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.cities')}</h4>
            <div className="grid grid-cols-3 gap-2">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${locale}/villes/${city.slug}`}
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                >
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-gray-700" />
        
        <div className="text-center text-gray-400">
          {t('footer.copyright')}
          <Link href="https://www.oxelya.com" className="text-gray-400 hover:text-blue-400 transition-colors text-sm ml-2">
            {t('footer.madeBy')}
          </Link>
        </div>
      </div>
    </footer>
  );
} 