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
      <section id="menu" className="py-16 px-4 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-lg">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="pt-20 md:pt-20 py-10 md:py-16 px-4 bg-stone-900 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header - Compact but readable */}
        <div className="text-center mb-6 md:mb-10">
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
            Nos Incontournables
          </h2>
          <div className="w-16 md:w-20 h-0.5 md:h-1 bg-[#6b4f3a] mx-auto mb-3 md:mb-5"></div>
          <p className="text-sm md:text-lg lg:text-xl text-stone-300 max-w-2xl mx-auto px-2">
            Découvrez nos plats signatures
          </p>
        </div>

        {/* Grid - 2 columns on mobile, better sized */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {dishes.map((dish) => (
            <button
              key={dish._id}
              onClick={() => setIsMenuOpen(true)}
              className="group relative overflow-hidden bg-stone-800 hover:shadow-2xl transition-all duration-500 text-left cursor-pointer"
            >
              <div className="relative h-40 md:h-48 lg:h-56 overflow-hidden">
                <img
                  src={urlFor(dish.image).width(400).height(350).url()}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent"></div>
              </div>
              <div className="p-3 md:p-4">
                <h3 className="text-base md:text-lg lg:text-xl font-serif mb-1 md:mb-2 text-amber-50">
                  {dish.name}
                </h3>
                <p className="text-stone-300 leading-relaxed text-xs md:text-sm line-clamp-2">
                  {dish.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Button */}
        <div className="text-center mt-6 md:mt-10">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="bg-[#6b4f3a] text-white px-7 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium hover:bg-[#5a4230] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Découvrir Notre Menu
          </button>
        </div>
      </div>

      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </section>
  );
}