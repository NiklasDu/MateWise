from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import user as user_model
from app.schemas import user as user_schema
from app.utils.security import hash_password, verify_password
from fastapi import Request
from app.utils.jwt import create_access_token, ALGORITHM, SECRET_KEY
from fastapi.responses import JSONResponse
from jose import JWTError, jwt

from typing import List

router = APIRouter(prefix="/users", tags=["Users"])

# GET /users → Alle Benutzer abrufen
@router.get("/", response_model=list[user_schema.UserOut])
def get_users(db: Session = Depends(get_db)):
    users = db.query(user_model.User).all()
    return users

# GET All Users with Username and Skills
@router.get("/all", response_model=List[user_schema.UserWithSkills])
def get_all_users(db: Session = Depends(get_db)):
    return db.query(user_model.User).all()

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
    

    token = create_access_token({"sub": str(db_user.id)})

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
def logout():
    response = JSONResponse(content={"message": "Logout erfolgreich"})
    response.delete_cookie("access_token", path="/")
    return response


def get_current_user(request: Request, db: Session = Depends(get_db)):
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
    return current_user

@router.patch("/me", response_model=user_schema.UserOut)
def update_user_profile(
    update_data: user_schema.UserUpdate,
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user),
):
    if update_data.email:
        current_user.email = update_data.email
    if update_data.username:
        current_user.username = update_data.username

    db.commit()
    db.refresh(current_user)
    return current_user


@router.post("/change-password")
def change_password(
    password_data: user_schema.ChangePassword,
    db: Session = Depends(get_db),
    current_user: user_model.User = Depends(get_current_user),
):
    if not verify_password(password_data.old_password, current_user.password):
        raise HTTPException(status_code=400, detail="Falsches Passwort")

    if password_data.new_password != password_data.confirm_password:
        raise HTTPException(status_code=400, detail="Neue Passwörter stimmen nicht überein")

    current_user.password = hash_password(password_data.new_password)
    db.commit()
    return {"message": "Passwort erfolgreich geändert"}


@router.delete("/me")
def delete_own_user(request: Request, db: Session = Depends(get_db)):
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