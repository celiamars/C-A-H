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
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Pain supérieur - arc arrondi */}
      <path d="M15 35 C15 22 25 15 40 15 C55 15 65 22 65 35" strokeWidth="3"/>
      
      {/* Graines - petits traits */}
      <line x1="25" y1="22" x2="26" y2="22" strokeWidth="3.5"/>
      <line x1="33" y1="19" x2="34" y2="19" strokeWidth="3.5"/>
      <line x1="40" y1="18" x2="41" y2="18" strokeWidth="3.5"/>
      <line x1="47" y1="19" x2="48" y2="19" strokeWidth="3.5"/>
      <line x1="55" y1="22" x2="56" y2="22" strokeWidth="3.5"/>
      
      {/* Laitue - ligne simple */}
      <line x1="15" y1="40" x2="65" y2="40" strokeWidth="2.5"/>
      
      {/* Steak - rectangle arrondi */}
      <rect x="15" y="44" width="50" height="8" rx="2" strokeWidth="3"/>
      
      {/* Fromage - ligne */}
      <line x1="15" y1="56" x2="65" y2="56" strokeWidth="2.5"/>
      
      {/* Pain inférieur - rectangle bien arrondi */}
      <rect x="12" y="60" width="56" height="8" rx="4" strokeWidth="3"/>
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
      return <BurgerIcon className="w-5 h-5 md:w-6 md:h-6" />;
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