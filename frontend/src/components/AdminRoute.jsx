import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return <p>Lade...</p>;

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
