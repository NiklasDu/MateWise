from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.message import Message
from app.models.user import User
from app.schemas.message import MessageCreate
# from app.utils.dependencies import get_current_user
from app.routers.user import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/messages", tags=["Messages"])

@router.post("/")
def send_message(message: MessageCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_message = Message(
        sender_id=current_user.id,
        receiver_id=message.receiver_id,
        content=message.content
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return new_message

@router.get("/chat-partners")
def get_chat_partners(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Alle User-IDs, mit denen der aktuelle User geschrieben hat (gesendet oder empfangen)
    sent = db.query(Message.receiver_id).filter(Message.sender_id == current_user.id)
    received = db.query(Message.sender_id).filter(Message.receiver_id == current_user.id)
    user_ids = set([row[0] for row in sent] + [row[0] for row in received])
    # Sich selbst rausfiltern
    user_ids.discard(current_user.id)
    # User-Objekte holen
    users = db.query(User).filter(User.id.in_(user_ids)).all()
    return [
        {
            "id": u.id,
            "username": u.username,
            "online": u.online,
        }
        for u in users
    ]

@router.get("/{user_id}")
def get_chat_history(
    user_id: int, 
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_user)
):
    messages = db.query(Message).filter(
        ((Message.sender_id == current_user.id) & (Message.receiver_id == user_id)) |
        ((Message.sender_id == user_id) & (Message.receiver_id == current_user.id))
    ).order_by(Message.timestamp).all()
    return [
        {
            "id": m.id,
            "sender_id": m.sender_id,
            "receiver_id": m.receiver_id,
            "content": m.content,
            "timestamp": m.timestamp.isoformat() if m.timestamp else None,
        }
        for m in messages
    ]
