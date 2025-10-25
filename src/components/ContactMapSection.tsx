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
      <section id="groupes" className="min-h-screen bg-[#f5f0ea] flex items-center justify-center">
        <div className="text-center">
          <div className="text-base">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="groupes" className="min-h-screen bg-[#f5f0ea] flex flex-col">
      {/* Group Reservation Section - Top Half */}
      <div className="flex-1 flex items-center justify-center py-6 md:py-8 px-4">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 className="font-serif text-xl md:text-3xl lg:text-4xl mb-2 md:mb-3 text-stone-900">
            {groupData.title}
          </h2>
          <div className="w-12 md:w-16 h-0.5 bg-[#6b4f3a] mx-auto mb-3 md:mb-4"></div>
          <p className="text-sm md:text-base lg:text-lg text-stone-600 mb-4 md:mb-6 max-w-2xl mx-auto px-2">
            {groupData.description}
          </p>
          <div className="flex justify-center">
            <a
              href={`tel:${groupData.phoneNumber.replace(/\s/g, '')}`}
              className="bg-[#6b4f3a] text-white px-5 md:px-7 py-2.5 md:py-3 text-sm md:text-base font-medium
                         hover:bg-[#5a4230] transition-all duration-300 flex items-center gap-2 rounded-sm shadow-lg"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
              {groupData.phoneNumber}
            </a>
          </div>
        </div>
      </div>

      {/* Map Section - Bottom Half */}
      <div className="relative w-full h-[45vh] md:h-[50vh] min-h-[300px]">
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
        <div className="absolute bottom-3 md:bottom-6 left-1/2 -translate-x-1/2 z-10 px-4">
          <a
            href="https://maps.app.goo.gl/eyfiDi2n9mpkBmSbA?g_st=ipc"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#6b4f3a] text-white px-5 md:px-7 py-2.5 md:py-3 text-sm md:text-base font-medium
                       hover:bg-[#5a4230] transition-all duration-300 flex items-center gap-2
                       shadow-2xl rounded-sm whitespace-nowrap"
          >
            <MapPin className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Obtenir l'itinéraire</span>
            <span className="sm:hidden">Itinéraire</span>
          </a>
        </div>
      </div>
    </section>
  );
}