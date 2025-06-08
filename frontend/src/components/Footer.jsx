import { Link } from "react-router-dom";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Footer-Komponente
 *
 * - Logo MateWise
 * - Seitenwechsel/Navigation möglich
 * - Anmelden möglich
 *
 * @returns den HTML Code für den Footer
 */
function Footer() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  // Loggt den Nutzer aus.
  const handleLogout = async () => {
    navigate("/");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    await logout();
  };

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img src="logo.png" className="h-8" alt="MateWise Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              MateWise
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link
                to="/"
                onClick={scrollTop}
                className="hover:underline me-4 md:me-6"
              >
                Startseite
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                onClick={scrollTop}
                className="hover:underline me-4 md:me-6"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/matching"
                onClick={scrollTop}
                className="hover:underline me-4 md:me-6"
              >
                Lernpartner finden
              </Link>
            </li>
            <li>
              {user ? (
                <button onClick={handleLogout} className="hover:underline">
                  Abmelden
                </button>
              ) : (
                <Link to="/login" className="hover:underline">
                  Anmelden
                </Link>
              )}
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          2025{" "}
          <Link to="/" className="hover:underline">
            MateWise
          </Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
