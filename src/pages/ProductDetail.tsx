import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { fetchSheetAsJson } from '../services/googleSheets';

const DEFAULT_SPREADSHEET = '1KlaZ-qTVVbK0bMzHxPejQjH8j4hCRB-L3saXCaM5MwY';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const spreadsheetId = DEFAULT_SPREADSHEET;
        if (!spreadsheetId) {
          setError('Brak ID arkusza. Ustaw DEFAULT_SPREADSHEET w src/pages/ProductDetail.tsx');
          setLoading(false);
          return;
        }
        const rows = await fetchSheetAsJson(spreadsheetId);
        const mapped = rows.map((r: any) => ({
          id: (r.id ?? r.ID ?? r.Id ?? '').toString(),
          title: r.title ?? r.name ?? r.Title ?? 'Untitled',
          image: r.image ?? r.photo ?? r.img ?? null,
          price: r.price ?? r.cena ?? null,
          description: r.description ?? r.desc ?? null,
        }));
        const found = mapped.find((p: any) => encodeURIComponent(p.id) === (id ?? ''));
        setProduct(found || null);
      } catch (err) {
        console.error(err);
        setError('Nie udało się pobrać danych produktu.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loading /></div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!product) return <div className="p-8 text-center">Produkt nie znaleziony. <Link to="/products" className="text-blue-600">Powrót</Link></div>;

  return (
    <main className="max-w-[900px] mx-auto px-4 py-12">
      <div className="glass-card rounded-xl p-6">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="flex items-center justify-center bg-gradient-to-br from-black/20 to-transparent rounded-lg product-image p-4">
            {product.image ? (
              <img src={product.image} alt={product.title} className="max-h-[420px] object-contain drop-shadow-lg" />
            ) : (
              <div className="p-6 text-gray-400">Brak zdjęcia</div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-extrabold mb-2">{product.title}</h1>
            {product.price && <div className="text-2xl font-semibold mb-4 bg-gradient-to-r from-pink-500 to-yellow-400 inline-block text-black px-4 py-2 rounded-full">{product.price} PLN</div>}
            {product.description && <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{product.description}</p>}

            <div className="mt-8 flex items-center gap-4">
              <button className="gradient-btn text-black px-5 py-3 rounded-full font-semibold">Kup teraz</button>
              <Link to="/products" className="text-sm text-gray-300 hover:text-white">Powrót do katalogu</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
