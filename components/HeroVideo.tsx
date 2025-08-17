"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

export function HeroVideo() {
  const t = useTranslations();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => setIsLoaded(true);
      const handleEnded = () => setIsPlaying(false);
      const handleError = () => {
        setHasError(true);
        setIsLoaded(true); // Pour masquer le loader même en cas d'erreur
      };
      
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('ended', handleEnded);
      video.addEventListener('error', handleError);
      
      // Si la vidéo est déjà chargée
      if (video.readyState >= 2) {
        setIsLoaded(true);
      }
      
      // Timeout de sécurité pour masquer le loader après 5 secondes
      const timeout = setTimeout(() => {
        setIsLoaded(true);
      }, 5000);
      
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('error', handleError);
        clearTimeout(timeout);
      };
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Vidéo de fond */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/zoodebeauval.webp"
        >
          <source src="/HeroVideo.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
        
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Titre principal */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              {t('hero.mainTitle')}
            </span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-light mt-2 text-gray-200">
              {t('hero.subTitle')}
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="https://www.leclosdesrossignols.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-custom-color rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {t('hero.reserve')}
            </Link>
            
            <Link
              href="https://www.leclosdesrossignols.fr/"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              {t('hero.discover')}
            </Link>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{t('hero.stats.housesCount')}</div>
              <div className="text-sm text-gray-300">{t('hero.stats.housesLabel')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{t('hero.stats.activitiesCount')}</div>
              <div className="text-sm text-gray-300">{t('hero.stats.activitiesLabel')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">{t('hero.stats.rating')}</div>
              <div className="text-sm text-gray-300">{t('hero.stats.ratingLabel')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contrôles vidéo */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center space-x-3">
        <button
          onClick={toggleMute}
          className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 text-white hover:bg-black/70 transition-all duration-300 flex items-center justify-center"
        >
          {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
        </button>
        
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 text-white hover:bg-black/70 transition-all duration-300 flex items-center justify-center"
        >
          {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
        </button>
      </div>

      {/* Indicateur de chargement */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
          <div className="text-white text-lg">{t('hero.loading')}</div>
        </div>
      )}
      
      {/* Message d'erreur si la vidéo ne peut pas être chargée */}
      {hasError && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
          <div className="text-white text-center">
            <div className="text-lg mb-2">{t('hero.error')}</div>
            <div className="text-sm text-gray-300">{t('hero.errorSubtitle')}</div>
          </div>
        </div>
      )}


    </section>
  );
} 