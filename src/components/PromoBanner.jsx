import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const promos = [
    {
      id: 1,
      albumId: 89,
      title: "Yeni Buraxılış: Immunity (LP)",
      artist: "Clairo",
      image: "https://your-image-url.com/immunity-banner.jpg", // Banner-sized image
      bgColor: "#1a1a1a",
      textColor: "#ffffff"
    },
    {
      id: 2,
      albumId: 45,
      title: "İndi Satışda: DAMN.",
      artist: "Kendrick Lamar",
      image: "https://your-image-url.com/damn-banner.jpg",
      bgColor: "#c41e3a",
      textColor: "#ffffff"
    },
    {
      id: 3,
      albumId: 67,
      title: "Məhdud Nəşr: BRAT",
      artist: "Charli XCX",
      image: "https://your-image-url.com/brat-banner.jpg",
      bgColor: "#8ace00",
      textColor: "#000000"
    }
  ];

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % promos.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, promos.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promos.length) % promos.length);
  };

  return (
    <div 
      className="relative w-full h-[400px] md:h-[500px] overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div 
        className="flex transition-transform duration-700 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {promos.map((promo) => (
          <Link
            key={promo.id}
            to={`/album/${promo.albumId}`}
            className="min-w-full h-full relative flex items-center justify-center"
            style={{ backgroundColor: promo.bgColor }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url(${promo.image})` }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            
            <div className="relative z-10 container mx-auto px-6 flex items-center gap-8">
              <div className="hidden md:block">
                <img 
                  src={promo.image}
                  alt={promo.title}
                  className="w-64 h-64 object-cover rounded-lg shadow-2xl"
                />
              </div>
              
              <div className="flex-1">
                <h2 
                  className="text-5xl md:text-7xl font-black mb-4"
                  style={{ color: promo.textColor }}
                >
                  {promo.title}
                </h2>
                <p 
                  className="text-2xl md:text-3xl font-semibold mb-6"
                  style={{ color: promo.textColor }}
                >
                  {promo.artist}
                </p>
                <button 
                  className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
                  style={{ 
                    backgroundColor: promo.textColor,
                    color: promo.bgColor 
                  }}
                >
                  İndi Al
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          prevSlide();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          nextSlide();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {promos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
 
      {!isPaused && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
          <div 
            className="h-full bg-white transition-all"
            style={{
              width: `${((currentSlide + 1) / promos.length) * 100}%`,
              transition: 'width 0.3s ease-out'
            }}
          />
        </div>
      )}
    </div>
  );
}