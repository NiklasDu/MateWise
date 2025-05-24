from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from app.schemas import user as user_schema
from app.models import user as user_model
from app.routers import user
from app.database import get_db

app = FastAPI()

# Routen einbinden
app.include_router(user.router)

@app.get("/users", response_model=list[user_schema.UserOut])
def read_users(db: Session = Depends(get_db)):
    return db.query(user_model.User).all()