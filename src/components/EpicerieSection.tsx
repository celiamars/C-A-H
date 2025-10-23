import { Droplet, Wine } from 'lucide-react';

export default function EpicerieSection() {
  return (
    <section id="epicerie" className="py-20 px-4 bg-[#f5f0ea]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
            Épicerie & Cave à Vin
          </h2>
          <div className="w-20 h-1 bg-[#6b4f3a] mx-auto mb-6"></div>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Produits locaux d'exception à emporter
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md mx-auto mb-4">
                <Droplet className="w-7 h-7 text-[#6b4f3a]" />
              </div>
              <h3 className="text-2xl font-semibold text-stone-900 mb-3">
                Huiles d'Olive Naturelles
              </h3>
              <p className="text-stone-700 leading-relaxed">
                Sélection d'huiles d'olive 100% naturelles issues de producteurs locaux
                passionnés. Chaque bouteille raconte l'histoire d'un terroir unique entre
                Provence et Corse.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md mx-auto mb-4">
                <Wine className="w-7 h-7 text-[#6b4f3a]" />
              </div>
              <h3 className="text-2xl font-semibold text-stone-900 mb-3">
                Cave à Vin
              </h3>
              <p className="text-stone-700 leading-relaxed">
                Notre cave propose une sélection minutieuse de vins méditerranéens avec
                conseils personnalisés et accords mets-vins. Emportez nos coups de cœur
                pour prolonger l'expérience chez vous.
              </p>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=800"
              alt="Huile d'olive"
              className="w-full h-48 object-cover shadow-lg"
            />
            <img
              src="https://lh3.googleusercontent.com/pw/AP1GczNvTUKaqmp2CRLSPRaoCcVsSeJEVKeXgV7reMvOtIQ-wU1TmVoJFF1mCr3AXDVlxPwtC4qlDP7qh4ON_ZWVI7NcwkUAAAP8Vm82YjJoc0CA44xzFfsfqktf_mR5tQLxx_jzDsJHOxmsIXMWpFq0f2bH=w1277-h958-s-no-gm?authuser=1"
              alt="Cave à vin"
              className="w-full h-48 object-cover shadow-lg mt-6"
            />
            <img
              src="https://lh3.googleusercontent.com/pw/AP1GczPBolcB8YYLaHsO4YGg95w_i98nJjW7INC8Zr5xrZQaiA01hyXWmVh49_uLdr40H-pnVZ-O5skyOOVEBOeVS6_gDW3qR1ZQtTGu2bk4lBhPbKVPFHcNmiKwNzOyan38kUGv6BhdATZiXRJ4wfrvnt03=w1000-h667-s-no-gm?authuser=1"
              alt="Charcuterie corse"
              className="w-full h-48 object-cover shadow-lg -mt-6"
            />
            <img
              src="https://lh3.googleusercontent.com/pw/AP1GczNo8WN3D7Mafj79BKnVjySEmjx96OCglWdmWI_gpoa06HFzJD_bX0v0KxBzQJAiF5WKNnorVp73Sw3GOH66lnHvbM8m7ziPf7ftSDOe0Zs40XQMxoGWumyIbbiEaAPAoHMQeDj73rJf7OSmEQbMOfMJ=w1423-h958-s-no-gm?authuser=1"
              alt="Épicerie fine"
              className="w-full h-48 object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
