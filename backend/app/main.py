from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.schemas import user as user_schema
from app.models import user as user_model
from app.routers import user
from app.routers import skills
from app.database import get_db
from app.routers import suggestions
from app.routers import ws_chat
from app.routers import auth
from app.routers import messages

app = FastAPI()

origins = [
    "http://localhost:5173",  # Deine React-App
    "http://192.168.2.147:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # oder ["*"] für alles (nicht empfohlen in Produktion)
    allow_credentials=True,
    allow_methods=["*"],  # Erlaubt POST, GET, OPTIONS, usw.
    allow_headers=["*"],  # Erlaubt alle Header
)

# Routen einbinden
app.include_router(user.router)
app.include_router(skills.router)
app.include_router(suggestions.router)
app.include_router(ws_chat.router)
app.include_router(auth.router)
app.include_router(messages.router)


@app.get("/users", response_model=list[user_schema.UserOut])
def read_users(db: Session = Depends(get_db)):
    return db.query(user_model.User).all()