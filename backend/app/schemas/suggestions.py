from pydantic import BaseModel

class CategoryOut(BaseModel):
    id: int
    category: str
    skill: str

    class Config:
        orm_mode = True

class SkillCreate(BaseModel):
    category: str
    skill: str
