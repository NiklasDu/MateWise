# Verbindet die Kategorien mit Skills

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base

# Eigenschaften der Category Tabelle
class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    skills = relationship("Skill", back_populates="category")