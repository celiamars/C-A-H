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
      <section id="groupes" className="py-20 px-4 bg-[#f5f0ea]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xl">Chargement...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="groupes" className="py-20 px-4 bg-[#f5f0ea]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-4 text-stone-900">
          {groupData.title}
        </h2>
        <div className="w-20 h-1 bg-[#6b4f3a] mx-auto mb-6"></div>
        <p className="text-xl text-stone-600 mb-12 max-w-2xl mx-auto">
          {groupData.description}
        </p>
        <div className="flex justify-center">
          <a
            href={`tel:${groupData.phoneNumber.replace(/\s/g, '')}`}
            className="bg-[#6b4f3a] text-white px-8 py-4 text-lg font-medium
                       hover:bg-[#5a4230] transition-all duration-300 flex items-center gap-3"
          >
            <Phone className="w-5 h-5" />
            {groupData.phoneNumber}
          </a>
        </div>
      </div>
    </section>
  );
}