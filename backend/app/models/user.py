# Enthält alle relevanten Daten zu einem Nutzer bereit.

from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.database import Base 
from .association import user_skills
from app.models.association import user_skills_learn, user_skills_teach

# Eigenschaften der User Tabelle
class User(Base):
    __tablename__ = "users" 

    id = Column(Integer, primary_key=True, index=True)  # Eindeutige ID
    username = Column(String, unique=True, index=True)  # Benutzername, einzigartig
    email = Column(String, unique=True, index=True)     # E-Mail, einzigartig
    password = Column(String)                           # Passwort, als Text gespeichert
    online = Column(Boolean, default=False)             # Online (True) / Offline (False)
    is_admin = Column(Boolean, default=False)
    bio = Column(String)

    # Beziehung zu Skills
    skills = relationship("Skill", secondary=user_skills, back_populates="users")

    skills_to_learn = relationship(
        "Skill",
        secondary=user_skills_learn,
        back_populates="learners"
    )
    skills_to_teach = relationship(
        "Skill",
        secondary=user_skills_teach,
        back_populates="teachers"
    )