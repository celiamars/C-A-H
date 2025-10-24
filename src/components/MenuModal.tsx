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
    const IconComponent = (LucideIcons as any)[iconName.charAt(0).toUpperCase() + iconName.slice(1)];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : <LucideIcons.Utensils className="w-6 h-6" />;
  };

  const getItemsForCategory = (categoryId: string) => {
    return menuData.items.filter((item) => item.category._ref === categoryId);
  };

  // Split categories into two columns
  const midPoint = Math.ceil(menuData.categories.length / 2);
  const leftCategories = menuData.categories.slice(0, midPoint);
  const rightCategories = menuData.categories.slice(midPoint);

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

            {loading ? (
              <div className="text-center text-white text-xl py-12">
                Chargement du menu...
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="space-y-8">
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

                <div className="lg:border-l lg:border-stone-700 lg:pl-12 space-y-8">
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
      <div className="flex items-center gap-3 mb-4">
        <div className="text-[#6b4f3a]">{icon}</div>
        <h3 className="font-serif text-2xl text-amber-50">
          {title}
          {subtitle && <span className="text-lg text-stone-400 ml-2">{subtitle}</span>}
        </h3>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item._id} className="border-b border-stone-800 pb-3 last:border-b-0">
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