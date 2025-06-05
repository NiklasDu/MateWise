# API, um die Skills zu bekommen und neue zu speichern.

# Import Statements
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import skills as skill_model, user as user_model, categories as category_model
from app.schemas.skills import SkillSimple, SkillsGroupedByCategory, SkillWithCategory, SaveSkillsRequest
from app.routers.user import get_current_user
from typing import List
from app.models import suggestions as suggestion_model
from app.schemas import suggestions as suggestion_schema

# API Adressen Prefix für alle Routen in dieser Datei.
router = APIRouter(prefix="/skills", tags=["Skills"])


@router.get("/my-skill-ids")
def get_my_skill_ids(
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user)
):
    """
    Gibt alle Lern- und Lehrskills für den angemeldeten User zurück.
    """
    return {
        "learn": [skill.id for skill in current_user.skills_to_learn],
        "teach": [skill.id for skill in current_user.skills_to_teach]
    }

@router.get("/categories")
def get_all_categories(db: Session = Depends(get_db)):
    """
    Gibt alle Kategorien zurück.
    """
    categories = db.query(category_model.Category).all()
    return [{"id": cat.id, "name": cat.name} for cat in categories]

@router.get("/")
def get_skills_by_category_name(category: str, db: Session = Depends(get_db)):
    """
    Gibt alle Skills zurück.
    """
    category_obj = db.query(category_model.Category).filter(category_model.Category.name == category).first()
    if not category_obj:
        raise HTTPException(status_code=404, detail="Kategorie nicht gefunden")

    return [{"id": skill.id, "skill_name": skill.skill_name} for skill in category_obj.skills]

@router.get("/by-category", response_model=List[SkillsGroupedByCategory])
def get_skills_by_category(db: Session = Depends(get_db)):
    """
    Gibt alle Skills nach Kategorien gruppiert zurück
    """
    categories = db.query(category_model.Category).all()
    result = []
    for category in categories:
        skills = [
            SkillSimple(id=skill.id, skill_name=skill.skill_name)
            for skill in category.skills
        ]
        result.append(SkillsGroupedByCategory(category=category.name, skills=skills))
    return result

@router.post("/add-skill")
def add_new_skill(new_data: suggestion_schema.SkillCreate, db:Session = Depends(get_db)):
    """
    Fügt einen neuen Skill der Datenbank hinzu und je nach Kategorie, auch eine neue Kategorie.
    """
    
    existing_category = db.query(category_model.Category).filter(category_model.Category.name == new_data.category).first()

    if not existing_category:
        new_category = category_model.Category(name=new_data.category)
        db.add(new_category)
        db.commit()
        db.refresh(new_category) # Holt ID der neuen Kategorie
        category_id = new_category.id
    else:
        category_id = existing_category.id

    new_skill = skill_model.Skill(
        skill_name=new_data.skill,
        category_id=category_id
    )

    db.add(new_skill)
    db.commit()
    return{"message": "Neuer Skill erfolgreich gespeichert"}
    

@router.post("/learn")
def set_skills_to_learn(skill_ids: list[int], db: Session = Depends(get_db), current_user: user_model.User = Depends(get_current_user)):
    """
    Skills zum Lernen updaten.
    """
    current_user.skills_to_learn = db.query(skill_model.Skill).filter(skill_model.Skill.id.in_(skill_ids)).all()
    db.commit()
    return {"message": "Lern-Skills aktualisiert"}


@router.post("/teach")
def set_skills_to_teach(skill_ids: list[int], db: Session = Depends(get_db), current_user: user_model.User = Depends(get_current_user)):
    """
    Skills zum Unterrichten updaten
    """
    current_user.skills_to_teach = db.query(skill_model.Skill).filter(skill_model.Skill.id.in_(skill_ids)).all()
    db.commit()
    return {"message": "Lehr-Skills aktualisiert"}

@router.post("/save-skills")
def save_skills(payload: SaveSkillsRequest, db: Session = Depends(get_db), current_user: user_model.User = Depends(get_current_user)):
    """
    Speichert ausgewählte Skills 
    """
    
    learn_skills = db.query(skill_model.Skill).filter(skill_model.Skill.id.in_(payload.learn_skills)).all()
    teach_skills = db.query(skill_model.Skill).filter(skill_model.Skill.id.in_(payload.teach_skills)).all()

    current_user.skills_to_learn = learn_skills
    current_user.skills_to_teach = teach_skills

    db.commit()

    return {"message": "Skills erfolgreich gespeichert."}