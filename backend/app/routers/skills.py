from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import skills as skill_model, user as user_model, categories as category_model
from app.schemas.skills import SkillSimple, SkillsGroupedByCategory, SkillWithCategory, SaveSkillsRequest
from app.routers.user import get_current_user
from typing import List

router = APIRouter(prefix="/skills", tags=["Skills"])

@router.get("/me", response_model=List[SkillWithCategory])
def get_my_skills(
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user)
):
    return current_user.skills

# Alle Skills nach Kategorien gruppiert
@router.get("/by-category", response_model=List[SkillsGroupedByCategory])
def get_skills_by_category(db: Session = Depends(get_db)):
    categories = db.query(category_model.Category).all()
    result = []
    for category in categories:
        skills = [
            SkillSimple(id=skill.id, skill_name=skill.skill_name)
            for skill in category.skills
        ]
        result.append(SkillsGroupedByCategory(category=category.name, skills=skills))
    return result


# Skills zum Lernen setzen
@router.post("/learn")
def set_skills_to_learn(skill_ids: list[int], db: Session = Depends(get_db), current_user: user_model.User = Depends(get_current_user)):
    current_user.skills_to_learn = db.query(skill_model.Skill).filter(skill_model.Skill.id.in_(skill_ids)).all()
    db.commit()
    return {"message": "Lern-Skills aktualisiert"}


# Skills zum Unterrichten setzen
@router.post("/teach")
def set_skills_to_teach(skill_ids: list[int], db: Session = Depends(get_db), current_user: user_model.User = Depends(get_current_user)):
    current_user.skills_to_teach = db.query(skill_model.Skill).filter(skill_model.Skill.id.in_(skill_ids)).all()
    db.commit()
    return {"message": "Lehr-Skills aktualisiert"}

@router.post("/save-skills")
def save_skills(payload: SaveSkillsRequest, db: Session = Depends(get_db), current_user: user_model.User = Depends(get_current_user)):
    learn_skills = db.query(skill_model.Skill).filter(skill_model.Skill.id.in_(payload.learn_skills)).all()
    teach_skills = db.query(skill_model.Skill).filter(skill_model.Skill.id.in_(payload.teach_skills)).all()

    current_user.skills_to_learn = learn_skills
    current_user.skills_to_teach = teach_skills

    db.commit()

    return {"message": "Skills erfolgreich gespeichert."}