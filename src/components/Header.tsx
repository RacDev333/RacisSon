import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-gray-900 border-b border-gray-800">
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-300">Racis&Son</Link>
        <nav className="space-x-4 flex items-center">
          <Link to="/products" className="text-sm text-gray-300 hover:text-white transition">Produkty</Link>
          <a href="#" className="text-sm text-gray-400 hover:text-white ml-4 hidden sm:inline-block">Kontakt</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
