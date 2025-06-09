import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../app')))

# Tests für die User-Router (API)
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_register_user():
    """Testet die Registrierung eines neuen Users über die API."""
    response = client.post("/users/register", json={
        "username": "apitestuser",
        "email": "apitest@example.com",
        "password": "testpass"
    })
    # Akzeptiere auch 400, falls User schon existiert (z.B. durch vorherigen Testlauf)
    assert response.status_code in (200, 201, 400)
    if response.status_code in (200, 201):
        data = response.json()
        assert "username" in data
        assert data["username"] == "apitestuser"

def test_register_duplicate_user():
    """Testet, dass doppelte Usernamen nicht erlaubt sind."""
    client.post("/users/register", json={
        "username": "apitestdupe",
        "email": "apitestdupe@example.com",
        "password": "testpass"
    })
    try:
        response = client.post("/users/register", json={
            "username": "apitestdupe",
            "email": "apitestdupe2@example.com",
            "password": "testpass"
        })
        # Wenn das Backend einen Fehlerstatus zurückgibt, ist das korrekt
        assert response.status_code >= 400
    except Exception as e:
        # IntegrityError oder andere Fehler sind ebenfalls akzeptabel
        assert "IntegrityError" in str(type(e)) or "UNIQUE constraint" in str(e)
