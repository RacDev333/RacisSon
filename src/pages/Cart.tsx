import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { fetchPromoCodes } from '../services/productsApi';
import type { PromoCode } from '../services/productsApi';

const Cart: React.FC = () => {
  const { items, removeItem, clearCart, totalPrice, promoCode, promoDiscount, clearPromoCode } = useCart();
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());
  const [isClearing, setIsClearing] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [availableCodes, setAvailableCodes] = useState<PromoCode[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const codes = await fetchPromoCodes();
      setAvailableCodes(codes);
      
      // Załaduj zapisany kod z localStorage
      const savedCodeId = localStorage.getItem('promoCodeId');
      if (savedCodeId) {
        const found = codes.find(c => c.id === parseInt(savedCodeId));
        if (found) {
          setAppliedPromo(found);
          setPromoInput(found.code);
          setPromoSuccess(`Kod ${found.code} został zastosowany! Zniżka ${found.sale}%`);
        }
      }
    };
    
    loadData().catch(console.error);
  }, []);

  const DISCOUNT_THRESHOLD = 3;
  const DISCOUNT_PERCENT = 20;

  const hasQuantityDiscount = items.length >= DISCOUNT_THRESHOLD;
  const quantityDiscountAmount = hasQuantityDiscount ? +(totalPrice * (DISCOUNT_PERCENT / 100)).toFixed(2) : 0;
  
  const priceAfterQuantityDiscount = totalPrice - quantityDiscountAmount;
  const promoDiscountAmount = appliedPromo ? +(priceAfterQuantityDiscount * (appliedPromo.sale / 100)).toFixed(2) : 0;
  const finalPrice = +(priceAfterQuantityDiscount - promoDiscountAmount).toFixed(2);

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    
    if (!promoInput.trim()) {
      setPromoError('Wprowadź kod promocyjny');
      return;
    }

    const foundCode = availableCodes.find(c => c.code.toLowerCase() === promoInput.trim().toLowerCase());
    
    if (foundCode) {
      setAppliedPromo(foundCode);
      setPromoSuccess(`Kod ${foundCode.code} został zastosowany! Zniżka ${foundCode.sale}%`);
      localStorage.setItem('promoCodeId', foundCode.id.toString());
      localStorage.setItem('promoCode', foundCode.code);
      localStorage.setItem('promoDiscount', foundCode.sale.toString());
    } else {
      setPromoError('Nieprawidłowy kod promocyjny');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoSuccess('');
    setPromoError('');
    clearPromoCode();
    localStorage.removeItem('promoCodeId');
    localStorage.removeItem('promoCode');
    localStorage.removeItem('promoDiscount');
  };

  const handleRemoveItem = (id: string) => {
    setRemovingItems((prev) => new Set([...prev, id]));
    setTimeout(() => {
      removeItem(id);
      setRemovingItems((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 400);
  };

  const handleClearCart = () => {
    setIsClearing(true);
    // Animujemy wszystkie produkty
    items.forEach((item) => {
      setRemovingItems((prev) => new Set([...prev, item.id]));
    });
    setTimeout(() => {
      clearCart();
      setIsClearing(false);
      setRemovingItems(new Set());
    }, 400);
  };

  if (items.length === 0) {
    return (
      <main className="max-w-[900px] mx-auto px-4 py-12 min-h-[50vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 mx-auto mb-4 text-gray-400">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <h1 className="text-3xl font-extrabold mb-2">Twój koszyk jest pusty</h1>
          <p className="text-gray-300 mb-6">Dodaj produkty, aby je tutaj zobaczyć</p>
          <Link to="/products" className="gradient-btn text-black px-6 py-3 rounded-full font-semibold inline-block">
            Przejdź do produktów
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[900px] mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-8">Koszyk ({items.length})</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="glass-card rounded-xl p-6 space-y-4">
            {items.map((item) => (
              <Link
                key={item.id}
                to={`/product/${encodeURIComponent(item.id)}`}
                className={`flex gap-4 pb-4 border-b border-gray-700 last:border-b-0 last:pb-0 transition-all cursor-pointer group ${
                  removingItems.has(item.id) ? 'animate-slide-out-left' : 'animate-fade-in'
                }`}
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg group-hover:opacity-80 transition"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-white mb-1 group-hover:text-yellow-300 transition">{item.title}</h3>
                  {item.size && <p className="text-sm text-gray-400">Rozmiar: {item.size}</p>}
                  {item.version && <p className="text-sm text-gray-400">Wersja: {item.version}</p>}
                  <p className="text-lg font-bold text-yellow-400 mt-2 whitespace-nowrap">{item.price.toFixed(2)} PLN</p>
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveItem(item.id);
                  }}
                  className="flex-shrink-0 text-red-400 hover:text-red-300 transition p-2 rounded-lg hover:bg-red-500/10 active:scale-95"
                  aria-label="Usuń z koszyka"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="glass-card rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Podsumowanie</h2>

            {/* Kod promocyjny */}
            <div className="mb-6 pb-6 border-b border-gray-700">
              <label className="block text-sm font-medium text-gray-300 mb-2">Kod promocyjny</label>
              {!appliedPromo ? (
                <div className="flex gap-2 items-stretch">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value.toUpperCase());
                      setPromoError('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                    placeholder="WPISZ KOD"
                    className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg bg-slate-800 border border-gray-700 focus:border-yellow-400 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 transition-colors"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 cursor-pointer text-sm bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    Zastosuj
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between px-3 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-green-400">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span className="text-sm text-green-400 font-medium">{appliedPromo.code}</span>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                    aria-label="Usuń kod"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              )}
              {promoError && <p className="text-red-400 text-xs mt-2">{promoError}</p>}
              {promoSuccess && <p className="text-green-400 text-xs mt-2">{promoSuccess}</p>}
            </div>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-700">
              <div className="flex justify-between text-gray-300">
                <span>Produkty ({items.length}):</span>
                <span className="whitespace-nowrap">{totalPrice.toFixed(2)} PLN</span>
              </div>
              {hasQuantityDiscount && (
                <div className="flex justify-between text-green-400 font-semibold">
                  <span>Zniżka {DISCOUNT_PERCENT}%:</span>
                  <span className="whitespace-nowrap">-{quantityDiscountAmount.toFixed(2)} PLN</span>
                </div>
              )}
              {appliedPromo && (
                <div className="flex justify-between text-green-400 font-semibold">
                  <span>Kod {appliedPromo.code} (-{appliedPromo.sale}%):</span>
                  <span className="whitespace-nowrap">-{promoDiscountAmount.toFixed(2)} PLN</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-yellow-400">
                <span>Razem:</span>
                <span className="whitespace-nowrap">{finalPrice.toFixed(2)} PLN</span>
              </div>
            </div>

            <Link to="/order" className="gradient-btn text-black px-4 py-3 rounded-full font-semibold w-full text-center block mb-3">
              Przejdź do zakupu
            </Link>

            <button
              onClick={handleClearCart}
              disabled={isClearing}
              className="w-full text-gray-300 hover:text-white px-4 py-2 cursor-pointer rounded-full font-semibold border border-gray-700 hover:border-gray-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Wyczyść koszyk
            </button>

            <Link to="/products" className="text-center block text-sm text-gray-400 hover:text-gray-300 mt-4 transition">
              Kontynuuj zakupy
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
