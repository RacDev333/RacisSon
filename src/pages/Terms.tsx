import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Regulamin</h1>

        <div className="prose prose-invert max-w-none space-y-8">

          <section>
            <h2 className="text-2xl font-semibold">1. Postanowienia ogólne</h2>
            <p className="text-gray-300 leading-relaxed">
              Niniejszy regulamin określa zasady funkcjonowania serwisu Racis&Son,
              warunki składania zamówień oraz prawa i obowiązki stron.
              Składając zamówienie, użytkownik akceptuje niniejszy regulamin w całości.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Charakter sprzedaży</h2>
            <p className="text-gray-300 leading-relaxed">
              Sprzedaż prowadzona przez Racis&Son ma charakter indywidualny
              i odbywa się poza zautomatyzowanym systemem sklepowym.
              Każde zamówienie realizowane jest na podstawie bezpośredniego kontaktu
              pomiędzy klientem a obsługą sklepu.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. Produkty</h2>
            <p className="text-gray-300 leading-relaxed">
              Oferowane produkty są importowane i selekcjonowane indywidualnie.
              Sklep nie gwarantuje topowej ani fabrycznie nowej jakości produktów.
              Produkty mogą nosić ślady użytkowania, co jest uwzględnione w cenie
              oraz odpowiednio zakomunikowane.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              Sprzedawany produkt jest dokładnie tym, który widoczny jest na zdjęciach
              przedstawionych przez sklep.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Składanie zamówień</h2>
            <p className="text-gray-300 leading-relaxed">
              Zamówienia składane są poprzez kontakt z obsługą sklepu
              za pośrednictwem formularza na stronie lub innej dostępnej formy kontaktu.
              Po zgłoszeniu, sklep kontaktuje się z klientem w celu ustalenia szczegółów.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">5. Płatności</h2>
            <p className="text-gray-300 leading-relaxed">
              Sklep nie obsługuje płatności online.
              Płatność za zamówienie realizowana jest wyłącznie gotówką
              przy odbiorze przesyłki.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">6. Dostawa</h2>
            <p className="text-gray-300 leading-relaxed">
              Szczegóły dotyczące dostawy, w tym termin oraz adres,
              ustalane są indywidualnie z obsługą sklepu po złożeniu zamówienia.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              Sklep nie ponosi odpowiedzialności za opóźnienia wynikające z przyczyn
              niezależnych, w szczególności po stronie firm kurierskich.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">7. Promocje</h2>

            <h3 className="text-xl font-semibold mt-4">7.1. Losowa koszulka</h3>
            <p className="text-gray-300 leading-relaxed">
            Promocja „losowa koszulka” polega na wylosowaniu jednego produktu
            z przygotowanej puli.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
            Żaden z produktów znajdujących się w puli nie jest tańszy
            od ceny losowej koszulki — produkty są w tej samej cenie lub droższe.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
            Produkty objęte promocją „losowa koszulka” nie są dostępne
            do samodzielnego zakupu na stronie sklepu.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
            Ze względu na losowy charakter promocji, produkty zakupione
            w ramach oferty „losowa koszulka” nie podlegają zwrotowi.
            </p>

          </section>

            <section>
            <h2 className="text-2xl font-semibold">8. Zwroty i reklamacje</h2>
            <p className="text-gray-300 leading-relaxed">
                Reklamacje dotyczące wad fizycznych produktu należy zgłaszać
                poprzez kontakt z obsługą sklepu w rozsądnym terminie
                od momentu otrzymania przesyłki.
            </p>
            </section>


          <section>
            <h2 className="text-2xl font-semibold">9. Kontakt i czas odpowiedzi</h2>
            <p className="text-gray-300 leading-relaxed">
              Kontakt ze sklepem możliwy jest poprzez formularz kontaktowy,
              wiadomość e-mail lub inną ustaloną formę komunikacji.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              Obsługa sklepu odpowiada na zapytania w ciągu kilku dni roboczych,
              przy czym zazwyczaj odpowiedź udzielana jest w ciągu jednego dnia roboczego.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">10. Dane osobowe</h2>
            <p className="text-gray-300 leading-relaxed">
              Dane osobowe przekazywane w trakcie kontaktu lub realizacji zamówienia
              wykorzystywane są wyłącznie w celu obsługi zamówienia
              i nie są udostępniane osobom trzecim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">11. Postanowienia końcowe</h2>
            <p className="text-gray-300 leading-relaxed">
              Sklep zastrzega sobie prawo do zmiany niniejszego regulaminu.
              Zmiany wchodzą w życie z dniem ich publikacji na stronie.
              W sprawach nieuregulowanych zastosowanie ma prawo polskie.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Racis&Son — Imported with care ✦<br />
              Ostatnia aktualizacja: 16.01.2026
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Terms;
