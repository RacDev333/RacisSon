import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAllData } from '../services/productsApi';

const Home: React.FC = () => {
  const { data: allData } = useAllData();
  const products = allData?.products || [];

  // Czyścimy kod promocyjny gdy użytkownik opuścił proces zakupu
  useEffect(() => {
    localStorage.removeItem('promoCodeId');
    localStorage.removeItem('promoCode');
    localStorage.removeItem('promoDiscount');
  }, []);

  const heroItems = products.slice(0, 3).map((p: any) => {
    const images = p.image
      ? p.image.toString().split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];
    return {
      id: p.id,
      src: images.length ? images[0] : undefined,
    };
  });

  return (
    <main className="max-w-[1200px] mx-auto px-6 py-20">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <section className="p-6">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-500">Koszulki Piłkarskie Specjalnie Dla Ciebie!</h1>
          <p className="text-gray-300 mb-6">Każdy fan piłki nożnej wie, jak ważna jest koszulka, która łączy wygodę z pasją. 
            Nasze koszulki piłkarskie pozwalają cieszyć się ulubioną dyscypliną zarówno na stadionie, jak i na co dzień. 
            Wszystko to w korzystnych cenach, aż żal nie sprawdziź! </p>

          <div className="flex gap-4 items-center">
            <Link to="/products" className="gradient-btn px-6 py-3 rounded-full font-semibold text-black">Sprawdź koszulki</Link>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {heroItems.length ? (
              heroItems.map((it, i) => (
                <Link key={it.id || i} to={`/product/${encodeURIComponent(it.id ?? '')}`} className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition h-28 bg-black/5 block">
                  {it.src ? (
                    <img src={it.src} alt={`hero ${i+1}`} className="w-full h-full object-cover" loading="lazy" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none'}} />
                  ) : (
                    <div className="w-full h-full bg-jersey-placeholder" />
                  )}
                </Link>
              ))
            ) : (
              <>
                <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition bg-jersey-placeholder h-28" />
                <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition bg-jersey-placeholder h-28" />
                <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition bg-jersey-placeholder h-28" />
              </>
            )}
          </div>
        </section>

        {/* jersey stack removed — using clickable hero thumbnails above */}
      </div>
    </main>
  );
};

export default Home;
