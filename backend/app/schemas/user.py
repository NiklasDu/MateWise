from pydantic import BaseModel
from typing import List, Optional

class SkillOut(BaseModel):
    id: int
    skill: str
    kategorie: str

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    username: str
    email: str
    status: Optional[str] = "offline"

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    skills: List[SkillOut] = []

    class Config:
        orm_mode = True