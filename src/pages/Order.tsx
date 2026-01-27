import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface OrderFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  street: string;
  houseNumber: string;
  city: string;
  postalCode: string;
  privacyConsent: boolean;
}

const Order: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderSummary, setOrderSummary] = useState<{ itemCount: number; finalPrice: number } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      street: '',
      houseNumber: '',
      city: '',
      postalCode: '',
      privacyConsent: false,
    },
  });

  const DISCOUNT_THRESHOLD = 3;
  const DISCOUNT_PERCENT = 20;
  const hasDiscount = items.length >= DISCOUNT_THRESHOLD;
  const discountAmount = hasDiscount ? +(totalPrice * (DISCOUNT_PERCENT / 100)).toFixed(2) : 0;
  const finalPrice = +(totalPrice - discountAmount).toFixed(2);

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    // Symulujemy wysłanie zamówienia
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Zamówienie:', { ...data, items, totalPrice: finalPrice });
    
    // Zapisujemy dane zamówienia przed wyczyszczeniem koszyka
    setOrderSummary({ itemCount: items.length, finalPrice });
    clearCart();
    setSubmitted(true);
    reset();
    setIsSubmitting(false);
  };

  // Ekran potwierdzenia po złożeniu zamówienia
  if (submitted) {
    return (
      <main className="max-w-[900px] mx-auto px-4 py-12 min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-20 h-20 mx-auto text-green-400">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-yellow-400">
            Zamówienie złożone!
          </h1>
          <p className="text-gray-300 mb-6">
            Dziękujemy za zamówienie! Na podany adres email zostanie wysłane potwierdzenie z numerem zamówienia.
          </p>

          <div className="glass-card rounded-xl p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold mb-4 text-yellow-400">Podsumowanie:</h2>
            <div className="space-y-2">
              <p className="text-sm text-gray-300">
                <span className="font-medium">Liczba produktów:</span> <span className="text-white">{orderSummary?.itemCount || 0}</span>
              </p>
              <p className="text-sm text-gray-300">
                <span className="font-medium">Kwota do zapłaty:</span> <span className="text-yellow-400 font-bold">{orderSummary?.finalPrice.toFixed(2) || '0.00'} PLN</span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Link to="/products" className="gradient-btn text-black px-6 py-3 rounded-full font-semibold inline-block w-full text-center">
              Kontynuuj zakupy
            </Link>
            <Link to="/" className="text-center block text-sm text-gray-400 hover:text-gray-300 transition">
              Powrót na stronę główną
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="max-w-[900px] mx-auto px-4 py-12 min-h-[50vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 mx-auto mb-4 text-gray-400">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <h1 className="text-3xl font-extrabold mb-2">Brak produktów w koszyku</h1>
          <p className="text-gray-300 mb-6">Dodaj produkty zanim przejdziesz do zamówienia</p>
          <Link to="/products" className="gradient-btn text-black px-6 py-3 rounded-full font-semibold inline-block">
            Przejdź do produktów
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1000px] mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-2">Finalizacja zamówienia</h1>
      <p className="text-gray-400 mb-8">Podaj swoje dane, aby ukończyć zamówienie</p>

      <div className="grid lg:grid-cols-3 gap-8 lg:grid-cols-3 grid-cols-1">
        {/* Podsumowanie - na mobile wyświetlane wyżej */}
        <div className="lg:col-span-1 order-first lg:order-last">
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Podsumowanie zamówienia</h2>

            <div className="space-y-3 mb-6 pb-6 border-b border-gray-700 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-300">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{item.title}</p>
                    {item.size && <p className="text-xs text-gray-500">Rozmiar: {item.size}</p>}
                  </div>
                  <p className="font-semibold text-yellow-400 ml-2 whitespace-nowrap">{item.price.toFixed(2)} PLN</p>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Produkty ({items.length}):</span>
                <span className="whitespace-nowrap">{totalPrice.toFixed(2)} PLN</span>
              </div>
              {hasDiscount && (
                <div className="flex justify-between text-green-400 font-semibold">
                  <span>Zniżka {DISCOUNT_PERCENT}%:</span>
                  <span className="whitespace-nowrap">-{discountAmount.toFixed(2)} PLN</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-yellow-400 pt-2 border-t border-gray-700">
                <span>Do zapłaty:</span>
                <span className="whitespace-nowrap">{finalPrice.toFixed(2)} PLN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formularz */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Dane osobowe */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Dane osobowe</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Imię</label>
                  <input
                    type="text"
                    {...register('firstName', {
                      required: 'Imię jest wymagane',
                      minLength: { value: 2, message: 'Imię musi mieć co najmniej 2 znaki' },
                    })}
                    className={`w-full px-4 py-2 rounded-lg bg-slate-800 border transition-colors ${
                      errors.firstName
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-700 focus:border-yellow-400'
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50`}
                    placeholder="Jan"
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nazwisko</label>
                  <input
                    type="text"
                    {...register('lastName', {
                      required: 'Nazwisko jest wymagane',
                      minLength: { value: 2, message: 'Nazwisko musi mieć co najmniej 2 znaki' },
                    })}
                    className={`w-full px-4 py-2 rounded-lg bg-slate-800 border transition-colors ${
                      errors.lastName
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-700 focus:border-yellow-400'
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50`}
                    placeholder="Kowalski"
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Numer telefonu</label>
                  <input
                    type="tel"
                    {...register('phone', {
                      required: 'Numer telefonu jest wymagany',
                      pattern: {
                        value: /^[0-9\s\-\+\(\)]{9,}$/,
                        message: 'Podaj prawidłowy numer telefonu',
                      },
                    })}
                    className={`w-full px-4 py-2 rounded-lg bg-slate-800 border transition-colors ${
                      errors.phone
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-700 focus:border-yellow-400'
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50`}
                    placeholder="123 456 789"
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'Email jest wymagany',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Podaj prawidłowy adres email',
                      },
                    })}
                    className={`w-full px-4 py-2 rounded-lg bg-slate-800 border transition-colors ${
                      errors.email
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-700 focus:border-yellow-400'
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50`}
                    placeholder="jan@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>
            </div>

            {/* Dane adresowe */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Adres dostawy</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ulica</label>
                  <input
                    type="text"
                    {...register('street', {
                      required: 'Ulica jest wymagana',
                      minLength: { value: 3, message: 'Ulica musi mieć co najmniej 3 znaki' },
                    })}
                    className={`w-full px-4 py-2 rounded-lg bg-slate-800 border transition-colors ${
                      errors.street
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-700 focus:border-yellow-400'
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50`}
                    placeholder="ul. Główna"
                  />
                  {errors.street && <p className="text-red-400 text-sm mt-1">{errors.street.message}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Numer domu</label>
                    <input
                      type="text"
                      {...register('houseNumber', {
                        required: 'Numer domu jest wymagany',
                        minLength: { value: 1, message: 'Podaj numer domu' },
                      })}
                      className={`w-full px-4 py-2 rounded-lg bg-slate-800 border transition-colors ${
                        errors.houseNumber
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-700 focus:border-yellow-400'
                      } text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50`}
                      placeholder="123"
                    />
                    {errors.houseNumber && <p className="text-red-400 text-sm mt-1">{errors.houseNumber.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Miasto</label>
                    <input
                      type="text"
                      {...register('city', {
                        required: 'Miasto jest wymagane',
                        minLength: { value: 2, message: 'Miasto musi mieć co najmniej 2 znaki' },
                      })}
                      className={`w-full px-4 py-2 rounded-lg bg-slate-800 border transition-colors ${
                        errors.city
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-gray-700 focus:border-yellow-400'
                      } text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50`}
                      placeholder="Warszawa"
                    />
                    {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>}
                  </div>
                </div>

                <div className="sm:w-1/2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Kod pocztowy</label>
                  <input
                    type="text"
                    {...register('postalCode', {
                      required: 'Kod pocztowy jest wymagany',
                      pattern: {
                        value: /^[0-9\-]{5,6}$/,
                        message: 'Podaj prawidłowy kod pocztowy (np. 00-001)',
                      },
                    })}
                    className={`w-full px-4 py-2 rounded-lg bg-slate-800 border transition-colors ${
                      errors.postalCode
                        ? 'border-red-500 focus:border-red-500'
                        : 'border-gray-700 focus:border-yellow-400'
                    } text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50`}
                    placeholder="00-001"
                  />
                  {errors.postalCode && <p className="text-red-400 text-sm mt-1">{errors.postalCode.message}</p>}
                </div>
              </div>
            </div>

            {/* Zgoda na przetwarzanie danych */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    {...register('privacyConsent', {
                      required: 'Musisz wyrazić zgodę na przetwarzanie danych osobowych',
                    })}
                    className="w-5 h-5 rounded border-gray-700 bg-slate-800 text-yellow-400 focus:ring-yellow-400 focus:ring-2 cursor-pointer"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="privacyConsent" className="text-sm text-gray-300 cursor-pointer">
                    <span className="text-red-400 font-bold mr-1">*</span>
                    Wyrażam zgodę na przetwarzanie moich danych osobowych w celu realizacji zamówienia zgodnie z{' '}
                    <Link to="/privacy" className="text-yellow-400 hover:text-yellow-300 underline" target="_blank">
                      polityką prywatności
                    </Link>
                    . Administratorem danych jest Racis&Son.
                  </label>
                  {errors.privacyConsent && (
                    <p className="text-red-400 text-sm mt-2">{errors.privacyConsent.message}</p>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-full font-semibold text-black transition-all ${
                isSubmitting
                  ? 'bg-gray-600 cursor-not-allowed opacity-50'
                  : 'gradient-btn hover:shadow-lg'
              }`}
            >
              {isSubmitting ? 'Przetwarzanie...' : 'Złóż zamówienie'}
            </button>

            <Link to="/cart" className="text-center block text-sm text-gray-400 hover:text-gray-300 transition">
              Wróć do koszyka
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Order;
