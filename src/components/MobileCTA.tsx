import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MobileCTA: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Don't show on contact page
  if (pathname === '/contact') return null;

  return (
    <button
      onClick={() => navigate('/contact')}
      className="fixed bottom-5 right-5 z-50 bg-gradient-to-r from-pink-400 to-yellow-300 p-3 rounded-full shadow-lg text-black font-semibold sm:hidden"
      aria-label="Skontaktuj się z nami"
    >
      Kontakt
    </button>
  );
};

export default MobileCTA;
