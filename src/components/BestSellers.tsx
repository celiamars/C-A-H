// src/components/BestSellers.tsx
import { useState, useEffect } from 'react';
import MenuModal from './MenuModal';
import { client, urlFor } from '../lib/sanity';
import type { BestSeller } from '../types/sanity';

export default function BestSellers() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dishes, setDishes] = useState<BestSeller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const data = await client.fetch<BestSeller[]>(
          `*[_type == "bestSeller"] | order(order asc) {
            _id,
            name,
            description,
            image,
            order
          }`
        );
        setDishes(data);
      } catch (error) {
        console.error('Error fetching best sellers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  if (loading) {
    return (
      <section id="menu" className="py-8 px-4 bg-stone-900 text-white min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto text-center w-full">
          <div className="text-base">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-6 md:py-12 px-3 md:px-4 bg-stone-900 text-white min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header - Compact */}
        <div className="text-center mb-4 md:mb-8">
          <h2 className="font-serif text-xl md:text-3xl lg:text-4xl mb-2 md:mb-3">
            Nos Incontournables
          </h2>
          <div className="w-12 md:w-16 h-0.5 bg-[#6b4f3a] mx-auto mb-2 md:mb-4"></div>
          <p className="text-sm md:text-base text-stone-300 max-w-2xl mx-auto px-2">
            Découvrez nos plats signatures
          </p>
        </div>

        {/* Grid - 2 columns on mobile for compactness */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {dishes.map((dish) => (
            <button
              key={dish._id}
              onClick={() => setIsMenuOpen(true)}
              className="group relative overflow-hidden bg-stone-800 hover:shadow-xl transition-all duration-300 text-left cursor-pointer rounded-sm"
            >
              <div className="relative h-32 md:h-44 lg:h-52 overflow-hidden">
                <img
                  src={urlFor(dish.image).width(300).height(250).url()}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
              </div>
              <div className="p-2 md:p-3">
                <h3 className="text-sm md:text-base lg:text-lg font-serif mb-1 text-amber-50 line-clamp-1">
                  {dish.name}
                </h3>
                <p className="text-stone-300 leading-snug text-xs md:text-sm line-clamp-2">
                  {dish.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Button - Compact */}
        <div className="text-center mt-4 md:mt-8">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="bg-[#6b4f3a] text-white px-5 md:px-7 py-2.5 md:py-3 text-sm md:text-base font-medium hover:bg-[#5a4230] transition-all duration-300 shadow-lg hover:shadow-xl rounded-sm"
          >
            Découvrir Notre Menu
          </button>
        </div>
      </div>

      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </section>
  );
}