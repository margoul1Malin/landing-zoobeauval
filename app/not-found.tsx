import Link from 'next/link';
import Image from 'next/image';
import './globals.css';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo/Image */}
        <div className="mb-8">
          <Image
            src="/zoodebeauval.webp"
            alt="Zoo de Beauval"
            width={200}
            height={200}
            className="mx-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Numéro d'erreur */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-custom-blue font-meow">404</h1>
        </div>

        {/* Titre principal */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-meow">
          Page non trouvée
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée. Explorez nos destinations populaires ou retournez à la page d&apos;accueil.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/fr"
            className="inline-flex items-center justify-center rounded-md bg-custom-blue text-lg px-8 py-4 text-white hover:bg-custom-blue/90 focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 font-medium transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          
          <Link
            href="https://www.leclosdesrossignols.fr/fr"
            className="inline-flex items-center justify-center rounded-md border border-custom-blue bg-transparent text-lg px-8 py-4 text-custom-blue hover:bg-custom-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 font-medium transition-colors"
          >
            Réserver maintenant
          </Link>
        </div>

        {/* Section d'aide */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 font-meow">
            Besoin d&apos;aide ?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <h4 className="font-semibold text-custom-blue mb-2">
                Destinations populaires
              </h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  <Link href="/fr/villes/blois" className="hover:text-custom-blue transition-colors">
                    Blois - Château royal
                  </Link>
                </li>
                <li>
                  <Link href="/fr/villes/chambord" className="hover:text-custom-blue transition-colors">
                    Chambord - Château majestueux
                  </Link>
                </li>
                <li>
                  <Link href="/fr/villes/chenonceaux" className="hover:text-custom-blue transition-colors">
                    Chenonceaux - Château des Dames
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-custom-blue mb-2">
                Activités et visites
              </h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>
                  <Link href="/fr/villes/cheverny" className="hover:text-custom-blue transition-colors">
                    Cheverny - Château de Tintin
                  </Link>
                </li>
                <li>
                  <Link href="/fr/villes/romorantin" className="hover:text-custom-blue transition-colors">
                    Romorantin - Ville historique
                  </Link>
                </li>
                <li>
                  <Link href="/fr/villes/soingsensologne" className="hover:text-custom-blue transition-colors">
                    Soings-en-Sologne - Nature préservée
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Message de contact */}
        <div className="text-center">
          <p className="text-gray-600 mb-2">
            Vous ne trouvez pas ce que vous cherchez ? Contactez-nous :
          </p>
          <Link
            href="mailto:mcherve.37@gmail.com"
            className="text-custom-blue hover:text-custom-blue/80 font-semibold"
          >
            mcherve.37@gmail.com
          </Link>
        </div>
      </div>
    </div>
  );
} 