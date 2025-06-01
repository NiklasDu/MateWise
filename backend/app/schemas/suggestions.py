from pydantic import BaseModel

class CategoryOut(BaseModel):
    id: int
    category: str
    new_skill_name: str

    class Config:
        orm_mode = True

class SkillCreate(BaseModel):
    category: str
    skill: str
