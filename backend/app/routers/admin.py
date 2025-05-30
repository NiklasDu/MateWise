# routers/admin.py
from fastapi import APIRouter, Depends
from app.utils.dependencies import require_admin

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/dashboard")
def admin_dashboard(current_user=Depends(require_admin)):
    return {"message": f"Willkommen, Admin {current_user.username}!"}
