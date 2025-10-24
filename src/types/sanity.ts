export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface Hero {
  _id: string;
  title: string;
  subtitle: string;
  images: SanityImage[];
  reservationButtonText?: string;
  menuButtonText?: string;
}

export interface About {
  _id: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  images: SanityImage[];
}

export interface BestSeller {
  _id: string;
  name: string;
  description: string;
  image: SanityImage;
  order: number;
}

export interface MenuCategory {
  _id: string;
  title: string;
  subtitle?: string;
  icon: string;
  order: number;
}

export interface MenuItem {
  _id: string;
  name: string;
  price: string;
  description?: string;
  category: {
    _ref: string;
  };
  order: number;
}

export interface RestaurantFeature {
  icon: string;
  title: string;
  description: string;
}

export interface Restaurant {
  _id: string;
  title: string;
  subtitle: string;
  features: RestaurantFeature[];
}

export interface EpicerieSection {
  icon: string;
  title: string;
  description: string;
}

export interface Epicerie {
  _id: string;
  title: string;
  subtitle: string;
  sections: EpicerieSection[];
  images: SanityImage[];
}

export interface Review {
  _id: string;
  name: string;
  text: string;
  rating: number;
  order: number;
}

export interface GroupReservation {
  _id: string;
  title: string;
  description: string;
  phoneNumber: string;
}

export interface FooterHours {
  weekdays: string;
  hours: string;
  closed: string;
}

export interface Footer {
  _id: string;
  restaurantName: string;
  description: string;
  address: string;
  phoneNumber: string;
  hours: FooterHours;
  instagram: string;
  instagramHandle: string;
  googleMapsUrl: string;
}