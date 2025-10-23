import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import RestaurantSection from './components/RestaurantSection';
import BestSellers from './components/BestSellers';
import EpicerieSection from './components/EpicerieSection';
import Reviews from './components/Reviews';
import GroupReservation from './components/GroupReservation';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import MenuModal from './components/MenuModal';

function App() {
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const openReservation = () => {
    window.open('https://www.thefork.fr/restaurant/le-comptoir-aux-huiles-by-delucce-r712561', '_blank');
  };

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <img
          src="https://lh3.googleusercontent.com/pw/AP1GczOm3P90U77bIck-LUKtfuKZGjlORXS0AnetpQJraXYXsDIPnrbzQlQSkqNjSo2QHiaat4mMcYPqX2DcnN5CHbUKw0iDCgIwNpohFGr0TTecWUVehZnkAy1QUmx72LB4mz-ylg2_qs8mB7TTZe9Gx6Lq=w1405-h597-s-no-gm?authuser=1"
          alt="Le Comptoir Aux Huiles"
          className="w-64 md:w-96 animate-pulse"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <Hero onReserve={openReservation} onMenuClick={openMenu} />
      <BestSellers />
      <RestaurantSection />
      <EpicerieSection />
      <About />
      <Reviews />
      <GroupReservation />
      <MapSection />
      <Footer />
      <MenuModal isOpen={isMenuOpen} onClose={closeMenu} />
    </div>
  );
}

export default App;
