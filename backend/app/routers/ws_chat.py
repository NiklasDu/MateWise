from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Query
from typing import Dict
from app.utils.dependencies import get_current_user_ws
from app.models.user import User
from app.utils.jwt import SECRET_KEY, ALGORITHM
from jose import jwt, JWTError

from app.database import SessionLocal
from app.models.user import User


def get_user_by_id(user_id: int):
    """
    Holt sich den User nach ID.
    """
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.id == user_id).first()
        return user
    finally:
        db.close()

# Initialisiert den Router.
router = APIRouter()

active_connections: Dict[int, WebSocket] = {}

@router.websocket("/ws/chat")
async def chat_websocket(websocket: WebSocket, token: str = Query(...)):
    """
    Erstellt eine aktive Verbindung für den LiveChat.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = int(payload.get("sub"))
        user = get_user_by_id(user_id)
        if not user:
            await websocket.close(code=1008)
            return
    except JWTError:
        await websocket.close(code=1008)
        return
    await websocket.accept()
    active_connections[user.id] = websocket
    try:
        while True:
            data = await websocket.receive_json()
            receiver_id = data["receiver_id"]
            content = data["content"]

            # Wenn der Empfänger online ist, direkt weiterleiten
            if receiver_id in active_connections:
                await active_connections[receiver_id].send_json({
                    "sender_id": user.id,
                    "content": content
                })

            # Optional: Nachricht auch in der DB speichern
            from app.models.message import Message
            from app.database import SessionLocal
            db = SessionLocal()
            message = Message(
                sender_id=user.id,
                receiver_id=receiver_id,
                content=content
            )
            db.add(message)
            db.commit()
            db.close()

    except WebSocketDisconnect:
        del active_connections[user.id]
