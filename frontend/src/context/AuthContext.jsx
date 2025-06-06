import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

/**
 * Auth-Provider Komponente
 *
 * - sorgt dafür, dass überall im Frontend der aktuelle Login-Status und die UserDaten verfügbar sind
 *
 * @returns den AuthProvider, der in der Main.jsx eingesetzt wird und so über allen Komponenten steht.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // Lädt den eingeloggten User, wenn vorhanden.
  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        credentials: "include", // wichtig für Cookies
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Fehler beim Abrufen des Benutzers", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Beim ersten Rendern der Seite wird fetchUser() aufgerufen
  useEffect(() => {
    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData); // Nur im Zustand merken – keine Speicherung im localStorage
  };

  const logout = async () => {
    await fetch(`${API_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, refreshUser: fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Um in Komponenten auf den Auth Status zuzugreifen mit "const { user } = useAuth();""
export function useAuth() {
  return useContext(AuthContext);
}
