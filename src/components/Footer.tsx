import { MapPin, Phone, Clock, Instagram, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-serif text-2xl mb-4">Le Comptoir Aux Huiles</h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Restaurant authentique au cœur du Panier, alliant tradition marseillaise et saveurs corses depuis 1900
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#6b4f3a]">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#6b4f3a]" />
                <p className="text-stone-400">
                  38 Rue Sainte-Françoise<br />
                  13002 Marseille
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-[#6b4f3a]" />
                <a href="tel:0781075108" className="text-stone-400 hover:text-white transition-colors">
                  07 81 07 51 08
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
                  <p>Mardi - Dimanche</p>
                  <p className="font-semibold text-white">9h - 23h30</p>
                  <p className="mt-2">Lundi : Fermé</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4 text-[#6b4f3a]">Suivez-nous</h4>
            <a
              href="https://www.instagram.com/lecomptoirauxhuiles/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors text-sm"
            >
              <Instagram className="w-5 h-5 text-[#6b4f3a]" />
              @lecomptoirauxhuiles
            </a>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 text-center text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} Le Comptoir Aux Huiles. Tous droits réservés.</p>
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
