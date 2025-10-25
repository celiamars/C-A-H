// src/components/MapSection.tsx
import { MapPin } from 'lucide-react';

export default function MapSection() {
  return (
    <section className="relative w-full h-[60vh] md:h-[500px] min-h-[400px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2904.0839891!2d5.3684937!3d43.2991857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c0c6e0000000%3A0x0!2s38%20Rue%20Sainte-Fran%C3%A7oise%2C%2013002%20Marseille!5e0!3m2!1sen!2sfr!4v1234567890"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Le Comptoir Aux Huiles Location"
        className="w-full h-full"
      />
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10 px-4">
        <a
          href="https://maps.app.goo.gl/eyfiDi2n9mpkBmSbA?g_st=ipc"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#6b4f3a] text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium
                     hover:bg-[#5a4230] transition-all duration-300 flex items-center gap-2 md:gap-3
                     shadow-2xl rounded-sm whitespace-nowrap"
        >
          <MapPin className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">Obtenir l'itinéraire</span>
          <span className="sm:hidden">Itinéraire</span>
        </a>
      </div>
    </section>
  );
}