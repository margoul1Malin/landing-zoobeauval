"use client";

import { useSpring, animated } from 'react-spring';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

interface FallingLeavesProps {
  className?: string;
}

export function FallingLeaves({ className = "" }: FallingLeavesProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Gérer le redimensionnement de la fenêtre
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculer la progression du scroll par rapport à la section
      // -1 = complètement au-dessus de l'écran
      //  0 = au centre de l'écran  
      //  1 = complètement en-dessous de l'écran
      const elementCenter = rect.top + rect.height / 2;
      const screenCenter = windowHeight / 2;
      const progress = (screenCenter - elementCenter) / (windowHeight + rect.height);
      
      setScrollProgress(Math.max(-1, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Appel initial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculer les valeurs responsives basées sur la taille de l'écran
  const getResponsiveValues = () => {
    // Utiliser des pourcentages de la hauteur de l'écran pour la responsivité
    const baseOffset = dimensions.height * 0.15; // 15% de la hauteur de l'écran
    const travelDistance = dimensions.height * 0.3; // 30% de la hauteur pour le déplacement total
    
    // Sur mobile, désactiver l'effet parallaxe pour éviter les problèmes de scroll
    if (dimensions.width < 640) {
      return {
        translateY: 0,
        opacity: 0.3 // Opacité fixe faible sur mobile
      };
    }
    
    // Ajuster la distance de déplacement selon la taille de l'écran
    let adjustedTravelDistance = travelDistance;
    if (dimensions.width < 1024) {
      // Sur tablette, déplacement moyen
      adjustedTravelDistance = travelDistance * 0.8;
    }
    
    return {
      translateY: baseOffset - (scrollProgress + 1) * adjustedTravelDistance,
      opacity: Math.max(0, Math.min(1, (scrollProgress + 1) * 0.8))
    };
  };

  const responsiveValues = getResponsiveValues();

  // Animation des feuilles avec effet parallaxe responsive
  const leavesSpring = useSpring({
    transform: `translateY(${responsiveValues.translateY}px)`,
    opacity: responsiveValues.opacity,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  return (
    <animated.div 
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-5 ${className} hidden md:block`}
      style={leavesSpring}
    >
      <Image
        src="/fallingleafs.png"
        alt="Feuilles qui tombent"
        fill
        className="object-cover sm:object-contain md:object-cover lg:object-cover"
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
        quality={90}
        priority
      />
    </animated.div>
  );
}