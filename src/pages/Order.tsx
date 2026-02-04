import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../services/ordersApi';
import { useAllData } from '../services/productsApi';
import type { PromoCode } from '../services/productsApi';

interface OrderFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  street: string;
  houseNumber: string;
  city: string;
  postalCode: string;
  deliveryMethod: 'pickup';
  paymentMethod: 'cash';
  notes: string;
  privacyConsent: boolean;
}

const Order: React.FC = () => {
  const { items, totalPrice, clearCart, promoCodeId, setPromoCode, clearPromoCode } = useCart();
  const { data: allData } = useAllData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderSummary, setOrderSummary] = useState<{ itemCount: number; finalPrice: number } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [availableCodes, setAvailableCodes] = useState<PromoCode[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  useEffect(() => {
    if (allData?.codes) {
      setAvailableCodes(allData.codes);
      
      // Sprawdź czy jest zapisany kod w context (localStorage) i zaaplikuj go
      if (promoCodeId) {
        const found = allData.codes.find(c => c.id === promoCodeId);
        
        if (found) {
          setPromoInput(found.code);
          setAppliedPromo(found);
          setPromoSuccess(`Kod ${found.code} został zastosowany! Zniżka ${found.sale}%`);
        }
      }
    }
  }, [allData, promoCodeId]);

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
      deliveryMethod: 'pickup',
      paymentMethod: 'cash',
      notes: '',
      privacyConsent: false,
    },
  });

  const DISCOUNT_THRESHOLD = 3;
  const DISCOUNT_PERCENT = 15;
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
      setPromoCode(foundCode.code, foundCode.sale, foundCode.id);
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
  };

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Przygotowujemy dane zamówienia w formacie wymaganym przez API
      const orderData = {
        name: data.firstName,
        surname: data.lastName,
        number: data.phone,
        email: data.email,
        city: data.city,
        postal_code: data.postalCode,
        street: data.street,
        building_number: data.houseNumber,
        shipping_method: data.deliveryMethod === 'pickup' ? 'Odbiór osobisty/doręczenie (Olecko)' : '',
        payment_method: data.paymentMethod === 'cash' ? 'Gotówka przy odbiorze' : '',
        shipping_notes: data.notes,
        code_id: appliedPromo ? appliedPromo.id : null,
        product_id: items.map((item) => parseInt(item.id, 10)),
      };

      // Wysyłamy zamówienie do API
      const response = await submitOrder(orderData);
      
      console.log('Odpowiedź API:', response);
      
      // Zapisujemy dane zamówienia przed wyczyszczeniem koszyka
      setOrderSummary({ itemCount: items.length, finalPrice });
      clearCart();
      setSubmitted(true);
      reset();
    } catch (error) {
      console.error('Błąd podczas składania zamówienia:', error);
      setSubmitError(
        'Nie udało się złożyć zamówienia. Sprawdź połączenie i spróbuj ponownie. Jeśli problem się powtarza, skontaktuj się z nami.'
      );
    } finally {
      setIsSubmitting(false);
    }
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

            {/* Kod promocyjny */}
            <div className="mb-4 pb-4 border-b border-gray-700">
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
                    type="button"
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
                    type="button"
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

            <div className="space-y-2">
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
            {submitError && (
              <div
                role="alert"
                className="glass-card rounded-xl p-4 border border-red-500/30 bg-red-500/10 text-red-200"
              >
                <p className="font-semibold mb-1">Coś poszło nie tak</p>
                <p className="text-sm text-red-200/90">{submitError}</p>
              </div>
            )}
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

            {/* Dostawa i płatność */}
            <div className="glass-card rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Dostawa i płatność</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sposób dostawy</label>
                  <div className="space-y-3">
                    {/* Odbiór osobisty - DOSTĘPNE */}
                    <div className="glass-card bg-slate-800/50 border border-gray-700 rounded-lg p-4 transition-colors hover:border-yellow-400/30">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          id="deliveryPickup"
                          {...register('deliveryMethod')}
                          value="pickup"
                          defaultChecked
                          className="w-4 h-4 mt-0.5 text-yellow-400 focus:ring-yellow-400 focus:ring-2 cursor-pointer"
                        />
                        <label htmlFor="deliveryPickup" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">Odbiór osobisty / Doręczenie</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-400 font-medium">Olecko</span>
                          </div>
                          <p className="text-sm text-gray-400">Odbiór osobisty w Olecku lub doręczenie na terenie miasta Olecko</p>
                          <p className="text-sm text-green-400 font-semibold mt-1">Bezpłatnie</p>
                        </label>
                      </div>
                    </div>

                    {/* InPost Paczkomaty - NIEDOSTĘPNE */}
                    <div className="glass-card bg-slate-800/30 border border-gray-700/50 rounded-lg p-4 opacity-60 relative overflow-hidden">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          id="deliveryInpost"
                          value="inpost"
                          disabled
                          className="w-4 h-4 mt-0.5 cursor-not-allowed"
                        />
                        <label htmlFor="deliveryInpost" className="flex-1 cursor-not-allowed">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-400">InPost Paczkomaty</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium border border-blue-500/30">
                              Wkrótce
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">Wysyłka do wybranego paczkomatu InPost na terenie całej Polski</p>
                          <p className="text-sm text-gray-500 mt-1">17 PLN</p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sposób płatności</label>
                  <div className="space-y-3">
                    {/* Gotówka - DOSTĘPNE */}
                    <div className="glass-card bg-slate-800/50 border border-gray-700 rounded-lg p-4 transition-colors hover:border-yellow-400/30">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          id="paymentCash"
                          {...register('paymentMethod')}
                          value="cash"
                          defaultChecked
                          className="w-4 h-4 mt-0.5 text-yellow-400 focus:ring-yellow-400 focus:ring-2 cursor-pointer"
                        />
                        <label htmlFor="paymentCash" className="flex-1 cursor-pointer">
                          <div className="font-semibold text-white mb-1">Gotówka przy odbiorze</div>
                          <p className="text-sm text-gray-400">Płatność gotówką przy odbiorze osobistym lub doręczeniu</p>
                        </label>
                      </div>
                    </div>

                    {/* BLIK - NIEDOSTĘPNE */}
                    <div className="glass-card bg-slate-800/30 border border-gray-700/50 rounded-lg p-4 opacity-60 relative overflow-hidden">
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          id="paymentBlik"
                          value="blik"
                          disabled
                          className="w-4 h-4 mt-0.5 cursor-not-allowed"
                        />
                        <label htmlFor="paymentBlik" className="flex-1 cursor-not-allowed">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-400">BLIK / Przelew online</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium border border-blue-500/30">
                              Wkrótce
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">Szybka płatność online przez BLIK lub przelew</p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-2">Uwagi do zamówienia (opcjonalnie)</label>
                  <textarea
                    id="notes"
                    {...register('notes')}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-gray-700 focus:border-yellow-400 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-400/50 resize-none transition-colors"
                    placeholder="Tutaj możesz dodać dodatkowe informacje do zamówienia, np. preferowany czas odbioru, szczegóły dotyczące adresu dostawy itp."
                  />
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
              className={`w-full py-3 rounded-full font-semibold text-black transition-all cursor-pointer ${
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
