"use client";

import { Ref, forwardRef, useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { motion, useMotionValue } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { VignoblesCarousel } from "@/components/VignoblesCarousel";

import { cn } from "@/lib/utils";

export const PhotoGallery = ({
animationDelay = 0.5,
}: {
animationDelay?: number;
}) => {
const t = useTranslations();
const [, setIsVisible] = useState(false);
const [, setIsLoaded] = useState(false);

useEffect(() => {
    // First make the container visible with a fade-in
    const visibilityTimer = setTimeout(() => {
    setIsVisible(true);
    }, animationDelay * 1000);

    // Then start the photo animations after a short delay
    const animationTimer = setTimeout(
    () => {
        setIsLoaded(true);
    },
    (animationDelay + 0.4) * 1000
    ); // Add 0.4s for the opacity transition

    return () => {
    clearTimeout(visibilityTimer);
    clearTimeout(animationTimer);
    };
}, [animationDelay]);



return (
<div className="relative h-full">
    <div className="container mx-auto px-4 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
                                    {/* Partie gauche - Contenu textuel */}
                        <div className="space-y-6">
                            <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
                                {t('vignobles.title')}
                            </h3>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                {t('vignobles.subtitle')}
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <span className="text-rose-500 text-xl">✓</span>
                                    <span className="text-gray-700">{t('vignobles.features.guided')}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-rose-500 text-xl">✓</span>
                                    <span className="text-gray-700">{t('vignobles.features.caves')}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="text-rose-500 text-xl">✓</span>
                                    <span className="text-gray-700">{t('vignobles.features.gastronomy')}</span>
                                </div>
                            </div>
                            <div className="pt-4">
                                <Link href="https://www.leclosdesrossignols.fr/" className="inline-flex items-center justify-center rounded-lg bg-custom-color hover:bg-custom-color/90 text-white font-semibold py-3 px-8 transition-all duration-300">
                                    {t('vignobles.cta')}
                                </Link>
                            </div>
                        </div>

            {/* Partie droite - Carousel d'images */}
            <VignoblesCarousel />
        </div>
    </div>
</div>
);
};

function getRandomNumberInRange(min: number, max: number): number {
if (min >= max) {
throw new Error("Min value should be less than max value");
}
return Math.random() * (max - min) + min;
}

const MotionImage = motion(
forwardRef(function MotionImage(
props: ImageProps,
ref: Ref<HTMLImageElement>
) {
return <Image ref={ref} {...props} alt={props.alt || "Image"} />;
})
);

type Direction = "left" | "right";

export const Photo = ({
src,
alt,
className,
direction,
width,
height,
...props
}: {
src: string;
alt: string;
className?: string;
direction?: Direction;
width: number;
height: number;
}) => {
const [rotation, setRotation] = useState<number>(0);
const x = useMotionValue(200);
const y = useMotionValue(200);

useEffect(() => {
const randomRotation =
    getRandomNumberInRange(1, 4) * (direction === "left" ? -1 : 1);
setRotation(randomRotation);
}, []); // eslint-disable-line react-hooks/exhaustive-deps

function handleMouse(event: {
currentTarget: { getBoundingClientRect: () => any }; // eslint-disable-line @typescript-eslint/no-explicit-any  
clientX: number;
clientY: number;
}) {
const rect = event.currentTarget.getBoundingClientRect();
x.set(event.clientX - rect.left);
y.set(event.clientY - rect.top);
}

const resetMouse = () => {
x.set(200);
y.set(200);
};

return (
<motion.div
    drag
    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
    whileTap={{ scale: 1.2, zIndex: 9999 }}
    whileHover={{
    scale: 1.1,
    rotateZ: 2 * (direction === "left" ? -1 : 1),
    zIndex: 9999,
    }}
    whileDrag={{
    scale: 1.1,
    zIndex: 9999,
    }}
    initial={{ rotate: 0 }}
    animate={{ rotate: rotation }}
    style={{
    width,
    height,
    perspective: 400,
    transform: `rotate(0deg) rotateX(0deg) rotateY(0deg)`,
    zIndex: 1,
    WebkitTouchCallout: "none",
    WebkitUserSelect: "none",
    userSelect: "none",
    touchAction: "none",
    }}
    className={cn(
    className,
    "relative mx-auto shrink-0 cursor-grab active:cursor-grabbing"
    )}
    onMouseMove={handleMouse}
    onMouseLeave={resetMouse}
    draggable={false}
    tabIndex={0}
>
    <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-sm">
    <MotionImage
        className={cn("rounded-3xl  object-cover")}
        fill
        src={src}
        alt={alt}
        {...props}
        draggable={false}
    />
    </div>
</motion.div>
);
};
