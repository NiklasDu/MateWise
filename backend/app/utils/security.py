# Passworterstellung und Prüfung.

from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """"
    Hashed das eingegebene Passwort.
    """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """"
    Prüft ob das aktuelle Passwort mit einem gehashten Übereinstimmt.
    """
    return pwd_context.verify(plain_password, hashed_password)
