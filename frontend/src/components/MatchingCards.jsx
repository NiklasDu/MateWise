import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function MatchingCards({ propSkillToTeachId, showMatches }) {
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(null);
  const selectedUser = users.find((user) => user.id === openModal);
  const [searchParams] = useSearchParams();
  const skillParam = searchParams.get("skill");
  const skillToTeachId = propSkillToTeachId || skillParam;

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let endpoint;
    if (showMatches) {
      endpoint = `${API_URL}/users/matches`;
    } else if (skillToTeachId) {
      endpoint = `${API_URL}/users/by-skill?skill_to_teach_id=${skillToTeachId}`;
    } else {
      endpoint = `${API_URL}/users/all`;
    }

    fetch(endpoint, { credentials: "include" })
      .then((res) => res.json())
      .then(setUsers)
      .catch((err) => console.error("Fehler beim Laden:", err));
  }, [skillToTeachId, showMatches]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="max-w-sm w-full h-[585px] flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  className="rounded-t-lg max-h-[400px]"
                  src="avatar_icon.png"
                  alt=""
                />
                <div className="p-5 flex flex-col justify-start gap-y-3 flex-grow">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
                  </h5>

                  <div className="flex flex-wrap justify-start items-start gap-2 pb-3 max-h-[63px] xl:max-h-[150px] overflow-hidden">
                    {user.skills_to_teach?.slice(0, 3).map((skill) => (
                      <span
                        key={`teach-${skill.id}`}
                        className="px-3 py-1 max-w-[95px] lg:max-w-[105px] xl:max-w-none truncate text-xs font-medium text-emerald-600 bg-emerald-100 rounded-full dark:text-emerald-300 dark:bg-gray-700 whitespace-nowrap"
                      >
                        {skill.skill_name}
                      </span>
                    ))}
                    {user.skills_to_learn?.slice(0, 3).map((skill) => (
                      <span
                        key={`learn-${skill.id}`}
                        className="px-3 py-1 max-w-[95px] lg:max-w-[105px] xl:max-w-none truncate text-xs font-medium text-orange-600 bg-orange-100 rounded-full dark:text-orange-300 dark:bg-gray-700 whitespace-nowrap"
                      >
                        {skill.skill_name}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => setOpenModal(user.id)}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                  >
                    Profil anschauen
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 col-span-full pb-10">
              Es wurden keine passenden Nutzer gefunden.
            </p>
          )}
        </div>

        {/* Modal */}
        {openModal && (
          <div
            id="medium-modal"
            className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50 flex justify-center items-center"
          >
            <div className="relative w-full max-w-lg max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    Profil
                  </h3>
                  <button
                    type="button"
                    onClick={() => setOpenModal(null)}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="medium-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                {selectedUser && (
                  <div className="p-4 md:p-5 space-y-4">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {selectedUser.username}
                    </h3>
                    <div>
                      <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Über {selectedUser.username}:
                      </p>
                      {selectedUser.bio && selectedUser.bio.length > 0 ? (
                        <p className="font-normal text-gray-500 dark:text-gray-400">
                          {selectedUser.bio}
                        </p>
                      ) : (
                        <p className="font-normal text-gray-500 dark:text-gray-400">
                          Keine Bio vorhanden.
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {selectedUser.username} möchte gerne lernen:
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedUser.skills_to_learn.length > 0 ? (
                          selectedUser.skills_to_learn.map((skill) => (
                            <span
                              key={`modal-learn-${skill.id}`}
                              className="px-3 py-1 text-sm font-medium text-orange-600 bg-orange-100 rounded-full dark:text-orange-300 dark:bg-gray-600"
                            >
                              {skill.skill_name}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Keine Angaben.
                          </p>
                        )}
                      </div>

                      <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {selectedUser.username} kann dir beibringen:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedUser.skills_to_teach.length > 0 ? (
                          selectedUser.skills_to_teach.map((skill) => (
                            <span
                              key={`modal-teach-${skill.id}`}
                              className="px-3 py-1 text-sm font-medium text-emerald-600 bg-emerald-100 rounded-full dark:text-emerald-300 dark:bg-gray-600"
                            >
                              {skill.skill_name}
                            </span>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Keine Angaben.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* <!-- Modal footer --> */}
                <div className="p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <p className="pb-3 font-normal text-gray-500 dark:text-gray-400">
                    Du denkst ihr beide könnt euch gegenseitig etwas
                    beibringen?!
                  </p>
                  <button
                    data-modal-hide="medium-modal"
                    type="button"
                    className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                  >
                    {selectedUser.username} eine Nachricht senden
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MatchingCards;
