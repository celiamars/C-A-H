import { Phone } from 'lucide-react';

export default function GroupReservation() {
  return (
    <section id="groupes" className="py-20 px-4 bg-[#f5f0ea]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-4 text-stone-900">
          Réservations de Groupe
        </h2>
        <div className="w-20 h-1 bg-[#6b4f3a] mx-auto mb-6"></div>
        <p className="text-xl text-stone-600 mb-12 max-w-2xl mx-auto">
          Plus de 50 places disponibles pour vos événements professionnels et privés
        </p>
        <div className="flex justify-center">
          <a
            href="tel:0781075108"
            className="bg-[#6b4f3a] text-white px-8 py-4 text-lg font-medium
                       hover:bg-[#5a4230] transition-all duration-300 flex items-center gap-3"
          >
            <Phone className="w-5 h-5" />
            07 81 07 51 08
          </a>
        </div>
      </div>
    </section>
  );
}
