import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * AdminRoute-Komponente
 *
 * Schützt Routen, sodass nur Nutzer:innen mit Admin-Rechten (user.is_admin) Zugriff erhalten.
 *
 * - Zeigt während des Ladens des Auth-Status einen Ladehinweis an.
 * - Leitet nicht-Admins auf die Startseite um.
 * - Gibt die geschützten Kinder-Komponenten (children) nur für Admins frei.
 *
 * @returns Die Kinder-Komponenten, falls Admin, sonst Redirect oder Ladehinweis
 */
export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  // Zeige Ladehinweis, solange Authentifizierung geprüft wird
  if (loading) return <p>Lade...</p>;

  // Falls kein Admin, weiterleiten zur Startseite
  if (!user?.is_admin) {
    return <Navigate to="/" replace />;
  }

  // Falls Admin, geschützte Komponenten rendern
  return children;
}
