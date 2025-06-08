import React, { useState, useEffect } from "react";
import ChatBox from "./ChatBox";

/**
 * Nachrichten-Eingangs Komponente
 *
 * - zeigt die Nutzer an, mit denen schon gechattet wurde
 * - zeigt Onlinestatus an
 * - lässt auf das Chatfenster zugreifen
 * - zeigt letzte Nachricht von einem Nutzer in Kurzübersicht an
 *
 * @returns den HTML Code für die Anzeige aller Nachrichten die ein User bekommen hat.
 */
function MessagesWindow() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [page, setPage] = useState(1);
  const [profileUser, setProfileUser] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const USERS_PER_PAGE = 10;
  const API_URL = import.meta.env.VITE_API_URL;

  // Lädt alle Chatpartner (also Nutzer, von denen man eine Nachricht bekommen hat)
  useEffect(() => {
    fetch(`${API_URL}/messages/chat-partners`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Fehler beim Laden der Chatpartner:", err));
  }, []);

  // Paging-Logik
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const pagedUsers = users.slice(
    (page - 1) * USERS_PER_PAGE,
    page * USERS_PER_PAGE
  );

  return (
    <section className="bg-white dark:bg-gray-900 p-2">
      <div className="container px-4 mx-auto max-w-screen-lg py-8">
        <div className="flex items-center gap-x-3">
          <h2 className="text-3xl font-medium text-gray-800 dark:text-white">
            Nachrichten
          </h2>
        </div>

        <div className="flex flex-col mt-6">
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex items-center gap-x-3">
                      <span>Name</span>
                    </div>
                  </th>

                  <th
                    scope="col"
                    className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    <button className="flex items-center gap-x-2">
                      <span>Status</span>
                    </button>
                  </th>

                  <th
                    scope="col"
                    className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    Letzte Nachricht
                  </th>

                  <th scope="col" className="relative py-3.5 px-4">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {pagedUsers.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenModal("chat");
                    }}
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                      <div className="inline-flex items-center gap-x-3">
                        <div className="flex items-center gap-x-2">
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white ">
                              {user.username}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 
                                      ${
                                        user.online === true
                                          ? "bg-emerald-100/60"
                                          : "bg-red-100/60"
                                      } 
                                       dark:bg-gray-800`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full 
                              ${
                                user.online === true
                                  ? "bg-emerald-500"
                                  : "bg-red-500"
                              }`}
                        ></span>

                        <h2
                          className={`text-sm font-normal 
                              ${
                                user.online === true
                                  ? "text-emerald-500"
                                  : "text-red-500"
                              }`}
                        >
                          {user.online === true ? "Online" : "Offline"}
                        </h2>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-x-2">
                        <p className="text-xs rounded-full dark:text-white hover:dark:bg-gray-600 truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                          {user.last_message
                            ? user.last_message
                            : "Noch keine Nachrichten"}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-x-6">
                        <button
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
                          onClick={async (e) => {
                            e.stopPropagation();
                            setProfileLoading(true);
                            const res = await fetch(
                              `${API_URL}/users/${user.id}`,
                              { credentials: "include" }
                            );
                            const data = await res.json();
                            setProfileUser(data);
                            setProfileLoading(false);
                          }}
                        >
                          Profil anzeigen
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedUser && openModal && (
              <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 dark:bg-white/25">
                <div className="bg-white rounded-xl w-full max-w-lg shadow-xl relative dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
                  <ChatBox
                    selectedUser={selectedUser}
                    onClose={() => {
                      setSelectedUser(null);
                      setOpenModal(null);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Paging-Buttons */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            <span>Zurück</span>
          </button>
          <div className="items-center flex gap-x-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-2 py-1 text-sm rounded-md ${
                  page === i + 1
                    ? "text-emerald-500 bg-blue-100/60 dark:bg-gray-800"
                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 disabled:opacity-50"
          >
            <span>Weiter</span>
          </button>
        </div>
      </div>

      {profileUser && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 dark:bg-white/25">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl relative dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Profil
              </h3>
              <button
                type="button"
                onClick={() => setProfileUser(null)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
            <div className="p-4 md:p-5 space-y-4">
              {profileLoading ? (
                <div className="text-center text-gray-500">Lädt...</div>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {profileUser.username}
                  </h3>
                  <div>
                    <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Über {profileUser.username}:
                    </p>
                    {profileUser.bio && profileUser.bio.length > 0 ? (
                      <p className="font-normal text-gray-500 dark:text-gray-400">
                        {profileUser.bio}
                      </p>
                    ) : (
                      <p className="font-normal text-gray-500 dark:text-gray-400">
                        Keine Bio vorhanden.
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {profileUser.username} möchte gerne lernen:
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profileUser.skills_to_learn &&
                      profileUser.skills_to_learn.length > 0 ? (
                        profileUser.skills_to_learn.map((skill) => (
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
                      {profileUser.username} kann dir beibringen:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {profileUser.skills_to_teach &&
                      profileUser.skills_to_teach.length > 0 ? (
                        profileUser.skills_to_teach.map((skill) => (
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
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default MessagesWindow;
