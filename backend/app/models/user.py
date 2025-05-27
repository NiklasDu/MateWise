from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.database import Base 
from .association import user_skills

class User(Base):
    __tablename__ = "users" 

    id = Column(Integer, primary_key=True, index=True)  # Eindeutige ID
    username = Column(String, unique=True, index=True)  # Benutzername, einzigartig
    email = Column(String, unique=True, index=True)     # E-Mail, einzigartig
    password = Column(String)                           # Passwort, als Text gespeichert
    online = Column(Boolean, default=False)             # Online (True) / Offline (False)

    # Beziehung zu Skills: Ein User kann viele Skills haben
    skills = relationship("Skill", secondary=user_skills, back_populates="users")