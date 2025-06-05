# Erstellt Token für den angemeldeten User, damit erkannt wird, ob und wer gerade angemeldet ist.

from datetime import datetime, timedelta, timezone
from jose import jwt

SECRET_KEY = "nik-SaFe-1470"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 


def create_access_token(data: dict, expires_delta: timedelta = None):
    """
    Funktion zum erstellen des Tokens.
    """
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
