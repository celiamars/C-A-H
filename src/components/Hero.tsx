import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { client, urlFor } from '../lib/sanity';
import type { Hero as HeroType } from '../types/sanity';

interface HeroProps {
  onReserve: () => void;
  onMenuClick: () => void;
}

export default function Hero({ onReserve, onMenuClick }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroData, setHeroData] = useState<HeroType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await client.fetch<HeroType>(
          `*[_type == "hero"][0]{
            _id,
            title,
            subtitle,
            images,
            reservationButtonText,
            menuButtonText
          }`
        );
        setHeroData(data);
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  useEffect(() => {
    if (!heroData?.images?.length) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroData.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroData]);

  if (loading || !heroData) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-stone-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-xl">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {heroData.images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${urlFor(image).width(1920).url()}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
      ))}

      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight">
          {heroData.title}
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl font-light tracking-wide">
          {heroData.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onReserve}
            className="group bg-white text-stone-900 px-8 py-4 rounded-none text-lg font-medium
                       hover:bg-stone-100 transition-all duration-300 flex items-center justify-center gap-3
                       border-2 border-white hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            {heroData.reservationButtonText || 'Réserver une table'}
          </button>
          <button
            onClick={onMenuClick}
            className="group bg-transparent text-white px-8 py-4 rounded-none text-lg font-medium
                       hover:bg-[#6b4f3a] hover:text-white transition-all duration-300 flex items-center justify-center
                       border-2 border-white hover:border-[#6b4f3a] hover:scale-105"
          >
            {heroData.menuButtonText || 'Menu'}
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}