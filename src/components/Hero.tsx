import { Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeroProps {
  onReserve: () => void;
  onMenuClick: () => void;
}

const images = [
  'https://lh3.googleusercontent.com/pw/AP1GczO2kJnnm8sQ4d6BEUpZwMh8CYKoM-MohdOmVn_Od9ZlyaNw78axFyKPwIikt3NwfyvVgv6j56HN00ANr9PEtQEsqQ-IoHBvLeNgmZ3J0DQtdWjyDOZ-YLlE34CmS6NbCltPL6PbAzCHdQE6DhHrqQLv=w1804-h958-s-no-gm?authuser=1',
  'https://lh3.googleusercontent.com/pw/AP1GczPVWqpPSBwJkG2S8P4zY_5stqtJ3SF6YknJSSsqlOCa82PMYkLpkaFHl-PhLi7y1anTExr7pouBkcPCe7sL98UFFfvEo4xtZqp9EwnuYvNXhs0bGZY2L_fuTP_hz-5q-WsJsx-GN94658K7wm9UbyE=w1200-h1600-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczNb4ghOYULU65aQk0v3LIIBJdsIZwYME0GtB0XBUss5kdixmXCIFTUhABf0nE0ZbLPT3JoxL-mJ-G93FOpZfUOXf1H9YxUXGN4mQ31dNSTSNbXR8vLyZKdO5zdgcsR46HAmHoDUVf2_RyCtTAicvoA=w1200-h1600-s-no-gm?authuser=0'
];

export default function Hero({ onReserve, onMenuClick }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${image}')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
      ))}

      <div className="relative h-full flex flex-col items-center justify-center text-white px-4 text-center">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight">
          Le Comptoir Aux Huiles
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl font-light tracking-wide">
          Un lieu authentique au cœur du Panier
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onReserve}
            className="group bg-white text-stone-900 px-8 py-4 rounded-none text-lg font-medium
                       hover:bg-stone-100 transition-all duration-300 flex items-center justify-center gap-3
                       border-2 border-white hover:scale-105"
          >
            <Calendar className="w-5 h-5" />
            Réserver une table
          </button>
          <button
            onClick={onMenuClick}
            className="group bg-transparent text-white px-8 py-4 rounded-none text-lg font-medium
                       hover:bg-[#6b4f3a] hover:text-white transition-all duration-300 flex items-center justify-center
                       border-2 border-white hover:border-[#6b4f3a] hover:scale-105"
          >
            Menu
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
