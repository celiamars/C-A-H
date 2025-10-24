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
    return IconComponent ? <IconComponent className="w-7 h-7 text-[#6b4f3a]" /> : <LucideIcons.Wine className="w-7 h-7 text-[#6b4f3a]" />;
  };

  if (loading || !epicerieData) {
    return (
      <section id="epicerie" className="py-20 px-4 bg-[#f5f0ea]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-xl">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="epicerie" className="py-20 px-4 bg-[#f5f0ea]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
            {epicerieData.title}
          </h2>
          <div className="w-20 h-1 bg-[#6b4f3a] mx-auto mb-6"></div>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            {epicerieData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            {epicerieData.sections.map((section, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md mx-auto mb-4">
                  {getIconComponent(section.icon)}
                </div>
                <h3 className="text-2xl font-semibold text-stone-900 mb-3">
                  {section.title}
                </h3>
                <p className="text-stone-700 leading-relaxed">
                  {section.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {epicerieData.images.map((image, index) => (
              <img
                key={index}
                src={urlFor(image).width(400).height(300).url()}
                alt={`Épicerie ${index + 1}`}
                className={`w-full h-48 object-cover shadow-lg ${
                  index % 2 === 1 ? 'mt-6' : index % 4 === 2 ? '-mt-6' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}