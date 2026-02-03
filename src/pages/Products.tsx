import React, { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { useAllData } from '../services/productsApi';

const Products: React.FC = () => {
  const { data: allData, isLoading: loading, error } = useAllData();
  const products = allData?.products || [];

  // Czyścimy kod promocyjny gdy użytkownik opuścił proces zakupu
  useEffect(() => {
    localStorage.removeItem('promoCodeId');
    localStorage.removeItem('promoCode');
    localStorage.removeItem('promoDiscount');
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loading /></div>;
  if (error) return <div className="p-8 text-center text-red-600">Nie udało się pobrać produktów.</div>;

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
          <ProductCard key={p.id} id={p.id} title={p.title} image={p.image} price={String(p.price)} sale={p.sale} version={p.version} retro={p.is_retro ? 'true' : 'false'} size={p.size}/>
        ))}
      </div>
    </main>
  );
};

export default Products;
