import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-gray-800">
      <div className="max-w-[1200px] mx-auto px-4 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Racis&Son — Imported with care ✦
      </div>
    </footer>
  );
};

export default Footer;
