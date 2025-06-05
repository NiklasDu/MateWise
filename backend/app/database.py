# Grundlegende Einstellungen für die Datenbank und das herstellen der Verbindung. 

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite-Datenbank (lokale Datei)
SQLALCHEMY_DATABASE_URL = "sqlite:///./matewise.db"

# Engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Session (für Datenbankoperationen)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base-Klasse für Models
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()