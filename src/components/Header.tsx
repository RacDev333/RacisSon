import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="bg-gradient-to-r from-slate-900 to-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-300">Racis&Son</Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/products" className="text-sm text-gray-300 hover:text-white transition">Produkty</Link>
            <Link to="/contact" className="text-sm text-gray-300 hover:text-white">Kontakt</Link>
          </nav>

          <Link to="/cart" className="relative p-2 text-gray-300 hover:text-white transition" aria-label="Koszyk">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {itemCount}
              </span>
            )}
          </Link>

          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} aria-label="menu" className="p-2 rounded-md border border-transparent text-gray-300 hover:text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
        {open && (
        <div className="md:hidden bg-slate-900/80 border-t border-gray-800">
          <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col gap-3">
            <Link to="/products" onClick={()=>setOpen(false)} className="text-base font-semibold text-white hover:text-yellow-300 py-2 px-3 rounded-md">Produkty</Link>
            <Link to="/contact" onClick={()=>setOpen(false)} className="text-base font-semibold text-white hover:text-yellow-300 py-2 px-3 rounded-md">Kontakt</Link>
            <Link to="/cart" onClick={()=>setOpen(false)} className="text-base font-semibold text-white hover:text-yellow-300 py-2 px-3 rounded-md">Koszyk {itemCount > 0 && `(${itemCount})`}</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
