import { Link } from "react-router-dom";
import { useState } from "react";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Einfacher Check: Passwort und Wiederholung müssen gleich sein
    if (password !== passwordRepeat) {
      setError("Passwörter stimmen nicht überein!");
      return;
    }

    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:8000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, status: "active" }), // status kannst du anpassen
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Fehler bei der Registrierung");
      }

      setSuccess("Registrierung erfolgreich! Du kannst dich jetzt anmelden.");
      setUsername("");
      setEmail("");
      setPassword("");
      setPasswordRepeat("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="logo.png"
            alt="MateWise Logo"
          />
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
          Willkommen
        </h3>

        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
          Erstelle dir hier ein Konto
        </p>

        <form onSubmit={handleSubmit}>
          <div className="w-full mt-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-emerald-400 dark:focus:border-emerald-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-emerald-300"
              type="text"
              placeholder="Benutzername"
              aria-label="User Name"
            />
          </div>

          <div className="w-full mt-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-emerald-400 dark:focus:border-emerald-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-emerald-300"
              type="email"
              placeholder="Email Adresse"
              aria-label="Email Adresse"
            />
          </div>

          <div className="w-full mt-4">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-emerald-400 dark:focus:border-emerald-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-emerald-300"
              type="password"
              placeholder="Passwort"
              aria-label="Password"
              required
            />
          </div>

          <div className="w-full mt-4">
            <input
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-emerald-400 dark:focus:border-emerald-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-emerald-300"
              type="password"
              placeholder="Passwort wiederholen"
              aria-label="Password"
              required
            />
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}

          <div className="flex items-center justify-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-500 rounded-lg hover:bg-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-50"
            >
              Registrieren
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-200">
          Bereits registriert?{" "}
        </span>

        <Link
          to="/login"
          className="mx-2 text-sm font-bold text-emerald-500 dark:text-emerald-400 hover:underline"
        >
          Anmelden
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
