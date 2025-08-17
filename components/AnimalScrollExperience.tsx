"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export function AnimalScrollExperience() {
  const t = useTranslations();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Utiliser les traductions pour les expériences
  const experiences = t.raw('animalScrollExperience.experiences');

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return;

    // Fonction pour obtenir les valeurs responsive
    const getResponsiveValues = () => {
      const isMobile = window.innerWidth < 768;
      return {
        startX: isMobile ? -300 : -400,
        endX: isMobile ? 25 : 50, // Position finale alignée avec le texte
        imageSize: isMobile ? 150 : 200
      };
    };

    const setupAnimation = () => {
      const { startX, endX } = getResponsiveValues();

      // Position initiale des images AVANT de créer ScrollTrigger
      gsap.set('.animal-image', {
        x: 0, // Position normale par défaut
        rotation: 0,
        scale: 1,
        opacity: 1,
        clearProps: "transform,opacity" // Reset toutes les props précédentes
      });

      // Petit délai pour s'assurer que les éléments sont bien positionnés
      gsap.delayedCall(0.1, () => {
        // Animation avec scroll hijacking - commence plus tôt pour finir au centre
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', // Commence plus tôt (80% du viewport)
            end: 'center center', // Finit quand le centre de la section est au centre du viewport
            scrub: 0.8, // Un peu plus lent pour plus de fluidité
            pin: false,
            pinSpacing: false,
            markers: false,
            onUpdate: (self) => {
              const progress = self.progress;
              
              // Animation des images avec timing ajusté
              experiences.forEach((_: any, index: number) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                const image = containerRef.current?.querySelector(`.animal-image-${index}`);
                if (image) {
                  // Chaque image commence à un moment différent mais toutes finissent en même temps
                  const delay = index * 0.12; // Délai entre chaque image
                  const adjustedProgress = Math.max(0, Math.min(1, (progress - delay) / (1 - delay)));
                  
                  // Si on est avant le déclenchement de l'animation, rester en position initiale
                  if (progress === 0) {
                    gsap.set(image, {
                      x: 0,
                      rotation: 0,
                      scale: 1,
                      opacity: 1
                    });
                  } else {
                    gsap.set(image, {
                      x: startX + adjustedProgress * (endX - startX),
                      rotation: adjustedProgress * 360,
                      scale: 0.4 + adjustedProgress * 0.6,
                      opacity: adjustedProgress * 0.95 + 0.05
                    });
                  }
                }
              });
            },
            onEnter: () => {
              // Définir la position de départ au moment de l'entrée
              gsap.set('.animal-image', {
                x: startX,
                rotation: 0,
                scale: 0.4,
                opacity: 0.05
              });
            },
            onLeave: () => {
              gsap.to('.animal-image', {
                duration: 0.2,
                opacity: 0.8
              });
            },
            onEnterBack: () => {
              gsap.to('.animal-image', {
                duration: 0.3,
                opacity: 1,
                stagger: 0.05
              });
            },
            onLeaveBack: () => {
              // Retour à la position normale
              gsap.to('.animal-image', {
                duration: 0.3,
                x: 0,
                rotation: 0,
                scale: 1,
                opacity: 1
              });
            }
          }
        });
      });

      return null; // Plus besoin de retourner la timeline
    };

    // Configuration initiale
    setupAnimation();

    // Reconfiguration sur resize pour la responsivité
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Kill l'animation existante
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        
        // Recréer l'animation avec les nouvelles valeurs
        setupAnimation();
        
        // Refresh pour recalculer les positions
        ScrollTrigger.refresh();
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section ref={sectionRef} className="relative bg-custom-color text-white min-h-screen">
      <div ref={containerRef} className="relative min-h-screen flex items-center justify-center py-16 px-4">
        {/* Titre de la section */}
        <div className="absolute top-8 left-4 md:left-8 text-white z-20">
          <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'Neucha, sans-serif' }}>
            Expériences Animales
          </h3>
        </div>

        {/* Grille des images responsive */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto w-full">
          {experiences.map((experience: any, index: number) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
            <div key={experience.id} className="relative flex flex-col items-center">
              {/* Image avec animation */}
              <div className={`animal-image animal-image-${index} relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-xl overflow-hidden shadow-lg`}>
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4 text-2xl md:text-3xl">
                  {experience.emoji}
                </div>
              </div>

              {/* Contenu responsive */}
              <div className="mt-3 md:mt-4 text-center max-w-xs">
                <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-custom-color-2">
                  {experience.title}
                </h3>
                <p className="text-xs md:text-sm text-custom-color-2/80 leading-relaxed hidden sm:block">
                  {experience.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}