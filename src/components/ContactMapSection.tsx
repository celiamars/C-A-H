// src/components/ContactMapSection.tsx
import { Phone, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';
import type { GroupReservation as GroupReservationType } from '../types/sanity';

export default function ContactMapSection() {
  const [groupData, setGroupData] = useState<GroupReservationType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupReservation = async () => {
      try {
        const data = await client.fetch<GroupReservationType>(
          `*[_type == "groupReservation"][0]{
            _id,
            title,
            description,
            phoneNumber
          }`
        );
        setGroupData(data);
      } catch (error) {
        console.error('Error fetching group reservation data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupReservation();
  }, []);

  if (loading || !groupData) {
    return (
      <section id="groupes" className="py-16 bg-[#f5f0ea]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="text-lg">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="groupes" className="bg-[#f5f0ea]">
      {/* Group Reservation Section - Compact */}
      <div className="py-8 md:py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4 text-stone-900">
            {groupData.title}
          </h2>
          <div className="w-16 md:w-20 h-0.5 md:h-1 bg-[#6b4f3a] mx-auto mb-4 md:mb-5"></div>
          <p className="text-base md:text-lg lg:text-xl text-stone-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
            {groupData.description}
          </p>
          <div className="flex justify-center">
            <a
              href={`tel:${groupData.phoneNumber.replace(/\s/g, '')}`}
              className="bg-[#6b4f3a] text-white px-7 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium
                         hover:bg-[#5a4230] transition-all duration-300 flex items-center gap-2 md:gap-3 shadow-lg"
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6" />
              {groupData.phoneNumber}
            </a>
          </div>
        </div>
      </div>

      {/* Map Section - Full width */}
      <div className="relative w-full h-[50vh] md:h-[55vh] min-h-[350px]">
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
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10 px-4">
          <a
            href="https://maps.app.goo.gl/eyfiDi2n9mpkBmSbA?g_st=ipc"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#6b4f3a] text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium
                       hover:bg-[#5a4230] transition-all duration-300 flex items-center gap-2 md:gap-3
                       shadow-2xl whitespace-nowrap"
          >
            <MapPin className="w-5 h-5 md:w-6 md:h-6" />
            <span className="hidden sm:inline">Obtenir l'itinéraire</span>
            <span className="sm:hidden">Itinéraire</span>
          </a>
        </div>
      </div>
    </section>
  );
}