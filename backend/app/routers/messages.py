# Enthält alle Routen für das Laden der Chat-Partner und Chats

# Import Statements
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.message import Message
from app.models.user import User
from app.schemas.message import MessageCreate
from app.routers.user import get_current_user
from pydantic import BaseModel
from sqlalchemy import or_, desc

# Gibt die Standard Route für alle Router in dieser Datei an
router = APIRouter(prefix="/messages", tags=["Messages"])

# Speichert eine neue Nachricht in der Datenbank.
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

# Zeigt alle Chatpartner an, von denen der angemeldete Nutzer bereits eine Nachricht erhalten hat.
@router.get("/chat-partners")
def get_chat_partners(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Nur User, von denen man selbst eine Nachricht bekommen hat
    received = db.query(Message.sender_id).filter(Message.receiver_id == current_user.id)
    user_ids = set([row[0] for row in received])
    user_ids.discard(current_user.id)
    users = db.query(User).filter(User.id.in_(user_ids)).all()

    chat_partners = []
    for u in users:
        last_msg = (
            db.query(Message)
            .filter(
                or_(
                    (Message.sender_id == current_user.id) & (Message.receiver_id == u.id),
                    (Message.sender_id == u.id) & (Message.receiver_id == current_user.id),
                )
            )
            .order_by(desc(Message.timestamp))
            .first()
        )
        chat_partners.append({
            "id": u.id,
            "username": u.username,
            "online": u.online,
            "last_message": last_msg.content if last_msg else "",
            "last_message_time": last_msg.timestamp.isoformat() if last_msg else "",
        })

    chat_partners.sort(key=lambda x: x["last_message_time"], reverse=True)
    return chat_partners

# GET Request, um den Chatverlauf, zwsichen dem angemeldetem User und dem angeklickten Nutzer
# zu erhalten
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
