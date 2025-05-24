from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import user as user_model
from app.schemas import user as user_schema
from app.utils.security import hash_password, verify_password

router = APIRouter(prefix="/users", tags=["Users"])

# GET /users → Alle Benutzer abrufen
@router.get("/", response_model=list[user_schema.UserOut])
def get_users(db: Session = Depends(get_db)):
    users = db.query(user_model.User).all()
    return users

# POST /users/register → Neuen Benutzer erstellen
@router.post("/register", response_model=user_schema.UserOut)
def register_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    # Gibt es die E-Mail schon?
    db_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email bereits vergeben")
    
    hashed_pw = hash_password(user.password)

    new_user = user_model.User(
        username=user.username,
        email=user.email,
        password=hashed_pw,
        online=False
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# POST /users/login > Anmelden
@router.post("/login", response_model=user_schema.UserOut)
def login_user(user: user_schema.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Ungültige E-Mail oder Passwort")

    return db_user
