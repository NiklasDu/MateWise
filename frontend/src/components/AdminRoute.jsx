import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Lade...</p>;

  if (!user?.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
