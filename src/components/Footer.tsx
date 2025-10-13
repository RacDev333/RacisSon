import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12">
      <div className="max-w-[1200px] mx-auto px-4 py-8 text-sm text-gray-300">
        <div className="glass-card rounded-md p-4 flex items-center justify-between">
          <div className="text-sm text-gray-300">© {new Date().getFullYear()} Racis&Son — Imported with care ✦</div>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="text-sm text-gray-300 hover:text-white">Kontakt</Link>
            <a href="#" className="text-sm text-gray-300 hover:text-white">Instagram</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
