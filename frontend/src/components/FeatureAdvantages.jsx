/**
 * Vorteile Komponente (Startseite)
 *
 * - Listet einige Vorteile der Webseite auf.
 *
 * @returns den HTML Code für den Abschnitt der Startseite, der die Vorteile auflistet.
 */
function FeatureAdvantages() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container max-w-screen-xl px-16 py-10 mx-auto">
        <div className="lg:flex lg:items-center">
          <div className="w-full space-y-12 lg:w-1/2 ">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                Deine Vorteile
              </h1>

              <div className="mt-1">
                <span className="inline-block w-40 h-1 bg-emerald-600 rounded-full"></span>
                <span className="inline-block w-3 h-1 ml-1 bg-emerald-600 rounded-full"></span>
                <span className="inline-block w-1 h-1 ml-1 bg-emerald-600 rounded-full"></span>
              </div>
            </div>

            <div className="md:flex md:items-start md:-mx-4">
              <span className="inline-block p-2 text-emerald-500 bg-emerald-100 rounded-xl md:mx-4 dark:text-white dark:bg-emerald-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </span>

              <div className="mt-4 md:mx-4 md:mt-0">
                <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
                  Keine Kosten
                </h1>

                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  MateWise ist und bleibt für dich komplett kostenlos. Lerne,
                  teile dein Wissen und finde neue Freunde – ganz ohne
                  versteckte Gebühren oder Abo-Fallen.
                </p>
              </div>
            </div>

            <div className="md:flex md:items-start md:-mx-4">
              <span className="inline-block p-2 text-emerald-500 bg-emerald-100 rounded-xl md:mx-4 dark:text-white dark:bg-emerald-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </span>

              <div className="mt-4 md:mx-4 md:mt-0">
                <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
                  Austausch mit Gleichgesinnten
                </h1>

                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  Finde Menschen, die deine Interessen teilen und gemeinsam mit
                  dir wachsen wollen. Bei MateWise steht der persönliche
                  Austausch und das Miteinander im Mittelpunkt.
                </p>
              </div>
            </div>

            <div className="md:flex md:items-start md:-mx-4">
              <span className="inline-block p-2 text-emerald-500 bg-emerald-100 rounded-xl md:mx-4 dark:text-white dark:bg-emerald-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                  />
                </svg>
              </span>

              <div className="mt-4 md:mx-4 md:mt-0">
                <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
                  Lerne neue Leute kennen
                </h1>

                <p className="mt-3 text-gray-500 dark:text-gray-300">
                  Erweitere deinen Horizont und knüpfe wertvolle Kontakte. Mit
                  MateWise findest du inspirierende Lernpartner, die dich
                  motivieren und unterstützen.
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center lg:w-1/2 lg:justify-center">
            <img
              className="w-[28rem] h-[28rem] object-cover xl:w-[34rem] xl:h-[34rem] rounded-2xl"
              src="feature_picture.jpg"
              alt=""
            />
          </div>
        </div>

        <hr className="mt-20 border-gray-200 dark:border-gray-700" />
      </div>
    </section>
  );
}

export default FeatureAdvantages;
