import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function MatchingCards() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/users/all", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => console.error("Fehler beim Laden der Nutzer:", err));
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
          {users.map((user) => (
            <div
              key={user.id}
              class="max-w-sm w-full h-[585px] flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  class="rounded-t-lg max-h-[400px]"
                  src="avatar_icon.png"
                  alt=""
                />
              </a>
              <div class="p-5 flex flex-col justify-start gap-y-3 flex-grow">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
                  </h5>
                </a>
                <div className="flex flex-wrap justify-start items-start gap-2 pb-3 max-h-[63px] xl:max-h-[150px] overflow-hidden">
                  {user.skills_to_teach.slice(0, 3).map((skill) => (
                    <span
                      key={`teach-${skill.id}`}
                      className="px-3 py-1 max-w-[95px] lg:max-w-[105px] xl:max-w-none truncate text-xs font-medium text-emerald-600 bg-emerald-100 rounded-full dark:text-emerald-300 dark:bg-gray-700 whitespace-nowrap"
                    >
                      {skill.skill_name}
                    </span>
                  ))}
                  {user.skills_to_learn.slice(0, 3).map((skill) => (
                    <span
                      key={`learn-${skill.id}`}
                      className="px-3 py-1 max-w-[95px] lg:max-w-[105px] xl:max-w-none truncate text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full dark:text-indigo-300 dark:bg-gray-700 whitespace-nowrap"
                    >
                      {skill.skill_name}
                    </span>
                  ))}
                </div>
                <a
                  href="#"
                  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                >
                  Profil anschauen
                  <svg
                    class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MatchingCards;
