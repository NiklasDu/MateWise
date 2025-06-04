import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function ProfileEdit() {
  const { user, logout, refreshUser } = useAuth();

  // Lokale States für die Eingabefelder
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew1, setPasswordNew1] = useState("");
  const [passwordNew2, setPasswordNew2] = useState("");
  const [bio, setBio] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // Initialisierung der Formulardaten, sobald user geladen ist
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Nutzerprofil aktualisieren (Name oder Email)
    try {
      const updateData = {};
      if (username !== user.username) updateData.username = username;
      if (email !== user.email) updateData.email = email;
      updateData.bio = bio;

      if (Object.keys(updateData).length > 0) {
        const response = await fetch(`${API_URL}/users/me`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          const data = await response.json();
          if (typeof data.detail === "string") {
            alert("Fehler beim Aktualisieren: " + data.detail);
          } else {
            alert("Fehler beim Aktualisieren: " + JSON.stringify(data.detail));
          }
          return;
        } else {
          await refreshUser();
          alert("Profil aktualisiert.");
        }
      }
    } catch (err) {
      console.error("Fehler beim Aktualisieren des Profils:", err);
    }

    // 2. Passwort ändern (wenn gewünscht)
    const wantsPasswordChange = passwordOld || passwordNew1 || passwordNew2;

    if (wantsPasswordChange) {
      if (!passwordOld || !passwordNew1 || !passwordNew2) {
        alert(
          "Bitte alle Passwortfelder ausfüllen, um das Passwort zu ändern."
        );
        return;
      }

      if (passwordNew1 !== passwordNew2) {
        alert("Die neuen Passwörter stimmen nicht überein.");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/users/change-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            old_password: passwordOld,
            new_password: passwordNew1,
            confirm_password: passwordNew2,
          }),
        });

        if (!res.ok) {
          const data = await res.json();
          if (typeof data.detail === "string") {
            alert("Fehler beim Passwort ändern: " + data.detail);
          } else {
            alert(
              "Fehler beim Passwort ändern: " + JSON.stringify(data.detail)
            );
          }
        } else {
          await refreshUser();
          alert("Passwort wurde geändert.");
          setPasswordOld("");
          setPasswordNew1("");
          setPasswordNew2("");
        }
      } catch (error) {
        console.error("Fehler beim Passwortwechsel:", error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (
      confirm(
        "Bist du sicher, dass du dein Konto löschen möchtest? Das kann nicht rückgängig gemacht werden."
      )
    ) {
      try {
        const response = await fetch(`${API_URL}/users/me`, {
          method: "DELETE",
          credentials: "include", // wichtig, damit der Token mitgeschickt wird
        });

        if (response.ok) {
          await logout();
          alert("Dein Konto wurde gelöscht.");
          window.location.href = "/"; // oder Logout-Funktion
        } else {
          const data = await response.json();
          alert("Fehler beim Löschen: " + data.detail);
        }
      } catch (error) {
        console.error("Fehler beim Löschen des Kontos:", error);
      }
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 px-3 py-8 min-h-[60vh]">
      <div className="max-w-md mx-auto">
        <h1 className="mb-6 text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 text-center">
          Profil bearbeiten
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="bio"
              className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
            >
              Über dich
            </label>
            <textarea
              name="bio"
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Schreib hier etwas über dich, deine Interessen und Skills..."
              className="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
              rows={4}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
            >
              Benutzername
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
              placeholder="Dein Benutzername"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
            >
              E-Mail-Adresse
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
              required
            />
          </div>
          <div className="pt-2 pb-1 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
              Passwort ändern
            </h2>
            <div className="space-y-3">
              <input
                type="password"
                id="password_old"
                value={passwordOld}
                onChange={(e) => setPasswordOld(e.target.value)}
                className="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                placeholder="Altes Passwort"
              />
              <input
                type="password"
                id="password_new_1"
                value={passwordNew1}
                onChange={(e) => setPasswordNew1(e.target.value)}
                className="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                placeholder="Neues Passwort"
              />
              <input
                type="password"
                id="password_new_2"
                value={passwordNew2}
                onChange={(e) => setPasswordNew2(e.target.value)}
                className="bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
                placeholder="Neues Passwort wiederholen"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <button
              type="submit"
              className="w-full text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-base px-5 py-2.5 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800 transition"
            >
              Änderungen speichern
            </button>
            <button
              type="button"
              onClick={() => {
                if (user) {
                  setUsername(user.username || "");
                  setEmail(user.email || "");
                  setPasswordOld("");
                  setPasswordNew1("");
                  setPasswordNew2("");
                  setBio(user.bio || "");
                }
              }}
              className="w-full text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-base px-5 py-2.5 dark:bg-gray-700 dark:text-emerald-300 dark:hover:bg-gray-800 dark:focus:ring-emerald-800 transition"
            >
              Änderungen verwerfen
            </button>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="w-full text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-base px-5 py-2.5 mt-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 transition"
            >
              Konto löschen
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ProfileEdit;
