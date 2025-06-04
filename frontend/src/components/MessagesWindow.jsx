import React, { useState, useEffect } from "react";
import ChatBox from "./ChatBox";

function MessagesWindow() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(null);
  const [page, setPage] = useState(1);

  const USERS_PER_PAGE = 10;
  const API_URL = import.meta.env.VITE_API_URL;

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

          <span className="px-3 py-1 text-sm text-emerald-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-emerald-400">
            {/* ... */}
          </span>
        </div>

        <div className="flex flex-col mt-6">
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
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
                        <p className=" text-xsrounded-full dark:text-white dark:bg-gray-900 ">
                          ...
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-x-6">
                        <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">
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
    </section>
  );
}

export default MessagesWindow;
