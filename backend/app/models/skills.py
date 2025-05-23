from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from .association import user_skills

class Skill(Base):
    __tablename__ = "skills" 

    id = Column(Integer, primary_key=True, index=True)
    skill = Column(String, index=True)  # Name der Fähigkeit
    kategorie = Column(String)           # Kategorie, z.B. „Programmiersprache“
    user_id = Column(Integer, ForeignKey("users.id"))  # Verknüpfung zum User

    user = relationship("User", secondary=user_skills, back_populates="skills")  # Zugehöriger User