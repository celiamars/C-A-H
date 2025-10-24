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
    return IconComponent ? <IconComponent className="w-8 h-8 text-[#6b4f3a]" /> : <LucideIcons.Coffee className="w-8 h-8 text-[#6b4f3a]" />;
  };

  if (loading || !restaurantData) {
    return (
      <section id="restaurant" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-xl">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="restaurant" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
            {restaurantData.title}
          </h2>
          <div className="w-20 h-1 bg-[#6b4f3a] mx-auto mb-6"></div>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            {restaurantData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {restaurantData.features.map((feature, index) => (
            <div key={index} className="text-center p-6">
              <div className="w-16 h-16 bg-[#f5f0ea] rounded-full flex items-center justify-center mx-auto mb-4">
                {getIconComponent(feature.icon)}
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-2">{feature.title}</h3>
              <p className="text-stone-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}