from pydantic import BaseModel
from typing import List

# Das hast du schon:
class CategoryOut(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

class SkillWithCategory(BaseModel):
    id: int
    skill_name: str
    category: CategoryOut

    class Config:
        orm_mode = True

class SkillSimple(BaseModel):
    id: int
    skill_name: str

    class Config:
        orm_mode = True

# Das brauchst du zusätzlich:
class SkillsGroupedByCategory(BaseModel):
    category: str
    skills: List[SkillSimple]

class SaveSkillsRequest(BaseModel):
    learn_skills: List[int]
    teach_skills: List[int]