// src/components/EpicerieSection.tsx
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
    return IconComponent ? <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-[#6b4f3a]" /> : <LucideIcons.Wine className="w-6 h-6 md:w-7 md:h-7 text-[#6b4f3a]" />;
  };

  if (loading || !epicerieData) {
    return (
      <section id="epicerie" className="pt-24 pb-10 md:pt-28 md:pb-16 px-4 bg-[#f5f0ea]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-lg">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="epicerie" className="pt-24 pb-10 md:pt-28 md:pb-16 px-4 bg-[#f5f0ea]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-stone-900 mb-3 md:mb-4">
            {epicerieData.title}
          </h2>
          <div className="w-16 md:w-20 h-0.5 md:h-1 bg-[#6b4f3a] mx-auto mb-3 md:mb-5"></div>
          <p className="text-sm md:text-base lg:text-lg text-stone-600 max-w-3xl mx-auto px-2">
            {epicerieData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="space-y-5 md:space-y-7">
            {epicerieData.sections.map((section, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-md mx-auto mb-3 md:mb-4">
                  {getIconComponent(section.icon)}
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-stone-900 mb-2">
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
                className={`w-full h-36 md:h-44 lg:h-48 object-cover shadow-lg rounded-sm ${
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