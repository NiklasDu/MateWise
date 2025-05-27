import React, { useState } from "react";

export default function DashboardSkillModal() {
  const [openModal, setOpenModal] = useState(null); // "learn" | "teach" | null

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-md mx-auto">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-gray-700 dark:text-white">
            Fähigkeiten auswählen
          </h1>
          <p className="text-gray-500 dark:text-gray-300">
            Wähle hier aus, welche Skills du lernen möchtest und welche du
            beibringen kannst.
          </p>

          <div className="flex gap-4 pb-6">
            <button
              onClick={() => setOpenModal("learn")}
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            >
              Skills lernen
            </button>

            <button
              onClick={() => setOpenModal("teach")}
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            >
              Skills beibringen
            </button>
          </div>

          {/* Modal */}
          {openModal && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 dark:bg-white/25">
              <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative dark:bg-gray-900">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">
                  {openModal === "learn"
                    ? "Welche Skills möchtest du lernen?"
                    : "Welche Skills kannst du beibringen?"}
                </h2>

                {/* Hier kannst du später ein Formular oder eine Auswahl einfügen */}
                <p className="mb-4 text-gray-600 dark:text-white">
                  [Skill-Auswahl kommt hier hin]
                </p>

                <button
                  onClick={() => setOpenModal(null)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl dark:text-white"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
