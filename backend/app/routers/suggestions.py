from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import suggestions as suggestions_model
from app.schemas import suggestions as suggestions_schema
from fastapi import Request
from fastapi.responses import JSONResponse
from typing import List

router = APIRouter(prefix="/suggestions", tags=["Suggestions"])

@router.post("/request")
def new_skill_suggestion(new_data: suggestions_schema.SkillCreate, db: Session = Depends(get_db)):
    if not new_data.category or not new_data.skill:
        raise HTTPException(status_code=400, detail="Kategorie und Skill dürfen nicht leer sein")
    
    new_skill = suggestions_model.Suggestions(
        category=new_data.category,
        new_skill_name=new_data.skill
    )

    db.add(new_skill)
    db.commit()
    return {"message": "Anfrage erfolgreich gestellt"}