from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from typing import Dict
from app.utils.dependencies import get_current_user_ws
from app.models.user import User

router = APIRouter()

active_connections: Dict[int, WebSocket] = {}

@router.websocket("/ws/chat")
async def chat_websocket(websocket: WebSocket, user: User = Depends(get_current_user_ws)):

    
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
