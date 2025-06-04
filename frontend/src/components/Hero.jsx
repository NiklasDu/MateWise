import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Lernen. Tauschen. Wachsen.
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Entdecke die neue Art des Lernens: Finde deinen perfekten Lernpartner,
          teile dein Wissen und wachst gemeinsam.
        </p>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Tausche deine Fähigkeiten – zum Beispiel 30 Minuten Klavier gegen 30
          Minuten Tanzen – und erlebe, wie Lernen Spaß macht und verbindet.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
            to="/login"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Jetzt Anmelden
          </Link>
        </div>
        <div className="px-6">
          <img
            src="hero_picture3.jpg"
            alt="People Learning"
            className="w-full max-w-2xl mx-auto rounded-lg shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
