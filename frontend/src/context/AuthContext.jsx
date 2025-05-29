import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

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

  useEffect(() => {
    // Beim ersten Rendern: /me aufrufen, um eingeloggten Benutzer zu holen
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

export function useAuth() {
  return useContext(AuthContext);
}
