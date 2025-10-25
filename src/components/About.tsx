import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';
import type { About as AboutType } from '../types/sanity';

export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [aboutData, setAboutData] = useState<AboutType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await client.fetch<AboutType>(
          `*[_type == "about"][0]{
            _id,
            title,
            paragraph1,
            paragraph2,
            images
          }`
        );
        setAboutData(data);
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const nextImage = () => {
    if (!aboutData?.images) return;
    setCurrentImageIndex((prev) => (prev + 1) % aboutData.images.length);
  };

  const previousImage = () => {
    if (!aboutData?.images) return;
    setCurrentImageIndex((prev) => (prev - 1 + aboutData.images.length) % aboutData.images.length);
  };

  useEffect(() => {
    if (!aboutData?.images?.length) return;
    
    const interval = setInterval(nextImage, 4000);
    return () => clearInterval(interval);
  }, [aboutData]);

  if (loading || !aboutData) {
    return (
      <section id="about" className="min-h-screen flex items-center justify-center bg-stone-900 text-white px-4">
        <div className="text-xl">Chargement...</div>
      </section>
    );
  }

  return (
    <section id="about" className="min-h-screen flex items-center py-12 md:py-20 px-4 bg-stone-900 text-white">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl">
              {aboutData.title}
            </h2>
            <div className="w-16 md:w-20 h-1 bg-[#6b4f3a]"></div>
            <p className="text-sm md:text-base lg:text-lg text-stone-300 leading-relaxed">
              {aboutData.paragraph1}
            </p>
            <p className="text-sm md:text-base lg:text-lg text-stone-300 leading-relaxed">
              {aboutData.paragraph2}
            </p>
          </div>

          <div className="relative">
            <div className="relative h-64 md:h-96 lg:h-[480px] overflow-hidden shadow-lg">
              {aboutData.images.map((image, index) => (
                <img
                  key={index}
                  src={urlFor(image).width(800).height(480).url()}
                  alt={image.alt || `Notre histoire ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}

              <button
                onClick={previousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60
                           text-white p-1.5 md:p-2 rounded-full backdrop-blur-sm transition-all duration-300"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60
                           text-white p-1.5 md:p-2 rounded-full backdrop-blur-sm transition-all duration-300"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
                {aboutData.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-white w-4 md:w-6'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}