import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onReserve: () => void;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex-shrink-0"
          >
            <img
              src="https://lh3.googleusercontent.com/pw/AP1GczOm3P90U77bIck-LUKtfuKZGjlORXS0AnetpQJraXYXsDIPnrbzQlQSkqNjSo2QHiaat4mMcYPqX2DcnN5CHbUKw0iDCgIwNpohFGr0TTecWUVehZnkAy1QUmx72LB4mz-ylg2_qs8mB7TTZe9Gx6Lq=w1405-h597-s-no-gm?authuser=1"
              alt="Le Comptoir Aux Huiles"
              className="h-16 w-auto cursor-pointer"
            />
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('menu')}
              className="text-white"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('restaurant')}
              className="text-white"
            >
              Restaurant
            </button>
            <button
              onClick={() => scrollToSection('epicerie')}
              className="text-white"
            >
              Épicerie
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white"
            >
              Histoire
            </button>
            <button
              onClick={() => scrollToSection('avis')}
              className="text-white"
            >
              Avis
            </button>
            <button
              onClick={() => window.open('https://www.thefork.fr/restaurant/le-comptoir-aux-huiles-by-delucce-r712561', '_blank')}
              className="bg-[#6b4f3a] text-white px-6 py-2 hover:bg-[#5a4230] transition-colors duration-300"
            >
              Réserver
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-stone-700">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection('menu')}
              className="block w-full text-left px-4 py-2 text-white hover:bg-stone-800 transition-colors"
            >
              Menu
            </button>
            <button
              onClick={() => scrollToSection('restaurant')}
              className="block w-full text-left px-4 py-2 text-white hover:bg-stone-800 transition-colors"
            >
              Restaurant
            </button>
            <button
              onClick={() => scrollToSection('epicerie')}
              className="block w-full text-left px-4 py-2 text-white hover:bg-stone-800 transition-colors"
            >
              Épicerie
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-4 py-2 text-white hover:bg-stone-800 transition-colors"
            >
              Histoire
            </button>
            <button
              onClick={() => scrollToSection('avis')}
              className="block w-full text-left px-4 py-2 text-white hover:bg-stone-800 transition-colors"
            >
              Avis
            </button>
            <button
              onClick={() => window.open('https://www.thefork.fr/restaurant/le-comptoir-aux-huiles-by-delucce-r712561', '_blank')}
              className="block w-full text-left px-4 py-2 bg-[#6b4f3a] text-white hover:bg-[#5a4230] transition-colors"
            >
              Réserver
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
