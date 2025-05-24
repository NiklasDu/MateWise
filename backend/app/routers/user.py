from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import user as user_model
from app.schemas import user as user_schema

router = APIRouter(prefix="/users", tags=["Users"])

# GET /users → Alle Benutzer abrufen
@router.get("/", response_model=list[user_schema.UserOut])
def get_users(db: Session = Depends(get_db)):
    users = db.query(user_model.User).all()
    return users

# POST /users → Neuen Benutzer erstellen
@router.post("/", response_model=user_schema.UserOut)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    # Gibt es die E-Mail schon?
    db_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email bereits vergeben")

    new_user = user_model.User(
        username=user.username,
        email=user.email,
        password=user.password,  # Achtung: Noch ohne Hashing!
        status=user.status
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
