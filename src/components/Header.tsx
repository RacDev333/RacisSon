import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-gradient-to-r from-slate-900 to-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-300">Racis&Son</Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/products" className="text-sm text-gray-300 hover:text-white transition">Produkty</Link>
          <Link to="/contact" className="text-sm text-gray-300 hover:text-white">Kontakt</Link>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} aria-label="menu" className="p-2 rounded-md border border-transparent text-gray-300 hover:text-white">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>
        </div>
      </div>

      {/* mobile menu */}
        {open && (
        <div className="md:hidden bg-slate-900/80 border-t border-gray-800">
          <div className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col gap-3">
            <Link to="/products" onClick={()=>setOpen(false)} className="text-base font-semibold text-white hover:text-yellow-300 py-2 px-3 rounded-md">Produkty</Link>
            <Link to="/contact" onClick={()=>setOpen(false)} className="text-base font-semibold text-white hover:text-yellow-300 py-2 px-3 rounded-md">Kontakt</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
