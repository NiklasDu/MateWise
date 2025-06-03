from fastapi import APIRouter, Depends
from datetime import datetime, timedelta
from jose import jwt

from app.models.user import User
from app.routers.user import get_current_user
from app.utils.jwt import SECRET_KEY, ALGORITHM

router = APIRouter()

@router.get("/auth/ws-token")
def get_ws_token(user: User = Depends(get_current_user)):
    expire = datetime.now() + timedelta(minutes=5) 
    payload = {"sub": str(user.id), "exp": expire}
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return {"ws_token": token}
