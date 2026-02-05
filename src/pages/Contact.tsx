import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

const Contact: React.FC = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const sendForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch(`${API_URL}/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: `${email}`,
          name: `${name}`,
          message: `${message}`,
        }),
      });

      if (!res.ok) {
        throw new Error("Błąd wysyłania");
      }

      setStatus("Wiadomość wysłana!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("Nie udało się wysłać wiadomości");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-[900px] mx-auto px-4 py-12">
      <div className="glass-card rounded-xl p-6">
        <h1 className="text-3xl font-extrabold mb-4">Kontakt</h1>
        <p className="text-gray-300 mb-4">Jesteś zainteresowany zakupem lub masz pytania? Napisz do nas! <br></br>Dane kontaktowe:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Adres</h3>
            <p className="text-gray-300">ul. Przykładowa 12<br/>00-000 Miasto</p>

            <h3 className="font-semibold mt-4 mb-2">Telefon</h3>
            <p className="text-gray-300">+48 600 000 000</p>

            <h3 className="font-semibold mt-4 mb-2">E-mail</h3>
            <p className="text-gray-300">RacisAndSon@gmail.com</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Godziny pracy</h3>
            <p className="text-gray-300">Pon - Pt: 12:00 - 18:00<br/>Sob: 12:00 - 16:00<br/>Nd: Nieczynne</p>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Formularz szybkiego kontaktu</h3>

              <form className="space-y-3" onSubmit={sendForm}>
                <input
                  className="w-full p-3 rounded bg-black/20"
                  placeholder="Twoje imię"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <input
                  className="w-full p-3 rounded bg-black/20"
                  placeholder="Twój e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <textarea
                  className="w-full p-3 rounded bg-black/20"
                  rows={4}
                  placeholder="Wiadomość"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />

                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={loading}
                    className="gradient-btn cursor-pointer px-5 h-10 min-w-[140px] rounded-full text-black font-semibold inline-flex items-center justify-center relative disabled:opacity-70"
                    aria-busy={loading}
                  >
                    <span>Wyślij</span>
                    {loading && (
                      <span
                        className="absolute left-4 top-1/2 -translate-y-1/2"
                        aria-hidden="true"
                      >
                        <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin block" />
                      </span>
                    )}
                  </button>
                  <Link to="/products" className="text-sm text-gray-300">Powrót do produktów</Link>
                </div>

                <div className="mt-4 min-h-[64px]">
                  {status && (
                    <div
                      className={`p-4 rounded-lg flex items-start gap-3 animate-fadeIn ${
                        status.includes("wysłana")
                          ? "bg-green-500/10 border border-green-500/30"
                          : "bg-red-500/10 border border-red-500/30"
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {status.includes("wysłana") ? (
                          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <p
                        className={`text-sm font-medium ${
                          status.includes("wysłana") ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {status}
                      </p>
                    </div>
                  )}
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
