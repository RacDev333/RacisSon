import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  id: number;
  title: string;
  image?: string;
  price?: string;
  sale?: string | number | null;
  version?: string | null;
  retro?: string | number | null;
  size?: string | null;
};

const ProductCard: React.FC<Props> = ({ id, title, image, price, sale, version, retro, size }) => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const parsePrice = (p?: string | number | null) => {
    if (p == null) return NaN;
    return Number(String(p).replace(/\s+/g, '').replace(',', '.'));
  };

  const numericPrice = parsePrice(price);
  const salePct = (() => {
    if (sale == null) return 0;
    const v = Number(String(sale).replace('%', '').trim());
    return Number.isFinite(v) ? Math.max(0, v) : 0;
  })();
  const hasSale = salePct > 0 && Number.isFinite(numericPrice);
  const salePrice = hasSale ? +(numericPrice * (1 - salePct / 100)).toFixed(2) : NaN;
  const isRetro = (() => {
    if (retro == null) return false;
    const r = String(retro).trim().toLowerCase();
    return r === '1' || r === 'true' || r === 'yes' || r === 'tak';
  })();

  return (
    <Link ref={ref} to={`/product/${encodeURIComponent(id)}`} className={`block glass-card rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} touch-manage`} style={{width: '100%'}}>
      <div className="w-full aspect-[5/4] bg-gradient-to-br from-transparent to-black/8 flex items-center justify-center product-image relative overflow-hidden">
        {image ? (
          <>
            <img src={image} alt={title} className="max-h-full object-contain p-3 fade-in" />
            <div className="absolute inset-0 pointer-events-none shine opacity-0 hover:opacity-100 transition-opacity duration-300" />
            {hasSale && (
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow">-{salePct}%</div>
            )}
            {isRetro && (
              <div className="absolute top-3 left-3 bg-yellow-300 text-black text-xs font-extrabold px-2 py-1 rounded">[RETRO]</div>
            )}
          </>
        ) : (
          <div className="text-gray-400">Brak zdjęcia</div>
        )}
      </div>
      <div className="px-5 pt-5 pb-6 flex items-start justify-between gap-4">
        <div className="min-w-0 pr-3">
          <h3 className="font-semibold text-gray-50 text-base two-line">{isRetro ? (<><span className="text-yellow-300 font-extrabold mr-2">[RETRO]</span>{title}</>) : title}</h3>
          {version && <div className="text-xs text-gray-400 mt-1">Wersja: <span className="text-white font-medium">{version}</span></div>}
          {size && <div className="text-xs text-gray-400 mt-1">Rozmiar: <span className="text-white font-medium">{size}</span></div>}
        </div>
        {price && (
          <div className="inline-flex items-center gap-3 text-sm font-semibold text-black px-4 py-2 rounded-full shadow-lg whitespace-nowrap flex-shrink-0 bg-gradient-to-r from-pink-500 to-yellow-400">
            <div className="flex flex-col items-end">
              {hasSale ? (
                <>
                  <div className="text-sm font-extrabold">{salePrice % 1 === 0 ? salePrice.toFixed(0) : salePrice.toFixed(2)} PLN</div>
                  <div className="text-[11px] text-black/60 line-through mt-0">{numericPrice % 1 === 0 ? numericPrice.toFixed(0) : numericPrice.toFixed(2)} PLN</div>
                </>
              ) : (
                <div className="text-sm font-extrabold">{numericPrice % 1 === 0 ? numericPrice.toFixed(0) : numericPrice.toFixed(2)} PLN</div>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
