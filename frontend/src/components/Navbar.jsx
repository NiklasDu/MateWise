import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true, wenn token da
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="logo.png" class="h-8" alt="MateWise Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              MateWise
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
              >
                Abmelden
              </button>
            ) : (
              <Link
                to="/login"
                className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
              >
                Anmelden
              </Link>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Hauptmenü öffnen</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className={`block py-2 px-3 text-gray-900 rounded-sm ${
                    location.pathname === "/"
                      ? "text-white bg-emerald-700 md:bg-transparent md:text-emerald-700 dark:text-emerald-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:text-emerald-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-gray-800"
                  }`}
                >
                  Startseite
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className={`block py-2 px-3 text-gray-900 rounded-sm ${
                    location.pathname === "/dashboard"
                      ? "text-white bg-emerald-700 md:bg-transparent md:text-emerald-700 dark:text-emerald-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:text-emerald-700 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-gray-800"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/matching"
                  className={`block py-2 px-3 text-gray-900 rounded-sm  ${
                    location.pathname === "/matching"
                      ? "text-white bg-emerald-700 md:bg-transparent md:text-emerald-700 dark:text-emerald-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:text-emerald-700  dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-gray-800"
                  }`}
                >
                  Lernpartner finden
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
