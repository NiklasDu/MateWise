import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

/**
 * New Skill Komponente (Dashboard)
 *
 * - Es kann eine Kategorie ausgewählt werden oder eine neue erstellt werden.
 * - Dazu wird dann ein neuer Skillvorschlag eingegeben
 * - Dieser wird nach abschicken an den Admin gesendet.
 *
 * @returns Den HTML Abschnitt für das Anfragen von neuen Skills und Kategorien.
 */
function DashboardNewSkills() {
  const [newCategory, setNewCategory] = useState("");
  const [newSkillName, setNewSkillName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isNewCategory, setIsNewCategory] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  // Lädt alle Kategorien für das Dropdown Menü.
  useEffect(() => {
    fetch(`${API_URL}/skills/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("Fehler beim Laden der Kategorien:", err));
  }, [API_URL]);

  // Wenn Senden gedrückt wird, der Vorschlag je nach vorhandener oder neuer Kategorie an die
  // Suggestions Tabelle in der Datenbank gesendet, von wo aus der Admin in seinem Dashboard
  // die Vorschläge annehmen oder ablehnen kann.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      newSkillName !== "" &&
      ((isNewCategory && newCategory !== "") ||
        (!isNewCategory && selectedCategory !== ""))
    ) {
      // Logik zu neuem Kategorievorschlag + Skillvorschlag
      if (isNewCategory) {
        try {
          const res = await fetch(`${API_URL}/suggestions/request`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              category: newCategory,
              skill: newSkillName,
            }),
          });

          if (!res.ok) {
            const data = await res.json();
            if (typeof data.detail == "string") {
              alert("Fehler beim senden der Anfrage: " + data.detail);
            } else {
              alert(
                "Fehler beim senden der Anfrage: " + JSON.stringify(data.detail)
              );
            }
          } else {
            setNewSkillName("");
            setNewCategory("");
            setSelectedCategory("");
            setIsNewCategory(false);
            alert("Anfrage erfolgreich versendet.");
          }
        } catch (error) {
          console.error("Fehler beim Anfrage stellen:", error);
        }
      } else {
        // Logik zu neuem Skillvorschlag mit vorhandener Kategorie.
        try {
          const res = await fetch(`${API_URL}/suggestions/request`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              category: selectedCategory,
              skill: newSkillName,
            }),
          });

          if (!res.ok) {
            const data = await res.json();
            if (typeof data.detail == "string") {
              alert("Fehler beim senden der Anfrage: " + data.detail);
            } else {
              alert(
                "Fehler beim senden der Anfrage: " + JSON.stringify(data.detail)
              );
            }
          } else {
            setNewSkillName("");
            setNewCategory("");
            setSelectedCategory("");
            setIsNewCategory(false);
            alert("Anfrage erfolgreich versendet.");
          }
        } catch (error) {
          console.error("Fehler beim Anfrage stellen:", error);
        }
      }
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-3 pt-8">
      <div className="max-w-md mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
            Kein passender Skill dabei?
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-300">
            Schlage uns einen neuen Skill vor und hilf mit, MateWise noch besser
            zu machen!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-base font-medium text-gray-900 dark:text-white mb-1">
              Kategorie
            </label>
            {/* Gibt die Auswahl zwischen vorhandener Kategorie oder neuer. */}
            {!isNewCategory ? (
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
              >
                <option value="">-- Bitte wählen --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="shadow-xs bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                placeholder="Neue Kategorie"
                aria-label="Neue Kategorie"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            )}
            {/* Legt den Status fest, ob gerade eine neue Kategorie erstellt werden soll oder nicht. */}
            <button
              type="button"
              onClick={() => setIsNewCategory((prev) => !prev)}
              className="mt-2 text-xs text-emerald-700 dark:text-emerald-400 underline hover:no-underline"
            >
              {isNewCategory
                ? "Vorhandene Kategorie wählen"
                : "Neue Kategorie anlegen"}
            </button>
          </div>
          <div>
            <label className="block text-base font-medium text-gray-900 dark:text-white mb-1">
              Skill
            </label>
            {/* Input für den neuen Skillnamen. */}
            <input
              type="text"
              className="shadow-xs bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
              placeholder="Neuer Skillname"
              aria-label="Neuer Skillname"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
            />
          </div>
          <div className="pt-2">
            {/* Skill Vorschlag einreichen. */}
            <button
              type="submit"
              className="w-full text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-base px-5 py-2.5 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800 transition"
            >
              Skill vorschlagen
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default DashboardNewSkills;
