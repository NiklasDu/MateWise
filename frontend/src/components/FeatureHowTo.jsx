function FeatureHowTo() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container max-w-screen-xl px-16 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
          So funktioniert's:
        </h1>
        <div className="mt-1">
          <span className="inline-block w-40 h-1 bg-emerald-600 rounded-full"></span>
          <span className="inline-block w-3 h-1 ml-1 bg-emerald-600 rounded-full"></span>
          <span className="inline-block w-1 h-1 ml-1 bg-emerald-600 rounded-full"></span>
        </div>
        <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
          In wenigen Schritten zum perfekten Lernpartner – so einfach geht’s mit
          MateWise!
        </p>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
          <div className="p-8 space-y-3 border-2 border-emerald-600 dark:border-emerald-300 rounded-xl">
            <span className="inline-block text-emerald-600 dark:text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
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

            <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
              Registrieren
            </h1>

            <p className="text-gray-500 dark:text-gray-300">
              Erstelle kostenlos dein Profil und werde Teil der MateWise-Community.
              Je mehr du über dich und deine Lernziele verrätst, desto besser können
              wir dich mit passenden Lernpartnern verbinden.
            </p>
          </div>

          <div className="p-8 space-y-3 border-2 border-emerald-600 dark:border-emerald-300 rounded-xl">
            <span className="inline-block text-emerald-600 dark:text-emerald-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                />
              </svg>
            </span>

            <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
              Zeige was du kannst
            </h1>

            <p className="text-gray-500 dark:text-gray-300">
              Teile deine Fähigkeiten und Interessen. Egal ob du Klavier spielen,
              Programmieren oder eine Sprache lernen möchtest – bei MateWise findest
              du jemanden, der genau das sucht, was du anbieten kannst.
            </p>
          </div>

          <div className="p-8 space-y-3 border-2 border-emerald-600 dark:border-emerald-300 rounded-xl">
            <span className="inline-block text-emerald-600 dark:text-blemeraldue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </span>

            <h1 className="text-xl font-semibold text-gray-700 dark:text-white">
              Finde deinen Lernpartner
            </h1>

            <p className="text-gray-500 dark:text-gray-300">
              Entdecke passende Lernpartner, tausche dich aus und wachst gemeinsam
              über euch hinaus. Mit MateWise wird Lernen zum Erlebnis – persönlich,
              flexibel und motivierend!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureHowTo;
