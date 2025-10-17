import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'; // 1. Importy z biblioteki
import Loading from '../components/Loading';
import { fetchSheetAsJson } from '../services/googleSheets';

const DEFAULT_SPREADSHEET = '1KlaZ-qTVVbK0bMzHxPejQjH8j4hCRB-L3saXCaM5MwY';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [galleryIndex, setGalleryIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);
  
  const navigate = useNavigate();

  // Fetch product data
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const spreadsheetId = DEFAULT_SPREADSHEET;
        if (!spreadsheetId) {
          setError('Brak ID arkusza. Ustaw DEFAULT_SPREADSHEET w src/pages/ProductDetail.tsx');
          return;
        }
        const rows = await fetchSheetAsJson(spreadsheetId);
        const mapped = rows.map((r: any) => ({
          id: (r.id ?? r.ID ?? r.Id ?? '').toString(),
          title: r.title ?? r.name ?? r.Title ?? 'Untitled',
          image: r.image ?? r.photo ?? r.img ?? null,
          images: r.images ?? r.photos ?? r.gallery ?? null,
          size: r.size ?? r.rozmiar ?? r.sizes ?? null,
          price: r.price ?? r.cena ?? null,
          description: r.description ?? r.desc ?? null,
        }));
        const found = mapped.find((p: any) => encodeURIComponent(p.id) === id);
        setProduct(found || null);
        setGalleryIndex(0);
      } catch (err) {
        console.error(err);
        setError('Nie udało się pobrać danych produktu.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  // Memoize the images array
  const images = useMemo(() => {
    if (!product) return [];
    const raw = product.images ?? product.image ?? '';
    return raw.toString().split(',').map((s: string) => s.trim()).filter(Boolean);
  }, [product]);

  // Preload images in the background
  useEffect(() => {
    images.forEach((src: string) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prevOverflow; };
  }, [isLightboxOpen]);
  
  // Handle keyboard events for the lightbox
  useEffect(() => {
    if (!isLightboxOpen || images.length === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      // Wyłączamy strzałki, gdy obraz jest przybliżony, aby nie przełączać slajdu podczas przesuwania
      // Biblioteka sama obsłuży przesuwanie przybliżonego obrazka strzałkami.
      // Jeśli chcesz, żeby mimo wszystko przełączały slajd, usuń tę część logiki.
      // if (e.key === 'ArrowRight') setLightboxIndex(i => (i + 1) % images.length);
      // if (e.key === 'ArrowLeft') setLightboxIndex(i => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isLightboxOpen, images.length]);


  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loading /></div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!product) return <div className="p-8 text-center">Produkt nie znaleziony. <Link to="/products" className="text-blue-600">Powrót</Link></div>;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
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
            <h1 className="text-3xl font-extrabold mb-2">{product.title}</h1>
            {product.price && <div className="text-2xl font-semibold mb-4 bg-gradient-to-r from-pink-500 to-yellow-400 inline-block text-black px-4 py-2 rounded-full">{product.price} PLN</div>}
            {product.size && <div className="text-sm text-gray-300 mb-2">Rozmiar: <span className="font-medium text-white ml-2">{product.size}</span></div>}
            {product.description && <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{product.description}</p>}
            <div className="mt-8 flex items-center gap-4">
              <button onClick={() => navigate('/contact')} className="gradient-btn text-black px-5 py-3 rounded-full font-semibold cursor-pointer">Kup teraz</button>
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
              
              {/* 2. Owinięcie obrazka w komponenty do zoomu */}
              <TransformWrapper>
                <TransformComponent
                    wrapperStyle={{ width: "100%", height: "100%" }}
                    contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <img
                    key={lightboxIndex} // Dodajemy key, aby komponent resetował stan zoomu przy zmianie zdjęcia
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