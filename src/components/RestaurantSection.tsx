import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';
import type { Restaurant } from '../types/sanity';
import * as LucideIcons from 'lucide-react';

export default function RestaurantSection() {
  const [restaurantData, setRestaurantData] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await client.fetch<Restaurant>(
          `*[_type == "restaurant"][0]{
            _id,
            title,
            subtitle,
            features
          }`
        );
        setRestaurantData(data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, []);

  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName.charAt(0).toUpperCase() + iconName.slice(1)];
    return IconComponent ? <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-[#6b4f3a]" /> : <LucideIcons.Coffee className="w-6 h-6 md:w-8 md:h-8 text-[#6b4f3a]" />;
  };

  if (loading || !restaurantData) {
    return (
      <section id="restaurant" className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-xl">Chargement...</div>
      </section>
    );
  }

  return (
    <section id="restaurant" className="min-h-screen flex items-center py-12 md:py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 mb-3 md:mb-4">
            {restaurantData.title}
          </h2>
          <div className="w-16 md:w-20 h-1 bg-[#6b4f3a] mx-auto mb-4 md:mb-6"></div>
          <p className="text-base md:text-lg lg:text-xl text-stone-600 max-w-3xl mx-auto px-4">
            {restaurantData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {restaurantData.features.map((feature, index) => (
            <div key={index} className="text-center p-4 md:p-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#f5f0ea] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                {getIconComponent(feature.icon)}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-stone-900 mb-2">{feature.title}</h3>
              <p className="text-sm md:text-base text-stone-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}