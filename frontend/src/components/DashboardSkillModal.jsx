import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * Skillauswahl Komponente
 *
 * - Zeigt alle Skill an die der angemeldete User bereits ausgewählt hat.
 * - Gibt die Möglichkeit die Skill in einem Modal anzupassen.
 *
 * @returns Den HTML Code für die Skill Auswahl, welche der User lernen oder beibringen möchte
 */
export default function DashboardSkillModal() {
  const [openModal, setOpenModal] = useState(null); // "learn" | "teach" | null
  const [skillsByCategory, setSkillsByCategory] = useState([]);
  const [selectedLearnSkills, setSelectedLearnSkills] = useState([]);
  const [selectedTeachSkills, setSelectedTeachSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const { user } = useAuth();

  // Lädt alle verfügbaren Skills nach Kategorien
  useEffect(() => {
    fetch(`${API_URL}/skills/by-category`)
      .then((res) => res.json())
      .then((data) => {
        setSkillsByCategory(data);
      })
      .catch((err) => console.error("Fehler beim Laden der Skills:", err));
  }, []);

  // Lädt die Skills des eingeloggten Nutzers
  useEffect(() => {
    fetch(`${API_URL}/skills/my-skill-ids`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedLearnSkills(data.learn);
        setSelectedTeachSkills(data.teach);
      })
      .catch((err) =>
        console.error("Fehler beim Laden der Nutzerskills:", err)
      );
  }, []);

  // Wenn ein Skill angeklickt wird zeigt es ihn als ausgewählt oder nicht, je nach vorherigem Status.
  const handleCheckboxChange = (skillId, mode) => {
    if (mode === "learn") {
      setSelectedLearnSkills((prev) =>
        prev.includes(skillId)
          ? prev.filter((id) => id !== skillId)
          : [...prev, skillId]
      );
    } else {
      setSelectedTeachSkills((prev) =>
        prev.includes(skillId)
          ? prev.filter((id) => id !== skillId)
          : [...prev, skillId]
      );
    }
  };

  // Wird nach jedem schließen des Modals durchgeführt, um die Anpassung direkt zu speichern.
  const handleSaveSkills = () => {
    const userId = user.id;

    const payload = {
      user_id: userId,
      learn_skills: selectedLearnSkills,
      teach_skills: selectedTeachSkills,
    };

    fetch(`${API_URL}/skills/save-skills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fehler beim Speichern der Skills.");
        }
        return res.json();
      })
      .catch((error) => {
        console.error("Fehler:", error);
        alert("Es gab ein Problem beim Speichern deiner Skills.");
      });
  };

  // Fügt den Skill Ids deren passenden Namen hinzu.
  const getSkillNamesFromIds = (ids) => {
    const allSkills = skillsByCategory.flatMap((group) => group.skills);
    return allSkills
      .filter((skill) => ids.includes(skill.id))
      .map((skill) => skill.skill_name);
  };

  // Sortiert die Skills nach Kategorien.
  const filteredSkillsByCategory = skillsByCategory.map((group) => ({
    ...group,
    skills: group.skills.filter((skill) =>
      skill.skill_name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <section className="bg-white dark:bg-gray-900 p-3">
      <div className="max-w-md mx-auto">
        <div className="space-y-3">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
              Deine Lernreise beginnt hier!
            </h1>
            <p className="mt-2 text-gray-500 dark:text-gray-300">
              Wähle aus, was du lernen möchtest und welche Fähigkeiten du
              anderen beibringen kannst. Je mehr du teilst, desto besser können
              wir dich mit passenden Lernpartnern verbinden.
            </p>
            <p className="pt-3 text-sm text-gray-400 dark:text-gray-500">
              {selectedLearnSkills.length} Lern-Skills &bull;{" "}
              {selectedTeachSkills.length} Lehr-Skills ausgewählt
            </p>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
            Diese Skills möchte ich lernen:
          </h3>
          <ul className="list-none flex flex-wrap gap-3 text-gray-700 dark:text-white">
            {/* Lädt die Liste an Lernskills für den angemeldeten User. */}
            {getSkillNamesFromIds(selectedLearnSkills).map((name) => (
              <li
                key={name}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-orange-500 bg-orange-100 rounded-full dark:text-orange-300 dark:bg-gray-700 shadow-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {name}
              </li>
            ))}
          </ul>
          {/* Öffnet das Modal, um neue Skills auszuwählen. */}
          <button
            onClick={() => setOpenModal("learn")}
            className="inline-flex items-center gap-2 text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Skills auswählen
          </button>

          <h3 className="text-lg font-semibold pt-3 text-gray-700 dark:text-white">
            Diese Skills kann ich gut:
          </h3>
          <ul className="list-none flex flex-wrap gap-3 text-gray-700 dark:text-white">
            {/* Lädt die List an Skills die ein Nutzer jemand anderem beibringen kann. */}
            {getSkillNamesFromIds(selectedTeachSkills).map((name) => (
              <li
                key={name}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-emerald-600 bg-emerald-100 rounded-full dark:text-emerald-300 dark:bg-gray-700 shadow-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {name}
              </li>
            ))}
          </ul>
          {/* Öffnet das Modal um neue Skills auszuwählen oder alte abzuwählen. */}
          <button
            onClick={() => setOpenModal("teach")}
            className="inline-flex items-center gap-2 text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Skills auswählen
          </button>

          {/* Modal */}
          {openModal && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 dark:bg-white/25">
              <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl relative dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">
                  {/* Je nachdem welches Modal geöffnet wird, wird ein anderer Inhalt geladen */}
                  {openModal === "learn"
                    ? "Welche Skills möchtest du lernen?"
                    : "Welche Skills kannst du beibringen?"}
                </h2>

                <input
                  type="text"
                  placeholder="Skill suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full mb-4 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-gray-800 dark:text-white"
                />

                {filteredSkillsByCategory.length === 0 ? (
                  <p className="text-gray-600 dark:text-white">
                    Keine Skills gefunden.
                  </p>
                ) : (
                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                    {/* Zeigt alle Skills nach Kategorien sortiert an. */}
                    {filteredSkillsByCategory.map((group, idx) => (
                      <details key={group.category} open>
                        <summary className="font-bold text-gray-800 dark:text-white mb-2 cursor-pointer">
                          {group.category}
                        </summary>
                        <ul className="flex flex-wrap gap-2">
                          {group.skills.map((skill) => {
                            const checked = (
                              openModal === "learn"
                                ? selectedLearnSkills
                                : selectedTeachSkills
                            ).includes(skill.id);

                            return (
                              <li
                                key={skill.id}
                                onClick={() =>
                                  handleCheckboxChange(skill.id, openModal)
                                }
                                className={`cursor-pointer px-3 py-2 rounded-full text-sm font-medium transition
                                          ${
                                            checked
                                              ? openModal === "learn"
                                                ? "bg-orange-600 text-white"
                                                : "bg-emerald-600 text-white"
                                              : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white"
                                          }
                                          hover:scale-105`}
                              >
                                {skill.skill_name}
                              </li>
                            );
                          })}
                        </ul>
                      </details>
                    ))}
                  </div>
                )}

                {/* Button um das Modal zu schließen. */}
                <button
                  onClick={() => {
                    handleSaveSkills();
                    setOpenModal(null);
                  }}
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
