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
      <section id="menu" className="py-20 px-4 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-xl">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-20 px-4 bg-stone-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">
            Nos Incontournables
          </h2>
          <div className="w-20 h-1 bg-[#6b4f3a] mx-auto mb-6"></div>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto">
            Découvrez nos plats signatures qui font la renommée du Comptoir
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish) => (
            <button
              key={dish._id}
              onClick={() => setIsMenuOpen(true)}
              className="group relative overflow-hidden bg-stone-800 hover:shadow-2xl transition-all duration-500 text-left cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={urlFor(dish.image).width(400).height(300).url()}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent"></div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-serif mb-2 text-amber-50">{dish.name}</h3>
                <p className="text-stone-300 leading-relaxed text-sm">{dish.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="bg-[#6b4f3a] text-white px-8 py-4 text-lg font-medium hover:bg-[#5a4230] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Découvrir Notre Menu
          </button>
        </div>
      </div>

      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </section>
  );
}