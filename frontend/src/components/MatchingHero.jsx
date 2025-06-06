import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Lernpartner Finden Hero
 *
 * - Hier kann nach Nutzern gefiltert werden
 * - Entweder alle, wenn man einfach suchen drückt, oder nur nach bestimmtem Skill oder
 * - perfekte Lernpartner, die das beibringen, was man lernen möchte und anders herum
 *
 * @returns den HTML Code für den MatchingHero
 */
function MatchingHero({ onFindMatches, onSearch }) {
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Beim Laden der Seite, alle Kategorien laden.
  useEffect(() => {
    fetch(`${API_URL}/skills/categories`)
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("Kategorien-Fehler:", err));
  }, []);

  // Je nach ausgewählte Kategorie sollen passende Skills in das zweite Dropdown geladen werden.
  useEffect(() => {
    if (selectedCategory) {
      fetch(`${API_URL}/skills?category=${selectedCategory}`)
        .then((res) => res.json())
        .then(setSkills)
        .catch((err) => console.error("Skills-Fehler:", err));
    } else {
      setSkills([]);
    }
  }, [selectedCategory]);

  // Gibt die Suche Frei.
  const handleSearch = (e) => {
    e.preventDefault();
    if (!selectedCategory || !selectedSkill) {
      // Nichts ausgewählt: Alle Nutzer anzeigen
      if (typeof onSearch === "function") {
        onSearch(null);
      }
      return;
    }

    if (typeof onSearch === "function") {
      onSearch(selectedSkill);
    }
    navigate(`/matching?skill=${selectedSkill}`);
  };

  // Sucht passende Matches für den Nutzer.
  const handleFindMatches = () => {
    if (typeof onFindMatches === "function") {
      onFindMatches();
      navigate("/matching");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Finde deinen Lernpartner.
          </h1>
          <p className="text-lg font-normal pb-4 text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Lass dir automatisch passende Lernpartner anzeigen.
          </p>
          <button
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800"
            onClick={handleFindMatches}
            type="button"
          >
            Lernpartner finden
          </button>
          <p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 py-3 dark:text-gray-400">
            oder
          </p>
          <p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            wähle einen Bereich in dem du dich weiterentwickeln möchtest.
          </p>
        </div>
        <div className="py-6">
          <form onSubmit={handleSearch} className="max-w-sm mx-auto">
            <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
              Kategorie:
            </label>
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

            <label className="block mb-2 text-xl font-medium pt-4 text-gray-900 dark:text-white">
              Bereich:
            </label>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
              disabled={!skills.length}
            >
              <option value="">-- Bitte wählen --</option>
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.skill_name}
                </option>
              ))}
            </select>
            <div className="pt-4">
              <button
                type="submit"
                className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800"
              >
                Suche starten
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default MatchingHero;
