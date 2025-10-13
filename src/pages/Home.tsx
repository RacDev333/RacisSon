import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <main className="max-w-[900px] mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold mb-4">Katalog produktów (Google Sheets)</h1>
      <p className="text-gray-600 mb-8">Ten projekt został przerobiony, aby korzystać z Google Sheets jako prostego backendu dla listy produktów. Z linku poniżej przejdziesz do strony z produktami.</p>
      <div className="space-x-4">
        <Link to="/products" className="inline-block px-6 py-3 bg-red-600 text-white rounded-md">Zobacz produkty</Link>
      </div>

      <section className="mt-12 text-left">
        <h2 className="text-xl font-semibold mb-2">Konfiguracja</h2>
        <ol className="list-decimal list-inside text-gray-700">
          <li>Otwórz swój arkusz Google i upewnij się, że jest publiczny (Anyone with the link can view).</li>
          <li>Umieść kolumny: <code>id</code>, <code>title</code>, <code>image</code>, <code>price</code>, <code>description</code>.</li>
          <li>W plikach <code>src/pages/Products.tsx</code> i <code>src/pages/ProductDetail.tsx</code> ustaw stałą <code>DEFAULT_SPREADSHEET</code> na ID arkusza (część URL między /d/ i /edit).</li>
          <li>Uruchom aplikację: <code>npm run dev</code> i przejdź do <code>/products</code>.</li>
        </ol>
      </section>
    </main>
  );
};

export default Home;
