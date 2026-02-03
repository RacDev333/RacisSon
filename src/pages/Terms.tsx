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
              Zamówienia mogą być składane na dwa sposoby:
            </p>
            
            <h3 className="text-xl font-semibold mt-4">4.1. Zamówienie przez stronę</h3>
            <p className="text-gray-300 leading-relaxed">
              Klient przegląda katalog produktów dostępnych na stronie, dodaje wybrany towar do koszyka,
              a następnie przechodzi do złożenia zamówienia poprzez formularz zamówieniowy.
              Pola wymagane (dane kontaktowe, adres dostawy) należy wypełnić dokładnie.
              Po wysłaniu formularza obsługa sklepu potwierdza przyjęcie zamówienia.
            </p>

            <h3 className="text-xl font-semibold mt-4">4.2. Zamówienie przez kontakt</h3>
            <p className="text-gray-300 leading-relaxed">
              Klient może również skontaktować się z obsługą sklepu bezpośrednio poprzez formularz kontaktowy,
              wiadomość e-mail lub inną dostępną formę komunikacji, aby złożyć zamówienie.
              Po zgłoszeniu, sklep kontaktuje się z klientem w celu potwierdzenia szczegółów zamówienia.
            </p>
            
            <h3 className="text-xl font-semibold mt-4">4.3. Anulowanie zamówienia</h3>
            <p className="text-gray-300 leading-relaxed">
              Klient może anulować zamówienie do momentu wydania przesyłki do firmy kurierskiej.
              Po wydaniu paczki do doręczenia anulowanie nie jest już możliwe.
              Wniosek o anulowanie należy zgłosić niezwłocznie poprzez kontakt z obsługą sklepu.
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
            <p className="text-gray-300 leading-relaxed mt-3">
              Uszkodzenia produktu powstałe w trakcie transportu są odpowiedzialnością
              wybranej firmy kurierskiej. Reklamacje dotyczące takich uszkodzeń
              powinny być zgłaszane bezpośrednio przewoźnikowi.
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
            <h2 className="text-2xl font-semibold">8. Mechanizm zniżek</h2>
            <p className="text-gray-300 leading-relaxed">
              Zniżki na produkty stosowane są w następującej kolejności:
            </p>
            
            <h3 className="text-xl font-semibold mt-4">8.1. Promocja na produkt</h3>
            <p className="text-gray-300 leading-relaxed">
              W pierwszej kolejności stosowana jest promocja na wybrany produkt.
              Obniża ona cenę produktu o określony procent.
              Ta obniżona cena stanowi punkt wyjścia do dalszych zniżek.
            </p>

            <h3 className="text-xl font-semibold mt-4">8.2. Zniżka za ilość</h3>
            <p className="text-gray-300 leading-relaxed">
              W drugiej kolejności, na obniżoną (po promocji) cenę produktu,
              aplikowana jest zniżka za ilość. Zniżka ta zależy od liczby zakupionych
              produktów (np. kup 3 sztuki i otrzymaj 15% rabatu na każdą sztukę).
              Rabat liczony jest od ceny po uwzględnieniu promocji produktu.
            </p>

            <h3 className="text-xl font-semibold mt-4">8.3. Kody zniżkowe</h3>
            <p className="text-gray-300 leading-relaxed">
              Na samym końcu, do ostatecznej ceny (po uwzględnieniu promocji produktu
              i zniżki za ilość), aplikowany jest kod zniżkowy.
              Kod zniżkowy jest obniżką procentową lub kwotową na całe zamówienie.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              <strong>Ograniczenie kodów:</strong> Na jedno zamówienie można zastosować
              maksymalnie jeden kod zniżkowy. Kody zniżkowe nie mogą być łączone
              z promocją „losowa koszulka".
            </p>

            <p className="text-gray-300 leading-relaxed mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <strong>Przykład:</strong> Koszulka kosztuje 100 zł. Jest promocja -20% 
              (cena: 80 zł). Kupujesz 3 sztuki i otrzymujesz -15% za ilość 
              (cena za sztukę: 68 zł). Następnie aplikujesz kod zniżkowy -10% 
              (ostateczna cena za sztukę: 61,20 zł).
            </p>
          </section>

            <section>
            <h2 className="text-2xl font-semibold">9. Zwroty i reklamacje</h2>
            
            <h3 className="text-xl font-semibold mt-4">9.1. Zwroty produktów</h3>
            <p className="text-gray-300 leading-relaxed">
              Zwroty są możliwe wyłącznie w przypadkach uzasadnionych:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 ml-4 text-gray-300">
              <li>dostarczono zły produkt</li>
              <li>produkt jest uszkodzony lub wadliwy, a informacja o tym nie była zawarta w opisie</li>
            </ul>
            <p className="text-gray-300 leading-relaxed mt-3">
              Zwrot powinien być zgłoszony w terminie 14 dni od otrzymania przesyłki.
            </p>
            
            <h3 className="text-xl font-semibold mt-4">9.2. Reklamacje</h3>
            <p className="text-gray-300 leading-relaxed">
              Wady fizyczne produktu (takie jak uszkodzenia, defekty materiału czy błędy wykonania,
              których nie było w opisie) należy zgłaszać poprzez kontakt z obsługą sklepu
              w terminie 14 dni od momentu otrzymania przesyłki.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              Przy zgłaszaniu reklamacji rekomendujemy dołączenie zdjęć dokumentujących wadę.
            </p>
            
            <h3 className="text-xl font-semibold mt-4">9.3. Wyłączenia</h3>
            <p className="text-gray-300 leading-relaxed">
              Produkty zakupione w promocji „losowa koszulka" nie podlegają zwrotom ani reklamacjom
              ze względu na losowy charakter tej oferty.
            </p>
            </section>


          <section>
            <h2 className="text-2xl font-semibold">10. Gwarancja i odpowiedzialność</h2>
            <p className="text-gray-300 leading-relaxed">
              Sklep nie udziela gwarancji na sprzedawane produkty. Produkty sprzedawane są
              w stanie, w jakim zostały zakupione od dostawcy, ze wszystkimi śladami
              potencjalnego użytkowania, co jest uwzględnione w wycenie.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              Sklep nie ponosi odpowiedzialności za uszkodzenia powstałe w trakcie transportu
              — odpowiedzialność zawsze spada na wybraną firmę kurierską.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">11. Kontakt i czas odpowiedzi</h2>
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
            <h2 className="text-2xl font-semibold">12. Dane osobowe</h2>
            <p className="text-gray-300 leading-relaxed">
              Dane osobowe przekazywane w trakcie kontaktu lub realizacji zamówienia
              wykorzystywane są wyłącznie w celu obsługi zamówienia
              i nie są udostępniane osobom trzecim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">13. Postanowienia końcowe</h2>
            <p className="text-gray-300 leading-relaxed">
              Sklep zastrzega sobie prawo do zmiany niniejszego regulaminu.
              Zmiany wchodzą w życie z dniem ich publikacji na stronie.
              W sprawach nieuregulowanych zastosowanie ma prawo polskie.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Racis&Son — Imported with care ✦<br />
              Ostatnia aktualizacja: 03.02.2026
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Terms;
