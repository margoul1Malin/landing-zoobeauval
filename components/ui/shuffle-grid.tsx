"use client"

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const ShuffleHero = () => {
  const t = useTranslations();
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-primary font-medium">
            {t('cities.dynamic.houses.brand')}
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold text-foreground">
          {t('cities.dynamic.houses.description')}
        </h3>
        <p className="text-base md:text-lg text-muted-foreground my-4 md:my-6">
          {t('cities.dynamic.houses.tagline')}
        </p>
        <Link href="https://leclosdesrossignols.fr/fr" className={cn(
          "bg-primary text-primary-foreground font-medium py-2 px-4 rounded-md",
          "transition-all hover:bg-primary/90 active:scale-95",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        )}>
          {t('cities.dynamic.houses.cta')}
        </Link>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "/rossignolsimg/maisondeselephants/maisondeselephants.webp",
  },
  {
    id: 2,
    src: "/rossignolsimg/maisondesgiraffes/maisondesgirafes.webp",
  },
  {
    id: 3,
    src: "/rossignolsimg/maisondeskoalas/maisondeskoalas.webp",
  },
  {
    id: 4,
    src: "/rossignolsimg/maisondeslions/maisondeslions.jpg",
  },
  {
    id: 5,
    src: "/rossignolsimg/maisondesotaries/maisondesotaries.webp",
  },
  {
    id: 6,
    src: "/rossignolsimg/maisondesours/maisondesours.webp",
  },
  {
    id: 7,
    src: "/rossignolsimg/maisondespandas/maisondespandas.webp",
  },
  {
    id: 8,
    src: "/rossignolsimg/maisondesperroquets/maisondesperroquets.webp",
  },
  {
    id: 9,
    src: "/rossignolsimg/maisondessinges/maisondessinges.webp",
  },
  {
    id: 10,
    src: "/villes/chambord.jpg",
  },
  {
    id: 11,
    src: "/villes/chenonceaux.jpg",
  },
  {
    id: 12,
    src: "/villes/cheverny.jpg",
  },
  {
    id: 13,
    src: "/zoodebeauval.webp",
  },
  {
    id: 14,
    src: "/villes/blois.jpg",
  },
  {
    id: 15,
    src: "/villes/romorantin.jpg",
  },
  {
    id: 16,
    src: "/villes/soingsensologne.webp",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full rounded-md overflow-hidden bg-muted"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></motion.div>
  ));
};

export const ShuffleGrid = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [squares, setSquares] = useState<React.ReactNode[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setSquares(generateSquares());
    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  if (!isClient) {
    return (
      <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
        {squareData.map((sq) => (
          <div
            key={sq.id}
            className="w-full h-full rounded-md overflow-hidden bg-muted"
            style={{
              backgroundImage: `url(${sq.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};
