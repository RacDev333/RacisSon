import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { items, removeItem, clearCart, totalPrice } = useCart();
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());
  const [isClearing, setIsClearing] = useState(false);

  const DISCOUNT_THRESHOLD = 3;
  const DISCOUNT_PERCENT = 20;

  const hasDiscount = items.length >= DISCOUNT_THRESHOLD;
  const discountAmount = hasDiscount ? +(totalPrice * (DISCOUNT_PERCENT / 100)).toFixed(2) : 0;
  const finalPrice = +(totalPrice - discountAmount).toFixed(2);

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
                to={`/product/${item.id}`}
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
                  <p className="text-lg font-bold text-yellow-400 mt-2">{item.price.toFixed(2)} PLN</p>
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

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-700">
              <div className="flex justify-between text-gray-300">
                <span>Produkty ({items.length}):</span>
                <span>{totalPrice.toFixed(2)} PLN</span>
              </div>
              {hasDiscount && (
                <div className="flex justify-between text-green-400 font-semibold">
                  <span>Zniżka {DISCOUNT_PERCENT}%:</span>
                  <span>-{discountAmount.toFixed(2)} PLN</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-yellow-400">
                <span>Razem:</span>
                <span>{finalPrice.toFixed(2)} PLN</span>
              </div>
            </div>

            <Link to="/contact" className="gradient-btn text-black px-4 py-3 rounded-full font-semibold w-full text-center block mb-3">
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
