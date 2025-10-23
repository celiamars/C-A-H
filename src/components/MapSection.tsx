import { MapPin } from 'lucide-react';

export default function MapSection() {
  return (
    <section className="relative w-full h-[500px]">
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a
          href="https://maps.app.goo.gl/eyfiDi2n9mpkBmSbA?g_st=ipc"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#6b4f3a] text-white px-8 py-4 text-lg font-medium
                     hover:bg-[#5a4230] transition-all duration-300 flex items-center gap-3
                     shadow-2xl"
        >
          <MapPin className="w-5 h-5" />
          Obtenir l'itinéraire
        </a>
      </div>
    </section>
  );
}
