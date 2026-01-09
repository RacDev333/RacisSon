import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { fetchSheetAsJson } from '../services/googleSheets';

const DEFAULT_SPREADSHEET = '1KlaZ-qTVVbK0bMzHxPejQjH8j4hCRB-L3saXCaM5MwY';

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
        const mapped = rows.map((r: any) => {
          const rawImages = r.images ?? r.photos ?? r.gallery ?? r.image ?? r.photo ?? r.img ?? null;
          let firstImage = null;
          if (rawImages) {
            const arr = rawImages.toString().split(',').map((s: string) => s.trim()).filter(Boolean);
            firstImage = arr.length ? arr[0] : null;
          }
          return {
            id: (r.id ?? r.ID ?? r.Id ?? '').toString(),
            title: r.title ?? r.name ?? r.Title ?? 'Untitled',
            image: firstImage,
            price: r.price ?? r.cena ?? null,
            sale: r.sale ?? r.discount ?? r.promocja ?? null,
            version: r.version ?? null,
            retro: r.retro ?? null,
            size: r.size ?? null,
          };
        });
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
          <ProductCard key={p.id} id={p.id} title={p.title} image={p.image} price={p.price} sale={p.sale} version={p.version} retro={p.retro} size={p.size}/>
        ))}
      </div>
    </main>
  );
};

export default Products;
