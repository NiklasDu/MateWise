from pydantic import BaseModel, EmailStr
from typing import List, Optional

class SkillOut(BaseModel):
    id: int
    skill: str
    kategorie: str

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserBase(BaseModel):
    username: str
    email: str
    online: Optional[bool] = False

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    skills: List[SkillOut] = []

    class Config:
        orm_mode = True

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None

class ChangePassword(BaseModel):
    old_password: str
    new_password: str
    confirm_password: str

class SkillSimple(BaseModel):
    id: int
    skill_name: str

    class Config:
        orm_mode = True

class UserWithSkills(BaseModel):
    id: int
    username: str
    skills_to_learn: List[SkillSimple] = []
    skills_to_teach: List[SkillSimple] = []

    class Config:
        orm_mode = True