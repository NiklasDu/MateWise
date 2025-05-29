import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // <- wichtig!
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Login fehlgeschlagen");
        return;
      }

      // Userdaten nach erfolgreichem Login holen
      const userResponse = await fetch(`${API_URL}/users/me`, {
        credentials: "include",
      });
      const userData = await userResponse.json();
      login(userData);
      navigate("/dashboard");
    } catch (err) {
      setError("Serverfehler. Bitte später versuchen.");
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
          Willkommen zurück
        </h3>

        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
          Melde dich hier an
        </p>

        <form onSubmit={handleSubmit}>
          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-emerald-400 dark:focus:border-emerald-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-emerald-300"
              type="email"
              placeholder="Email Adresse"
              aria-label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:text-white dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-emerald-400 dark:focus:border-emerald-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-emerald-300"
              type="password"
              placeholder="Passwort"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between mt-4">
            <Link
              to="/reset-password"
              className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
            >
              Passwort vergessen?
            </Link>

            <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-500 rounded-lg hover:bg-emerald-400 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-50">
              Anmelden
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-200">
          Noch kein Konto?
        </span>

        <Link
          to="/register"
          className="mx-2 text-sm font-bold text-emerald-500 dark:text-emerald-400 hover:underline"
        >
          Registrieren
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
