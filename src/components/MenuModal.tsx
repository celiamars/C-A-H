import { X, Salad, Fish, Beef, Wheat, IceCream, Dessert, Baby, Utensils } from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm"></div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-stone-900 w-full max-w-7xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-stone-800/80 hover:bg-stone-700 text-white rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Notre Menu</h2>
              <div className="w-20 h-1 bg-[#6b4f3a] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-8">
                <MenuSection
                  icon={<SkewersIcon className="w-6 h-6" />}
                  title="Entrées"
                  items={[
                    { name: 'Panisses, sauce Provençale', price: '9€' },
                    { name: 'Assiette de charcuterie ou de fromage corse', price: '12€' },
                    { name: 'Burrata Crémeuse, Tomates, Pesto', price: '12€' },
                    { name: 'Planches à partager (ou pas …)', price: '20€', description: 'Soit Panisse + Charcuterie = Planche du Panier\nOu Charcuterie + Fromage = Planche Corse' }
                  ]}
                />

                <MenuSection
                  icon={<Wheat className="w-6 h-6" />}
                  title="Pâtes"
                  items={[
                    { name: 'Linguines Pesto Rosso', price: '15€' },
                    { name: 'Linguines Paysannes (crème, oeuf cru, coppa)', price: '20€' },
                    { name: 'Pâtes du jour', price: '19€' }
                  ]}
                />

                <MenuSection
                  icon={<Fish className="w-6 h-6" />}
                  title="Poissons"
                  items={[
                    { name: 'Steak de Thon mi-cuit, Riz Rougail', price: '19€' },
                    { name: 'Filet de rouget-barbet, Linguines bisque de poisson', price: '24€' },
                    { name: 'Piccata de Saumon, Riz Rougail', price: '22€' }
                  ]}
                />

                <MenuSection
                  icon={<Salad className="w-6 h-6" />}
                  title="Salades"
                  items={[
                    { name: 'Toscane (burrata, jambon cru, poivron marinés, pesto)', price: '18€' },
                    { name: 'Chèvre chaud (crottin de chèvre, oeuf, lardons, …)', price: '18€' },
                    { name: 'Végé (aubergine, feta, pois chiches, poivrons marinés, …)', price: '18€' }
                  ]}
                />
              </div>

              <div className="lg:border-l lg:border-stone-700 lg:pl-12 space-y-8">
                <MenuSection
                  icon={<Beef className="w-6 h-6" />}
                  title="Viandes"
                  subtitle="(frites maison, salade)"
                  items={[
                    { name: 'Entrecôte à la plancha', price: '23€' },
                    { name: 'Magret de canard, romarin', price: '22€' },
                    { name: "Filets de Tofu à l'ail des ours, Riz Rougail", price: '18€' },
                    { name: 'Carbonades à la FADA', price: '24€' }
                  ]}
                />

                <MenuSection
                  icon={<Utensils className="w-6 h-6" />}
                  title="Tartares"
                  items={[
                    { name: 'Du comptoir (boeuf coupé au couteau)', price: '18€' },
                    { name: 'Saumon, frites, salade', price: '20€' }
                  ]}
                />

                <MenuSection
                  icon={<BurgerIcon className="w-6 h-6" />}
                  title="Burgers"
                  subtitle="(frites maison, salade)"
                  items={[
                    { name: 'Corse (steak 150g, tome de brebis, jambon cru)', price: '20€' },
                    { name: 'Italien (steak 150g, burrata, pesto, salade, tomate)', price: '20€' },
                    { name: 'Végé (filet de tofu, pesto, …)', price: '19€' }
                  ]}
                />

                <MenuSection
                  icon={<Baby className="w-6 h-6" />}
                  title="Les Minots"
                  items={[
                    { name: "Nuggets, frites, salade", price: '12€' }
                  ]}
                />

                <MenuSection
                  icon={<Dessert className="w-6 h-6" />}
                  title="Desserts Maison"
                  items={[
                    { name: 'Mousse Chocolat', price: '7€' },
                    { name: 'Panna Cotta aux fruits rouges', price: '7€' },
                    { name: 'Crème brûlée (vanille ou citron vert)', price: '7€' },
                    { name: 'Café Gourmand', price: '9€' }
                  ]}
                />

                <MenuSection
                  icon={<IceCream className="w-6 h-6" />}
                  title="Glaces artisanales"
                  items={[
                    { name: 'Vanille • Chocolat • Pistache • Fraise • Citron • Fruits rouges', price: '' }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MenuSectionProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  items: Array<{
    name: string;
    price: string;
    description?: string;
  }>;
}

function BurgerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path d="M3 12c0-2 1-3.5 2.5-4.5 0.2-0.1 0.4 0 0.4 0.2v0.8c0 0.1-0.1 0.3-0.2 0.4-1.1 0.7-1.7 1.9-1.7 3.1 0 1.3 0.6 2.5 1.7 3.2 0.1 0.1 0.2 0.2 0.2 0.4v0.8c0 0.2-0.2 0.3-0.4 0.2-1.5-0.9-2.5-2.5-2.5-4.3z" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="8" cy="5" rx="0.6" ry="0.3" fill="currentColor" stroke="none"/>
      <ellipse cx="10" cy="4.2" rx="0.6" ry="0.3" fill="currentColor" stroke="none"/>
      <ellipse cx="12.5" cy="3.7" rx="0.6" ry="0.3" fill="currentColor" stroke="none"/>
      <ellipse cx="15.5" cy="4.2" rx="0.6" ry="0.3" fill="currentColor" stroke="none"/>
      <ellipse cx="18" cy="4.7" rx="0.6" ry="0.3" fill="currentColor" stroke="none"/>
      <path d="M4 6.5c0-2 4.5-3.2 8.5-3.2s8.5 1.2 8.5 3.2" strokeWidth="0.6" strokeLinecap="round"/>
      <line x1="3.5" y1="10" x2="21" y2="10" strokeWidth="0.6" strokeLinecap="round"/>
      <path d="M4 10.5c0 0 3 1.5 8.5 1.5s8.5-1.5 8.5-1.5" strokeWidth="0.6" strokeLinecap="round" fill="none"/>
      <path d="M3.5 12.5c0.2 0 0.4 0.1 0.4 0.3s-0.2 0.3-0.4 0.3h-0c-0.2 0-0.4-0.1-0.4-0.3s0.2-0.3 0.4-0.3z" fill="currentColor" stroke="none"/>
      <line x1="4" y1="13.5" x2="20.5" y2="13.5" strokeWidth="0.6" strokeLinecap="round"/>
      <line x1="3.8" y1="16" x2="20.8" y2="16" strokeWidth="0.6" strokeLinecap="round"/>
      <path d="M3.2 16.5c0 2 4.2 3.2 9 3.2s9-1.2 9-3.2" strokeWidth="0.6" strokeLinecap="round" fill="none"/>
      <path d="M21 12c0-2-1-3.5-2.5-4.5-0.2-0.1-0.4 0-0.4 0.2v0.8c0 0.1 0.1 0.3 0.2 0.4 1.1 0.7 1.7 1.9 1.7 3.1 0 1.3-0.6 2.5-1.7 3.2-0.1 0.1-0.2 0.2-0.2 0.4v0.8c0 0.2 0.2 0.3 0.4 0.2 1.5-0.9 2.5-2.5 2.5-4.3z" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SkewersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <line x1="7" y1="2" x2="4.5" y2="22" strokeLinecap="round"/>
      <ellipse cx="6.5" cy="5" rx="2" ry="2.5" strokeLinejoin="round"/>
      <circle cx="6.3" cy="5.2" r="0.5" fill="currentColor"/>
      <path d="M 5 9.5 L 4.8 10.5 L 7.5 10.5 L 7.3 9.5 Z" strokeLinejoin="round"/>
      <rect x="4.5" y="9.8" width="1" height="0.8" fill="currentColor" stroke="none"/>
      <ellipse cx="5.5" cy="14.5" rx="2" ry="2.5" strokeLinejoin="round"/>
      <circle cx="5.5" cy="14.5" r="0.5" fill="currentColor"/>
      <line x1="17" y1="2" x2="19.5" y2="22" strokeLinecap="round"/>
      <path d="M 16.5 5.5 Q 16.8 4.5 17.5 4.3 Q 18.2 4.5 18.5 5.5 L 18.3 6.5 L 16.7 6.5 Z" strokeLinejoin="round"/>
      <line x1="17.5" y1="5.2" x2="17.5" y2="6" strokeWidth="0.8"/>
      <path d="M 16.5 10 L 16.3 11.2 L 19.2 11.2 L 19 10 Z" strokeLinejoin="round"/>
      <rect x="17" y="10.3" width="1" height="0.8" fill="currentColor" stroke="none"/>
      <ellipse cx="18" cy="15.5" rx="2" ry="2.5" strokeLinejoin="round"/>
      <circle cx="18" cy="15.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function MenuSection({ icon, title, subtitle, items }: MenuSectionProps) {
  return (
    <div className="text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-[#6b4f3a]">{icon}</div>
        <h3 className="font-serif text-2xl text-amber-50">
          {title}
          {subtitle && <span className="text-lg text-stone-400 ml-2">{subtitle}</span>}
        </h3>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="border-b border-stone-800 pb-3 last:border-b-0">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <p className="text-stone-200 leading-relaxed">{item.name}</p>
                {item.description && (
                  <p className="text-sm text-stone-400 mt-1 whitespace-pre-line">{item.description}</p>
                )}
              </div>
              {item.price && <span className="text-[#6b4f3a] font-medium whitespace-nowrap">{item.price}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
