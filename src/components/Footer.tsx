import { MapPin, Phone, Clock, Instagram, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';
import type { Footer as FooterType } from '../types/sanity';

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const data = await client.fetch<FooterType>(
          `*[_type == "footer"][0]{
            _id,
            restaurantName,
            description,
            address,
            phoneNumber,
            hours,
            instagram,
            instagramHandle,
            googleMapsUrl
          }`
        );
        setFooterData(data);
      } catch (error) {
        console.error('Error fetching footer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooter();
  }, []);

  if (loading || !footerData) {
    return (
      <footer className="bg-black text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-stone-400">Chargement...</div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl mb-4">{footerData.restaurantName}</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              {footerData.description}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#6b4f3a]">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#6b4f3a]" />
                <p className="text-stone-400 whitespace-pre-line">
                  {footerData.address}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#6b4f3a]" />
                <a 
                  href={`tel:${footerData.phoneNumber.replace(/\s/g, '')}`} 
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  {footerData.phoneNumber}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#6b4f3a]">Horaires</h4>
            <div className="space-y-2 text-sm text-stone-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-1 flex-shrink-0 text-[#6b4f3a]" />
                <div>
                  <p>{footerData.hours.weekdays}</p>
                  <p className="font-semibold text-white">{footerData.hours.hours}</p>
                  <p className="mt-2">{footerData.hours.closed}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#6b4f3a]">Suivez-nous</h4>
            <a
              href={footerData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors text-sm"
            >
              <Instagram className="w-5 h-5 text-[#6b4f3a]" />
              {footerData.instagramHandle}
            </a>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 text-center text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} {footerData.restaurantName}. Tous droits réservés.</p>
          <a
            href="https://www.vasseo.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 hover:text-stone-400 transition-colors"
          >
            Created with <Heart className="w-4 h-4 fill-[#6b4f3a] text-[#6b4f3a]" /> by Vasseo
          </a>
        </div>
      </div>
    </footer>
  );
}