# MateWise

**MateWise** ist eine moderne Webanwendung, die es Nutzer:innen ermöglicht, Lernpartner zu finden, Fähigkeiten auszutauschen und gemeinsam zu wachsen. Die Plattform setzt auf Matching-Algorithmen, ein ansprechendes UI und einen Fokus auf Community und Skill-Sharing.

---

## Features

- **Matching-System:** Finde passende Lernpartner:innen basierend auf deinen Lern- und Lehr-Skills.
- **Skill-Verwaltung:** Gib an, was du lernen und was du beibringen möchtest.
- **Nachrichten & Chat:** Kommuniziere direkt mit anderen Nutzer:innen.
- **Profilverwaltung:** Bearbeite dein Profil, füge eine Bio hinzu und verwalte deine Skills.
- **Skill-Vorschläge:** Schlage neue Skills vor, die noch nicht in der Plattform existieren.
- **Admin-Bereich:** Verwaltung von Skill-Vorschlägen und Nutzer:innen (nur für Admins).
- **Responsives Design:** Optimiert für Desktop und Mobile.
- **Dark Mode:** Automatische Anpassung an das Farbschema des Systems.

---

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** FastAPI, SQLAlchemy, SQLite
- **Echtzeit-Chat:** WebSockets
- **Avatar-Generierung:** DiceBear Avatare (clientseitig)
- **Authentifizierung:** Cookie-basierte Authentifizierung (Sessions)
- **Deployment:** Lokale Entwicklung, leicht auf Server übertragbar

---

## Projektstruktur

```
MateWise/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI-Server, API-Routing
│   │   ├── models/           # SQLAlchemy-Modelle
│   │   ├── routers/          # API-Endpunkte (User, Skills, Auth, etc.)
│   │   ├── schemas/          # Pydantic-Schemas
│   │   ├── utils/            # Hilfsfunktionen
│   │   ├── database.py       # DB-Verbindung
│   │   └── create_db.py      # DB-Initialisierung
│   ├── alembic/              # DB-Migrationen
│   └── matewise.db           # SQLite-Datenbank
├── frontend/
│   ├── src/
│   │   ├── components/       # React-Komponenten
│   │   ├── pages/            # Seiten (z.B. Home, Matching)
│   │   ├── context/          # React Context (z.B. Auth)
│   │   └── ...
│   ├── public/               # Statische Assets (Bilder, Icons)
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Lokale Entwicklung

### Voraussetzungen

- Node.js (empfohlen: >=18)
- Python 3.10+
- [pipenv](https://pipenv.pypa.io/) oder venv (optional)

### Backend starten

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Das Backend läuft standardmäßig auf [http://localhost:8000](http://localhost:8000).

### Frontend starten

```bash
cd frontend
npm install
npm run dev
```

Das Frontend läuft standardmäßig auf [http://localhost:5173](http://localhost:5173).

---

## Wichtige Umgebungsvariablen

Im Frontend (`frontend/.env.local`):

```
VITE_API_URL=http://localhost:8000
```

Im Backend ggf. CORS-Origins in `main.py` anpassen.

---

## Datenbank-Migrationen

Für Änderungen an der Datenbankstruktur wird Alembic verwendet:

```bash
cd backend
alembic revision --autogenerate -m "Beschreibung"
alembic upgrade head
```

---

## Deployment

- Für Deployment auf Server: Backend z.B. mit Gunicorn/Uvicorn, Frontend als statische Dateien (z.B. mit nginx).
- CORS und Umgebungsvariablen anpassen.

---

## Lizenz

Dieses Projekt ist ein Studienprojekt und steht unter keiner speziellen Lizenz. Für private und Lernzwecke frei verwendbar.

---

## Autor

- Niklas

---

**Viel Spaß beim Lernen und Austauschen mit MateWise!**
