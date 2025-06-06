import { Link } from "react-router-dom";

/**
 * Call-to-Action Bereich der Startseite
 *
 * Ruft den Besucher dazu auf, sich auf der Seite zu registrieren und leitet auf
 * die Registrierungsseite weiter.
 *
 * @returns Den HTML Code für den Call-to-Action Bereicht auf der Startseite ganz unten.
 */
function CtaHome() {
  return (
    <section className="bg-white dark:bg-gray-900 py-8 min-h-[15vh]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
            Überzeugt?
          </h2>
          <p className="mb-6 font-light text-gray-600 dark:text-gray-400 md:text-lg">
            Jetzt Profil erstellen und Lernpartner finden.
          </p>
          <Link
            to="/register"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800"
          >
            Registrieren
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CtaHome;
