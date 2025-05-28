import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function DashboardSkillModal() {
  const [openModal, setOpenModal] = useState(null); // "learn" | "teach" | null
  const [skillsByCategory, setSkillsByCategory] = useState([]);
  const [selectedLearnSkills, setSelectedLearnSkills] = useState([]);
  const [selectedTeachSkills, setSelectedTeachSkills] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    if (openModal) {
      fetch("http://localhost:8000/skills/by-category")
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched skills:", data);
          setSkillsByCategory(data);
        })
        .catch((err) => console.error("Fehler beim Laden der Skills:", err));
    }
  }, [openModal]);

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

  const handleSaveSkills = () => {
    const userId = user.id;

    const payload = {
      user_id: userId,
      learn_skills: selectedLearnSkills,
      teach_skills: selectedTeachSkills,
    };

    fetch("http://localhost:8000/skills/save-skills", {
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
      .then((data) => {
        alert("Skills erfolgreich gespeichert.", data);
        setOpenModal(null); // Modal schließen
      })
      .catch((error) => {
        console.error("Fehler:", error);
        alert("Es gab ein Problem beim Speichern deiner Skills.");
      });
  };

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
              <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl relative dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4 dark:text-white">
                  {openModal === "learn"
                    ? "Welche Skills möchtest du lernen?"
                    : "Welche Skills kannst du beibringen?"}
                </h2>

                {skillsByCategory.length === 0 ? (
                  <p className="text-gray-600 dark:text-white">
                    Lade Skills...
                  </p>
                ) : (
                  <div className="space-y-4">
                    {skillsByCategory.map((group) => (
                      <div key={group.category}>
                        <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                          {group.category}
                        </h3>
                        <ul className="space-y-1">
                          {group.skills.map((skill) => (
                            <li
                              key={skill.id}
                              className="flex items-center gap-2"
                            >
                              <input
                                type="checkbox"
                                id={`${openModal}-${skill.id}`}
                                checked={
                                  openModal === "learn"
                                    ? selectedLearnSkills.includes(skill.id)
                                    : selectedTeachSkills.includes(skill.id)
                                }
                                onChange={() =>
                                  handleCheckboxChange(skill.id, openModal)
                                }
                                className="accent-emerald-600"
                              />
                              <label
                                htmlFor={`${openModal}-${skill.id}`}
                                className="text-gray-700 dark:text-white"
                              >
                                {skill.skill_name}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setOpenModal(null)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl dark:text-white"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
          <div>
            <button
              onClick={handleSaveSkills}
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
            >
              Skills speichern
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
