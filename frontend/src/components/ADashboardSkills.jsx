import React from "react";
import { useEffect, useState } from "react";

function ADashboardSkills() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("/api/admin/suggestions", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Kein Zugriff");
        return res.json();
      })
      .then((data) => setSuggestions(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-lg p-8">
        <h1 className="text-2xl font-bold pb-4 dark:text-white">
          Skill-Vorschläge verwalten
        </h1>
        {suggestions.length > 0 ? (
          <ul>
            {suggestions.map((s, i) => (
              <li key={i} className="pb-2 dark:text-white">
                {s.skill_name} - Kategorie: {s.category}
                <button className="">OK</button>
                <button className="">Ablehnen</button>
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
