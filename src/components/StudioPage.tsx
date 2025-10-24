import { useEffect } from 'react';

export default function StudioPage() {
  useEffect(() => {
    // Redirect to studio folder
    window.location.href = '/studio/index.html';
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-xl">Loading Sanity Studio...</div>
    </div>
  );
}