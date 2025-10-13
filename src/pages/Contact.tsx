import React from 'react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  return (
    <main className="max-w-[900px] mx-auto px-4 py-12">
      <div className="glass-card rounded-xl p-6">
        <h1 className="text-3xl font-extrabold mb-4">Kontakt</h1>
        <p className="text-gray-300 mb-4">Masz pytania? Napisz do nas lub zadzwoń. Oto nasze dane kontaktowe:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Adres</h3>
            <p className="text-gray-300">ul. Przykładowa 12<br/>00-000 Miasto</p>

            <h3 className="font-semibold mt-4 mb-2">Telefon</h3>
            <p className="text-gray-300">+48 600 000 000</p>

            <h3 className="font-semibold mt-4 mb-2">E-mail</h3>
            <p className="text-gray-300">kontakt@example.com</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Godziny otwarcia</h3>
            <p className="text-gray-300">Pon - Pt: 9:00 - 18:00<br/>Sob: 10:00 - 14:00<br/>Nd: Nieczynne</p>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Formularz szybkiego kontaktu</h3>
              <form className="space-y-3">
                <input className="w-full p-3 rounded bg-black/20 border border-transparent focus:border-yellow-400" placeholder="Twoje imię" />
                <input className="w-full p-3 rounded bg-black/20 border border-transparent focus:border-yellow-400" placeholder="Twój e-mail" />
                <textarea className="w-full p-3 rounded bg-black/20 border border-transparent focus:border-yellow-400" rows={4} placeholder="Wiadomość" />
                <div className="flex items-center justify-between">
                  <button className="gradient-btn px-4 py-2 rounded-full text-black font-semibold">Wyślij</button>
                  <Link to="/products" className="text-sm text-gray-300">Powrót do produktów</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
