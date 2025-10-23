import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const reviews = [
  {
    name: 'Marie L.',
    text: 'Un lieu authentique avec une âme ! La terrasse est magnifique et les plats sont délicieux. Le magret de canard était parfait.',
    rating: 5
  },
  {
    name: 'Jean-Pierre M.',
    text: 'Excellente découverte dans le Panier. L\'ambiance chaleureuse et les produits corses font toute la différence. À recommander !',
    rating: 5
  },
  {
    name: 'Sophie D.',
    text: 'Le meilleur restaurant du quartier ! Service impeccable, cuisine savoureuse et leurs huiles d\'olive sont exceptionnelles.',
    rating: 5
  },
  {
    name: 'Antoine R.',
    text: 'Cadre magnifique dans un ancien four à pain. La planche à partager est généreuse et les vins sont très bien choisis.',
    rating: 5
  },
  {
    name: 'Isabelle P.',
    text: 'Un endroit parfait pour un déjeuner en terrasse. Les saveurs corses sont sublimées et l\'accueil est très chaleureux.',
    rating: 5
  },
  {
    name: 'Thomas B.',
    text: 'Le burger corse est une tuerie ! L\'atmosphère du lieu est unique avec ses matériaux authentiques. Une belle expérience.',
    rating: 5
  },
  {
    name: 'Claire G.',
    text: 'Restaurant idéal pour les groupes. Nous étions 12 personnes et le service était parfait. La cuisine est excellente !',
    rating: 5
  },
  {
    name: 'Nicolas F.',
    text: 'Le tartare de saumon est d\'une fraîcheur exceptionnelle. L\'huile d\'olive est un bon produit à emporter.',
    rating: 5
  },
  {
    name: 'Amélie V.',
    text: 'Lieu magique qui allie tradition et convivialité. La cave à vin propose d\'excellents accords. Je reviendrai sans hésiter !',
    rating: 5
  }
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerPage = 3;
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
            {visibleReviews.map((review, index) => (
              <div
                key={currentIndex + index}
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
