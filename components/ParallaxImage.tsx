"use client";

import { useSpring, animated } from 'react-spring';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

interface ParallaxImageProps {
  imageSrc: string;
  imageAlt: string;
  shadowColor: string;
}

export const ParallaxImage = ({ imageSrc, imageAlt, shadowColor }: ParallaxImageProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Animation de l'image principale
  // Commence en bas (-200px), monte vers le centre (0px), puis continue vers le haut
  const imageSpring = useSpring({
    transform: `translateY(${200 - (scrollProgress + 1) * 200}px)`,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  // Animation de l'ombre avec décalage
  const shadowSpring = useSpring({
    transform: `translateY(${230 - (scrollProgress + 1) * 180}px) translateX(30px)`,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  return (
    <div ref={containerRef} className="relative w-full h-[700px] overflow-hidden">
      {/* Cercle d'ombre en arrière-plan */}
      <animated.div 
        className={`absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full ${shadowColor} shadow-2xl z-0 left-1/2 top-1/2 -ml-[150px] md:-ml-[250px] -mt-[150px] md:-mt-[250px]`}
        style={shadowSpring}
      />
            
      {/* Image principale avec parallaxe */}
      <animated.div 
        className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] z-10 left-1/2 top-1/2 -ml-[150px] md:-ml-[250px] -mt-[150px] md:-mt-[250px]"
        style={imageSpring}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={500}
          className="rounded-full w-full h-full object-cover shadow-2xl"
        />
      </animated.div>

      {/* Bulles décoratives flottantes */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="floating-bubble bubble-1"></div>
        <div className="floating-bubble bubble-2"></div>
        <div className="floating-bubble bubble-3"></div>
        <div className="floating-bubble bubble-4"></div>
        <div className="floating-bubble bubble-5"></div>
      </div>

      <style jsx>{`
        .floating-bubble {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
        }
        
        .bubble-1 {
          width: 20px;
          height: 20px;
          top: 10%;
          left: 20%;
          animation-delay: 0s;
        }
        
        .bubble-2 {
          width: 15px;
          height: 15px;
          top: 20%;
          right: 20%;
          animation-delay: 2s;
        }
        
        .bubble-3 {
          width: 25px;
          height: 25px;
          bottom: 30%;
          left: 15%;
          animation-delay: 4s;
        }
        
        .bubble-4 {
          width: 12px;
          height: 12px;
          top: 60%;
          right: 30%;
          animation-delay: 1s;
        }
        
        .bubble-5 {
          width: 18px;
          height: 18px;
          bottom: 20%;
          right: 15%;
          animation-delay: 3s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(5deg); }
          66% { transform: translateY(5px) rotate(-5deg); }
        }
      `}</style>
    </div>
  );
};