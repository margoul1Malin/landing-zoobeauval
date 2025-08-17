"use client";

import { InfiniteSlider } from "@/components/testimonials-doublelinecarousel";

export const TestimonialsHorizontal = () => {

  const testimonials = [
    {
      name: "Céline ROUSSETTE",
      house: "Maison des Éléphants",
      quote: "Super séjour entre amis. Tout était parfait. Le gîte est vraiment bien équipé, on ne manque de rien. Le lieu est agréable avec un bel extérieur pour profiter d'un dîner au soleil. Rien à dire sur la propreté c'était parfait. Concernant la propriétaire, elle nous a réservé un accueil chaleureux et donné de très bons conseils. Elle est toujours disponible en cas de besoin. Nous recommandons à 100% ce lieu pour profiter du zoo de Beauval, des châteaux ou simplement pour changer d'air.",
      avatar: "/celineroussette.jpg"
    },
    {
      name: "Marina",
      house: "Maison des Girafes",
      quote: "Un séjour exceptionnel ! La maison est magnifique, très bien équipée et décorée avec goût. L'emplacement est parfait pour visiter la région. La propriétaire est adorable et très attentionnée. Nous avons passé un excellent moment en famille.",
      avatar: "/marina.png"
    },
    {
      name: "Julie",
      house: "Maison des Koalas",
      quote: "Séjour parfait dans cette maison thématique. Tout est pensé pour le confort des visiteurs. L'ambiance est chaleureuse et l'accueil est remarquable. Nous recommandons vivement !",
      avatar: "/julie.avif"
    },
    {
      name: "Phuong",
      house: "Maison des Lions",
      quote: "Une expérience unique dans cette maison magnifiquement décorée. L'emplacement est idéal pour découvrir les châteaux de la Loire et le zoo de Beauval. Service impeccable et accueil chaleureux.",
      avatar: "/phuong.avif"
    },
    {
      name: "Ivan",
      house: "Maison des Ours",
      quote: "Séjour fantastique ! La maison est spacieuse, confortable et très bien équipée. L'ambiance est chaleureuse et l'accueil est exceptionnel. Nous avons adoré notre séjour.",
      avatar: "/ivan.png"
    },
    {
      name: "Anne Ferrari",
      house: "Maison des Pandas",
      quote: "Un lieu magique pour des vacances en famille. La maison est parfaitement aménagée et l'emplacement est idéal. La propriétaire est aux petits soins. Nous reviendrons !",
      avatar: "/anneferrari.avif"
    }
  ];

  return (
    <div className="w-full">
      <InfiniteSlider
        direction="horizontal"
        duration={30}
        className="py-4"
      >
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 min-w-[350px] max-w-[400px] hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full mr-4 object-cover" 
              />
              <div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.house}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
              &quot;{testimonial.quote}&quot;
            </p>
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}; 