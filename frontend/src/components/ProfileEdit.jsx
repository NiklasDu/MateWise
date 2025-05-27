import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function ProfileEdit() {
  const { user, logout, refreshUser } = useAuth(); // User-Daten aus Context holen

  // Lokale States für die Eingabefelder
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordOld, setPasswordOld] = useState("");
  const [passwordNew1, setPasswordNew1] = useState("");
  const [passwordNew2, setPasswordNew2] = useState("");

  // Initialisierung der Formulardaten, sobald user geladen ist
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Nutzerprofil aktualisieren (Name oder Email)
    try {
      const updateData = {};
      if (username !== user.username) updateData.username = username;
      if (email !== user.email) updateData.email = email;

      if (Object.keys(updateData).length > 0) {
        const response = await fetch("http://localhost:8000/users/me", {
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
        const res = await fetch("http://localhost:8000/users/change-password", {
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
        const response = await fetch("http://localhost:8000/users/me", {
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
    <section className="bg-white dark:bg-gray-900">
      <h1 className="max-w-md mx-auto mb-4 pt-4 text-2xl font-semibold text-gray-700 dark:text-white">
        Profil anpassen
      </h1>
      <form onSubmit={handleSubmit} class="max-w-md mx-auto pb-5">
        <div class="mb-5">
          <label
            for="username"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Benutzername:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            class="shadow-xs bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-xs-light"
            placeholder="MrDaniel"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email Adresse:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            class="shadow-xs bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-xs-light"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Altes Passwort:
          </label>
          <input
            type="password"
            id="password_old"
            value={passwordOld}
            onChange={(e) => setPasswordOld(e.target.value)}
            class="shadow-xs bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-xs-light"
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Neues Passwort:
          </label>
          <input
            type="password"
            id="password_new_1"
            value={passwordNew1}
            onChange={(e) => setPasswordNew1(e.target.value)}
            class="shadow-xs bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-xs-light"
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Neues Passwort wiederholen:
          </label>
          <input
            type="password"
            id="password_new_2"
            value={passwordNew2}
            onChange={(e) => setPasswordNew2(e.target.value)}
            class="shadow-xs bg-gray-50 border border-gray-300 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500 dark:shadow-xs-light"
          />
        </div>
        <button
          type="submit"
          class="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
        >
          Änderungen speichern
        </button>
        <button
          type="button"
          onClick={() => {
            // Formular zurücksetzen auf aktuelle Werte
            if (user) {
              setUsername(user.username || "");
              setEmail(user.email || "");
              setPasswordOld("");
              setPasswordNew1("");
              setPasswordNew2("");
            }
          }}
          class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Änderungen verwerfen
        </button>
        <button
          type="button"
          onClick={handleDeleteAccount}
          class="text-white bg-red-600 hover:bg-red-800 mt-3 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Konto löschen
        </button>
      </form>
    </section>
  );
}

export default ProfileEdit;
