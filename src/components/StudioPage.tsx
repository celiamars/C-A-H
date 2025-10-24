import { useEffect } from 'react';

export default function StudioPage() {
  useEffect(() => {
    // Redirect to your Sanity hosted studio
    window.location.href = 'https://comptoir-aux-huiles.sanity.studio';
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-stone-900 text-white">
      <div className="text-xl">Redirection vers le Studio...</div>
    </div>
  );
}