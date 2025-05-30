# utils/dependencies.py
from fastapi import Depends, HTTPException, status
from app.routers.user import get_current_user
from app.models import user as user_model

def require_admin(current_user: user_model.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Adminzugriff erforderlich")
    return current_user
