import { useState } from 'react';
import MenuModal from './MenuModal';

const dishes = [
  {
    name: 'Planche à Partager',
    description: 'Sélection de charcuteries corses, fromages et produits du terroir',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPFe0wR_tN9DsgOC9il_QtQlqueAxbzvsT29ph65pBvSCyEZJKKmR0OVhomYKfaDvrpwHHPtP9OovcTkVpvJKC1zcceuoWJFdgeFv3K9RO1es1k8AjJyCv5U_4KR_NwkXUU8JAw9crk7GpQdkrinOop=w719-h958-s-no-gm?authuser=1'
  },
  {
    name: 'Magret de Canard',
    description: 'Magret rôti, accompagné de ses légumes de saison',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPxZRigmv6Kr9oQrgzAU99soJN21AJCSdyWe_HY6B-nShW6_s_dC3FmX-6h6LXSx3vInoMWr_QZiwjQ-NnKhK8gALfq6zoHIei-qKFIi4q4NZ-N42ygjp3gGoCsMk-Uf2jaQrQeuTXva-p9-SisjLR1=w983-h958-s-no-gm?authuser=1'
  },
  {
    name: 'Tartare de Saumon',
    description: 'Saumon frais mariné, avocat et condiments maison',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczONSlF6iSEYmn7AGrhEfdgV8nabYUP4Js8tyCnCwZGvpCQy1ei00mp69xO5HtilJAnJnj0oukKjAz7dnFUXpWAvBCK1R_Qk28QhcdYT1mvGZwtCKkBUjeCWRNpEty5prq6PHwTQHF02wN7YemmVDn2J=w684-h958-s-no-gm?authuser=1'
  },
  {
    name: 'Burger Corse',
    description: 'Pain artisanal, steak de bœuf, charcuterie corse et brocciu',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczNw4pIMP38skO7aZpF8gYLhoo04QcGtIppmfldwdWxW7i7WZ3gvlq-63fBIu2zurUIVVDhqycCKXPIXMNUvgnfzMEtk9lHJwVHx-i3M5eMAShxoHkDM0Y3YEjfc49Tn49XjsdD2LuirtyLJLdFmfIKV=w930-h958-s-no-gm?authuser=1'
  }
];

export default function BestSellers() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <section id="menu" className="py-20 px-4 bg-stone-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">
            Nos Incontournables
          </h2>
          <div className="w-20 h-1 bg-[#6b4f3a] mx-auto mb-6"></div>
          <p className="text-xl text-stone-300 max-w-3xl mx-auto">
            Découvrez nos plats signatures qui font la renommée du Comptoir
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish, index) => (
            <button
              key={index}
              onClick={() => setIsMenuOpen(true)}
              className="group relative overflow-hidden bg-stone-800 hover:shadow-2xl transition-all duration-500 text-left cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent"></div>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-serif mb-2 text-amber-50">{dish.name}</h3>
                <p className="text-stone-300 leading-relaxed text-sm">{dish.description}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="bg-[#6b4f3a] text-white px-8 py-4 text-lg font-medium hover:bg-[#5a4230] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Découvrir Notre Menu
          </button>
        </div>
      </div>

      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </section>
  );
}
