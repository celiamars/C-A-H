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
      <section id="avis" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-xl">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="avis" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
            alt="Google"
            className="h-10 mx-auto mb-6 opacity-80"
          />
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
            Avis Clients
          </h2>
          <div className="w-20 h-1 bg-[#6b4f3a] mx-auto mb-6"></div>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-[#6b4f3a] text-[#6b4f3a]" />
            ))}
          </div>
          <p className="text-xl text-stone-600">
            Note moyenne 5/5 basée sur nos clients
          </p>
        </div>

        <div className="relative">
          <button
            onClick={prevReviews}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10
                       bg-[#6b4f3a] text-white p-3 rounded-full hover:bg-[#5a4230] transition-colors
                       shadow-lg"
            aria-label="Avis précédents"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="grid md:grid-cols-3 gap-6">
            {visibleReviews.map((review) => (
              <div
                key={review._id}
                className="bg-stone-50 p-6 border-l-4 border-[#6b4f3a] hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#6b4f3a] text-[#6b4f3a]" />
                  ))}
                </div>
                <p className="text-stone-700 mb-4 leading-relaxed italic">
                  "{review.text}"
                </p>
                <p className="text-stone-900 font-semibold">
                  {review.name}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={nextReviews}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10
                       bg-[#6b4f3a] text-white p-3 rounded-full hover:bg-[#5a4230] transition-colors
                       shadow-lg"
            aria-label="Avis suivants"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * reviewsPerPage)}
              className={`w-3 h-3 rounded-full transition-colors ${
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