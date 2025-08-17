import React from 'react';
import { cn } from '@/lib/utils'; // Assumes a 'cn' utility for classnames
import Link from 'next/link';

// Define the props for the component
interface HeroCollageProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  subtitle: string;
  images: string[];
  hideHeader?: boolean;
}

// Keyframes for the floating animation
const animationStyle = `
  @keyframes float-up {
    0% { transform: translateY(0px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
    50% { transform: translateY(-15px); box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3); }
    100% { transform: translateY(0px); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
  }
  .animate-float-up {
    animation: float-up 6s ease-in-out infinite;
  }
`;

const HeroCollage = React.forwardRef<HTMLDivElement, HeroCollageProps>(
  ({ className, title, subtitle, images, hideHeader = false, ...props }, ref) => {
    // We need exactly 11 images for this layout (7 maisons + 4 attractions)
    const displayImages = images.slice(0, 11);

    return (
      <>
        <style>{animationStyle}</style>
        <section
          ref={ref}
          className={cn(
            'relative w-full font-sansoverflow-hidden',
            className
          )}
          {...props}
        >
          {/* Main Content - Blue Background */}
          {!hideHeader && (
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 py-20 sm:py-32">
              <div className="container relative z-10 mx-auto px-4 text-center">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                  {title}
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-blue-100">
                  {subtitle}
                </p>
              </div>
            </div>
          )}

          {/* Image Collage - Updated Layout */}
          <div className={cn("relative z-0 flex items-center justify-center overflow-hidden group", hideHeader ? "bg-transparent h-[600px]" : "bg-white h-[800px]")}>
            {/* Background Image with Scale Effect */}
            <div className="relative h-full w-full max-w-6xl">
              {/* Central Image */}
              {displayImages[0] && (
                <Link href="https://www.leclosdesrossignols.fr/" target="_blank">
                <img
                  src={displayImages[0]}
                  alt="Main feature"
                  className="absolute left-[55%] top-1/2 h-auto w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-2xl z-20 animate-float-up"
                  style={{ animationDelay: '0s' }}
                />
                </Link>
              )}
              {/* Top-Left */}
              {displayImages[1] && (
                <Link href="https://www.leclosdesrossignols.fr/fr/" target="_blank">
                <img
                  src={displayImages[1]}
                  alt="Feature 2"
                  className="absolute left-[20%] top-[12%] h-auto w-72 rounded-xl shadow-lg z-10 animate-float-up"
                  style={{ animationDelay: '-1.2s' }}
                />
                </Link>
              )}
              {/* Top-Right */}
              {displayImages[2] && (
                <Link href="https://www.leclosdesrossignols.fr/fr" target="_blank">
                <img
                  src={displayImages[2]}
                  alt="Feature 3"
                  className="absolute right-[12%] top-[12%] h-auto w-64 rounded-xl shadow-lg z-10 animate-float-up"
                  style={{ animationDelay: '-2.5s' }}
                />
                </Link>
              )}
              {/* Bottom-Right */}
              {displayImages[3] && (
                    <Link href="https://www.leclosdesrossignols.fr/fr" target="_blank">
                <img
                  src={displayImages[3]}
                  alt="Feature 4"
                  className="absolute right-[8%] bottom-[10%] h-auto w-80 rounded-xl shadow-lg z-30 animate-float-up"
                  style={{ animationDelay: '-3.5s' }}
                />
                </Link>
              )}
               {/* Far-Right */}
              {displayImages[4] && (
                    <Link href="https://www.leclosdesrossignols.fr/fr" target="_blank">
                <img
                  src={displayImages[4]}
                  alt="Feature 5"
                  className="absolute right-[4%] top-1/2 -translate-y-[60%] h-auto w-72 rounded-xl shadow-lg z-10 animate-float-up"
                   style={{ animationDelay: '-4.8s' }}
                />
                </Link>
              )}
              {/* Bottom-Left */}
              {displayImages[5] && (
                <Link href="https://www.leclosdesrossignols.fr/fr" target="_blank"> 
                <img
                  src={displayImages[5]}
                  alt="Feature 6"
                  className="absolute left-[15%] bottom-[6%] h-auto w-76 rounded-xl shadow-lg z-30 animate-float-up"
                   style={{ animationDelay: '-5.2s' }}
                />
                </Link>
              )}
              {/* Far-Left */}
              {displayImages[6] && (
                    <Link href="https://www.leclosdesrossignols.fr/fr" target="_blank">
                <img
                  src={displayImages[6]}
                  alt="Feature 7"
                  className="absolute left-[3%] top-[22%] h-auto w-64 rounded-xl shadow-lg z-10 animate-float-up"
                   style={{ animationDelay: '-6s' }}
                />
                </Link>
              )}
              {/* Château de Chambord */}
              {displayImages[7] && (
                    <Link href="https://www.leclosdesrossignols.fr/fr" target="_blank">
                <img
                  src={displayImages[7]}
                  alt="Château de Chambord"
                  className="absolute left-[15%] top-[35%] h-auto w-56 rounded-xl shadow-lg z-15 animate-float-up"
                   style={{ animationDelay: '-6.4s' }}
                />
                </Link>
              )}
              {/* Château de Chenonceau */}
              {displayImages[8] && (
                    <Link href="https://www.leclosdesrossignols.fr/fr" target="_blank">
                <img
                  src={displayImages[8]}
                  alt="Château de Chenonceau"
                  className="absolute right-[35%] top-[5%] h-auto w-56 rounded-xl shadow-lg z-15 animate-float-up"
                   style={{ animationDelay: '-6.8s' }}
                />
                </Link>
              )}
              {/* Château de Cheverny */}
              {displayImages[9] && (
                    <Link href="https://www.leclosdesrossignols.fr/fr" target="_blank">
                <img
                  src={displayImages[9]}
                  alt="Château de Cheverny"
                  className="absolute left-[40%] bottom-[5%] h-auto w-56 rounded-xl shadow-lg z-15 animate-float-up"
                   style={{ animationDelay: '-7.2s' }}
                />
                </Link>
              )}
              {/* Zoo de Beauval */}
              {displayImages[10] && (
                    <Link href="https://www.leclosdesrossignols.fr/fr" target="_blank">
                <img
                  src={displayImages[10]}
                  alt="Zoo de Beauval"
                  className="absolute right-[80%] bottom-[15%] h-auto w-56 rounded-xl shadow-lg z-15 animate-float-up"
                   style={{ animationDelay: '-7.6s' }}
                />
                </Link>
              )}
            </div>
          </div>


        </section>
      </>
    );
  }
);

HeroCollage.displayName = 'HeroCollage';

export { HeroCollage };