import React from 'react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  return (
    <main className="max-w-[900px] mx-auto px-4 py-12">
      <div className="glass-card rounded-xl p-8">
        <h1 className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-yellow-300">
          Polityka prywatności
        </h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-3">1. Informacje ogólne</h2>
            <p>
              Niniejsza Polityka prywatności określa zasady przetwarzania danych osobowych użytkowników serwisu Racis&Son (dalej: „Serwis").
            </p>
            <p className="mt-2">
              Administratorem danych osobowych jest <span className="text-yellow-400 font-semibold">Racis&Son</span>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">2. Zakres przetwarzanych danych</h2>
            <p>W ramach korzystania z Serwisu mogą być przetwarzane następujące dane osobowe:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>imię i nazwisko,</li>
              <li>adres e-mail,</li>
              <li>numer telefonu,</li>
              <li>adres do dostawy (ulica, numer domu, miasto, kod pocztowy),</li>
              <li>inne dane przekazane dobrowolnie w treści wiadomości lub formularza zamówienia.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">3. Cel przetwarzania danych</h2>
            <p>Dane osobowe przetwarzane są wyłącznie w celu:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>realizacji zamówień złożonych przez użytkownika,</li>
              <li>kontaktu z użytkownikiem w sprawie zamówienia,</li>
              <li>obsługi zapytań przesłanych za pośrednictwem formularza kontaktowego.</li>
            </ul>
            <p className="mt-3 text-yellow-400 font-medium">
              Dane nie są wykorzystywane do celów marketingowych ani wysyłki newsletterów bez Twojej zgody.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">4. Podstawa prawna przetwarzania</h2>
            <p>Dane osobowe przetwarzane są na podstawie:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>
                <span className="font-semibold">art. 6 ust. 1 lit. b RODO</span> – niezbędność do realizacji umowy (złożenia zamówienia) lub działań przed jej zawarciem,
              </li>
              <li>
                <span className="font-semibold">art. 6 ust. 1 lit. a RODO</span> – zgoda użytkownika (jeżeli została wyrażona podczas składania zamówienia).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">5. Odbiorcy danych</h2>
            <p>
              Dane osobowe nie są przekazywane osobom trzecim, z wyjątkiem podmiotów niezbędnych do realizacji zamówienia, takich jak:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>firmy kurierskie (w celu dostawy zamówionych produktów),</li>
              <li>dostawcy usług IT wspierających funkcjonowanie Serwisu.</li>
            </ul>
            <p className="mt-2">
              Podmioty te przetwarzają dane wyłącznie na nasze zlecenie i nie wykorzystują ich do własnych celów.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">6. Okres przechowywania danych</h2>
            <p>
              Dane osobowe przechowywane są przez okres niezbędny do realizacji zamówienia oraz obsługi ewentualnych reklamacji i roszczeń, 
              zgodnie z obowiązującymi przepisami prawa (w szczególności przepisami dotyczącymi przedawnienia roszczeń), 
              a następnie są bezpiecznie usuwane.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">7. Prawa użytkownika</h2>
            <p>Na podstawie przepisów RODO, użytkownik ma prawo do:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li><span className="font-semibold">dostępu</span> do swoich danych osobowych,</li>
              <li><span className="font-semibold">sprostowania</span> (poprawiania) swoich danych,</li>
              <li><span className="font-semibold">usunięcia</span> danych („prawo do bycia zapomnianym"),</li>
              <li><span className="font-semibold">ograniczenia przetwarzania</span> danych,</li>
              <li><span className="font-semibold">przenoszenia</span> danych,</li>
              <li><span className="font-semibold">wniesienia sprzeciwu</span> wobec przetwarzania danych,</li>
              <li><span className="font-semibold">cofnięcia zgody</span> w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem).</li>
            </ul>
            <p className="mt-3">
              W celu realizacji swoich praw użytkownik może skontaktować się z administratorem danych za pośrednictwem formularza kontaktowego 
              dostępnego w zakładce "Kontakt" oraz drogą mailową.
            </p>
            <p className="mt-2">
              Użytkownik ma również prawo do wniesienia skargi do organu nadzorczego (Prezes Urzędu Ochrony Danych Osobowych).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">8. Dobrowolność podania danych</h2>
            <p>
              Podanie danych osobowych jest <span className="font-semibold">dobrowolne</span>, jednak niezbędne do:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>realizacji zamówienia (złożenia i dostarczenia produktów),</li>
              <li>udzielenia odpowiedzi na zapytanie przesłane za pośrednictwem formularza kontaktowego.</li>
            </ul>
            <p className="mt-2">
              Niepodanie wymaganych danych uniemożliwi realizację zamówienia lub udzielenie odpowiedzi.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">9. Bezpieczeństwo danych</h2>
            <p>
              Administrator stosuje odpowiednie środki techniczne i organizacyjne w celu ochrony danych osobowych przed ich utratą, 
              nieuprawnionym dostępem, ujawnieniem lub zniszczeniem. Dane są przechowywane w bezpiecznych systemach z ograniczonym dostępem.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-3">10. Zmiany polityki prywatności</h2>
            <p>
              Administrator zastrzega sobie prawo do wprowadzenia zmian w niniejszej Polityce prywatności w dowolnym momencie. 
              O wszelkich zmianach użytkownicy zostaną poinformowani poprzez aktualizację treści na tej stronie.
            </p>
            <p className="mt-2 text-yellow-400 font-medium">
              Aktualna wersja Polityki prywatności jest zawsze dostępna pod adresem: racis.store/privacy
            </p>
          </section>

          <section className="mt-8 pt-6 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              Ostatnia aktualizacja: 27 stycznia 2026
            </p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-yellow-400 hover:text-yellow-300 font-semibold transition">
            ← Powrót na stronę główną
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Privacy;
