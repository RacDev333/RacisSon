import React from 'react';
import { Link } from 'react-router-dom';


const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f7fa] text-gray-800 px-4 text-center">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Nie znaleziono strony</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Przepraszamy, ale strona, której szukasz, mogła zostać przeniesiona lub nie istnieje.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition"
      >
        <span className="mr-2">←</span>
        Wróć na stronę główną
      </Link>
    </div>
  );
};

export default NotFound;
