"use client";

import { InfiniteSlider } from "@/components/testimonials-doublelinecarousel";
import Image from "next/image";

export const VignoblesCarousel = () => {
  
  return (
    <div className="relative h-full overflow-hidden">
      <div className="flex gap-4 h-full">
        {/* Première ligne - direction normale (haut vers bas) */}
        <div className="flex-1 h-full">
          <InfiniteSlider
            direction="vertical"
            duration={20}
            className="h-full"
          >
            {/* Images des maisons du Clos des Rossignols */}
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeselephants/maisondeselephants.webp"
                alt="Maison des Éléphants - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesgiraffes/maisondesgirafes.webp"
                alt="Maison des Girafes - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeskoalas/maisondeskoalas.webp"
                alt="Maison des Koalas - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeslions/maisondeslions.jpg"
                alt="Maison des Lions - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesotaries/maisondesotaries.webp"
                alt="Maison des Otaries - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesours/maisondesours.webp"
                alt="Maison des Ours - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondespandas/maisondespandas.webp"
                alt="Maison des Pandas - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesperroquets/maisondesperroquets.webp"
                alt="Maison des Perroquets - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondessinges/maisondessinges.webp"
                alt="Maison des Singes - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>

            {/* Images du Zoo de Beauval */}
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/zoodebeauval.webp"
                alt="ZooParc de Beauval - L'un des plus beaux zoos du monde"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/animals/elephantbanner.jpg"
                alt="Éléphants du Zoo de Beauval"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/animals/panda.jpg"
                alt="Pandas du Zoo de Beauval"
                fill
                className="object-cover"
              />
            </div>

            {/* Doublons pour l'effet infini */}
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeselephants/maisondeselephants.webp"
                alt="Maison des Éléphants - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesgiraffes/maisondesgirafes.webp"
                alt="Maison des Girafes - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeskoalas/maisondeskoalas.webp"
                alt="Maison des Koalas - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeslions/maisondeslions.jpg"
                alt="Maison des Lions - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesotaries/maisondesotaries.webp"
                alt="Maison des Otaries - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesours/maisondesours.webp"
                alt="Maison des Ours - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondespandas/maisondespandas.webp"
                alt="Maison des Pandas - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesperroquets/maisondesperroquets.webp"
                alt="Maison des Perroquets - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondessinges/maisondessinges.webp"
                alt="Maison des Singes - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/zoodebeauval.webp"
                alt="ZooParc de Beauval - L'un des plus beaux zoos du monde"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/animals/elephantbanner.jpg"
                alt="Éléphants du Zoo de Beauval"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/animals/panda.jpg"
                alt="Pandas du Zoo de Beauval"
                fill
                className="object-cover"
              />
            </div>
          </InfiniteSlider>
        </div>

        {/* Deuxième ligne - direction inverse (bas vers haut) */}
        <div className="flex-1 h-full">
          <InfiniteSlider
            direction="vertical"
            duration={18}
            reverse={true}
            className="h-full"
          >
            {/* Images des maisons du Clos des Rossignols */}
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeselephants/salonelephants.webp"
                alt="Salon de la Maison des Éléphants - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesgiraffes/salon.webp"
                alt="Salon de la Maison des Girafes - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeskoalas/salon.webp"
                alt="Salon de la Maison des Koalas - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeslions/salontable.webp"
                alt="Salon de la Maison des Lions - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesotaries/vuesalon1.webp"
                alt="Vue du Salon de la Maison des Otaries - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesours/salon3.webp"
                alt="Salon de la Maison des Ours - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondespandas/salontable.webp"
                alt="Salon de la Maison des Pandas - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesperroquets/salontable.webp"
                alt="Salon de la Maison des Perroquets - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondessinges/salontable.webp"
                alt="Salon de la Maison des Singes - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>

            {/* Images des chambres et détails */}
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeslions/lit1.webp"
                alt="Chambre de la Maison des Lions - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeslions/lit2.webp"
                alt="Chambre de la Maison des Lions - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesgiraffes/couisine.webp"
                alt="Cuisine de la Maison des Girafes - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>

            {/* Doublons pour l'effet infini */}
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeselephants/salonelephants.webp"
                alt="Salon de la Maison des Éléphants - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesgiraffes/salon.webp"
                alt="Salon de la Maison des Girafes - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeskoalas/salon.webp"
                alt="Salon de la Maison des Koalas - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeslions/salontable.webp"
                alt="Salon de la Maison des Lions - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesotaries/vuesalon1.webp"
                alt="Vue du Salon de la Maison des Otaries - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesours/salon3.webp"
                alt="Salon de la Maison des Ours - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondespandas/salontable.webp"
                alt="Salon de la Maison des Pandas - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesperroquets/salontable.webp"
                alt="Salon de la Maison des Perroquets - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondessinges/salontable.webp"
                alt="Salon de la Maison des Singes - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeslions/lit1.webp"
                alt="Chambre de la Maison des Lions - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondeslions/lit2.webp"
                alt="Chambre de la Maison des Lions - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/rossignolsimg/maisondesgiraffes/couisine.webp"
                alt="Cuisine de la Maison des Girafes - Le Clos des Rossignols"
                fill
                className="object-cover"
              />
            </div>
          </InfiniteSlider>
        </div>
      </div>
    </div>
  );
}; 