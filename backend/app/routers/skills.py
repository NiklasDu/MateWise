from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import skills as skill_model, user as user_model, categories as category_model
from app.schemas.skills import SkillSimple, SkillsGroupedByCategory, SkillWithCategory, SaveSkillsRequest
from app.routers.user import get_current_user
from typing import List

router = APIRouter(prefix="/skills", tags=["Skills"])

@router.get("/my-skill-ids")
def get_my_skill_ids(
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user)
):
    return {
        "learn": [skill.id for skill in current_user.skills_to_learn],
        "teach": [skill.id for skill in current_user.skills_to_teach]
    }

@router.get("/categories")
def get_all_categories(db: Session = Depends(get_db)):
    categories = db.query(category_model.Category).all()
    return [{"id": cat.id, "name": cat.name} for cat in categories]

@router.get("/")
def get_skills_by_category_name(category: str, db: Session = Depends(get_db)):
    category_obj = db.query(category_model.Category).filter(category_model.Category.name == category).first()
    if not category_obj:
        raise HTTPException(status_code=404, detail="Kategorie nicht gefunden")

    return [{"id": skill.id, "skill_name": skill.skill_name} for skill in category_obj.skills]

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