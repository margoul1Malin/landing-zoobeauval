"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Card = {
  id: number;
  content: React.ReactNode;
  className: string;
  thumbnail: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full">
      <div className="w-full p-10 grid grid-cols-1 md:grid-cols-3 max-w-9xl mx-auto gap-4 relative">
        {cards.map((card, i) => (
          <div key={i} className={cn(card.className, "relative")}>
            <motion.div
              onClick={() => handleClick(card)}
              className={cn(
                "relative overflow-hidden cursor-pointer rounded-xl h-80 w-full",
                selected?.id === card.id
                  ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-96 z-50 flex justify-center items-center flex-wrap flex-col"
                  : lastSelected?.id === card.id
                  ? "z-40"
                  : ""
              )}
              layoutId={`card-${card.id}`}
            >
              {selected?.id === card.id && <SelectedCard selected={selected} />}
              <ImageComponent card={card} />
            </motion.div>
          </div>
        ))}
        <motion.div
          onClick={handleOutsideClick}
          className={cn(
            "absolute inset-0 bg-black opacity-0 z-10",
            selected?.id ? "pointer-events-auto" : "pointer-events-none"
          )}
          animate={{ opacity: selected?.id ? 0.3 : 0 }}
        />
      </div>
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={card.thumbnail}
        height="500"
        width="500"
        className="object-cover object-top absolute inset-0 h-full w-full transition duration-200"
        alt="thumbnail"
      />
    </div>
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-custom-color-2 rounded-2xl shadow-2xl w-full h-full flex items-center justify-center p-6 relative z-[60] border border-custom-color/20">
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative text-center"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
