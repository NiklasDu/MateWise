# utils/dependencies.py
from fastapi import Depends, HTTPException, status
from app.routers.user import get_current_user
from app.models import user as user_model
from fastapi import WebSocket, status
from fastapi.exceptions import WebSocketException
from jose import jwt, JWTError
from app.database import SessionLocal
from app.models import user as user_model
from app.utils.jwt import SECRET_KEY, ALGORITHM

def require_admin(current_user: user_model.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Adminzugriff erforderlich")
    return current_user

async def get_current_user_ws(websocket: WebSocket) -> user_model.User:
    token = websocket.headers.get("Authorization")
    if not token:
        raise WebSocketException(code=status.WS_1008_POLICY_VIOLATION)

    try:
        scheme, token_value = token.split()
        if scheme.lower() != "bearer":
            raise ValueError()
        payload = jwt.decode(token_value, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
    except (ValueError, JWTError):
        raise WebSocketException(code=status.WS_1008_POLICY_VIOLATION)

    db = SessionLocal()
    user = db.query(user_model.User).filter(user_model.User.id == user_id).first()
    db.close()

    if not user:
        raise WebSocketException(code=status.WS_1008_POLICY_VIOLATION)

    return user