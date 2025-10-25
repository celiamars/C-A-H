// src/components/GroupReservation.tsx
import { Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';
import type { GroupReservation as GroupReservationType } from '../types/sanity';

export default function GroupReservation() {
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
      <section id="groupes" className="py-12 px-4 bg-[#f5f0ea] min-h-[50vh] flex items-center">
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="text-lg">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="groupes" className="py-12 md:py-20 px-4 bg-[#f5f0ea] min-h-[60vh] md:min-h-[50vh] flex items-center">
      <div className="max-w-4xl mx-auto text-center w-full">
        <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4 text-stone-900">
          {groupData.title}
        </h2>
        <div className="w-16 md:w-20 h-0.5 md:h-1 bg-[#6b4f3a] mx-auto mb-4 md:mb-6"></div>
        <p className="text-base md:text-xl text-stone-600 mb-8 md:mb-12 max-w-2xl mx-auto px-2">
          {groupData.description}
        </p>
        <div className="flex justify-center">
          <a
            href={`tel:${groupData.phoneNumber.replace(/\s/g, '')}`}
            className="bg-[#6b4f3a] text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium
                       hover:bg-[#5a4230] transition-all duration-300 flex items-center gap-2 md:gap-3 rounded-sm"
          >
            <Phone className="w-4 h-4 md:w-5 md:h-5" />
            {groupData.phoneNumber}
          </a>
        </div>
      </div>
    </section>
  );
}