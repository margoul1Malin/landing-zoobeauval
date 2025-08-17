"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";

export const CityParallaxHero = ({
  images,
  cityName,
  t,
}: {
  images: {
    src: string;
    alt: string;
    city: string;
  }[];
  cityName: string;
  t: (key: string, params?: any) => string; // eslint-disable-line @typescript-eslint/no-explicit-any
}) => {
  const firstRow = images.slice(0, 6);
  const secondRow = images.slice(6, 12);
  const thirdRow = images.slice(12, 18);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  // Correction du translateY pour éviter que le contenu démarre trop haut
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, 500]),
    springConfig
  );
  
  return (
    <div
      ref={ref}
      className="h-[150vh] pt-90 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-custom-color-2"
    >
      {/* Titre du hero qui sera visible dès le début */}
      <div className="relative z-10 text-center mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold text-custom-color mb-6 font-heading"
        >
          {t("hero.title", { cityName })}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-custom-color/80 max-w-4xl mx-auto px-4 font-heading"
        >
          {t("hero.subtitle")}
        </motion.p>
      </div>

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((image) => (
            <ImageCard
              image={image}
              translate={translateX}
              key={image.city}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((image) => (
            <ImageCard
              image={image}
              translate={translateXReverse}
              key={image.city}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((image) => (
            <ImageCard
              image={image}
              translate={translateX}
              key={image.city}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const ImageCard = ({
  image,
  translate,
}: {
  image: {
    src: string;
    alt: string;
    city: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={image.city}
      className="group/image h-96 w-[30rem] relative flex-shrink-0"
    >
      <div className="block group-hover/image:shadow-2xl">
        <Image
          src={image.src}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-lg"
          alt={image.alt}
        />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/image:opacity-80 bg-black/60 pointer-events-none rounded-lg"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/image:opacity-100 text-white font-semibold text-lg">
        {image.city}
      </h2>
    </motion.div>
  );
}; 