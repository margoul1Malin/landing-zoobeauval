"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  content: React.ReactElement | React.ReactNode | string;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  return (
    <div className="w-full h-full p-10 max-w-95/100 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
        {cards.map((card, i) => (
          <div 
            key={i} 
            className={cn(
              "relative overflow-hidden bg-white rounded-xl cursor-pointer",
              card.className.includes("col-span-2") ? "md:col-span-2" : "md:col-span-1",
              card.className.includes("row-span-2") ? "md:row-span-2" : "md:row-span-1"
            )}
          >
            <ImageComponent card={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <div className="relative h-full w-full group">
      <motion.img
        layoutId={`image-${card.id}-image`}
        src={card.thumbnail}
        height="500"
        width="500"
        className={cn(
          "object-cover object-top absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-110"
        )}
        alt="thumbnail"
      />
      {/* Overlay au hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end">
        <div className="w-full p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {card.content}
        </div>
      </div>
    </div>
  );
};