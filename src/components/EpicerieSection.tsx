import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';
import type { Epicerie } from '../types/sanity';
import * as LucideIcons from 'lucide-react';

export default function EpicerieSection() {
  const [epicerieData, setEpicerieData] = useState<Epicerie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpicerie = async () => {
      try {
        const data = await client.fetch<Epicerie>(
          `*[_type == "epicerie"][0]{
            _id,
            title,
            subtitle,
            sections,
            images
          }`
        );
        setEpicerieData(data);
      } catch (error) {
        console.error('Error fetching epicerie data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEpicerie();
  }, []);

  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName.charAt(0).toUpperCase() + iconName.slice(1)];
    return IconComponent ? <IconComponent className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#6b4f3a]" /> : <LucideIcons.Wine className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#6b4f3a]" />;
  };

  if (loading || !epicerieData) {
    return (
      <section id="epicerie" className="min-h-screen flex items-center justify-center bg-[#f5f0ea] px-4">
        <div className="text-xl">Chargement...</div>
      </section>
    );
  }

  return (
    <section id="epicerie" className="min-h-screen flex items-center py-12 md:py-20 px-4 bg-[#f5f0ea]">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-stone-900 mb-3 md:mb-4">
            {epicerieData.title}
          </h2>
          <div className="w-16 md:w-20 h-1 bg-[#6b4f3a] mx-auto mb-4 md:mb-6"></div>
          <p className="text-base md:text-lg lg:text-xl text-stone-600 max-w-3xl mx-auto px-4">
            {epicerieData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6 md:space-y-8">
            {epicerieData.sections.map((section, index) => (
              <div key={index} className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center shadow-md mx-auto mb-3 md:mb-4">
                  {getIconComponent(section.icon)}
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-stone-900 mb-2 md:mb-3">
                  {section.title}
                </h3>
                <p className="text-sm md:text-base text-stone-700 leading-relaxed px-2">
                  {section.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {epicerieData.images.map((image, index) => (
              <img
                key={index}
                src={urlFor(image).width(400).height(300).url()}
                alt={`Épicerie ${index + 1}`}
                className={`w-full h-36 md:h-44 lg:h-48 object-cover shadow-lg ${
                  index % 2 === 1 ? 'mt-4 md:mt-6' : index % 4 === 2 ? '-mt-4 md:-mt-6' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}