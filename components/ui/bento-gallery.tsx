"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface BentoGalleryProps {
  images: {
    src: string;
    alt: string;
    title: string;
    description: string;
  }[];
}

export function BentoGallery({ images }: BentoGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-90/100 mx-auto px-4 bg-custom-color">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`relative group overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 ${
              index === 0 ? "md:col-span-2 md:row-span-2" : ""
            } ${
              index === 4 ? "md:col-span-2" : ""
            } ${
              index === 7 ? "md:row-span-2" : ""
            } ${
              index === 6 ? "md:row-span-2" : ""
            }`}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image */}
            <div className="relative w-full h-full min-h-[300px] md:min-h-[400px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 20 
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-white"
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {image.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-200 mb-4 line-clamp-2">
                    {image.description}
                  </p>
                  
                  {/* Bouton de réservation */}
                  <Link
                    href="https://leclosdesrossignols.fr/fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-custom-color rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Réserver maintenant
                  </Link>
                </motion.div>
              </div>
              
              {/* Badge de prix (optionnel) */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30">
                  Disponible
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}