# Hier befinden sich alle Routen zur Userverwaltung.

# Import Statements 
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from app.database import get_db
from app.models import user as user_model
from app.schemas import user as user_schema
from app.utils.security import hash_password, verify_password
from fastapi import Request
from app.utils.jwt import create_access_token, ALGORITHM, SECRET_KEY
from fastapi.responses import JSONResponse
from jose import JWTError, jwt
from typing import List
import random

# API Adressen Prefix für alle Routen in dieser Datei.
router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/", response_model=list[user_schema.UserOut])
def get_users(db: Session = Depends(get_db)):
    """
    Alle Benutzer abrufen
    """
    users = db.query(user_model.User).all()
    return users

@router.get("/all", response_model=List[user_schema.UserWithSkills])
def get_all_users(db: Session = Depends(get_db)):
    """
    Alle User mit Username und Skills bekommen
    """
    return db.query(user_model.User).order_by(func.random()).all()


@router.post("/register", response_model=user_schema.UserOut)
def register_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    """
    Neuen Benutzer erstellen. 
    """
    # Gibt es die E-Mail schon?
    db_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email bereits vergeben")
    
    # Passwort hashen
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

@router.post("/login", response_model=user_schema.UserOut)
def login_user(user: user_schema.UserLogin, db: Session = Depends(get_db)):
    """"
    Benutzer anmelden, Passwort abgleichen und Token für Sitzung erstellen. 
    """
    db_user = db.query(user_model.User).filter(user_model.User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Ungültige E-Mail oder Passwort")
    
    # User als online markieren
    db_user.online = True
    db.commit()

    token = create_access_token({"sub": str(db_user.id), "is_admin": db_user.is_admin})

    response = JSONResponse(content={"message": "Login erfolgreich"})
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,   # True bei HTTPS
        samesite="Lax",
        max_age=60 * 60 * 24,
        path="/"
    )

    return response

@router.post("/logout")
def logout(request: Request, db: Session = Depends(get_db)):
    """
    Aktuell angemeldeten User abmelden und Token löschen
    """
    token = request.cookies.get("access_token")
    if token:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            user_id = int(payload.get("sub"))
            db_user = db.query(user_model.User).filter(user_model.User.id == user_id).first()
            if db_user:
                db_user.online = False
                db.commit()
        except Exception:
            pass  # Token ungültig oder User nicht gefunden, ignoriere

    response = JSONResponse(content={"message": "Logout erfolgreich"})
    response.delete_cookie("access_token", path="/")
    return response


def get_current_user(request: Request, db: Session = Depends(get_db)):
    """"
    Gucken ob gerade ein User angemeldet ist.
    """
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Nicht eingeloggt")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
    except JWTError:
        raise HTTPException(status_code=401, detail="Ungültiges Token")

    user = db.query(user_model.User).get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")
    return user


@router.get("/me", response_model=user_schema.UserOut)
def read_current_user(current_user: user_model.User = Depends(get_current_user)):
    """
    Aktuellen User bekommen 
    """
    return current_user

@router.patch("/me", response_model=user_schema.UserOut)
def update_user_profile(
    update_data: user_schema.UserUpdate,
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user),
):
    """
    Aktuellen User Updaten, neue Email, Bio oder Username.
    """
    if update_data.email:
        current_user.email = update_data.email
    if update_data.username:
        current_user.username = update_data.username
    if update_data.bio is not None:
        current_user.bio = update_data.bio

    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/change-password")
def change_password(
    password_data: user_schema.ChangePassword,
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user),
):
    """
    Aktuellen User anpassen, Passwort ändern.
    """
    if not verify_password(password_data.old_password, current_user.password):
        raise HTTPException(status_code=400, detail="Falsches Passwort")

    if password_data.new_password != password_data.confirm_password:
        raise HTTPException(status_code=400, detail="Neue Passwörter stimmen nicht überein")

    current_user.password = hash_password(password_data.new_password)
    db.commit()
    return {"message": "Passwort erfolgreich geändert"}


@router.delete("/me")
def delete_own_user(request: Request, db: Session = Depends(get_db)):
    """
    Aktuellen User löschen.
    """
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Nicht authentifiziert")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
    except JWTError:
        raise HTTPException(status_code=401, detail="Ungültiger Token")

    user = db.query(user_model.User).filter(user_model.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Benutzer nicht gefunden")

    db.delete(user)
    db.commit()
    return {"message": "Benutzerkonto gelöscht"}


@router.get("/matches", response_model=List[user_schema.UserWithSkills])
def get_matching_users(
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user),
):
    """
    Matching Algorithmus, um Nutzer anzuzeigen, die etwas beibringen, was der angemeldete
    Nutzer lernen möchte und die etwas lernen wollen, was der angemeldete User beibringen kann.
    """
    # ID-Listen der aktuellen Benutzer-Skills
    skills_to_learn_ids = {skill.id for skill in current_user.skills_to_learn}
    skills_to_teach_ids = {skill.id for skill in current_user.skills_to_teach}

    if not skills_to_learn_ids and not skills_to_teach_ids:
        return []

    # Alle anderen Benutzer holen, ausser den angemeldeten User.
    other_users = db.query(user_model.User).filter(user_model.User.id != current_user.id).all()

    matching_users = []

    for user in other_users:
        user_teach_ids = {skill.id for skill in user.skills_to_teach}
        user_learn_ids = {skill.id for skill in user.skills_to_learn}

        # Matching-Kriterium: teach/learn Überschneidung
        teaches_what_i_learn = skills_to_learn_ids.intersection(user_teach_ids)
        learns_what_i_teach = skills_to_teach_ids.intersection(user_learn_ids)

        if teaches_what_i_learn and learns_what_i_teach:
            matching_users.append(user)

    random.shuffle(matching_users)

    return matching_users


@router.get("/by-skill", response_model=List[user_schema.UserWithSkills])
def get_users_by_skill_to_teach(skill_to_teach_id: int, db: Session = Depends(get_db)):
    """
    Gibt alle User je nach ausgewähltem Skill zurück, den diese Beibringen können. 
    """
    users = db.query(user_model.User).filter(
        user_model.User.skills_to_teach.any(id=skill_to_teach_id)
    ).order_by(func.random()).all()
    
    return users

@router.get("/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Holt sich den ausgewählten User, mit all seinen Skills.
    """
    user = db.query(user_model.User).filter(user_model.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "id": user.id,
        "username": user.username,
        "bio": user.bio,
        "skills_to_learn": [{"id": s.id, "skill_name": s.skill_name} for s in user.skills_to_learn],
        "skills_to_teach": [{"id": s.id, "skill_name": s.skill_name} for s in user.skills_to_teach],
    }
