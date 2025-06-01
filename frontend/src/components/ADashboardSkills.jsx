import React from "react";
import { useEffect, useState } from "react";

function ADashboardSkills() {
  const [suggestions, setSuggestions] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/suggestions/all-requests`)
      .then((res) => {
        if (!res.ok) throw new Error("Kein Zugriff");
        return res.json();
      })
      .then((data) => setSuggestions(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className=" max-w-screen-lg mx-auto p-4">
        <h1 className="text-2xl font-bold pb-4 dark:text-white">
          Skill-Vorschläge verwalten
        </h1>
        {suggestions.length > 0 ? (
          <ul>
            {suggestions.map((s, i) => (
              <li key={i} className="pb-2 dark:text-white">
                Skill: {s.new_skill_name} -- Kategorie: {s.category}
                <div>
                  <button className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:outline-none dark:focus:ring-emerald-800">
                    OK
                  </button>
                  <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                    Ablehnen
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="dark:text-white">Keine Vorschläge verfügbar.</p>
        )}
      </div>
    </section>
  );
}

export default ADashboardSkills;
