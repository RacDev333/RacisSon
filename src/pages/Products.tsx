import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { fetchSheetAsJson } from '../services/googleSheets';

// Small contract:
// - Input: spreadsheetId (from query param or default)
// - Output: list of products: { id, title, image, price }

const DEFAULT_SPREADSHEET = '1KlaZ-qTVVbK0bMzHxPejQjH8j4hCRB-L3saXCaM5MwY'; // <-- set your spreadsheet id here or pass via ?sheet=

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const spreadsheetId = DEFAULT_SPREADSHEET;
        if (!spreadsheetId) {
          setError('Brak ID arkusza. Ustaw DEFAULT_SPREADSHEET w src/pages/Products.tsx');
          setLoading(false);
          return;
        }
        const rows = await fetchSheetAsJson(spreadsheetId);
        const mapped = rows.map((r: any) => ({
          id: (r.id ?? r.ID ?? r.Id ?? '').toString(),
          title: r.title ?? r.name ?? r.Title ?? 'Untitled',
          image: r.image ?? r.photo ?? r.img ?? null,
          price: r.price ?? r.cena ?? null,
        }));
        setProducts(mapped);
      } catch (err: any) {
        console.error(err);
        setError('Nie udało się pobrać arkusza.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loading /></div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <main className="max-w-[1400px] mx-auto px-6 py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-white mb-1">Katalog produktów</h1>
        <p className="text-gray-400">Twoja pasja, nasze produkty.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} id={p.id} title={p.title} image={p.image} price={p.price} />
        ))}
      </div>
    </main>
  );
};

export default Products;
