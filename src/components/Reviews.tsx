// src/components/Reviews.tsx
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { client } from '../lib/sanity';
import type { Review } from '../types/sanity';

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const reviewsPerPage = 3;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await client.fetch<Review[]>(
          `*[_type == "review"] | order(order asc) {
            _id,
            name,
            text,
            rating,
            order
          }`
        );
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const nextReviews = () => {
    setCurrentIndex((prev) => (prev + reviewsPerPage) % reviews.length);
  };

  const prevReviews = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - reviewsPerPage;
      return newIndex < 0 ? reviews.length - reviewsPerPage : newIndex;
    });
  };

  const visibleReviews = reviews.slice(currentIndex, currentIndex + reviewsPerPage);

  if (loading) {
    return (
      <section id="avis" className="pt-24 pb-10 md:pt-28 md:pb-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-lg">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="avis" className="pt-24 pb-10 md:pt-28 md:pb-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 md:mb-12">
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
            alt="Google"
            className="h-7 md:h-9 mx-auto mb-3 md:mb-5 opacity-80"
          />
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl text-stone-900 mb-3 md:mb-4">
            Avis Clients
          </h2>
          <div className="w-16 md:w-20 h-0.5 md:h-1 bg-[#6b4f3a] mx-auto mb-3 md:mb-4"></div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-[#6b4f3a] text-[#6b4f3a]" />
            ))}
          </div>
          <p className="text-sm md:text-base lg:text-lg text-stone-600">
            Note moyenne 5/5 basée sur nos clients
          </p>
        </div>

        <div className="relative">
          <button
            onClick={prevReviews}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 lg:-translate-x-12 z-10
                       bg-[#6b4f3a] text-white p-2 md:p-3 rounded-full hover:bg-[#5a4230] transition-colors
                       shadow-lg"
            aria-label="Avis précédents"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 px-8 md:px-0">
            {visibleReviews.map((review) => (
              <div
                key={review._id}
                className="bg-stone-50 p-4 md:p-5 border-l-4 border-[#6b4f3a] hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex gap-0.5 mb-2 md:mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-[#6b4f3a] text-[#6b4f3a]" />
                  ))}
                </div>
                <p className="text-xs md:text-sm text-stone-700 mb-3 md:mb-4 leading-relaxed italic line-clamp-4">
                  "{review.text}"
                </p>
                <p className="text-xs md:text-sm text-stone-900 font-semibold">
                  {review.name}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={nextReviews}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 lg:translate-x-12 z-10
                       bg-[#6b4f3a] text-white p-2 md:p-3 rounded-full hover:bg-[#5a4230] transition-colors
                       shadow-lg"
            aria-label="Avis suivants"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-1.5 md:gap-2 mt-5 md:mt-7">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * reviewsPerPage)}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors ${
                Math.floor(currentIndex / reviewsPerPage) === i
                  ? 'bg-[#6b4f3a]'
                  : 'bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}