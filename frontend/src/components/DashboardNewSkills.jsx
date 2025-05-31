import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

function DashboardNewSkills() {
  const { user } = useAuth();
  const [newCategory, setNewCategory] = useState("");
  const [newSkillName, setNewSkillName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/skills/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("Fehler beim Laden der Kategorien:", err));
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-white">
          Kein passender Skill dabei?
        </h1>
        <h3 className="text-gray-500 dark:text-gray-300">
          Stelle hier eine Anfrage für einen neuen Skill.
        </h3>
      </div>
      <div className="p-3">
        <form className="max-w-md mx-auto">
          <label className="text-xl font-medium text-gray-900 dark:text-white">
            Kategorie:
          </label>
          <div className="pt-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
            >
              <option value="">-- Bitte wählen --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-3">
            <input
              type="text"
              className="shadow-xs bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-xs-light"
              placeholder="Neue Kategorie"
              aria-label="Neue Kategorie"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </div>

          <div className="pt-3 pb-2">
            <label className="text-xl font-medium text-gray-900 dark:text-white">
              Skill:
            </label>
          </div>

          <input
            type="text"
            className="shadow-xs bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-xs-light"
            placeholder="Neuer Skillname"
            aria-label="Neuer Skillname"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
          />
          <div className="py-3">
            <button
              type="submit"
              className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800"
            >
              Anfrage stellen
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default DashboardNewSkills;
