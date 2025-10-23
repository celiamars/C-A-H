import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  'https://lh3.googleusercontent.com/pw/AP1GczNYJNOWS6lvvCo0ODZBxgimIeBrjuVelIxQjoGBBGNh9Jk15wWOJqbQjKoZR2XOX2SJNsh2mnwF3ue-wAi14yrCIzNaBtmXdm1w5gqalg1CT0LdDzhZfwpkrrXWst27-6xadN8tFhsF-p1_qSJZPTE=w1200-h1600-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczMIV7XSwaz4X_mzC8y20PN4TLz3g-ns6-eMuRTVyFKme4O8f55ryO2KOf249Xli_TKyRvRIRi240251pKa5eAAkY0ri441geUmcqhcJGu8jQ_MOjbWssDJtvtdHcxBiPbM7QNgiBNMKdeguKA6FBzk=w1200-h1600-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczOY5dLqi9RInQBNbH9hkfDHGyg3GqhGORkHGlL9ItGsY7rFE9FtazG5K9uOjRzHie34MCbTfR6IyvihPJKubhAEz7_2vUg_ePZUtFOcIXouGakD6g6thRQg8AJWqt6HV38ycxpQsYXGtvZ7jQ6-Wqg=w1200-h1600-s-no-gm?authuser=0',
  'https://lh3.googleusercontent.com/pw/AP1GczPfdb9bQpIG_2MPVh1poZmnzBVPtHOAY5aIBkS5sg3KszeuikGnGC4logcQMVZiBltpe93zYos-SZrK1Qa3iz7CmQ8_vbt5V0LcRz3DpX8clZRGh4H-iYoObs-sHL3NZK8MsXZLHkqLVo8CnD5n5F0=w1200-h1600-s-no-gm?authuser=0'
];

export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-20 px-4 bg-stone-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="font-serif text-4xl md:text-5xl">
              Notre Histoire
            </h2>
            <div className="w-20 h-1 bg-[#6b4f3a]"></div>
            <p className="text-lg text-stone-300 leading-relaxed">
              Le Comptoir Aux Huiles trouve ses racines dans l'histoire authentique du quartier
              du Panier. Installé dans un ancien four à pain datant de 1900, cet espace familial
              était autrefois une boulangerie qui faisait vivre le quartier.
            </p>
            <p className="text-lg text-stone-300 leading-relaxed">
              Aujourd'hui, nous perpétuons cette tradition de convivialité en transformant ce
              lieu chargé d'histoire en un espace de rencontre unique : restaurant, épicerie fine
              et cave à vin, où se mêlent authenticité marseillaise et saveurs corses.
            </p>
          </div>

          <div className="relative">
            <div className="relative h-[480px] overflow-hidden shadow-lg">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Notre histoire ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}

              <button
                onClick={previousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60
                           text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60
                           text-white p-2 rounded-full backdrop-blur-sm transition-all duration-300"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-white w-6'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
