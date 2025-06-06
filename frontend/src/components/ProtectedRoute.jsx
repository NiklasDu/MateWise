import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Protected Route für Angemeldete User
 *
 * - schützt Seiten, sodass man erst angemeldet sein muss, um auf die Seiten zugreifen zu können
 *
 * @returns die Children/Komponenten, wenn jemand eingeloggt ist, wenn nicht, dann wird zur Startseite geleitet
 */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Lade Benutzerinformationen...</div>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
