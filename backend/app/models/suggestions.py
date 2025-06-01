from sqlalchemy import Column, Integer, String
from app.database import Base

class Suggestions(Base):
    __tablename__ = "suggestions"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String)
    new_skill_name = Column(String)