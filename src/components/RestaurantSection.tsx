import { Leaf, Sun, Coffee } from 'lucide-react';

export default function RestaurantSection() {
  return (
    <section id="restaurant" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
            Restaurant & Terrasse
          </h2>
          <div className="w-20 h-1 bg-[#6b4f3a] mx-auto mb-6"></div>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Un lieu de vie convivial où authenticité et saveurs se rencontrent
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#f5f0ea] rounded-full flex items-center justify-center mx-auto mb-4">
              <Sun className="w-8 h-8 text-[#6b4f3a]" />
            </div>
            <h3 className="text-xl font-semibold text-stone-900 mb-2">Grande Terrasse</h3>
            <p className="text-stone-600">
              Profitez de notre magnifique terrasse ensoleillée, véritable atout du Comptoir
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#f5f0ea] rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-[#6b4f3a]" />
            </div>
            <h3 className="text-xl font-semibold text-stone-900 mb-2">Produits Frais</h3>
            <p className="text-stone-600">
              Une cuisine authentique élaborée avec des produits frais et locaux
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-[#f5f0ea] rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee className="w-8 h-8 text-[#6b4f3a]" />
            </div>
            <h3 className="text-xl font-semibold text-stone-900 mb-2">Ambiance Chaleureuse</h3>
            <p className="text-stone-600">
              Un cadre authentique alliant charme de l'ancien et convivialité méditerranéenne
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
