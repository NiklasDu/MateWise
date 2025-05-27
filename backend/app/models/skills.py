from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from .association import user_skills

class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True, index=True)
    skill_name = Column(String, index=True)
    category_id = Column(Integer, ForeignKey("categories.id"))

    category = relationship("Category", back_populates="skills")
    users = relationship("User", secondary="user_skills", back_populates="skills")

    learners = relationship(
        "User",
        secondary="user_skills_learn",
        back_populates="skills_to_learn"
    )
    teachers = relationship(
        "User",
        secondary="user_skills_teach",
        back_populates="skills_to_teach"
    )