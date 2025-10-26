import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';
import type { MenuItemNested, MenuCategoryNested, Menu } from '../types/sanity';
import * as LucideIcons from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuData {
  categories: MenuCategoryNested[];
  items?: never; // Pas utilisé
}

// Icône burger personnalisée
function BurgerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 42 C12 24 22 14 50 14 C78 14 88 24 88 42" strokeWidth="3.8"/>
      <line x1="28" y1="24" x2="30" y2="24" strokeWidth="4.5"/>
      <line x1="40" y1="20" x2="42" y2="20" strokeWidth="4.5"/>
      <line x1="50" y1="18" x2="52" y2="18" strokeWidth="4.5"/>
      <line x1="60" y1="20" x2="62" y2="20" strokeWidth="4.5"/>
      <line x1="72" y1="24" x2="74" y2="24" strokeWidth="4.5"/>
      <line x1="12" y1="48" x2="88" y2="48" strokeWidth="3.2"/>
      <rect x="12" y="53" width="76" height="12" rx="2" strokeWidth="3.8"/>
      <line x1="12" y1="70" x2="88" y2="70" strokeWidth="3.2"/>
      <rect x="10" y="75" width="80" height="12" rx="6" strokeWidth="3.8"/>
    </svg>
  );
}

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const [menuData, setMenuData] = useState<MenuData>({ categories: [], items: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchMenu = async () => {
    try {
      const menuDoc = await client.fetch<Menu>(
        `*[_type == "menu"][0]{
          _id,
          title,
          categories[]{
            title,
            subtitle,
            icon,
            order,
            items[]{
              name,
              price,
              description,
              order
            }
          }
        }`
      );
      
      if (menuDoc) {
        // Trier les catégories par ordre
        const sortedCategories = menuDoc.categories.sort((a, b) => a.order - b.order);
        
        // Trier les items dans chaque catégorie
        sortedCategories.forEach(cat => {
          if (cat.items) {
            cat.items.sort((a, b) => a.order - b.order);
          }
        });
        
        setMenuData({ categories: sortedCategories, items: undefined });
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isOpen) {
    fetchMenu();
  }
}, [isOpen]);

  // Bloquer le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getIconComponent = (iconName: string) => {
    const lowerName = iconName.toLowerCase();
    if (lowerName === 'sandwich' || lowerName === 'burger' || lowerName === 'hamburger') {
      return <BurgerIcon className="w-6 h-6 md:w-7 md:h-7 -translate-y-0.3" />;

    }
    
    const normalizedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const IconComponent = (LucideIcons as any)[normalizedName];
    return IconComponent ? 
      <IconComponent className="w-5 h-5 md:w-6 md:h-6" /> : 
      <LucideIcons.Utensils className="w-5 h-5 md:w-6 md:h-6" />;
  };

  const getItemsForCategory = (category: MenuCategoryNested) => {
  return category.items || [];
};

  // Catégories de gauche: Entrées, Pâtes, Poissons, Salades
  const leftCategoryTitles = ['Entrées', 'Pâtes', 'Poissons', 'Salades'];
  const leftCategories = menuData.categories.filter(cat => 
    leftCategoryTitles.includes(cat.title)
  ).sort((a, b) => {
    return leftCategoryTitles.indexOf(a.title) - leftCategoryTitles.indexOf(b.title);
  });

  // Catégories de droite: tout le reste
  const rightCategories = menuData.categories.filter(cat => 
    !leftCategoryTitles.includes(cat.title)
  );

  const scrollToTop = () => {
    const modalContent = document.getElementById('menu-modal-content');
    if (modalContent) {
      modalContent.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" onClick={onClose}>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm"></div>

      <div className="relative h-full flex items-start md:items-center justify-center p-0 md:p-4">
        <div 
          id="menu-modal-content"
          className="relative bg-stone-900 w-full h-full md:h-auto md:max-h-[90vh] overflow-y-auto shadow-2xl md:max-w-7xl" 
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bouton fermer - fixe en haut */}
          <div className="sticky top-0 right-0 z-20 flex justify-end p-2 md:p-4 bg-gradient-to-b from-stone-900 via-stone-900/95 to-transparent">
            <button
              onClick={onClose}
              className="p-2 md:p-2.5 bg-stone-800/90 hover:bg-stone-700 text-white rounded-full transition-colors shadow-lg"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <div className="px-4 pb-4 md:px-8 md:pb-8 lg:px-12 lg:pb-12 pt-0 md:pt-4">
            <div className="text-center mb-6 md:mb-8 lg:mb-12">
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white mb-2 md:mb-3 lg:mb-4">Notre Menu</h2>
              <div className="w-12 md:w-16 lg:w-20 h-0.5 md:h-1 bg-[#6b4f3a] mx-auto"></div>
            </div>

            {loading ? (
              <div className="text-center text-white text-base md:text-lg lg:text-xl py-12">
                Chargement du menu...
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                  {/* Colonne de gauche */}
                  {/* Colonne de gauche */}
                  <div className="space-y-6 md:space-y-8">
                    {leftCategories.map((category, index) => (
                      <MenuSection
                        key={index}
                        icon={getIconComponent(category.icon)}
                        title={category.title}
                        subtitle={category.subtitle}
                        items={getItemsForCategory(category)}
                      />
                    ))}
                  </div>

                  {/* Colonne de droite */}
                  <div className="lg:border-l lg:border-stone-700 lg:pl-12 space-y-6 md:space-y-8">
                    {rightCategories.map((category, index) => (
                      <MenuSection
                        key={index}
                        icon={getIconComponent(category.icon)}
                        title={category.title}
                        subtitle={category.subtitle}
                        items={getItemsForCategory(category)}
                      />
                    ))}
                  </div>
                </div>

                
              </>
            )}
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
  items: MenuItemNested[];
}

function MenuSection({ icon, title, subtitle, items }: MenuSectionProps) {
  return (
    <div className="text-white">
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        <div className="text-[#6b4f3a] flex-shrink-0">{icon}</div>
        <h3 className="font-serif text-lg md:text-xl lg:text-2xl text-amber-50">
          {title}
          {subtitle && <span className="text-xs md:text-sm lg:text-base xl:text-lg text-stone-400 ml-2 block md:inline">{subtitle}</span>}
        </h3>
      </div>
      <div className="space-y-2 md:space-y-3">
      {items.map((item, index) => (
        <div key={index} className="border-b border-stone-800 pb-2 md:pb-3 last:border-b-0">
          <div className="flex justify-between items-start gap-3 md:gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base text-stone-200 leading-relaxed">{item.name}</p>
              {item.description && (
                <p className="text-xs md:text-sm text-stone-400 mt-1 whitespace-pre-line">{item.description}</p>
              )}
            </div>
            {item.price && (
              <span className="text-sm md:text-base text-[#6b4f3a] font-medium whitespace-nowrap flex-shrink-0">
                {item.price}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}