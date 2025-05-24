import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // z. B. { id: 1, name: 'Anna' }

  useEffect(() => {
    // Beim ersten Laden prüfen, ob schon ein Token da ist
    const token = localStorage.getItem("token");
    if (token) {
      // Optional: Nutzerdaten aus dem Token extrahieren (z.B. mit JWT) oder Backend-Abfrage
      // Hier als einfaches Beispiel ein Dummy-Objekt:
      setUser({ token }); // Du kannst auch z. B. ID, Email etc. speichern
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
