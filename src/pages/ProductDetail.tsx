import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'; // 1. Importy z biblioteki
import Loading from '../components/Loading';
import { fetchProducts } from '../services/productsApi';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [addedToCart, setAddedToCart] = useState(false);

  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  
  const { addItem } = useCart();

  const { data: products = [], isLoading: loading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const product = useMemo(() => {
    if (!id) return null;
    const decodedId = decodeURIComponent(id);
    const numericId = parseInt(decodedId, 10);
    return products.find((p: any) => p.id === numericId) || null;
  }, [products, id]);

  useEffect(() => {
    setGalleryIndex(0);
  }, [id]);

  const images = useMemo(() => {
    if (!product) return [];
    // API returns comma-separated image URLs in 'image' field
    return product.image 
      ? product.image.toString().split(',').map((s: string) => s.trim()).filter(Boolean)
      : [];
  }, [product]);

  useEffect(() => {
    images.forEach((src: string) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, [isLightboxOpen]);
  
  useEffect(() => {
    if (!isLightboxOpen || images.length === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isLightboxOpen, images.length]);


  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loading /></div>;
  if (error) return <div className="p-8 text-center text-red-600">Nie udało się pobrać danych produktu.</div>;
  if (!product) return <div className="p-8 text-center">Produkt nie znaleziony. <Link to="/products" className="text-blue-600">Powrót</Link></div>;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };
  
  const parsePrice = (p?: string | number | null) => {
    if (p == null) return NaN;
    return Number(String(p).replace(/\s+/g, '').replace(',', '.'));
  };

  const numericPrice = parsePrice(product.price);
  const salePct = (() => {
    const s = product.sale ?? 0;
    const v = Number(String(s).replace('%', '').trim());
    return Number.isFinite(v) ? Math.max(0, v) : 0;
  })();
  const hasSale = salePct > 0 && Number.isFinite(numericPrice);
  const salePrice = hasSale ? +(numericPrice * (1 - salePct / 100)).toFixed(2) : NaN;

  const handleAddToCart = () => {
    const finalPrice = hasSale ? salePrice : numericPrice;
    const mainImage = images.length > 0 ? images[0] : product.image || '';
    
    addItem({
      id: String(product.id),
      title: product.title,
      price: finalPrice,
      image: mainImage,
      size: product.size,
      version: product.version,
    });

    setAddedToCart(true);
  };

  return (
    <main className="max-w-[900px] mx-auto px-4 py-12">
      <div className="glass-card rounded-xl p-6">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="flex items-center justify-center bg-gradient-to-br from-black/20 to-transparent rounded-lg product-image p-4 min-h-[420px]">
              {images.length > 0 ? (
                <div className="relative w-full flex items-center justify-center">
                  <img
                    role="button"
                    tabIndex={0}
                    onClick={() => openLightbox(galleryIndex)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openLightbox(galleryIndex); }}
                    src={images[galleryIndex]}
                    alt={product.title}
                    className="max-h-[420px] object-contain drop-shadow-lg cursor-zoom-in"
                  />
                </div>
              ) : (
                <div className="p-6 text-gray-400">Brak zdjęcia</div>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {images.map((src: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setGalleryIndex(idx)}
                    className={`rounded-md p-0 border-2 ${galleryIndex === idx ? 'border-yellow-400' : 'border-transparent'} bg-black/20`}
                    aria-label={`Pokaż zdjęcie ${idx + 1}`}
                  >
                    <img src={src} alt={`${product.title} ${idx + 1}`} className="h-20 w-20 object-cover rounded-sm" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
              <h1 className="text-3xl font-extrabold mb-2">{(product.is_retro && (String(product.is_retro).trim().toLowerCase() === '1' || String(product.is_retro).trim().toLowerCase() === 'true' || String(product.is_retro).trim().toLowerCase() === 'yes' || String(product.is_retro).trim().toLowerCase() === 'tak')) ? (<><span className="text-yellow-300 font-extrabold mr-3">[RETRO]</span>{product.title}</>) : product.title}</h1>
              {product.price && (
                <div className="mb-4 inline-flex items-center gap-4">
                  <div className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-yellow-400 inline-block text-black px-4 py-2 rounded-full whitespace-nowrap">
                    {hasSale ? (salePrice % 1 === 0 ? salePrice.toFixed(0) : salePrice.toFixed(2)) : (Number.isFinite(numericPrice) ? (numericPrice % 1 === 0 ? numericPrice.toFixed(0) : numericPrice.toFixed(2)) : product.price)} PLN
                  </div>
                  {hasSale && (
                    <div className="text-sm text-gray-300">
                      <div className="font-medium text-white line-through whitespace-nowrap">{numericPrice % 1 === 0 ? numericPrice.toFixed(0) : numericPrice.toFixed(2)} PLN</div>
                      <div className="mt-1 text-sm text-yellow-300 font-bold">Produkt objęty przeceną {salePct}%</div>
                    </div>
                  )}
                </div>
              )}
              {product.size && <div className="text-sm text-gray-300 mb-2">Rozmiar: <span className="font-medium text-white ml-2">{product.size}</span></div>}
              {product.version && <div className="text-sm text-gray-300 mb-2">Wersja: <span className="font-medium text-white ml-2">{product.version}</span></div>}
            {product.description && <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{product.description}</p>}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-full font-semibold cursor-pointer transition-all ${
                  addedToCart
                    ? 'bg-green-500 text-white animate-pulse-add'
                    : 'gradient-btn text-black hover:shadow-lg'
                }`}
              >
                {addedToCart ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Dodano do koszyka
                  </span>
                ) : (
                  'Dodaj do koszyka'
                )}
              </button>
              <Link to="/products" className="text-sm text-gray-300 hover:text-white">Powrót do katalogu</Link>
            </div>
          </div>
        </div>
      </div>
      
      {isLightboxOpen && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog" aria-modal="true" aria-label="Galeria zdjęć produktu"
        >
          <div className="max-w-[1100px] w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="relative flex-1 flex items-center justify-center overflow-hidden">
              <button
                className="absolute left-0 sm:left-3 top-1/2 -translate-y-1/2 text-white p-3 bg-black/40 hover:bg-black/30 rounded-full shadow-lg flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 z-20 cursor-pointer"
                onClick={() => setLightboxIndex(i => (i - 1 + images.length) % images.length)}
                aria-label="Poprzednie zdjęcie"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              
              <button
                className="absolute right-3 top-3 text-white p-2 bg-black/40 hover:bg-black/60 rounded-full shadow-lg flex items-center justify-center w-10 h-10 z-20 cursor-pointer transition-colors"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Zamknij podgląd"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <TransformWrapper>
                <TransformComponent
                    wrapperStyle={{ width: "100%", height: "100%" }}
                    contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <img
                    key={lightboxIndex}
                    src={images[lightboxIndex]}
                    alt={`${product.title} ${lightboxIndex + 1}`}
                    className="max-h-[calc(90vh-100px)] object-contain"
                  />
                </TransformComponent>
              </TransformWrapper>

              <button
                className="absolute right-0 sm:right-3 top-1/2 -translate-y-1/2 text-white p-3 bg-black/40 hover:bg-black/30 rounded-full shadow-lg flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 z-20 cursor-pointer"
                onClick={() => setLightboxIndex(i => (i + 1) % images.length)}
                aria-label="Następne zdjęcie"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex justify-center gap-3 overflow-x-auto">
                {images.map((s: string, idx: number) => (
                  <button key={idx} onClick={() => setLightboxIndex(idx)} className={`flex-shrink-0 rounded-md overflow-hidden border-2 ${idx === lightboxIndex ? 'ring-2 ring-yellow-400 border-yellow-400' : 'border-transparent'}`}>
                    <img src={s} alt={`thumb ${idx + 1}`} className="h-16 w-24 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductDetail;