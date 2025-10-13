import React from 'react';
import { Link } from 'react-router-dom';


const NotFound: React.FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-[900px] w-full">
        <div className="glass-card rounded-xl p-8 text-center">
          <div className="text-9xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-300">404</div>
          <h2 className="text-2xl font-semibold mt-4 text-gray-100">Ups — nie znaleziono strony</h2>
          <p className="text-gray-300 mt-3 max-w-prose mx-auto">Strona, której szukasz, nie istnieje lub została przeniesiona. Możesz wrócić do katalogu produktów lub na stronę główną.</p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/products" className="gradient-btn px-5 py-3 rounded-full text-black font-semibold">Przejdź do produktów</Link>
            <Link to="/" className="text-sm text-gray-300 hover:text-white">Wróć na stronę główną</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
