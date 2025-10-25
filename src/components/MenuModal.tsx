import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { client } from '../lib/sanity';
import type { MenuItem, MenuCategory } from '../types/sanity';
import * as LucideIcons from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuData {
  categories: MenuCategory[];
  items: MenuItem[];
}

// Icône burger personnalisée
function BurgerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Pain supérieur */}
      <path d="M12 42 C12 24 22 14 50 14 C78 14 88 24 88 42" strokeWidth="3.8"/>
      
      {/* Graines */}
      <line x1="28" y1="24" x2="30" y2="24" strokeWidth="4.5"/>
      <line x1="40" y1="20" x2="42" y2="20" strokeWidth="4.5"/>
      <line x1="50" y1="18" x2="52" y2="18" strokeWidth="4.5"/>
      <line x1="60" y1="20" x2="62" y2="20" strokeWidth="4.5"/>
      <line x1="72" y1="24" x2="74" y2="24" strokeWidth="4.5"/>
      
      {/* Laitue */}
      <line x1="12" y1="48" x2="88" y2="48" strokeWidth="3.2"/>
      
      {/* Steak */}
      <rect x="12" y="53" width="76" height="12" rx="2" strokeWidth="3.8"/>
      
      {/* Fromage */}
      <line x1="12" y1="70" x2="88" y2="70" strokeWidth="3.2"/>
      
      {/* Pain inférieur */}
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
        const [categories, items] = await Promise.all([
          client.fetch<MenuCategory[]>(
            `*[_type == "menuCategory"] | order(order asc) {
              _id,
              title,
              subtitle,
              icon,
              order
            }`
          ),
          client.fetch<MenuItem[]>(
            `*[_type == "menuItem"] | order(order asc) {
              _id,
              name,
              price,
              description,
              category,
              order
            }`
          ),
        ]);
        setMenuData({ categories, items });
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

  if (!isOpen) return null;

  const getIconComponent = (iconName: string) => {
    // Cas spécial pour burger
    const lowerName = iconName.toLowerCase();
    if (lowerName === 'sandwich' || lowerName === 'burger' || lowerName === 'hamburger') {
      return <BurgerIcon className="w-8 h-8 md:w-9 md:h-9" />;
    }
    
    const normalizedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const IconComponent = (LucideIcons as any)[normalizedName];
    return IconComponent ? 
      <IconComponent className="w-5 h-5 md:w-6 md:h-6" /> : 
      <LucideIcons.Utensils className="w-5 h-5 md:w-6 md:h-6" />;
  };

  const getItemsForCategory = (categoryId: string) => {
    return menuData.items.filter((item) => item.category._ref === categoryId);
  };

  const midPoint = Math.ceil(menuData.categories.length / 2);
  const leftCategories = menuData.categories.slice(0, midPoint);
  const rightCategories = menuData.categories.slice(midPoint);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm"></div>

      <div className="relative min-h-screen flex items-center justify-center p-2 md:p-4">
        <div className="relative bg-stone-900 w-full max-w-7xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onClose}
            className="sticky top-2 right-2 float-right z-10 p-2 bg-stone-800/80 hover:bg-stone-700 text-white rounded-full transition-colors"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="p-4 md:p-8 lg:p-12">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-3 md:mb-4">Notre Menu</h2>
              <div className="w-16 md:w-20 h-1 bg-[#6b4f3a] mx-auto"></div>
            </div>

            {loading ? (
              <div className="text-center text-white text-lg md:text-xl py-12">
                Chargement du menu...
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
                <div className="space-y-6 md:space-y-8">
                  {leftCategories.map((category) => (
                    <MenuSection
                      key={category._id}
                      icon={getIconComponent(category.icon)}
                      title={category.title}
                      subtitle={category.subtitle}
                      items={getItemsForCategory(category._id)}
                    />
                  ))}
                </div>

                <div className="lg:border-l lg:border-stone-700 lg:pl-12 space-y-6 md:space-y-8">
                  {rightCategories.map((category) => (
                    <MenuSection
                      key={category._id}
                      icon={getIconComponent(category.icon)}
                      title={category.title}
                      subtitle={category.subtitle}
                      items={getItemsForCategory(category._id)}
                    />
                  ))}
                </div>
              </div>
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
  items: MenuItem[];
}

function MenuSection({ icon, title, subtitle, items }: MenuSectionProps) {
  return (
    <div className="text-white">
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        <div className="text-[#6b4f3a] flex-shrink-0">{icon}</div>
        <h3 className="font-serif text-xl md:text-2xl text-amber-50">
          {title}
          {subtitle && <span className="text-sm md:text-base lg:text-lg text-stone-400 ml-2 block md:inline">{subtitle}</span>}
        </h3>
      </div>
      <div className="space-y-2 md:space-y-3">
        {items.map((item) => (
          <div key={item._id} className="border-b border-stone-800 pb-2 md:pb-3 last:border-b-0">
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