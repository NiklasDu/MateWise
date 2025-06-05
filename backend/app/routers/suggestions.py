# Hier befinden sich alle Routen zur Verwaltung der Vorschläge neuer Skills und Kategorien 

# Import Statements
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import suggestions as suggestions_model
from app.schemas import suggestions as suggestions_schema
from fastapi import Request
from fastapi.responses import JSONResponse
from typing import List

# API Adressen Prefix für alle Routen in dieser Datei.
router = APIRouter(prefix="/suggestions", tags=["Suggestions"])

@router.post("/request")
def new_skill_suggestion(new_data: suggestions_schema.SkillCreate, db: Session = Depends(get_db)):
    """
    Vorshläge in die Datenbank bringen
    """
    if not new_data.category or not new_data.skill:
        raise HTTPException(status_code=400, detail="Kategorie und Skill dürfen nicht leer sein")
    
    new_skill = suggestions_model.Suggestions(
        category=new_data.category,
        new_skill_name=new_data.skill
    )

    db.add(new_skill)
    db.commit()
    return {"message": "Anfrage erfolgreich gestellt"}

@router.get("/all-requests", response_model=List[suggestions_schema.CategoryOut])
def get_requests(db: Session = Depends(get_db)):
    """
    Zeigt alle aktuell offenen Vorschläge an.
    """
    skill_requests = db.query(suggestions_model.Suggestions).all()
    return skill_requests

@router.delete("/{suggestion_id}")
def delete_suggestion(suggestion_id: int, db: Session = Depends(get_db)):
    """
    Löscht den ausgewählten Vorschlag aus der Datenbank.
    """
    suggestion = db.query(suggestions_model.Suggestions).filter(suggestions_model.Suggestions.id == suggestion_id).first()

    if not suggestion:
        raise HTTPException(status_code=404, detail="Eintrag nicht gefunden.")
    
    db.delete(suggestion)
    db.commit()
    return {"message": "Eintrag erfolgreich gelöscht"}